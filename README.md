
# 🚀 JD Intelligence (Full Stack AI SaaS)

JD Intelligence is an **AI-powered career intelligence platform** that analyzes job descriptions and career goals to extract:

- 🧠 Required & hidden skills
- 🎯 Recruiter expectations
- ❓ Interview questions
- 📈 Learning roadmaps
- 🛠 Career improvement guidance

It helps developers understand **what companies actually want**, not just what is written in job posts.

---

# 🧩 Why This Project?

Most job descriptions are:
- Vague
- Buzzword-heavy
- Missing real expectations

This project solves that by using AI to:

✔ Decode real hiring intent  
✔ Convert JD into structured skills  
✔ Generate learning roadmap  
✔ Help candidates become job-ready faster  

---

# 🏗️ Project Architecture

```

Frontend (React + TypeScript)
↓
Backend API (Hono + Bun)
↓
AI Layer (OpenAI GPT-4o-mini)
↓
Structured JSON Response
↓
Frontend UI Display

````

---

# 📁 Project Structure

```

root/
│
├── client/          # Frontend (React)
│   ├── src/
│   └── README.md
│
├── backend/         # Backend API (Hono + Bun)
│   ├── src/
│   └── README.md
│
└── README.md        # Main project documentation

````

---

# ⚙️ Tech Stack

## Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* Custom Hooks

## Backend

* Bun Runtime
* Hono Framework
* OpenAI API
* Zod Validation

---

# 🚀 Features

## 🧠 AI Job Analyzer

* Paste job description
* Get structured skill breakdown
* Detect hidden expectations

## 📊 Career AI Engine

* Career roadmap generation
* Learning path suggestions
* Project recommendations

## 🎯 Smart Insights

* Must-have skills
* Interview questions
* Red flags in job roles

---

# 🧑‍💻 How It Works

1. User pastes job description
2. Frontend sends request to backend
3. Backend sends prompt to OpenAI
4. AI returns structured JSON
5. Frontend displays results in UI cards

---

# 🔌 API Flow

```
POST /api/v1/jd/analyze
```

### Request:

```json id="req1"
{
  "job_description": "React developer with TypeScript experience..."
}
```

### Response:

```json id="res1"
{
  "must_have_skills": ["React", "TypeScript"],
  "hidden_expectations": ["fast execution", "ownership mindset"],
  "interview_questions": ["React hooks", "state management"]
}
```

---

# ▶️ Getting Started

## 1. Clone Repo

```bash id="clone"
git clone https://github.com/shivarawart/-SAAS-JD.git
```

---

## 2. Backend Setup

```bash id="backend"
cd backend
bun install
bun run dev
```

Create `.env`:

```env id="env1"
OPENAI_API_KEY=your_key_here
PORT=3000
```

---

## 3. Frontend Setup

```bash id="frontend"
cd client
npm install
npm run dev
```

---

## 4. Run Project

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:3000`

---

# 🎯 What Makes This Project Special

Unlike normal JD tools, this project:

* Thinks like a **FAANG recruiter**
* Extracts **hidden expectations**
* Builds **career roadmap automatically**
* Helps users **become job-ready faster**

---

# 📈 Future Improvements

* 🔐 Authentication system
* 💾 Save career history
* 📄 Export PDF reports
* 💬 AI chat assistant mode
* 📊 User dashboard analytics
* 🌐 Deploy full SaaS platform

---

# 👨‍💻 Developer

**Shiva**

* GitHub: [https://github.com/shivarawart/-SAAS-JD.git](https://github.com/shivarawart/-SAAS-JD.git)
* Type: AI SaaS Learning Project
* Status: In Development 🚧

---

# ⭐ Goal of This Project

To build a **real-world AI SaaS product** that helps developers:

* Understand job market demands
* Improve technical skills
* Prepare for interviews
* Build better careers

---

# 📄 License

This project is for educational and portfolio purposes.

---

⭐ If you like this project, give it a star on GitHub!

```

If you want next upgrade, I can help you:

- 🔥 :contentReference[oaicite:0]{index=0}
- 🔥 :contentReference[oaicite:1]{index=1}
- 🔥 :contentReference[oaicite:2]{index=2}
- 🔥 Or :contentReference[oaicite:3]{index=3}

Just tell me 👍
```
