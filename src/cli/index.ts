import * as p from "@clack/prompts";
import chalk from "chalk";

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
      _: ({ results }) => {
        return results.language === "javaScript"
          ? p.note(chalk.redBright("We currently only support TypeScript. Please use TypeScript instead"))
          : undefined;
      },
      styling: () => {
        return p.confirm({
          message: "Would you like to include the Tailwindcss?",
          initialValue: true,
        });
      },
      componentLibrary: () => {
        return p.confirm({
          message: "Would you like to include the Shadcn/ui component library?",
          initialValue: true,
        });
      },
      databaseORM: () => {
        return p.select({
          message: "What Database ORM you want to use?",
          options: [
            { value: "none", label: "None" },
            { value: "prisma", label: "Prisma" },
            // { value: "drizzle", label: "Drizzle" },
          ],
          initialValue: "none",
        });
      },
      authProvider: () => {
        return p.select({
          message: "What authentication provider you want to use?",
          options: [
            { value: "none", label: "None" },
            { value: "next-auth", label: "NextAuth.js" },
            // { value: "clerk", label: "Clerk" },
            // { value: "luciaAuth", label: "Lucia Auth" },
          ],
          initialValue: "none",
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
