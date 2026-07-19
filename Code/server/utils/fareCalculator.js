// Haversine formula to calculate distance (in km) between two lat/lng points
function getDistanceKm(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Simple estimated fare = baseFare + (distance * ratePerKm)
function calculateFare({ baseFare, ratePerKm, distanceKm, discountPercent = 0 }) {
  const rawFare = baseFare + ratePerKm * distanceKm;
  const discount = (rawFare * discountPercent) / 100;
  const finalFare = Math.max(rawFare - discount, 0);
  return {
    rawFare: Number(rawFare.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    finalFare: Number(finalFare.toFixed(2)),
  };
}

// Rough ETA in minutes assuming average city speed of 30 km/h
function estimateEtaMinutes(distanceKm, avgSpeedKmh = 30) {
  return Math.max(1, Math.round((distanceKm / avgSpeedKmh) * 60));
}

module.exports = { getDistanceKm, calculateFare, estimateEtaMinutes };
