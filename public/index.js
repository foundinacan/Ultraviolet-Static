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

	let frame = document.getElementById("uv-frame");
	frame.style.display = "block";
	let wispUrl = "wss://wisp-server-node-63ez.onrender.com/";
	if (await connection.getTransport() !== "/Ultraviolet-Static/epoxy/index.mjs") {
		await connection.setTransport("/Ultraviolet-Static/epoxy/index.mjs", [{ wisp: wispUrl }]);
	}
	frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});
