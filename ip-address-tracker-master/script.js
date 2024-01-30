import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ipForm = document.querySelector(".input-box");
const result = {
    ip: document.querySelector("#ip-address"),
    location: document.querySelector("#location"),
    timezone: document.querySelector("#timezone"),
    isp: document.querySelector("#isp"),
};
ipForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(ipForm);
    const inputData = data.get("ip");
    if(isValidIP(inputData))
        fetchIp(inputData,"");
    else if(isValidDomain(inputData))
        fetchIp("",inputData);
    else
        alert("Invalid IP Address / Domain");
});

const isValidIP = (ip) => {
    const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return regex.test(ip);
}

const isValidDomain = (domain) => {
    const regex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
    return regex.test(domain);
}

const IP_API = import.meta.env.VITE_IPIFY_API_KEY;
const fetchIp = async (ip="", domain="") => {
    const res = await fetch(
        `https://geo.ipify.org/api/v1?apiKey=${IP_API}&ipAddress=${ip}&domain=${domain}`
    );
    const data = await res.json();
    // console.log(data);
    if(data.code === 400 || data.isp === "")
        return alert("Invalid IP Address / Domain");
    result.ip.textContent = data.ip;
    result.location.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
    result.timezone.textContent = `UTC ${data.location.timezone}`;
    result.isp.textContent = data.isp;
    mapView.setView([data.location.lat, data.location.lng], 13);
    marker.setLatLng([data.location.lat, data.location.lng]);
};

const mapContainer = document.querySelector(".map-container");
const mapView = L.map(mapContainer, {
    center: L.latLng(0, 0),
    zoom: 13,
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mapView);

const icon = L.icon({
    iconUrl: "images/icon-location.svg",
    iconSize: [46, 56],
    iconAnchor: [23, 56],
});

const marker = L.marker([0, 0], { icon }).addTo(mapView);

window.onload = () => {
    fetchIp();
}