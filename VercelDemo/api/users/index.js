export default async function handler(req, res) {
  res.status(200).json({ ok: true, msg: "function alive", type: process.env.TIDB_DATABASE || "no env" });
}
