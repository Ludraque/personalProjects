import SearchBar from "./SearchBar";
import {useState, useEffect} from "react";
import AddItem from "./AddItem";
import ItemsDisplay from "./ItemsDisplay";

function App() {
    const [filters, setFilters] = useState({});
    const [data, setData] = useState({items: []});

    useEffect(() => {
        fetch("http://localhost:3000/items")
            .then((response) => response.json())
            .then((data) => setData({items: data}));
    }, []);

    const updateFilters = (searchParams) => {
        setFilters(searchParams);
    };

    const addItemToData = (item) => {
        let items = data["items"];

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(item)
        }
        fetch("http://localhost:3000/items", requestOptions).then((response) => response.json()).then((data) => {
            items.push(data);
            setData({items: items});
        });


    };

    const removeItemFromData = (item) => {
        const items = data["items"];
        const requestOptions = {
            method: "DELETE"
        };
        fetch(`http://localhost:3000/items/${item.id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    const index = items.indexOf(item);
                    items.splice(index, 1);
                    setData({items: items})
                }
            })
    }

    const filterData = (data) => {
        const filteredData = [];

        if (filters.name === "" && filters.price === 0 && filters.type === "" && filters.brand === "") {
            return data;
        }

        for (const item of data) {
            if (!item.name.includes(filters.name)) {
                continue;
            }
            if (filters.price !== 0 && filters.price !== "" && item.price > filters.price) {
                continue;
            }
            if (!item.type.includes(filters.type)) {
                continue;
            }
            if (!item.brand.includes(filters.brand)) {
                continue;
            }

            filteredData.push(item);
        }

        return filteredData;
    };

    return (
        <div className="App">
            <ItemsDisplay deleteItem={removeItemFromData} items={filterData(data["items"])}/>
            <SearchBar updateSearchParams={updateFilters}/>
            <AddItem addItemToData={addItemToData}/>
        </div>
    );
}

export default App;