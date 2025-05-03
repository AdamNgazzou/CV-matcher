===========================
CV MATCHER API ENDPOINTS
===========================

1. GET CV SCORES
----------------
URL:        http://127.0.0.1:8000/api/cv-scores
Method:     GET
Params:     job_id (integer)
Example:    http://127.0.0.1:8000/api/cv-scores?job_id=1
Description: Returns a list of CVs with their matching scores for the given job ID.


2. UPLOAD CV
------------
URL:        http://127.0.0.1:8000/api/cv-submit/
Method:     POST
Body Type:  Form Data
Fields:
    - candidate_name : string (e.g., "ilyess")
    - file           : file (e.g., cv.pdf)
    - job_post       : integer (e.g., 6)
Description: Submits a candidate CV to be evaluated against a specific job posting.


3. GET JOB DETAILS
------------------
URL:        http://127.0.0.1:8000/api/jobs/1
Method:     GET
Description: Retrieves detailed information about a single job posting by ID.


4. GET ALL JOBS
---------------
URL:        http://127.0.0.1:8000/api/jobs
Method:     GET
Description: Returns a list of all available job postings.


5. POST NEW JOB
---------------
URL:        http://127.0.0.1:8000/api/job-posts/
Method:     POST
Body Type:  Form Data
Fields:
    - title : string (e.g., "backendposition")
    - file  : file (e.g., doc.txt)
Description: Creates a new job posting with a title and job description document.