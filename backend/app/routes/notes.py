from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Annotated, Optional, List

from .. import dependencies, models, schemas, service

router = APIRouter(prefix="/notes", tags=["Notes"])

@router.post("/generate", response_model=schemas.NoteResponse)
def generate_note(
    source_type: Annotated[str, Form()],
    source: Optional[UploadFile] = File(None),
    url: Optional[str] = Form(None),
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_user)
):
    """Generates a note from a given source (YouTube, PDF, or DOCX)."""
    text_content = ""
    title = "Generated Note"

    try:
        if source_type == "youtube":
            if not url:
                raise HTTPException(status_code=400, detail="URL is required for YouTube source type.")
            text_content = service.get_text_from_youtube(url)
        elif source_type == "pdf":
            if not source:
                raise HTTPException(status_code=400, detail="A valid PDF file is required for PDF source type.")
            text_content = service.get_text_from_pdf(source.file)
        elif source_type == "docx":
            if not source:
                raise HTTPException(status_code=400, detail="A valid DOCX file is required for DOCX source type.")
            text_content = service.get_text_from_docx(source.file)
        else:
            raise HTTPException(status_code=400, detail="Invalid source type. Must be 'youtube', 'pdf', or 'docx'.")

        if not text_content.strip():
            raise HTTPException(status_code=400, detail="No text content could be extracted from the provided source.")
        
        generated_content = service.generate_notes_from_text(text_content)
        title = service.generate_notes_title_from_text(generated_content)

        new_note = models.Note(
            title=title,
            content=generated_content,
            source_url=url if source_type == "youtube" else None,
            owner_id=current_user.id
        )
        db.add(new_note)
        db.commit()
        db.refresh(new_note)

        return new_note

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/collect", response_model=List[schemas.Note])
def get_user_notes(
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_user)
):
    """Retrieves all notes for the currently authenticated user."""
    notes = db.query(models.Note).filter(models.Note.owner_id == current_user.id).order_by(models.Note.created_at.desc()).all()
    return notes
