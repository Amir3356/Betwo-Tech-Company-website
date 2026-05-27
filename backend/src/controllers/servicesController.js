import { pool } from "../config/db.js";

export async function getServices(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM services ORDER BY position ASC, id ASC"
    );
    return res.json({
      data: {
        hero: { title: "", highlightTitle: "", description: "", buttons: [], stats: [], image: "" },
        comprehensive: { title: "", description: "", services: result.rows },
        featureDeepDivesSection: { title: "", description: "" },
        featureDeepDives: [],
        process: { title: "", steps: [] },
      },
    });
  } catch (error) {
    console.error("Failed to load services:", error);
    return res.status(500).json({ message: "Failed to load services." });
  }
}
