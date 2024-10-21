import * as p from "@clack/prompts";

const cli = async () => {
  const group = await p.group(
    {
      projectName: () => {
        return p.text({
          message: "What is your Project Name? ",
          placeholder: "your next-project name",
          initialValue: "next-project",
        });
      },
      language: () => {
        return p.select({
          message: "What language  would you like to use?",
          options: [
            { value: "typeScript", label: "TypeScript (Recommend)" },
            { value: "javaScript", label: "JavaScript" },
          ],
          initialValue: "typeScript",
        });
      },
      styling: () => {
        return p.select({
          message: "Which styling package do you want to use?",
          options: [
            { value: "tailwind", label: "Tailwind" },
            { value: "none", label: "None" },
          ],
          initialValue: "tailwind",
        });
      },
      database: () => {
        return p.select({
          message: "What Database ORM you want to use?",
          options: [
            { value: "prisma", label: "Prisma" },
            { value: "drizzle", label: "Drizzle" },
            { value: "none", label: "None" },
          ],
          initialValue: "none",
        });
      },
      authProvider: () => {
        return p.select({
          message: "What authentication provider you want to use?",
          options: [
            { value: "next-Auth", label: "NextAuth.js" },
            { value: "clerk", label: "Clerk" },
            { value: "luciaAuth", label: "Lucia Auth" },
            { value: "none", label: "None" },
          ],
          initialValue: "none",
        });
      },
      package: () => {
        return p.select({
          message: "Which package manager you want to use?",
          options: [
            { value: "npm", label: "npm (Default choice)" },
            { value: "pnpm", label: "pnpm (Faster, more efficient)" },
            { value: "yarn", label: "yarn" },
            { value: "bun", label: "bun" },
          ],
          initialValue: "npm",
        });
      },
    },
    {
      // On Cancel callback that wraps the group
      // So if the user cancels one of the prompts in the group this function will be called
      onCancel: () => {
        p.cancel(
          "Oops! It seems like you cancelled the operation. If you need to start over, just run the command again."
        );
        process.exit(1);
      },
    }
  );
  return group;
};

export default cli;
