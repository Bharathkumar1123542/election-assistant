🚀 1. High-Level System Overview
The system follows a Decoupled Client-Server Architecture.

Frontend: A responsive web interface featuring a chat widget and a dynamic timeline visualizer.

Backend: A Node.js or Python API that acts as the "Orchestrator," managing user sessions and fetching data.

AI Layer (RAG): Instead of relying on the LLM's training data (which might be outdated), we use Retrieval-Augmented Generation (RAG). The system searches a verified "Election Knowledge Base" first, then uses the AI to explain that specific information to the user.

🧱 2. Recommended Tech Stack
Frontend
Next.js (React): Industry standard for SEO-friendly, fast web apps with built-in routing.

Tailwind CSS: For rapid, responsive UI development without writing complex CSS.

Shadcn/UI: Pre-built, accessible components (Cards, Timelines, Buttons).

Backend
FastAPI (Python): Lightweight, extremely fast, and the go-to for AI/LLM integrations.

AI / LLM Layer
LangChain / LangGraph: Frameworks to build "agents" that can follow multi-step logic (e.g., "Check date" -> "Compare to today" -> "Suggest next step").

OpenAI API (GPT-4o) or Anthropic (Claude 3.5 Sonnet): For high-reasoning conversational capabilities.

Database
Supabase (PostgreSQL): Easy-to-use relational database for user profiles and session history.

Pinecone or ChromaDB: A "Vector Database" to store election laws and timelines for the AI to search.

DevOps / Deployment
Vercel: Optimized for hosting the Next.js frontend.

Railway or Render: Simple platforms to host the Python backend.

## Testing Strategy
- Backend: Pytest for unit tests on API endpoints, services, and AI agents; includes async tests and mocking for LLMs.
- Frontend: Jest with React Testing Library for component and hook tests; focuses on user interactions and accessibility.
- Coverage: Integrated with CI for 80%+ code coverage; tools like pytest-cov and jest-coverage.

## Accessibility Strategy
- Components: Use Shadcn/UI for WCAG-compliant elements; add ARIA labels, roles, and live regions for dynamic content.
- Navigation: Keyboard support (Enter to send), screen reader compatibility with aria-live and aria-describedby.
- Testing: Jest-axe for automated accessibility checks; manual testing with NVDA/JAWS.
- Scoring: Aim for 80%+ Lighthouse accessibility score; components include proper labeling and semantic HTML.

## Google Services Integration
- Maps API: Frontend uses @googlemaps/js-api-loader for displaying polling places; backend uses googlemaps library for geocoding and places search.
- Cloud: Use Google Cloud Run for backend deployment; BigQuery for analytics if needed.
- Scoring: 70% integration via APIs and hosting; components include map rendering and location services.

