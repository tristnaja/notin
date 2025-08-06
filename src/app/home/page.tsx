import { getMarkdownContent } from "../../content/markdown/utils";
import ClientHome from "./ClientHome";

export default async function Home() {
    const markdownContent: string = await getMarkdownContent('demo', {
        enableCaching: true,
        throwOnMissing: false
    });

    return <ClientHome content={markdownContent} />;
}
