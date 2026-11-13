
import { useState } from "react";
import api from "../services/api";

function ReportItemForm({ onItemCreated, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "lost",
    category: "",
    location: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/items", formData);

      onItemCreated(response.data.item);
    } catch (err) {
      console.error("Failed to create item:", err);

      setError(
        err.response?.data?.message ||
          "Item report nahi ho paya. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">LOST & FOUND</p>
          <h3>Report an item</h3>
        </div>

        <button
          type="button"
          className="form-close"
          onClick={onCancel}
          aria-label="Close form"
        >
          ✕
        </button>
      </div>

      <label htmlFor="title">Item title</label>
      <input
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g. Black Wallet"
        required
      />

      <label htmlFor="type">Report type</label>
      <select
        id="type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
      >
        <option value="lost">I lost this item</option>
        <option value="found">I found this item</option>
      </select>

      <label htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="e.g. Accessories"
        required
      />

      <label htmlFor="location">Location</label>
      <input
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="e.g. College Library"
        required
      />

      <label htmlFor="date">Date</label>
      <input
        id="date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe the item and any identifying details..."
        rows={4}
        required
      />

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </form>
  );
}

export default ReportItemForm;
