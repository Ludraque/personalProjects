function ItemsDisplay({items, deleteItem}) {

    const showItem = (item) => {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.type}</td>
                <td>{item.brand}</td>
                <td> <button onClick={() => deleteItem(item)}> Delete </button> </td>
            </tr>
        )
    }

    return (
        <div>
            <h2>Items</h2>
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Type</td>
                        <td>Brand</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {items.map(showItem)}
                </tbody>
            </table>
        </div>
    )
}

export default ItemsDisplay;