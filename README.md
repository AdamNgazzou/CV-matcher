# CV Matcher RH Challenge (Version Avancée)

## Description

The CV Matcher Challenge is a project developed for the hackathon at IMSET. The goal of the project is to create an intelligent tool that can analyze job descriptions and automatically rank multiple CVs based on their relevance to the job. This tool is designed to automate the process of screening job applications to help recruiters streamline their workflow.

## Project Structure

- **Frontend**: Built with Next.js, React.js, and Tailwind CSS.
- **Backend**: Django with Python for processing the job descriptions and CVs.
- **Libraries/Technologies Used**:
  - **Frontend**: React.js, Next.js, Tailwind CSS
  - **Backend**: Django (Python), Natural Language Processing (NLP)

## Functional Requirements

1. The recruiter uploads a job description file (.txt or .pdf).
2. The recruiter uploads a list of CVs (between 5 to 10 candidates) in .txt or .pdf format.
3. The tool:
   - Extracts important keywords from the job description (skills, experience, tools, etc.).
   - Scans the CVs for these keywords.
   - Calculates a relevance score for each CV.
4. The tool displays a ranking of the candidates, from most to least relevant.
5. **Bonus**: The tool shows reasons for the score (detected or missing elements).

## Technical Constraints

- **Programming Languages**: Python, JavaScript, Java (or others).
- **NLP Techniques**: TF-IDF, Spacy, NLTK, or a similarity-based method like cosine similarity.

## Running the Project

### Prerequisites

- **Frontend**: Node.js and npm
- **Backend**: Python and Django

### Instructions

.env
NEXT_PUBLIC_BACKEND_API_URL="http://127.0.0.1:8000"

1. **Frontend Setup**:

   - Navigate to the `client` directory:
     ```bash
     cd client
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Run the development server:
     ```bash
     npm run dev
     ```
   - The frontend will be running on `http://localhost:3000`.

2. **Backend Setup**:
   - Navigate to the `server/cvmatcher-back` directory:
     ```bash
     cd server/cvmatcher-back
     ```
   - Install the required Python packages (you may need to create a virtual environment):
     ```bash
     pip install -r requirements.txt
     ```
   - Run the Django development server:
     ```bash
     python manage.py runserver
     ```
   - The backend will be running on `http://127.0.0.1:8000/`.

### How It Works

- The frontend allows recruiters to upload job descriptions and CVs. The backend processes the job description and CVs using NLP techniques to match keywords and calculate relevance scores.
- The results are displayed in a ranked list, showing the most relevant candidates at the top.

## Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Django, Python
- **NLP**: TF-IDF, Spacy, NLTK (or similar)

## Authors

- **Team Members**:
  - [Your Name](link-to-profile)
  - [Team Member Name](link-to-profile)

## License

This project is open source and available under the [MIT License](LICENSE).
