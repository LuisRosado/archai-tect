from langchain_ollama import OllamaLLM

def get_llm():
    return OllamaLLM(
        model="tinyllama",
        temperature=0.2,
        num_predict=120
    )