export const postJob = async (title, file) => {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/job-posts/`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to post job");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error posting job:", error);
        throw error;
    }
};