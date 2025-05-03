export const fetchScores = async (jobId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/cv-scores?job_id=${jobId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching scores:', error);
        throw error;
    }
};