# 🎓 College Admin FAQ AI Chatbot

A production-style Retrieval-Augmented Generation (RAG) chatbot built for answering college administrative queries using institutional documents. The application enables students to obtain accurate answers related to fees, attendance, exams, circulars, and office contacts while allowing administrators to manage the knowledge base through a secure dashboard.

---

# Features

## Student Portal

- Secure login using Clerk Authentication
- Chat with AI assistant
- Context-aware responses using RAG
- Conversation history
- Source citations for every answer
- Feedback system (👍 / 👎)
- Multiple chat sessions

---

## Admin Portal

- Secure admin authentication
- Upload PDF/DOCX/TXT knowledge documents
- Duplicate document detection
- View uploaded documents
- Delete documents
- Rebuild Knowledge Base
- Analytics Dashboard
- Feedback statistics

---

# Architecture

```
                       +----------------------+
                       |     Next.js UI       |
                       +----------+-----------+
                                  |
                        REST APIs (HTTPS)
                                  |
                  +---------------+---------------+
                  |                               |
          Student Chat                   Admin Dashboard
                  |                               |
                  +---------------+---------------+
                                  |
                           FastAPI Backend
                                  |
        -------------------------------------------------
        |                  |                 |           |
   Retrieval Layer     Inference Layer   Analytics   Feedback
        |                  |                 |           |
        +---------+--------+-----------------+-----------+
                  |
             ChromaDB Vector Store
                  |
      sentence-transformers Embeddings
                  |
          Uploaded Knowledge Documents
                  |
           PDF / DOCX / TXT Files
                  |
            MongoDB Atlas Database
```

---

# Tech Stack

## Frontend

- React.js
- Next.js
- TypeScript
- Tailwind CSS
- Clerk Authentication

---

## Backend

- Python
- FastAPI
- LangChain
- ChromaDB
- MongoDB Atlas
- sentence-transformers
- HuggingFace Embeddings

---

## AI Stack

- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Embeddings
- Recursive Character Text Splitting
- Prompt Engineering

---

# Project Structure

```
college-admin-faq-bot
│
├── backend
│   ├── auth
│   ├── db
│   ├── routes
│   ├── services
│   ├── utils
│   ├── chroma
│   ├── data
│   └── main.py
│
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   └── public
│
└── README.md
```

---

# RAG Pipeline

```
Document Upload
      │
      ▼
PDF / DOCX / TXT Loader
      │
      ▼
Recursive Character Splitter
(chunk size = 500
 overlap = 50)
      │
      ▼
Sentence Transformer Embeddings
      │
      ▼
ChromaDB
      │
      ▼
Semantic Search
      │
      ▼
Top-k Relevant Chunks
      │
      ▼
Prompt Construction
      │
      ▼
Google Gemini LLM
      │
      ▼
Response + Citations
```

---

# Authentication

The project uses Clerk Authentication.

There are two roles:

- Student
- Admin

Admin users can

- Upload documents
- Delete documents
- Rebuild knowledge base
- View analytics

Students can only access the chatbot.

---

# Knowledge Base

Supported formats

- PDF
- DOCX
- TXT

Documents are automatically

- Parsed
- Split into chunks
- Embedded
- Stored inside ChromaDB

---

# Analytics

The admin dashboard displays

- Total Queries
- Active Sessions
- Active Users
- Total Documents
- Total Knowledge Chunks
- Average Response Latency
- Positive Feedback
- Negative Feedback
- Feedback Score

---

# Feedback System

Students can provide

- 👍 Positive Feedback
- 👎 Negative Feedback

The analytics dashboard aggregates these metrics.

---

# Citation System

Every AI response displays the source document(s) used for retrieval.

Example

```
Sources

• Attendance_Rules.pdf
• Fees_2025.pdf
```

---

# Database Collections

MongoDB Atlas stores

```
chat_history

chat_sessions

documents

feedback

analytics

active_sessions
```

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/yourusername/college-admin-faq-bot.git

cd college-admin-faq-bot
```

---

## 2. Backend Setup

Navigate to backend

```bash
cd backend
```

Create virtual environment

Windows

```bash
python -m venv venv
```

Activate

```bash
venv\Scripts\activate
```

Install packages

```bash
pip install -r requirements.txt
```

---

## 3. Frontend Setup

Open another terminal

```bash
cd frontend

npm install
```

---

# Environment Variables

## Backend (.env)

```
GOOGLE_API_KEY=

MONGO_URI=

CLERK_SECRET_KEY=

CLERK_ISSUER=
```

---

## Frontend (.env.local)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=
```

---

# Running the Project

## Start Backend

```bash
cd backend

uvicorn main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

## Start Frontend

```bash
cd frontend

npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

# Uploading Knowledge Base

Login as Admin

Navigate to

```
Admin Dashboard
```

Upload documents

The backend automatically

- Saves document
- Generates chunks
- Creates embeddings
- Stores vectors in ChromaDB

---

# Rebuilding Knowledge Base

Whenever documents are modified

Click

```
Rebuild Knowledge Base
```

This regenerates

- Chunks
- Embeddings
- Vector Database

---

# Sample Queries

```
What is the minimum attendance required?

What are the hostel fees?

When are the semester exams?

Show latest circulars.

Where is the examination office?
```

---

# Performance

Current implementation supports

- Concurrent user sessions
- Role-based access control
- Semantic search over 800+ knowledge-base chunks
- Source-backed responses
- Analytics dashboard
- Modular service architecture

---

# Future Improvements

- Redis embedding cache
- Streaming LLM responses
- Hybrid search (BM25 + Dense Retrieval)
- Docker deployment
- Kubernetes deployment
- CI/CD pipeline
- Multi-tenant knowledge bases
- Vector database migration to Pinecone/Qdrant
- Observability with Prometheus & Grafana

---

# Author

**Priyadharshini Kannan**

B.E. Computer Science & Engineering

IIT Madras BS in Data Science & Applications
