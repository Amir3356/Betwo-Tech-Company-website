import { pool } from "../config/db.js";

const defaultContent = {
  hero: {
    title: "Transform Your Business With",
    highlightTitle: "Custom Software Solutions",
    description: "We build practical, scalable software that streamlines your operations, automates workflows, and drives real business growth.",
    buttons: [{ text: "Start a Project", primary: true }, { text: "View Services", primary: false }],
    stats: [{ value: "3+", label: "Years Experience" }, { value: "150+", label: "Projects Completed" }, { value: "50+", label: "Happy Clients" }],
    image: "",
  },
  comprehensive: { title: "", description: "", services: [] },
  featureDeepDivesSection: { title: "", description: "" },
  featureDeepDives: [],
  process: { title: "", steps: [] },
};

async function readServices() {
  const result = await pool.query("SELECT content FROM services WHERE id = 1");
  if (result.rows.length === 0) return defaultContent;
  return result.rows[0].content || defaultContent;
}

async function writeServices(content) {
  await pool.query(
    "UPDATE services SET content = $1::jsonb, updated_at = NOW() WHERE id = 1",
    [JSON.stringify(content)]
  );
}

export async function getServices(req, res) {
  try {
    const content = await readServices();
    return res.json({ data: content });
  } catch (error) {
    console.error("Failed to load services content:", error);
    return res.status(500).json({ message: "Failed to load services content." });
  }
}

export async function updateServices(req, res) {
  const { hero, comprehensive, featureDeepDivesSection, featureDeepDives, process } = req.body || {};

  try {
    const current = await readServices();
    const nextContent = {
      hero: hero || current.hero,
      comprehensive: comprehensive || current.comprehensive,
      featureDeepDivesSection: featureDeepDivesSection || current.featureDeepDivesSection,
      featureDeepDives: featureDeepDives || current.featureDeepDives,
      process: process || current.process,
    };

    await writeServices(nextContent);
    return res.json({ message: "Services content updated.", data: nextContent });
  } catch (error) {
    console.error("Failed to update services content:", error);
    return res.status(500).json({ message: "Failed to update services content." });
  }
}

export async function addComprehensiveService(req, res) {
  const { title, description, points, icon } = req.body || {};

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  try {
    const current = await readServices();
    const services = Array.isArray(current.comprehensive?.services) ? [...current.comprehensive.services] : [];
    services.push({
      title: title.trim(),
      description: description.trim(),
      points: Array.isArray(points) ? points : [],
      icon: icon || "Code",
    });

    const nextContent = { ...current, comprehensive: { ...current.comprehensive, services } };
    await writeServices(nextContent);
    return res.status(201).json({ message: "Comprehensive service added.", data: nextContent });
  } catch (error) {
    console.error("Failed to add comprehensive service:", error);
    return res.status(500).json({ message: "Failed to add service." });
  }
}

export async function updateComprehensiveService(req, res) {
  const { index } = req.params;
  const serviceIndex = Number(index);
  const { title, description, points, icon } = req.body || {};

  if (!Number.isInteger(serviceIndex) || serviceIndex < 0) {
    return res.status(400).json({ message: "Invalid service index." });
  }

  try {
    const current = await readServices();
    const services = Array.isArray(current.comprehensive?.services) ? [...current.comprehensive.services] : [];

    if (!services[serviceIndex]) {
      return res.status(404).json({ message: "Service not found." });
    }

    services[serviceIndex] = {
      title: typeof title === "string" ? title.trim() : services[serviceIndex].title,
      description: typeof description === "string" ? description.trim() : services[serviceIndex].description,
      points: Array.isArray(points) ? points : services[serviceIndex].points,
      icon: icon || services[serviceIndex].icon,
    };

    const nextContent = { ...current, comprehensive: { ...current.comprehensive, services } };
    await writeServices(nextContent);
    return res.json({ message: "Comprehensive service updated.", data: nextContent });
  } catch (error) {
    console.error("Failed to update comprehensive service:", error);
    return res.status(500).json({ message: "Failed to update service." });
  }
}

export async function deleteComprehensiveService(req, res) {
  const { index } = req.params;
  const serviceIndex = Number(index);

  if (!Number.isInteger(serviceIndex) || serviceIndex < 0) {
    return res.status(400).json({ message: "Invalid service index." });
  }

  try {
    const current = await readServices();
    const services = Array.isArray(current.comprehensive?.services) ? [...current.comprehensive.services] : [];

    if (!services[serviceIndex]) {
      return res.status(404).json({ message: "Service not found." });
    }

    services.splice(serviceIndex, 1);
    const nextContent = { ...current, comprehensive: { ...current.comprehensive, services } };
    await writeServices(nextContent);
    return res.json({ message: "Comprehensive service deleted.", data: nextContent });
  } catch (error) {
    console.error("Failed to delete comprehensive service:", error);
    return res.status(500).json({ message: "Failed to delete service." });
  }
}

export async function addDeepDive(req, res) {
  const { title, description, features, benefits, tech, image, reverse } = req.body || {};
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }
  try {
    const current = await readServices();
    const deepDives = Array.isArray(current.featureDeepDives) ? [...current.featureDeepDives] : [];
    deepDives.push({
      title: title.trim(),
      description: description.trim(),
      features: Array.isArray(features) ? features : [],
      benefits: Array.isArray(benefits) ? benefits : [],
      tech: Array.isArray(tech) ? tech : [],
      image: image || "",
      reverse: !!reverse,
    });
    const nextContent = { ...current, featureDeepDives: deepDives };
    await writeServices(nextContent);
    return res.status(201).json({ message: "Deep dive added.", data: nextContent });
  } catch (error) {
    console.error("Failed to add deep dive:", error);
    return res.status(500).json({ message: "Failed to add deep dive." });
  }
}

