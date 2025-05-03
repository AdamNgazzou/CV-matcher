export const fetchJobDetails = async (jobId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/jobs/${jobId}/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching job details:', error);
        throw error;
    }
};