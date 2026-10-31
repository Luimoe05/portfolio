export interface Project {
  slug: string;
  name: string;
  category: string;
  short: string;
  summary: string;
  highlights: string[];
  image: string;
  imageType: 'screenshot' | 'artwork';
  alt: string;
  source: string;
  live: string | null;
  role: string;
  context: string;
  stack: string[];
  problem: string;
  contribution: string;
  decisions: [title: string, body: string][];
  outcome: string;
  flow: string[];
  imageCaption: string;
}

export const projects: Project[] = [
  {
    slug: 'repo-ai', name: 'RepoAI', category: 'AI developer tool',
    short: 'A conversation with your codebase.',
    summary: 'Ask plain-English questions about a GitHub repository. Get answers grounded in the source.',
    highlights: [
      'I built RepoAI to help developers understand unfamiliar GitHub repositories by asking plain-English questions and receiving answers grounded in the source code.',
      'Created a retrieval-augmented generation pipeline that uses Tree-sitter to parse code into language-aware chunks, preserving structure for more relevant search results.',
      'Connected OpenAI embeddings with Pinecone vector storage to retrieve code related to each question and supply context for the generated answer.',
      'Built a React and TypeScript frontend backed by FastAPI ingestion and query endpoints, with modular services separating parsing, retrieval, and the interface.',
      'Added SlowAPI rate limiting, Pydantic-based environment configuration, and CORS handling, then deployed the frontend on Vercel and the backend on Render.'
    ],
    image: '/assets/repo-ai.jpg', imageType: 'screenshot',
    alt: 'RepoAI homepage with a GitHub repository input and the prompt: Ask it questions instead.',
    source: 'https://github.com/Luimoe05/repo-ai', live: 'https://repo-ai-six.vercel.app/',
    role: 'Full-stack development', context: 'Independent project',
    stack: ['React', 'TypeScript', 'FastAPI', 'OpenAI', 'Pinecone', 'Tree-sitter'],
    problem: 'Understanding an unfamiliar repository usually starts with a lot of searching. RepoAI gives developers another entry point: ask a question, then retrieve relevant context from the code itself.',
    contribution: 'I built the retrieval pipeline and the interface around it, connecting language-aware code parsing with semantic search and a question-and-answer workflow.',
    decisions: [
      ['Parse code as code.', 'Tree-sitter breaks repositories into language-aware chunks, giving retrieval more structure than arbitrary blocks of text.'],
      ['Find the relevant context.', 'OpenAI embeddings and Pinecone vector storage connect a natural-language question to semantically related source code.'],
      ['Connect the whole workflow.', 'FastAPI exposes ingestion and query endpoints to the React and TypeScript frontend. Modular services keep parsing, retrieval, and the interface separate.']
    ],
    outcome: 'The result is an end-to-end way to move from a repository URL to questions about its implementation, with rate limiting, environment configuration, and deployment on Vercel and Render.',
    flow: ['GitHub repository', 'Tree-sitter parsing', 'Pinecone retrieval', 'Grounded answer'],
    imageCaption: 'The live RepoAI homepage, captured October 2026.'
  },
  {
    slug: 'codifica', name: 'Codifica', category: 'Browser-based learning',
    short: 'Less setup. More learning.',
    summary: 'A multilingual coding environment that brings the editor, execution, and AI support into the browser.',
    highlights: [
      'Helped build Codifica from an idea into a deployed browser-based coding environment in ten weeks during my Salesforce FTL internship, using React, Node.js, Express, and PostgreSQL.',
      'Connected a CodeMirror editor to Judge0 for sandboxed code execution in three or more programming languages, letting learners write and run programs without local setup.',
      'Built a Gemini-powered multilingual tutor that explains code and supports learners in their own language, helping make programming more approachable for Spanish-speaking users.',
      'Refined API call patterns and prompt structure to reduce AI assistant response time by 35%, and improved the experience using feedback from more than 30 users.'
    ],
    image: '/assets/codifica.webp', imageType: 'artwork',
    alt: 'Codifica’s original iridescent purple C project artwork.',
    source: 'https://github.com/FTLSunstack/FTLCapstone', live: null,
    role: 'Software engineering intern', context: 'Salesforce FTL · 2025',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'CodeMirror', 'Judge0', 'Gemini'],
    problem: 'Learning to code can involve two barriers before the first program runs: local setup and language. Codifica was created to make programming more approachable for Spanish-speaking learners.',
    contribution: 'During my 2025 Salesforce internship, I helped build Codifica from an idea into a deployed PERN application over ten weeks, working with Heiryn Hernandez Rojas and Joanna Echeverri Porras.',
    decisions: [
      ['Run code without local setup.', 'A CodeMirror editor connects to Judge0 for sandboxed execution, supporting at least three programming languages directly in the browser.'],
      ['Make help multilingual.', 'A Gemini-powered tutor provides code explanations and learning support in the user’s language.'],
      ['Iterate with real feedback.', 'Feedback from 30+ users informed the experience. I refined API call patterns and prompt structure to improve the AI assistant’s response time.']
    ],
    outcome: 'Our team shipped a browser-based coding environment in ten weeks. My work on API patterns and prompts reduced AI assistant response time by 35%, as recorded in my internship results.',
    flow: ['Write in the browser', 'Run with Judge0', 'Ask the AI tutor', 'Learn in your language'],
    imageCaption: 'Original Codifica project artwork from the team repository. The former deployment is no longer available.'
  },
  {
    slug: 'creators-fiu', name: 'CreatorsFIU', category: 'Student marketplace',
    short: 'Built for the people on campus.',
    summary: 'A peer-to-peer marketplace connecting the FIU community, built with a team of seven student engineers.',
    highlights: [
      'Worked with seven student engineers in the INIT Build program to create a peer-to-peer marketplace where the FIU community can discover and exchange what students create.',
      'Developed the responsive homepage with React and Tailwind CSS, giving students a clear entry point to search and explore the marketplace across screen sizes.',
      'Built Firebase-backed authentication and cross-device data synchronization so users could sign in and maintain a consistent experience when switching devices.',
      'Authored more than 20 user stories to translate the marketplace idea into actionable sprint work, helping the team organize development ahead of its INIT Demo Day launch.'
    ],
    image: '/assets/creators-fiu.jpg', imageType: 'screenshot',
    alt: 'CreatorsFIU homepage featuring its blue and gold wordmark, marketplace search, and palm tree artwork.',
    source: 'https://github.com/CreatorsFIU-initBuild/demoDAY', live: null,
    role: 'Frontend & authentication', context: 'INIT Build · FIU',
    stack: ['React', 'Tailwind CSS', 'Firebase', 'MongoDB', 'Node.js', 'Express'],
    problem: 'CreatorsFIU gives the university community a dedicated place to discover and exchange what students create. The project brought a student marketplace from an idea to an INIT Demo Day launch.',
    contribution: 'As one of seven engineers in the INIT Build program, I developed the responsive homepage, built Firebase-backed authentication with cross-device data sync, and authored 20+ user stories to guide our sprints.',
    decisions: [
      ['Start with a clear entry point.', 'The React and Tailwind CSS homepage introduces the marketplace and gives students a direct path to search and explore.'],
      ['Keep identity consistent.', 'Firebase-backed authentication and cross-device synchronization support a continuous experience across devices.'],
      ['Give the team a shared scope.', '20+ user stories translated the marketplace idea into concrete development work and helped guide the team’s sprints.']
    ],
    outcome: 'The seven-person team launched CreatorsFIU at INIT Demo Day. My work focused on making the first visit, sign-in, and responsive experience work together.',
    flow: ['Discover the marketplace', 'Sign in with Firebase', 'Sync across devices', 'Connect with students'],
    imageCaption: 'The CreatorsFIU homepage image published in the project repository.'
  }
];
