import os
import PyPDF2
import docx
import io
from google import genai
from google.genai import types
from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs

client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY"),
    http_options=types.HttpOptions(api_version='v1alpha')
)

# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
# model = genai.GenerativeModel('gemini-2.5-pro')

def get_text_from_youtube(url: str) -> str:
    """Extracts the transcript from a YouTube video."""
    parsed_url = urlparse(url)
    video_id = parse_qs(parsed_url.query).get("v")
    if not video_id:
        raise ValueError("Invalid YouTube URL")
    video_id = video_id[0]
    transcript_list = YouTubeTranscriptApi().fetch(video_id)
    raw_transcript = transcript_list.to_raw_data()
    transcript = " ".join([item['text'] for item in raw_transcript])
    return transcript

def get_text_from_pdf(file: io.BytesIO) -> str:
    """Extracts text from a PDF file."""
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def get_text_from_docx(file: io.BytesIO) -> str:
    """Extracts text from a DOCX file."""
    file_stream = io.BytesIO(file.read())
    doc = docx.Document(file_stream)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

def generate_notes_from_text(text: str) -> str:
    """Generates structured markdown notes from a given text using a generative AI model."""
    prompt = f"""
        Convert the following text into **beautifully structured Markdown notes** optimized for Notin.

        ### Formatting Guidelines:
        - Use **headings and subheadings** (`#`, `##`, `###`) for clear hierarchy.
        - Format text with **bold**, *italics*, **_both_**, and `inline code` when relevant.
        - Use **code blocks** with language tags (```python, ```javascript, ```sql, etc.) for examples and snippets.
        - Support **LaTeX math** inside `$...$` or `$$...$$` for equations, formulas, and advanced notation.
        - Organize information using (only if necessary, dont overuse it):
        - Bulleted lists
        - Numbered lists
        - Nested lists (if needed)
        - 📌 Task lists (`- [ ]` / `- [x]`) for actionable items
        - Use **blockquotes** (`>`) for definitions, tips, or inspirational quotes.
        - Add **tables** where structured comparisons or data are needed.
        - Use emojis 🎯 sparingly to improve readability (⚡️ for key ideas, 📌 for important points, 💡 for tips, 🚀 for actions).
        - Keep the output **clean, concise, and scannable**, but showcase MarkdownU+2019s full expressive power.

        ### Input:
        {text}

        ### Output:
        Return only the **final Markdown-formatted notes** with proper syntax highlighting, LaTeX, and clean structure.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    return response.text

def generate_notes_title_from_text(text: str) -> str:
    """Generates a concise title from a given text using a generative AI model."""
    prompt = f"""
        Convert the following text into a **concise title** optimized for the appropriate input.

        ### Input:
        {text}

        ### Output:
        Return only the **final title** without any additional text or explanation.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    return response.text
