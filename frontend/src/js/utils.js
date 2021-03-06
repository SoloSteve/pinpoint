import {cloneDeep, isObjectLike, merge as _merge} from "lodash";

export function getCookie(key) {
  let c = document.cookie, v = 0, cookies = {};
  if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
    c = RegExp.$1;
    v = 1;
  }
  if (v === 0) {
    c.split(/[,;]/).map(function (cookie) {
      let parts = cookie.split(/=/, 2),
        name = decodeURIComponent(parts[0].replace(/^\s+/, ""));
      cookies[name] = parts.length > 1 ? decodeURIComponent(parts[1].replace(/\s+$/, "")) : null;
    });
  } else {
    c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function ($0, $1) {
      cookies[$0] = $1.charAt(0) === '"'
        ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
        : $1;
    });
  }
  return cookies[key] || null;
}

/**
 * Returns the merged object or value
 */
export function merge(source, addition) {
  if (isObjectLike(addition) && isObjectLike(source)) {
    source = cloneDeep(source);
    return _merge(source, addition);
  } else {
    return addition;
  }
}

export function bearingTo(lat1, lng1, lat2, lng2) {
  let dLon = toRad(lng2 - lng1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);
  let y = Math.sin(dLon) * Math.cos(lat2);
  let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  let rad = Math.atan2(y, x);
  let bearing = toDeg(rad);
  return (bearing + 360) % 360;
}

export function distanceTo(lat1, lon1, lat2, lon2) {
  let R = 6371; // Radius of the earth in km
  let dLat = toRad(lat2 - lat1);  // Javascript functions in radians
  let dLon = toRad(lon2 - lon1);
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km
  return d * 1000;//In Meters
}

/**
 * @param lat: Latitude
 * @param lng: Longitude
 * @param distance: In meters
 * @param bearing: In degrees
 */
export function newPoint(lat, lng, distance, bearing) {
  const R = 6371;
  distance = distance / 1000;
  lat = toRad(lat);
  lng = toRad(lng);
  bearing = toRad(bearing);

  let latResult = Math.asin(
    Math.sin(lat) * Math.cos(distance / R)
    + Math.cos(lat) * Math.sin(distance / R) * Math.cos(bearing));
  let lngResult = lng + Math.atan2(Math.sin(bearing) * Math.sin(distance / R) * Math.cos(lat),
    Math.cos(distance / R) - Math.sin(lat) * Math.sin(latResult));

  return {
    lat: toDeg(latResult),
    lng: toDeg(lngResult)
  }
}

export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

export function describeArc(x, y, radius, startAngle, endAngle) {

  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

function toRad(deg) {
  return deg * Math.PI / 180;
}

function toDeg(rad) {
  return rad * 180 / Math.PI;
}