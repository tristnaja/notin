"use client";
import Link from "next/link";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes: string[] = ["PDF", "DOCS"];

function GenerateNoteModal() {
    const [isDocument, setIsDocument] = useState(false);

    const toggleDocument = () => {
        setIsDocument(true);
    }

    const toggleYT = () => {
        setIsDocument(false);
    }

    const [file, setFile] = useState<string | null>(null);

    const handleChange = (uploaded: File | File[]) => {
        const selectedFile = Array.isArray(uploaded) ? uploaded[0] : uploaded;
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <div className="z-100 top-0 bottom-0 left-0 right-0 fixed bg-black-opacity-70 flex justify-center items-center">
            <div>
                <div className="flex justify-between">
                    <p onClick={toggleYT} className={`w-full ${isDocument ? "bg-[#141414]/10" : "bg-[#141414]/60"} cursor-pointer rounded-tl-xl backdrop-blur-sm text-center py-4`}>YT Link</p>
                    <p onClick={toggleDocument} className={`w-full ${isDocument ? "bg-[#141414]/60" : "bg-[#141414]/10"} cursor-pointer rounded-tr-xl backdrop-blur-sm text-center py-4`}>Document</p>
                </div>
                {
                    isDocument ?
                        <form action="post" className="bg-[#141414]/60 backdrop-blur-sm p-8 rounded-b-xl flex flex-col justify-center items-center gap-4">
                            <article className="flex flex-col gap-1">
                                <label htmlFor="email" className="font-bold text-[16px]">
                                    Document
                                </label>
                                <div>
                                    <FileUploader
                                        handleChange={handleChange}
                                        name="file"
                                        types={fileTypes}
                                    />
                                    {file && (
                                        <div style={{ marginTop: "20px" }}>
                                            <h4>Image Preview:</h4>
                                            <img
                                                src={file}
                                                alt="Uploaded File"
                                                style={{ maxWidth: "100%", height: "auto" }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </article>
                            <div className="w-full flex justify-between items-center gap-10">
                                <button
                                    type="submit"
                                    className="bg-blue hover:bg-blue-opacity-40 text-white rounded-md w-full h-[48px] text-[1rem] font-bold cursor-pointer mt-2"
                                >
                                    Generate
                                </button>
                                <Link
                                    href="#"
                                    className="bg-light-grey hover:bg-grey text-white rounded-md w-full h-[48px] text-[1rem] flex justify-center items-center font-bold cursor-pointer mt-2"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                        :
                        <form action="post" className="bg-[#141414]/60 backdrop-blur-sm p-8 rounded-b-xl flex flex-col justify-center items-center gap-4">
                            <article className="flex flex-col gap-1">
                                <label htmlFor="email" className="font-bold text-[16px]">
                                    Link
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    required
                                    className="w-[55dvw] max-w-[412px] h-[48px] bg-grey rounded-lg border border-white-opacity-50 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue px-3 font-normal text-[12px]"
                                />
                            </article>
                            <div className="w-full flex justify-between items-center gap-10">
                                <button
                                    type="submit"
                                    className="bg-blue hover:bg-blue-opacity-40 text-white rounded-md w-full h-[48px] text-[1rem] font-bold cursor-pointer mt-2"
                                >
                                    Generate
                                </button>
                                <Link
                                    href="#"
                                    className="bg-light-grey hover:bg-grey text-white rounded-md w-full h-[48px] text-[1rem] flex justify-center items-center font-bold cursor-pointer mt-2"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                }
            </div>
        </div>
    )
}

export default GenerateNoteModal;
