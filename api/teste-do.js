const https = require("https");

module.exports = async function handler(req, res) {
  const url = "https://backenddiariooficial.jaboatao.pe.gov.br/wp-json/wp/v2/posts?search=FGS&per_page=1";

  try {
    const body = await new Promise((resolve, reject) => {
      const request = https.get(url, { rejectUnauthorized: false }, (response) => {
        let data = "";
        response.on("data", (chunk) => { data += chunk; });
        response.on("end", () => resolve({ status: response.statusCode, body: data }));
      });
      request.on("error", (e) => reject(e));
      request.setTimeout(10000, () => { request.destroy(); reject(new Error("Timeout")); });
    });

    res.json({
      status: body.status,
      isJSON: body.body.startsWith("[") || body.body.startsWith("{"),
      isCloudflare: body.body.includes("Just a moment"),
      preview: body.body.substring(0, 300),
    });
  } catch (e) {
    res.json({ error: e.message });
  }
};
