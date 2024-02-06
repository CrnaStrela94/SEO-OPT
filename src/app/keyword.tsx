import { useState } from 'react';
import axios from 'axios';

const KeywordAutosuggest = () => {
    const [keyword, setKeyword] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const options = {
            method: 'GET',
            url: 'https://keyword-autosuggest.p.rapidapi.com/autosuggest',
            params: { q: keyword },
            headers: {
                'X-RapidAPI-Key': 'e72c78f677msh5ec16d84062e2e7p1c67d2jsn45aadf8bfa32',
                'X-RapidAPI-Host': 'keyword-autosuggest.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setSuggestions(response.data.result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="keyword-autosuggest">
            <h1>Keyword Autosuggest</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword"
                    required
                    className="input"
                />
                <button type="submit" className="submit-button">Get Suggestions</button>
            </form>
            {suggestions.length > 0 && (
                <div className="suggestions">
                    <h2>Suggestions:</h2>
                    <ul>
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default KeywordAutosuggest;