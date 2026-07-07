const TYPE_LABELS = {
  mini: "Mini",
  sedan: "Sedan",
  suv: "SUV",
  bike: "Bike",
  auto: "Auto",
};

export default function CabCard({ cab, selected, onSelect }) {
  return (
    <button
      className={`cab-card ${selected ? "cab-card--selected" : ""}`}
      onClick={() => onSelect(cab)}
      type="button"
    >
      <div className="cab-card__type">{TYPE_LABELS[cab.type] || cab.type}</div>
      <div className="cab-card__details">
        <span>{cab.pickupEtaMinutes} min away</span>
        <span>★ {cab.rating}</span>
      </div>
      <div className="cab-card__fare">₹{cab.estimatedFare}</div>
    </button>
  );
}
