import { getMarkdownContent, getAllMarkdownContent } from "../../lib/markdown/io";
import ClientHome from "./ClientHome";

export default async function Home() {
    const [initialContent, allContent] = await Promise.all([
        getMarkdownContent('demo', {
            enableCaching: true,
            throwOnMissing: false
        }),
        getAllMarkdownContent({
            enableCaching: true,
            throwOnMissing: false
        })
    ]);

    return <ClientHome 
        initialContent={initialContent} 
        initialType="demo" 
        allContent={allContent}
    />;
}
