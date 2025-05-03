
export const fetchJobs = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/jobs/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};