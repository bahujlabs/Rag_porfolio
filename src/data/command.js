import {
  FaUser,
  FaCode,
  FaServer,
  FaFolder,
  FaEnvelope,
  FaTerminal,
  FaMicrochip,
  FaLayerGroup,
  FaLinkedin,
  FaGithub,
  FaRobot,
  FaCreditCard,
  FaDocker,
  FaLock,
  FaRocket,
} from "react-icons/fa";

export const commands = {
  "/about": {
    icon: FaUser,
    answer: `
## About Me
I'm a **Fullstack & AI Systems Engineer** focused on building scalable web applications, backend systems, AI-powered products, and cloud deployments.
    `,
    sources: [],
  },

  "/skills": {
    icon: FaCode,
    answer: `
## Technical Skills

### Frontend
React, Tailwind CSS, Framer Motion, Figma

### Backend
Node.js, Express.js, JWT Auth, Clean Architecture, Redis, Rate Limiting

### AI
OpenAI API, RAG Pipelines, AI Chatbots

### DevOps
Docker, AWS EC2, Linux, GitHub Actions

### Database
MongoDB, PostgreSQL, Redis
    `,
    sources: [],
  },

  "/projects": {
    icon: FaFolder,
    answer: `
## Featured Projects
Here are some of my highlighted builds:
    `,
    projects: [
      /*   {
        icon: FaRobot,
        title: "AI Knowledge Base Chatbot for a School",
        description:
          "RAG-powered assistant with contextual document retrieval and AI responses.",
        demo: "https://icastschool.com/payment",
        github: "https://github.com/yourname/ai-knowledge-chatbot",
        tags: ["AI", "RAG", "Backend"],
      }, */
      {
        icon: FaCreditCard,
        title: "Payment Integration System",
        description:
          "Secure Paystack payment flow with verification and protected downloads.",
        /* demo: "https://icastschool.com/payment", */
        github: "https://github.com/yourname/payment-integration",
        tags: ["Payments", "Security"],
      },
      {
        icon: FaDocker,
        title: "Dockerized MERN Deployment",
        description:
          "Production-ready MERN deployment using Docker and AWS EC2.",
        demo: "https://iconicherbals.com",
        github: "https://github.com/yourname/dockerized-mern",
        tags: ["DevOps", "Docker"],
      },
      {
        icon: FaLock,
        title: "Secure Auth System",
        description: "JWT authentication + role-based access control system.",
        demo: "https://iconiherbals.com/register",
        github: "https://github.com/yourname/auth-system",
        tags: ["Auth", "Security"],
      },
      {
        icon: FaRocket,
        title: "Backend Performance System",
        description: "Redis caching + rate limiting for scalable APIs.",
        demo: "https://backend-demo.vercel.app",
        /* github: "https://github.com/yourname/backend-performance", */
        tags: ["Performance", "Caching"],
      },
    ],
    sources: [],
  },

  "/contact": {
    icon: FaEnvelope,
    answer: `## Contact`,
    links: [
      {
        icon: FaEnvelope,
        label: "awujbaba@gmail.com",
        href: "mailto:awujbaba@gmail.com@example.com",
      },
      {
        icon: FaLinkedin,
        label: "LinkedIn",
        href: "https://linkedin.com/in/yourname",
      },
      {
        icon: FaGithub,
        label: "GitHub",
        href: "https://github.com",
      },
    ],
    sources: [],
  },

  "/help": {
    icon: FaTerminal,
    answer: `
## Available Commands
- /about
- /skills
- /projects
- /contact
    `,
    sources: [],
  },
};
