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
  const [formType, setFormType] = useState("lost");

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/items");
        setItems(response.data.items || []);
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

  function handleOpenForm(type = "lost") {
    setFormType(type);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("report-form-container")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  const filteredItems = items.filter((item) => {
    return filter === "all" || item.type === filter;
  });

  const totalCount = items.length;
  const lostCount = items.filter((i) => i.type === "lost").length;
  const foundCount = items.filter((i) => i.type === "found").length;

  return (
    <div className="app">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <a href="#home" className="logo" aria-label="FoundIt Home">
            <span className="logo-icon" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <span className="logo-text">
              FoundIt<span className="logo-dot">.</span>
            </span>
          </a>

          <nav className="navbar-nav">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#items" className="nav-link">
              Browse Items
            </a>
          </nav>

          <button
            className="report-button"
            onClick={() => handleOpenForm("lost")}
            type="button"
          >
            <span className="button-icon" aria-hidden="true">+</span>
            <span>Report Item</span>
          </button>
        </div>
      </header>

      <main id="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-pattern-bg" aria-hidden="true" />
          <div className="hero-content">
            <h2 className="hero-title">
              Lost something?
              <br />
              <span className="hero-title-accent">Let's help you find it.</span>
            </h2>

            <p className="hero-description">
              A simple way to report lost belongings and help your campus community find what's missing.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => {
                  document.getElementById("items")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                type="button"
              >
                Browse Items
              </button>

              <button
                className="secondary-button"
                onClick={() => handleOpenForm("lost")}
                type="button"
              >
                Report Lost Item
              </button>

              <button
                className="secondary-button"
                onClick={() => handleOpenForm("found")}
                type="button"
              >
                Report Found Item
              </button>
            </div>
          </div>
        </section>

        {/* Recently Reported Items Section */}
        <section className="items-section" id="items">
          <div className="items-section-header">
            <div className="items-title-group">
              <span className="section-eyebrow">CAMPUS LOST & FOUND</span>
              <h2 className="section-heading">Recently reported items</h2>
              <p className="section-subheading">
                Browse through active and resolved listings across campus.
              </p>
            </div>

            <div className="filter-buttons" role="tablist" aria-label="Filter items">
              <button
                className={`filter-tab ${filter === "all" ? "filter-active" : ""}`}
                onClick={() => setFilter("all")}
                type="button"
                role="tab"
                aria-selected={filter === "all"}
              >
                All Items
                <span className="filter-count">{totalCount}</span>
              </button>

              <button
                className={`filter-tab ${filter === "lost" ? "filter-active" : ""}`}
                onClick={() => setFilter("lost")}
                type="button"
                role="tab"
                aria-selected={filter === "lost"}
              >
                Lost Items
                <span className="filter-count">{lostCount}</span>
              </button>

              <button
                className={`filter-tab ${filter === "found" ? "filter-active" : ""}`}
                onClick={() => setFilter("found")}
                type="button"
                role="tab"
                aria-selected={filter === "found"}
              >
                Found Items
                <span className="filter-count">{foundCount}</span>
              </button>
            </div>
          </div>

          {/* Report Item Form */}
          {showForm && (
            <ReportItemForm
              initialType={formType}
              onCancel={() => setShowForm(false)}
              onItemCreated={(newItem) => {
                setItems((previousItems) => [newItem, ...previousItems]);
                setFilter("all");
                setShowForm(false);
                setActionError("");
              }}
            />
          )}

          {/* Action Error Banner */}
          {actionError && (
            <div className="form-error-banner" role="alert">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{actionError}</span>
            </div>
          )}

          {/* Items Content: Loading / Error / Empty / Grid */}
          {loading ? (
            <div className="empty-message-container">
              <div className="loading-spinner" aria-hidden="true" />
              <p className="loading-text">Loading campus items...</p>
            </div>
          ) : error ? (
            <div className="empty-message-container error-state">
              <div className="empty-state-icon" aria-hidden="true">
                ⚠️
              </div>
              <p role="alert" className="empty-title">
                {error}
              </p>
              <p className="empty-description">
                Could not connect to the backend server. Make sure the server is running.
              </p>
              <button
                className="primary-button"
                onClick={() => window.location.reload()}
                type="button"
              >
                Try Again
              </button>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="empty-message-container">
              <div className="empty-state-icon" aria-hidden="true">
                🔍
              </div>
              <p className="empty-title">No items found</p>
              <p className="empty-description">
                No items have been reported in this category yet.
              </p>
              <button
                className="primary-button"
                onClick={() => handleOpenForm(filter === "found" ? "found" : "lost")}
                type="button"
              >
                + Report an Item
              </button>
            </div>
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
