import Sidebar from "./components/Sidebar";
import MarkdownRenderer from "./components/MarkdownRenderer";
import { getMarkdownContent } from "../../content/markdown/utils";
import GenerateNoteModal from "./components/GenerateNoteModal";

export default async function Home() {
    // Read markdown content from file
    const markdownContent = await getMarkdownContent('demo', {
        enableCaching: true,
        throwOnMissing: false
    });

    return (
        <div className="flex flex-row min-h-screen w-screen bg-black">
            <aside className="min-w-max w-[15dvw] max-w-max justify-self-start items-center bg-grey p-6 sticky top-0 max-h-[100dvh] transition-all duration-300">
                <Sidebar />
            </aside>
            <main className="p-23 flex-1">
                <MarkdownRenderer content={markdownContent} />
            </main>
            <GenerateNoteModal />
        </div>
    );
}
