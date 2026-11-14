function ItemCard({ item, onResolve, onDelete }) {
  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : "Date not specified";

  const isLost = item.type === "lost";
  const isResolved = item.status === "resolved";

  return (
    <article className={`item-card ${isResolved ? "item-card-resolved" : ""}`}>
      {/* Visual Placeholder Header */}
      <div className={`item-card-media ${item.type}`}>
        <div className="item-card-media-inner">
          <div className="media-placeholder-icon" aria-hidden="true">
            {isLost ? (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="12" />
                <line x1="11" y1="14" x2="11.01" y2="14" />
              </svg>
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            )}
          </div>
          <span className="media-placeholder-text">
            {isLost ? "Reported Lost" : "Found on Campus"}
          </span>
        </div>

        <div className="item-card-badges">
          <span className={`item-badge ${item.type}`}>
            <span className="badge-dot" aria-hidden="true" />
            {item.type.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="item-card-body">
        <div className="item-card-header">
          <span className="item-category">{item.category}</span>
          <span className={`status-pill ${item.status}`}>
            <span className="status-dot" aria-hidden="true" />
            {isResolved ? "Resolved" : "Open"}
          </span>
        </div>

        <h3 className="item-title" title={item.title}>
          {item.title}
        </h3>

        <p className="item-description">{item.description}</p>

        <div className="item-details">
          <div className="detail-item" title={item.location}>
            <svg
              className="detail-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{item.location}</span>
          </div>

          <div className="detail-item">
            <svg
              className="detail-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="item-actions">
          {item.status === "open" && (
            <button
              className="resolve-button"
              onClick={() => onResolve(item._id)}
              type="button"
              title="Mark this item as resolved"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Mark Resolved</span>
            </button>
          )}

          <button
            className="delete-button"
            onClick={() => onDelete(item._id)}
            type="button"
            title="Delete this listing"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;
