# Diabetes Research Intelligence Platform

An AI-powered research environment for medical professionals to upload scientific documents, clinical guidelines, research papers, and patient case studies. The platform leverages an Agentic RAG (Retrieval-Augmented Generation) architecture—inspired by PageIndex—to generate evidence-backed treatment approaches, research summaries, and clinical insights.

## Architecture

This platform utilizes a robust full-stack architecture:

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui.
- **Backend:** Node.js, Express.js, TypeScript.
- **Database:** MongoDB (via Mongoose) for structured data and document trees.
- **AI Agents (Stubs provided for custom LLM integration):**
  - **Document Understanding Agent:** Parses uploaded papers and builds hierarchical document trees.
  - **Research Retrieval Agent:** Navigates document nodes for section-level reasoning.
  - **Evidence Analysis Agent:** Evaluates study quality and outcomes.
  - **Treatment Comparison Agent:** Analyzes differing approaches and outputs comparisons.
  - **Research Report Agent:** Synthesizes literature reviews into a comprehensive report.

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/diabetes_research`) or a MongoDB Atlas URI.

## Installation & Setup

1. **Clone the repository.**
2. **Install dependencies for the Backend:**
   ```bash
   cd backend
   npm install
   ```
3. **Install dependencies for the Frontend:**
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

You will need two terminal instances to run the frontend and backend concurrently.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# The API will run on http://localhost:5000 (Configure PORT in backend/.env if needed)
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# The frontend will run on http://localhost:3000
```

## Security Best Practices Built-in

- **Authentication:** Stateless session management utilizing JWTs stored inside `HttpOnly`, `Secure` cookies.
- **XSS Prevention:** AI responses are strictly sanitized on the frontend using `DOMPurify` before being rendered as HTML.
- **File Upload Constraints:** Implemented using `multer` with strict validation against file sizes and allowed MIME types (PDF, DOCX, CSV, TXT), preventing unauthorized uploads.
- **Secure API Headers:** Enforced via backend middleware ensuring `Content-Security-Policy` and preventing clickjacking attacks.

## Usage

- Navigate to the **Research Dashboard** at `http://localhost:3000`.
- Explore parsed guidelines in the **Document Explorer**.
- Chat with the **AI Research Assistant** to perform RAG over the knowledge base.
- Evaluate clinical pathways in the **Evidence Graph**.
- Compare clinical recommendations in the **Treatment Intelligence** view.

---
*Note: This platform acts as a research assistant system, providing evidence-backed traceability for its inferences. It is not an autonomous medical decision-maker.*