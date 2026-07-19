const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const TEAM_ID = process.env.VERCEL_TEAM_ID;
const COMMIT_SHA = process.env.GITHUB_SHA;

if (!VERCEL_TOKEN || !PROJECT_ID || !TEAM_ID || !COMMIT_SHA) {
  console.error("Variables manquantes : VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_TEAM_ID, GITHUB_SHA.");
  process.exit(1);
}

const MAX_ATTEMPTS = 30;
const POLL_INTERVAL_MS = 15_000;

async function findDeployment() {
  const url = `https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&teamId=${TEAM_ID}&limit=20`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } });
  if (!response.ok) throw new Error(`Vercel API ${response.status}: ${await response.text()}`);
  const { deployments } = await response.json();
  return deployments.find((deployment: { meta?: { githubCommitSha?: string } }) => deployment.meta?.githubCommitSha === COMMIT_SHA);
}

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  const deployment = await findDeployment();

  if (deployment?.readyState === "READY") {
    console.log(`Déploiement Vercel prêt : ${deployment.url}`);
    process.exit(0);
  }

  if (deployment?.readyState === "ERROR" || deployment?.readyState === "CANCELED") {
    console.error(`Déploiement Vercel en échec (${deployment.readyState}), abandon.`);
    process.exit(1);
  }

  console.log(`Tentative ${attempt}/${MAX_ATTEMPTS} : déploiement ${deployment?.readyState ?? "introuvable"}, nouvelle vérification dans ${POLL_INTERVAL_MS / 1000}s.`);
  await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
}

console.error("Délai dépassé en attendant le déploiement Vercel.");
process.exit(1);
