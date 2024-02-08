// import React, { useState } from 'react';
import axios from 'axios';
import { useState } from 'react';

const WebScrapper = () => {
    const [url, setUrl] = useState('');
    const [param, setParam] = useState('');
    const [log, setLog] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const options = {
            method: 'GET',
            url: 'https://web-scrapper3.p.rapidapi.com/',
            params: {
                url: url,
                s: param
            },
            headers: {
                'X-RapidAPI-Key': 'e72c78f677msh5ec16d84062e2e7p1c67d2jsn45aadf8bfa32',
                'X-RapidAPI-Host': 'web-scrapper3.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setLog(JSON.stringify(response.data, null, 2));
        } catch (error) {
            setLog(`Error: ${error}`);
        }
    };

    return (
        <div className="web-scrapper">
            <h1>Web Scraper</h1>
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
                    value={param}
                    onChange={(e) => setParam(e.target.value)}
                    placeholder="Enter optional parameter"
                    className="input"
                />
                <button type="submit" className="submit-button">Send Request</button>
            </form>
            <div className="log">
                <pre>{log}</pre>
            </div>
        </div>
    );
}

export default WebScrapper;