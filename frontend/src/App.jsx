
import { useEffect, useState } from "react";
import "./App.css";
import ItemCard from "./components/ItemCard";
import ReportItemForm from "./components/ReportItemForm";
import api from "./services/api";

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/items");
        setItems(response.data.items);
      } catch (err) {
        console.error("Failed to fetch items:", err);
        setError("Items load nahi ho paaye. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  async function handleResolveItem(id) {
    try {
      setActionError("");

      const response = await api.patch(`/items/${id}`, {
        status: "resolved",
      });

      setItems((previousItems) =>
        previousItems.map((item) =>
          item._id === id ? response.data.item : item
        )
      );
    } catch (err) {
      console.error("Failed to resolve item:", err);
      setActionError("Item update nahi hua. Please try again.");
    }
  }

  async function handleDeleteItem(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) return;

    try {
      setActionError("");

      await api.delete(`/items/${id}`);

      setItems((previousItems) =>
        previousItems.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error("Failed to delete item:", err);
      setActionError("Item delete nahi hua. Please try again.");
    }
  }

  const filteredItems = items.filter((item) => {
    return filter === "all" || item.type === filter;
  });

  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">
          FoundIt<span>.</span>
        </h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#items">Browse Items</a>
        </nav>

        <button
          className="report-button"
          onClick={() => setShowForm(true)}
        >
          + Report Item
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <p className="eyebrow">YOUR CAMPUS, CONNECTED</p>

          <h2>
            Lost something?
            <br />
            <span>Let's find it.</span>
          </h2>

          <p className="hero-description">
            A simple way to report lost belongings and help
            your campus community find what's missing.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => {
                document.getElementById("items")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Browse Items
            </button>

            <button
              className="secondary-button"
              onClick={() => {
                setFilter("lost");
                setShowForm(true);
              }}
            >
              Report Lost Item
            </button>
          </div>
        </section>

        <section className="items-section" id="items">
          <div>
            <p className="eyebrow">CAMPUS LOST & FOUND</p>
            <h2>Recently reported items</h2>
          </div>

          <div className="filter-buttons">
            <button
              className={filter === "all" ? "filter-active" : ""}
              onClick={() => setFilter("all")}
            >
              All Items
            </button>

            <button
              className={filter === "lost" ? "filter-active" : ""}
              onClick={() => setFilter("lost")}
            >
              Lost Items
            </button>

            <button
              className={filter === "found" ? "filter-active" : ""}
              onClick={() => setFilter("found")}
            >
              Found Items
            </button>
          </div>

          {showForm && (
            <ReportItemForm
              onCancel={() => setShowForm(false)}
              onItemCreated={(newItem) => {
                setItems((previousItems) => [
                  newItem,
                  ...previousItems,
                ]);

                setFilter("all");
                setShowForm(false);
                setActionError("");
              }}
            />
          )}

          {actionError && (
            <p className="form-error" role="alert">
              {actionError}
            </p>
          )}

          {loading ? (
            <p className="empty-message">Loading items...</p>
          ) : error ? (
            <div className="empty-message">
              <p role="alert">{error}</p>

              <button
                className="primary-button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : filteredItems.length === 0 ? (
            <p className="empty-message">
              No items found in this category.
            </p>
          ) : (
            <div className="items-grid">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onResolve={handleResolveItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
