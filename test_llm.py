from langchain_community.llms import Ollama

llm = Ollama(model="phi3:mini")

print(llm.invoke("Hello"))