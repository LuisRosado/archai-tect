import json
import re

from langchain_core.prompts import PromptTemplate
from backend.services.ollama_service import get_llm


prompt_template = PromptTemplate(
    input_variables=["requirements"],
    template="""
You are a senior software architect.

Design a scalable system architecture.

Requirements:
{requirements}

Return ONLY valid JSON with this format:

{{
  "components": ["component1", "component2"],
  "tech_stack": {{
    "backend": "",
    "database": "",
    "cache": "",
    "messaging": ""
  }},
  "diagram": "mermaid diagram"
}}

The diagram must be Mermaid format like:

graph TD
User --> API_Gateway
API_Gateway --> ServiceA
"""
)


def clean_llm_output(text: str) -> str:
    """
    Removes markdown code blocks that LLMs often add
    """
    text = re.sub(r"```json", "", text)
    text = re.sub(r"```mermaid", "", text)
    text = re.sub(r"```", "", text)
    return text.strip()


def generate_architecture(requirements: str):

    llm = get_llm()

    prompt = prompt_template.format(
        requirements=requirements
    )

    response = llm.invoke(prompt)

    cleaned = clean_llm_output(response)

    try:
        parsed = json.loads(cleaned)
        return parsed
    except Exception:
        return {
            "error": "Failed to parse LLM output",
            "raw_output": cleaned
        }