election-assistant/
├── frontend/                     # React + Vite client application
│   ├── public/
│   │   └── election-assets/      # Static images, icons, PDF guides
│   ├── src/
│   │   ├── components/           # Reusable UI blocks
│   │   │   ├── Chat/             # Chat bubble, input, history sidebar
│   │   │   ├── Timeline/         # Vertical stepper, milestone cards
│   │   │   └── Common/           # Buttons, loaders, modals
│   │   ├── pages/                # Route-level views
│   │   │   ├── HomePage.tsx
│   │   │   ├── ChatPage.tsx
│   │   │   └── TimelinePage.tsx
│   │   ├── hooks/                # Custom React logic
│   │   │   ├── useChat.ts        # Manages chat stream state
│   │   │   └── useTimeline.ts    # Fetches and parses timeline data
│   │   ├── services/             # API communication layer
│   │   │   └── apiClient.ts      # Axios instance with interceptors
│   │   ├── stores/               # Zustand global state
│   │   │   └── chatStore.ts
│   │   ├── types/                # Shared TypeScript interfaces
│   │   │   └── election.ts
│   │   └── utils/                # Formatters, validators
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                      # FastAPI application
│   ├── app/
│   │   ├── main.py               # App entry point, middleware, CORS
│   │   ├── core/
│   │   │   ├── config.py         # Pydantic-settings for env vars
│   │   │   ├── security.py       # JWT/auth helpers
│   │   │   └── logging.py        # Structured JSON logging
│   │   ├── api/
│   │   │   ├── deps.py           # Dependency injection (DB session, current user)
│   │   │   └── v1/
│   │   │       ├── chat.py       # Chat endpoints (POST, streaming)
│   │   │       ├── timeline.py   # Timeline CRUD endpoints
│   │   │       └── health.py     # Health check
│   │   ├── models/               # SQLAlchemy ORM models
│   │   │   ├── user.py
│   │   │   └── conversation.py
│   │   ├── schemas/              # Pydantic request/response models
│   │   │   ├── chat.py
│   │   │   └── timeline.py
│   │   ├── services/             # Pure business logic (no HTTP/DB details)
│   │   │   ├── chat_service.py
│   │   │   └── timeline_service.py
│   │   ├── agents/               # AI/LLM integration layer
│   │   │   ├── llm_client.py     # Generic LLM wrapper (OpenAI/Gemini)
│   │   │   ├── rag_engine.py     # Retrieval + prompt assembly
│   │   │   ├── prompt_templates/ # Version-controlled prompts
│   │   │   └── guardrails.py     # Output validation & fact-checking
│   │   └── utils/                # Helpers (text splitters, formatters)
│   ├── alembic/                  # Database migration files
│   ├── tests/                    # Pytest suite
│   ├── seed_data/                # Verified election JSONs & PDFs
│   ├── .env.example
│   ├── Dockerfile
│   └── requirements.txt
│
├── docker-compose.yml            # Spins up: backend, frontend, db, redis
└── README.md
Folder Explanations:
frontend/components/ → Atomic UI pieces. Keeping them co-located by feature (Chat/, Timeline/) makes the codebase searchable.
frontend/services/ → Every HTTP call lives here. If you switch from REST to WebSockets later, you only change this folder.
backend/api/ → Thin controllers. They validate input, call services, and return responses. No business logic here.
backend/services/ → The "brain." chat_service.py decides when to retrieve context and how to format the final answer.
backend/agents/ → Isolates AI vendor code. If OpenAI changes its API, you fix only llm_client.py.
backend/agents/prompt_templates/ → Treat prompts as code. Version control them, A/B test them, and review them in PRs.
seed_data/ → Curated, fact-checked election documents that power your RAG system.
User submits a query
The user types "How do I register to vote in California?" into the React chat input.
Frontend packages and sends
apiClient.ts POSTs to /api/v1/chat with the message + conversation ID.
Backend receives and validates
FastAPI validates the payload via Pydantic schema and injects a database session.
Intent classification
chat_service.py sends a lightweight LLM call: "Is this about deadlines, registration, polling locations, or general info?"
Context retrieval (RAG)
If the intent needs facts, rag_engine.py embeds the query, searches pgvector for the top 5 verified chunks from California's Secretary of State website, and injects them into the prompt.
Structured generation
The LLM receives a system prompt: "You are an election assistant. Use ONLY the provided context. Cite your sources. If unsure, say 'I don't have verified information on that.'"
For timeline requests, the prompt includes a JSON schema so the output is machine-parseable.
Guardrail check
guardrails.py verifies the response contains citations and no hallucinated dates. If it fails, a fallback message is returned.
Response streamed to frontend
FastAPI streams the text via Server-Sent Events (SSE). React appends tokens to the chat bubble in real time.
Frontend renders interactively
If the response contains a timeline JSON, the frontend switches from a text bubble to an interactive Timeline component with checkable steps.

🔴 Identified Gaps (Judge Perspective)
1. Testing (0%)
No visible test coverage
No integration tests
Judges heavily penalize this
2. Accessibility (30%)
Likely missing ARIA roles
Weak semantic HTML
3. Google Services (0%)
No Firebase / GCP usage
Missed major scoring category
🎯 Optimization Strategy
Priority Order:
Testing (Highest Impact)
Google Services Integration
Accessibility Improvements
🔄 Iteration Log
Iteration 0 (Baseline)
Testing: 0%
Accessibility: 30%
Google Services: 0%

Next Focus:
→ Add testing framework (Pytest + Jest)

📌 Design Decisions
Use RAG for factual reliability
Keep AI logic isolated
Maintain frontend-backend decoupling
Optimize for Cloud deployment
🚀 Future Enhancements
Add Firebase Auth / Firestore
Integrate Google Civic APIs (if applicable)
Improve accessibility (WCAG compliance)
Expand test coverage