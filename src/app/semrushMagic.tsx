import { useState } from 'react';
import axios from 'axios';

const SemrushMagic = () => {
    const [keyword, setKeyword] = useState('');
    const [country, setCountry] = useState('');
    const [overviewData, setOverviewData] = useState(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const options = {
            method: 'GET',
            url: 'https://semrush-magic-tool.p.rapidapi.com/keyword-Overview-Data',
            params: {
                keyword: keyword,
                country: country
            },
            headers: {
                'X-RapidAPI-Key': 'e72c78f677msh5ec16d84062e2e7p1c67d2jsn45aadf8bfa32',
                'X-RapidAPI-Host': 'semrush-magic-tool.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setOverviewData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="keyword-overview">
            <h1>Keyword Overview Semrush</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword"
                    required
                    className="input"
                />
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter country code ex: us, uk, in, etc."
                    required
                    className="input"
                />
                <button type="submit" className="submit-button">Get Overview Data</button>
            </form>
            {overviewData && (
                <div className="overview-data">
                    <pre>{JSON.stringify(overviewData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default SemrushMagic;