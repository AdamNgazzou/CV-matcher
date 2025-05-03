'use client'; // if you're using app directory in Next.js

import { postJob } from '@/services/post_job';
import { useState } from 'react';

const JobUploadForm = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the first selected file
    console.log("file",file)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      alert('Please fill all fields');
      return;
    }

    setUploading(true);
    try {
      const result = await postJob(title, file);
      console.log('Upload success:', result);
      alert('Job posted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error posting job');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded">
      <div>
        <label className="block font-semibold">Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Upload File (PDF, Doc, etc.)</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="border px-2 py-1 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Post Job'}
      </button>
    </form>
  );
};

export default JobUploadForm;