import { useState } from 'react';
import axios from 'axios';

const DomainData = () => {
    const [domain, setDomain] = useState('');
    const [domainData, setDomainData] = useState(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const options = {
            method: 'GET',
            url: 'https://domain-and-keyword-metrics-seo-data-api.p.rapidapi.com/domain-data/',
            params: {
                domain: domain
            },
            headers: {
                'X-RapidAPI-Key': 'e72c78f677msh5ec16d84062e2e7p1c67d2jsn45aadf8bfa32',
                'X-RapidAPI-Host': 'domain-and-keyword-metrics-seo-data-api.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setDomainData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="domain-data">
            <h1>Domain Data</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain"
                    required
                    className="input"
                />
                <button type="submit" className="submit-button">Get Domain Data</button>
            </form>
            {domainData && (
                <div className="domain-data-result">
                    <pre>{JSON.stringify(domainData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default DomainData;