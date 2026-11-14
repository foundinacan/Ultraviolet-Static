"use strict";
const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");
const connection = new BareMux.BareMuxConnection("/Ultraviolet-Static/baremux/worker.js");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		throw err;
	}

	const url = search(address.value, searchEngine.value);

	const frame = document.getElementById("uv-frame");
	frame.style.display = "block";

	// wisp-server-node conventionally exposes its WebSocket endpoint at /wisp/.
	const wispUrl = "wss://wisp-server-node-63ez.onrender.com/wisp/";
	await connection.setTransport("/Ultraviolet-Static/epoxy/index.mjs", [{ wisp: wispUrl }]);

	frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});
