export const postApplyJob = async (candidate_name, file, job_post) => {
    try {
        const formData = new FormData();
        formData.append("candidate_name", candidate_name);
        formData.append("file", file);
        formData.append("job_post", job_post);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/cv-submit/`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to post apply job");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error posting apply job:", error);
        throw error;
    }
};