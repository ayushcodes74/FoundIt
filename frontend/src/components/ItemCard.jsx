
function ItemCard({ item, onResolve, onDelete }) {
  const formattedDate = new Date(item.date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }
  );

  return (
    <article className="item-card">
      <div className="item-card-top">
        <span className="item-category">{item.category}</span>

        <span className={`item-badge ${item.type}`}>
          {item.type.toUpperCase()}
        </span>
      </div>

      <h3>{item.title}</h3>

      <p className="item-description">{item.description}</p>

      <div className="item-details">
        <span>📍 {item.location}</span>
        <span>📅 {formattedDate}</span>
      </div>

      <p className="item-status">
        Status:{" "}
        {item.status.charAt(0).toUpperCase() +
          item.status.slice(1)}
      </p>

      <div className="item-actions">
        {item.status === "open" && (
          <button
            className="resolve-button"
            onClick={() => onResolve(item._id)}
          >
            Mark Resolved
          </button>
        )}

        <button
          className="delete-button"
          onClick={() => onDelete(item._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ItemCard;
