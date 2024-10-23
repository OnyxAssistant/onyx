const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

function loadNeuronManifest(neuronDir) {
  const configPath = path.join(neuronDir, "manifest.json");
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  }
  return null;
}

function getAllNeuronManifests() {
  const neuronsDir = path.join(
    process.cwd(),
    "packages",
    "neurons"
  );
  const manifests = [];

  for (const neuronName of fs.readdirSync(neuronsDir)) {
    const neuronDir = path.join(neuronsDir, neuronName);
    const manifest = loadNeuronManifest(neuronDir);
    if (manifest) {
      manifests.push(manifest);
    }
  }

  return manifests;
}

const schemas = [{ name: "core", path: "packages/db/prisma/schema.prisma" }];

// Get all neuron manifests
const neuronManifests = getAllNeuronManifests();

// Add neuron schemas to the schemas array
neuronManifests.forEach((manifest) => {
  const schemaPath = path.join(
    "packages",
    "neurons",
    manifest.slug,
    "prisma",
    "schema.prisma"
  );
  if (fs.existsSync(path.resolve(__dirname, "..", "..", schemaPath))) {
    schemas.push({ name: manifest.slug, path: schemaPath });
  }
});

schemas.forEach((schema) => {
  console.log(`Generating Prisma client for ${schema.name}...`);
  const schemaPath = path.resolve(__dirname, "..", "..", schema.path);
  execSync(`npx prisma generate --schema="${schemaPath}"`, {
    stdio: "inherit",
  });
});

console.log("All Prisma clients generated successfully!");
