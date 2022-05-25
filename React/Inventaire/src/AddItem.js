import {useState} from "react";

function AddItem(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");

    const addItemPressed = () => {
        props.addItemToData({name: name, price: price, type: type, brand: brand});
        setName("");
        setPrice(0);
        setType("");
        setBrand("");
    }

    return (
        <div>
            <h2>Add an item</h2>
            <form>
                <label htmlFor="name-field">Name:</label>
                <input
                    id="name-field"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="price-field">Price:</label>
                <input
                    id="price-field"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}/>
                <label htmlFor="type-field">Type:</label>
                <input
                    id="type-field"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}/>
                <label htmlFor="brand-field">Brand:</label>
                <input
                    id="brand-field"
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}/>
                <button type="button" onClick={addItemPressed}>AddItem</button>
            </form>
        </div>
    )
}

export default AddItem;