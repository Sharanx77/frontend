import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async (type) => {
    const file = type === 'image' ? image : video;
    const formData = new FormData();
    formData.append(type, file);

    const endpoint = type === 'image' ? '/api/detect/image' : '/api/detect/video';

    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🪞 AI Mirror: Deepfake vs Reality</h1>

      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={() => handleUpload('image')} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Detect Image</button>

      <br /><br />

      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      <button onClick={() => handleUpload('video')} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Check Video Consistency</button>

      {result && (
        <pre className="mt-6 bg-gray-100 p-4 rounded text-sm">{result}</pre>
      )}
    </div>
  );
}
