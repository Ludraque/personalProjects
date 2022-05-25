import {useState} from "react";

function SearchBar(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");

    const searchButtonPressed = () => {
        props.updateSearchParams({name: name, price: price, type: type, brand: brand});
    }

    return (
        <div>
            <h2>Search for an item</h2>
            <form>
                <section><label htmlFor="name-field">Name:</label>
                    <input
                        id="name-field"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/></section>
                <section><label htmlFor="price-field">Max Price:</label>
                    <input
                        id="price-field"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}/></section>
                <section><label htmlFor="type-field">Type:</label>
                    <input
                        id="type-field"
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}/></section>
                <section><label htmlFor="brand-field">Brand:</label>
                    <input
                        id="brand-field"
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}/></section>
                <button type="button" onClick={searchButtonPressed}>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;