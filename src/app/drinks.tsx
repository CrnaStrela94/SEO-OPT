import { useState } from 'react';
import axios from 'axios';

type Drink<T extends string | number | symbol> = {
    [key in T]: T | null;
} & {
    strDescription: T;
    strInstructions: T;
    strIngredient: T;
    strDrinkThumb: T;
    strDrink: T;
    strIngredientThumb: T;
};

const CocktailSearch = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<Drink<any>[]>([]);
    const [searchType, setSearchType] = useState('cocktail');

    const handleSearch = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        let url;
        switch (searchType) {
            case 'cocktail':
                url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
                break;
            case 'firstLetter':
                url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
                break;
            case 'random':
                url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
                break;
            default:
                url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
        }

        try {
            const response = await axios.get(url);
            setResults(response.data.drinks);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="body">
            <form className="form" onSubmit={handleSearch}>
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="cocktail">Cocktail</option>
                    <option value="firstLetter">First Letter</option>
                    <option value="random">Random</option>
                </select>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search"
                    required
                />
                <button type="submit">Search</button>
            </form>
            <div className="results-wrapper">
                {results && results.map((result, index) => (
                    <div key={index} className="result">
                        <h2>{result.strDrink}</h2>
                        <img src={result.strDrinkThumb} alt={result.strDrink} />
                        <p>{result.strInstructions}</p>
                        {Object.keys(result).map((key) => {
                            if (key.startsWith('strIngredient') && result[key]) {
                                return <p key={key}>{result[key]}</p>;
                            }
                            return null;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CocktailSearch;