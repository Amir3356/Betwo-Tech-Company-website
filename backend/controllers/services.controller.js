import { getAllServices } from "../models/services.model.js";

export async function getServices(req, res) {
  try {
    const services = await getAllServices();
    return res.json({
      data: {
        hero: { title: "", highlightTitle: "", description: "", buttons: [], stats: [], image: "" },
        comprehensive: { title: "", description: "", services },
        featureDeepDivesSection: { title: "", description: "" },
        featureDeepDives: [],
        process: {
          title: "How We Deliver Excellence",
          steps: [
            { number: "01", title: "Discovery & Strategy", description: "We begin by understanding your business needs, goals, and audience to craft a tailored strategy." },
            { number: "02", title: "Design & Prototyping", description: "Our team creates intuitive wireframes and beautiful interfaces that bring your vision to life." },
            { number: "03", title: "Development & Engineering", description: "We build scalable, robust solutions using cutting-edge technologies and best practices." },
            { number: "04", title: "Testing & QA", description: "Rigorous testing ensures your product is optimal, secure, perfectly seamless, and ready for launch." },
            { number: "05", title: "Deployment & Launch", description: "We handle the full deployment process, ensuring a seamless rollout to production environments." },
            { number: "06", title: "Support & Maintenance", description: "We provide ongoing support, continuous monitoring, and optimization to keep your product ahead." }
          ]
        },
      },
    });
  } catch (error) {
    console.error("Failed to load services:", error);
    return res.status(500).json({ message: "Failed to load services." });
  }
}
