
import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const [restaurantName, setRestaurantName] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [message, setMessage] = useState("");

  // Load all restaurants
  const getAllRestaurants = async () => {
    try {
      const response = await api.get("/restaurant/GetAllRest");
      setRestaurants(response.data);
    } catch (error) {
      setMessage("Could not load restaurants.");
      console.error(error);
    }
  };

  // Load food items, optionally filtered by restaurant
  const getFoodItems = async (restaurantId = "") => {
    try {
      const url = restaurantId
        ? `/FoodItems/getfooditemsbyid/${restaurantId}`
        : "/FoodItems/getfooditem";

      const response = await api.get(url);
      setFoodItems(response.data);
    } catch (error) {
      setMessage("Could not load food items.");
      console.error(error);
    }
  };

  // Create restaurant
  const createRestaurant = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/restaurant/CreateRest", {
        name: restaurantName,
      });

      const newRestaurant = response.data;

      setRestaurantName("");
      setMessage("Restaurant created successfully!");

      await getAllRestaurants();

      // Automatically select the newly created restaurant
      if (newRestaurant.id != null) {
        setSelectedRestaurantId(String(newRestaurant.id));
      }
    } catch (error) {
      setMessage("Could not create restaurant.");
      console.error(error);
    }
  };

  // Create food item for the selected restaurant
  const createFoodItem = async (event) => {
    event.preventDefault();

    if (!selectedRestaurantId) {
      setMessage("Please select a restaurant first.");
      return;
    }

    try {
      await api.post("/FoodItems/Create", {
        item_name: itemName,
        item_price: Number(itemPrice),
        quantity: Number(quantity),
        restaurant: {
          id: Number(selectedRestaurantId),
        },
      });

      setItemName("");
      setItemPrice("");
      setQuantity("");

      setMessage("Food item created successfully!");

      // Refresh food items for the selected restaurant
      await getFoodItems(selectedRestaurantId);
    } catch (error) {
      setMessage("Could not create food item. Check the backend.");
      console.error(error);
    }
  };

  // Delete restaurant
  const deleteRestaurant = async (id) => {
    try {
      await api.delete(`/restaurant/Delres/${id}`);

      setMessage("Restaurant deleted successfully!");

      if (String(id) === selectedRestaurantId) {
        setSelectedRestaurantId("");
        setFoodItems([]);
      }

      await getAllRestaurants();
      await getFoodItems();
    } catch (error) {
      setMessage(
        "Could not delete restaurant. It may have food items linked to it."
      );
      console.error(error);
    }
  };

  useEffect(() => {
    getAllRestaurants();
    getFoodItems();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Restaurant Management</h1>
        <p>Manage restaurants and their food items.</p>
      </header>

      {message && <p className="message">{message}</p>}

      <section className="panel">
        <h2>Add Restaurant</h2>

        <form onSubmit={createRestaurant} className="form-row">
          <div className="input-group">
            <label htmlFor="restaurantName">Restaurant Name</label>
            <input
              id="restaurantName"
              type="text"
              placeholder="Enter restaurant name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
            />
          </div>

          <button type="submit">Create Restaurant</button>
        </form>
      </section>

      <section className="panel">
        <h2>All Restaurants</h2>

        <button
          type="button"
          className="secondary-button"
          onClick={getAllRestaurants}
        >
          Refresh Restaurants
        </button>

        {restaurants.length === 0 ? (
          <p className="empty-message">No restaurants found.</p>
        ) : (
          <ul className="item-list">
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <span className="item-name">
                  {restaurant.name} (ID: {restaurant.id})
                </span>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteRestaurant(restaurant.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel">
        <h2>Add Food Item</h2>

        <form onSubmit={createFoodItem} className="form-row">
          <div className="input-group">
            <label htmlFor="foodRestaurant">Select Restaurant</label>

            <select
              id="foodRestaurant"
              value={selectedRestaurantId}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedRestaurantId(id);
                getFoodItems(id);
              }}
              required
            >
              <option value="">-- Choose a restaurant --</option>

              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} (ID: {restaurant.id})
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="itemName">Food Name</label>
            <input
              id="itemName"
              type="text"
              placeholder="e.g. Chicken Biryani"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="itemPrice">Price</label>
            <input
              id="itemPrice"
              type="number"
              min="0"
              step="0.01"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <button type="submit">Create Food Item</button>
        </form>
      </section>

      <section className="panel">
        <h2>Food Items</h2>

        <button
          type="button"
          className="secondary-button"
          onClick={() => getFoodItems(selectedRestaurantId)}
        >
          Refresh Food Items
        </button>

        {foodItems.length === 0 ? (
          <p className="empty-message">No food items found.</p>
        ) : (
          <ul className="item-list">
            {foodItems.map((item) => (
              <li key={item.id}>
                <div>
                  <div className="item-name">{item.item_name}</div>
                  <div>Price: ₹{item.item_price}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>
                    Restaurant: {item.restaurant?.name ?? "Not specified"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
