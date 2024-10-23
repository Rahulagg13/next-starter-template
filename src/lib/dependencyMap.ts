export const dependencyMap = {
  //prisma
  "@prisma/client": "^5.19.1",
  prisma: "^5.19.1",

  //shadcn
  "@radix-ui/react-icons": "^1.3.0",
  "class-variance-authority": "^0.7.0",
  "lucide-react": "^0.445.0",
  clsx: "^2.1.1",
  "tailwind-merge": "^2.5.2",
  "tailwindcss-animate": "^1.0.7",

  //next-auth
  "next-auth": "^4.24.8",
  "@auth/prisma-adapter": "^1.6.0",

  postcss: "^8.4.47",
  tailwindcss: "^3.4.12",

  typescript: "^5.6.2",
} as const;

export type AvailableDependencies = keyof typeof dependencyMap;