export async function updateDeepDive(req, res) {
  const { index } = req.params;
  const diveIndex = Number(index);
  if (!Number.isInteger(diveIndex) || diveIndex < 0) {
    return res.status(400).json({ message: "Invalid deep dive index." });
  }
  try {
    const current = await readServices();
    const deepDives = Array.isArray(current.featureDeepDives) ? [...current.featureDeepDives] : [];
    if (!deepDives[diveIndex]) return res.status(404).json({ message: "Deep dive not found." });
    const { title, description, features, benefits, tech, image, reverse } = req.body || {};
    deepDives[diveIndex] = {
      title: typeof title === "string" ? title.trim() : deepDives[diveIndex].title,
      description: typeof description === "string" ? description.trim() : deepDives[diveIndex].description,
      features: Array.isArray(features) ? features : deepDives[diveIndex].features,
      benefits: Array.isArray(benefits) ? benefits : deepDives[diveIndex].benefits,
      tech: Array.isArray(tech) ? tech : deepDives[diveIndex].tech,
      image: typeof image === "string" ? image : deepDives[diveIndex].image,
      reverse: typeof reverse === "boolean" ? reverse : deepDives[diveIndex].reverse,
    };
    const nextContent = { ...current, featureDeepDives: deepDives };
    await writeServices(nextContent);
    return res.json({ message: "Deep dive updated.", data: nextContent });
  } catch (error) {
    console.error("Failed to update deep dive:", error);
    return res.status(500).json({ message: "Failed to update deep dive." });
  }
}

export async function deleteDeepDive(req, res) {
  const { index } = req.params;
  const diveIndex = Number(index);
  if (!Number.isInteger(diveIndex) || diveIndex < 0) {
    return res.status(400).json({ message: "Invalid deep dive index." });
  }
  try {
    const current = await readServices();
    const deepDives = Array.isArray(current.featureDeepDives) ? [...current.featureDeepDives] : [];
    if (!deepDives[diveIndex]) return res.status(404).json({ message: "Deep dive not found." });
    deepDives.splice(diveIndex, 1);
    const nextContent = { ...current, featureDeepDives: deepDives };
    await writeServices(nextContent);
    return res.json({ message: "Deep dive deleted.", data: nextContent });
  } catch (error) {
    console.error("Failed to delete deep dive:", error);
    return res.status(500).json({ message: "Failed to delete deep dive." });
  }
}

export async function addProcessStep(req, res) {
  const { number, title, description } = req.body || {};
  if (!number || !title || !description) {
    return res.status(400).json({ message: "Number, title, and description are required." });
  }
  try {
    const current = await readServices();
    const steps = Array.isArray(current.process?.steps) ? [...current.process.steps] : [];
    steps.push({ number: number.trim(), title: title.trim(), description: description.trim() });
    const nextContent = { ...current, process: { ...current.process, steps } };
    await writeServices(nextContent);
    return res.status(201).json({ message: "Process step added.", data: nextContent });
  } catch (error) {
    console.error("Failed to add process step:", error);
    return res.status(500).json({ message: "Failed to add process step." });
  }
}

export async function updateProcessStep(req, res) {
  const { index } = req.params;
  const stepIndex = Number(index);
  if (!Number.isInteger(stepIndex) || stepIndex < 0) {
    return res.status(400).json({ message: "Invalid step index." });
  }
  try {
    const current = await readServices();
    const steps = Array.isArray(current.process?.steps) ? [...current.process.steps] : [];
    if (!steps[stepIndex]) return res.status(404).json({ message: "Step not found." });
    const { number, title, description } = req.body || {};
    steps[stepIndex] = {
      number: typeof number === "string" ? number.trim() : steps[stepIndex].number,
      title: typeof title === "string" ? title.trim() : steps[stepIndex].title,
      description: typeof description === "string" ? description.trim() : steps[stepIndex].description,
    };
    const nextContent = { ...current, process: { ...current.process, steps } };
    await writeServices(nextContent);
    return res.json({ message: "Process step updated.", data: nextContent });
  } catch (error) {
    console.error("Failed to update process step:", error);
    return res.status(500).json({ message: "Failed to update process step." });
  }
}

export async function deleteProcessStep(req, res) {
  const { index } = req.params;
  const stepIndex = Number(index);
  if (!Number.isInteger(stepIndex) || stepIndex < 0) {
    return res.status(400).json({ message: "Invalid step index." });
  }
  try {
    const current = await readServices();
    const steps = Array.isArray(current.process?.steps) ? [...current.process.steps] : [];
    if (!steps[stepIndex]) return res.status(404).json({ message: "Step not found." });
    steps.splice(stepIndex, 1);
    const nextContent = { ...current, process: { ...current.process, steps } };
    await writeServices(nextContent);
    return res.json({ message: "Process step deleted.", data: nextContent });
  } catch (error) {
    console.error("Failed to delete process step:", error);
    return res.status(500).json({ message: "Failed to delete process step." });
  }
}
