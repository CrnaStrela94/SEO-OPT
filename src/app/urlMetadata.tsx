import { useState } from 'react';
import axios from 'axios';

const UrlMetadata = () => {
    const [url, setUrl] = useState('');
    const [includeSource, setIncludeSource] = useState('');
    const [metadata, setMetadata] = useState(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const options = {
            method: 'GET',
            url: 'https://url-metadata-opengraph.p.rapidapi.com/parse',
            params: {
                url: url,
                includeSource: includeSource
            },
            headers: {
                'X-RapidAPI-Key': 'e72c78f677msh5ec16d84062e2e7p1c67d2jsn45aadf8bfa32',
                'X-RapidAPI-Host': 'url-metadata-opengraph.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setMetadata(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="url-metadata">
            <h1>URL Metadata</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                    required
                    className="input"
                />
                <input
                    type="text"
                    value={includeSource}
                    onChange={(e) => setIncludeSource(e.target.value)}
                    placeholder="Include Source (true/false)"
                    className="input"
                />
                <button type="submit" className="submit-button">Get Metadata</button>
            </form>
            {metadata && (
                <div className="metadata">
                    <pre>{JSON.stringify(metadata, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default UrlMetadata;