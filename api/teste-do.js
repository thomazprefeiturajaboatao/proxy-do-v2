module.exports = async function handler(req, res) {
  try {
    const r = await fetch("https://backenddiariooficial.jaboatao.pe.gov.br/wp-json/wp/v2/posts?search=FGS&per_page=1");
    const status = r.status;
    const body = await r.text();
    res.json({ status, isJSON: body.startsWith("["), preview: body.substring(0, 200) });
  } catch (e) {
    res.json({ error: e.message });
  }
};
