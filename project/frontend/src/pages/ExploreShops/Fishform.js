import { set } from "mongoose";
import React,{useState} from "react";

const AddFish = ({businessData,handleLogout}) => {
    const [fishName, setFishName] = useState({
        name: "",
        species: "",
        category: "",
        price: "",
        description: "",
        size: "",
        temperament: "",
        careLevel: "",
        imageUrl: "",
        stock: "",
        pH: "",
        temperature: "",
        hardness: ""
    });


    const [message,setMessage] = useState("");
    const [error,setError] = useState("");

    const handleAddFish = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const fishData = {
            ...fishName,
            price: parseFloat(fishName.price),
            stock: parseInt(fishName.stock),
            shopId: businessData._id,
            waterParameters: {
                pH: fishName.pH,
                temperature: fishName.temperature,
                hardness: fishName.hardness
            }
        };

        try{
            const response = await fetch("http://localhost:3000/api/fish",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fishData),
            });
            if(response.ok){
                setMessage("Fish added successfully!");
                setFishFrom({
                    name: "",
                    species: "",
                    category: "",
                    price: "",
                    description: "",
                    size: "",
                    temperament: "",
                    careLevel: "",
                    imageUrl: "",
                    stock: "",
                    pH: "",
                    temperature: "",
                    hardness: "",
                });
            }
            else{
                setError("Failed to add fish. Please try again.");
            }
        }catch(err){
            setError("Server error. Please try again later.");
        }
    };
}
return (
    <div className="add-fish-section">
        <div className="welcome-header">
            <h1>Welcome,{businessData?businessData.name:""}</h1>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <p className="subtitle">Add New fisdh to you inventory</p>

        <form onClick={handleAddFish} className="fish-form">
            <div className="form-group">
                <label>Fish Name</label>
                <input 
                    type="text"
                    value={fishName.name}
                    onChange={(e) => setFishName({ ...fishName, name: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Species</label>
                <input
                    type="text"
                    value={fishName.species}
                    onChange={(e) => setFishName({ ...fishName, species: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Price ($)</label>
                <input
                    type="text"
                    value={fishName.price}
                    onChange={(e) => setFishName({ ...fishName, price: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    value={fishName.description}
                    onChange={(e) => setFishName({ ...fishName, description: e.target.value })}
                />
            </div>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <button type="submit" className="submit-btn">Add Fish</button>
        </form>
    </div>
);


export default AddFish;