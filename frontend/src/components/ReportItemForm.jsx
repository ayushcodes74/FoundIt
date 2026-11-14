import { useState } from "react";
import api from "../services/api";

function ReportItemForm({ onItemCreated, onCancel, initialType = "lost" }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: initialType || "lost",
    category: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
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
          "Item report nahi ho paya. Please check all fields and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="report-form-card" id="report-form-container">
      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <div className="form-heading-text">
            <span className="form-eyebrow">COMMUNITY NOTICE</span>
            <h3 className="form-title">
              {formData.type === "lost" ? "Report a Lost Item" : "Report a Found Item"}
            </h3>
            <p className="form-subtitle">
              Provide clear details to help locate and verify this item.
            </p>
          </div>

          <button
            type="button"
            className="form-close"
            onClick={onCancel}
            aria-label="Close form"
            title="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="form-error-alert" role="alert">
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
            <span>{error}</span>
          </div>
        )}

        <div className="form-body">
          <div className="form-group form-group-full">
            <label htmlFor="title">
              Item Title <span className="required-star">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Blue Dell Laptop Charger or Hydro Flask"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="type">
                Listing Type <span className="required-star">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="lost">Lost Item (I lost this)</option>
                <option value="found">Found Item (I found this)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">
                Category <span className="required-star">*</span>
              </label>
              <input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Electronics, Cards, Books, Keys"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">
                Location <span className="required-star">*</span>
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Science Library 2nd Floor, Room 204"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">
                Date <span className="required-star">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="description">
              Detailed Description <span className="required-star">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe color, brand, distinct scratches, keychains, stickers, or instructions for retrieval..."
              rows={4}
              required
            />
          </div>
        </div>

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
            className="primary-button submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="button-spinner" aria-hidden="true" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Report</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportItemForm;
