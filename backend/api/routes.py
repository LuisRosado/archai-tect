from fastapi import APIRouter
from pydantic import BaseModel

from backend.agents.architecture_generator import generate_architecture

router = APIRouter()

class DesignRequest(BaseModel):
    prompt: str


@router.post("/generate")
def generate_design(request: DesignRequest):

    result = generate_architecture(request.prompt)

    return {
        "architecture": result
    }