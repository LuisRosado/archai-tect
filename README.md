# ArchAItect – AI System Design Generator

ArchAItect is an AI-powered developer tool that generates scalable system architectures from natural language descriptions.

The application uses a local LLM via Ollama to analyze system requirements and automatically produce:

* Core architecture components
* Recommended technology stack
* A visual architecture diagram rendered with Mermaid

The goal of this project is to demonstrate how modern AI tools can assist developers in system design and architecture planning.


![Image](https://github.com/user-attachments/assets/7b686cda-e333-486a-9978-89535f64d6a6)

---

## Features

* Generate system architecture from natural language
* Suggest backend, database, cache and messaging technologies
* Automatically generate architecture diagrams
* Interactive web UI
* Mermaid-based diagram rendering
* Local LLM inference using Ollama
* FastAPI backend API

---

## Tech Stack

Backend

* Python
* FastAPI
* LangChain
* Ollama

Frontend

* HTML
* Tailwind CSS
* Vanilla JavaScript
* Mermaid.js

AI

* Local LLM via Ollama (tested with `tinyllama` and `phi3`)

---

## Project Structure

```
archai-tect

backend/
  agents/
    architecture_generator.py
  api/
    routes.py
  services/
    ollama_service.py

frontend/
  index.html
  script.js

main.py
requirements.txt
```

---

## Requirements

* Python 3.10+
* Ollama installed
* A downloaded Ollama model

Install Ollama:
https://ollama.com

---

## Install Dependencies

```
pip install -r requirements.txt
```

---

## Download a Model

Example:

```
ollama pull tinyllama
```

Other compatible models:

```
phi3
phi3:mini
gemma:2b
```

---

## Running the Application

The app requires **two terminals**.

### Terminal 1 – Start Ollama

```
ollama serve
```

---

### Terminal 2 – Start FastAPI

```
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

## Open the App

Open the Codespaces or local URL:

```
http://localhost:8000
```

or in Codespaces:

```
https://<your-codespace-url>-8000.app.github.dev/
```

---

## Example Prompt

```
architecture for chat application with real-time messaging and notifications
```

The AI will generate:

* System components
* Suggested technology stack
* A visual architecture diagram

---

## Example Output

Components

* User
* API Gateway
* Service
* Database

Tech Stack

* Backend: FastAPI
* Database: PostgreSQL
* Cache: Redis
* Messaging: Kafka

Diagram

```
User → API Gateway → Service → Database
```

---

## Notes

Some small models may occasionally generate invalid diagrams or JSON.
The application includes fallback handling to keep the UI stable.

---

## Future Improvements

* Multi-agent architecture generation using LangGraph
* Support for multiple architecture styles (microservices, event-driven, AI pipelines)
* Export diagrams as images
* Improved diagram validation

---

## License

MIT License
