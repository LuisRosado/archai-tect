import json
import re

from langchain_core.prompts import PromptTemplate
from backend.services.ollama_service import get_llm


prompt_template = PromptTemplate(
    input_variables=["requirements"],
    template="""
You are a software architect.

Design a simple scalable architecture.

Requirements:
{requirements}

Return ONLY JSON in this format:

{{
 "components": [],
 "tech_stack": {{
   "backend": "",
   "database": "",
   "cache": "",
   "messaging": ""
 }},
 "diagram": "graph TD A-->B"
}}
"""
)


def clean_llm_output(text: str) -> str:
    text = re.sub(r"```json", "", text)
    text = re.sub(r"```", "", text)
    return text.strip()


def extract_json(text: str):

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if match:
        return match.group(0)

    return None


def generate_architecture(requirements: str):

    llm = get_llm()

    prompt = prompt_template.format(
        requirements=requirements
    )

    response = llm.invoke(prompt)

    cleaned = clean_llm_output(response)

    json_text = extract_json(cleaned)

    try:

        parsed = json.loads(json_text)

        return parsed

    except Exception:

        # fallback seguro para no romper la API
        return {
            "components": ["User", "API Gateway", "Service", "Database"],
            "tech_stack": {
                "backend": "FastAPI",
                "database": "PostgreSQL",
                "cache": "Redis",
                "messaging": "Kafka"
            },
            "diagram": "graph TD User-->API_Gateway API_Gateway-->Service Service-->Database"
        }