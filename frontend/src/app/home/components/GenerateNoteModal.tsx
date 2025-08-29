"use client";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { generateNote } from "@/lib/api/notes";
import { toast } from "sonner";
import { on } from "events";

const fileTypes: string[] = ["PDF", "DOCS"];

type GenerateNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNoteGenerated: (note: any) => void;
};

function GenerateNoteModal({
  isOpen,
  onClose,
  onNoteGenerated,
}: GenerateNoteModalProps) {
  const [isDocument, setIsDocument] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (uploadedFile: File | File[]) => {
    const selectedFile = Array.isArray(uploadedFile)
      ? uploadedFile[0]
      : uploadedFile;
    setFile(selectedFile);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();

    if (isDocument) {
      if (!file) {
        toast.error("Please upload a document");
        setLoading(false);
        return;
      }
      const fileType = file.type.includes("pdf") ? "pdf" : "docx";
      formData.append("source_type", fileType);
      formData.append("source", file);
    } else {
      if (!url) {
        toast.error("Please provide a YouTube URL");
        setLoading(false);
        return;
      }
      formData.append("source_type", "youtube");
      formData.append("url", url);
    }

    try {
      const newNote = await generateNote(formData);
      toast.success("Note generated successfully");
      onNoteGenerated(newNote);
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const toggleDocument = () => {
    setIsDocument(true);
  };

  const toggleYT = () => {
    setIsDocument(false);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="z-100 top-0 bottom-0 left-0 right-0 fixed bg-black-opacity-70 flex justify-center items-center"
    >
      {loading ? (
        <div className="bg-grey/50 backdrop-blur-sm p-20 rounded-xl flex flex-col justify-center items-center gap-4">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between">
            <p
              onClick={toggleYT}
              className={`w-full ${
                isDocument ? "bg-[#141414]/30" : "bg-[#141414]"
              } cursor-pointer rounded-tl-xl backdrop-blur-sm text-center py-4`}
            >
              YT Link
            </p>
            <p
              onClick={toggleDocument}
              className={`w-full ${
                isDocument ? "bg-[#141414]" : "bg-[#141414]/30"
              } cursor-pointer rounded-tr-xl backdrop-blur-sm text-center py-4`}
            >
              Document
            </p>
          </div>
          {isDocument ? (
            <form
              onSubmit={handleSubmit}
              action="post"
              className="bg-[#141414] backdrop-blur-sm p-8 rounded-b-xl flex flex-col justify-center items-center gap-4"
            >
              <article className="flex flex-col gap-1">
                <label htmlFor="email" className="font-bold text-[16px]">
                  Document
                </label>
                <FileUploader
                  handleChange={handleFileChange}
                  name="file"
                  types={fileTypes}
                />
              </article>
              <div className="w-full flex justify-between items-center gap-10">
                <button
                  type="submit"
                  className="pt-1 bg-blue hover:bg-blue-opacity-40 text-white rounded-md w-full h-[48px] text-[1rem] font-bold cursor-pointer mt-2"
                >
                  Generate
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="pt-1 bg-light-grey hover:bg-grey text-white rounded-md w-full h-[48px] text-[1rem] font-bold cursor-pointer mt-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit}
              action="post"
              className="bg-[#141414] backdrop-blur-sm p-8 rounded-b-xl flex flex-col justify-center items-center gap-4"
            >
              <article className="flex flex-col gap-1">
                <label htmlFor="ytlink" className="font-bold text-[16px]">
                  YouTube Link
                </label>
                <input
                  type="url"
                  id="ytlink"
                  name="ytlink"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=example"
                  required
                  className="w-[55dvw] max-w-[412px] h-[48px] bg-grey rounded-lg border border-white-opacity-50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue px-3 font-normal text-[12px]"
                />
              </article>
              <div className="w-full flex justify-between items-center gap-10">
                <button
                  type="submit"
                  className="pt-1 bg-blue hover:bg-blue-opacity-40 text-white rounded-md w-full h-[48px] text-[1rem] font-bold cursor-pointer mt-2"
                >
                  Generate
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="pt-1 bg-light-grey hover:bg-grey text-white rounded-md w-full h-[48px] text-[1rem] font-bold cursor-pointer mt-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default GenerateNoteModal;
