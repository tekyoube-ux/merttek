import { apps } from "@/data/apps";
import { extensions } from "@/data/extensions";

type CommandContext = {
  pushLine: (content: string, type?: "output" | "input" | "error" | "info") => void;
  clear: () => void;
  navigate: (path: string) => void;
};

type Command = {
  name: string;
  description: string;
  usage: string;
  run(ctx: CommandContext, args: string[]): void;
};

const appSlugs = apps.map((app) => app.slug);
const extSlugs = extensions.map((ext) => ext.slug);

export function createCommands(navigate: (path: string) => void): Command[] {
  const helpCmd: Command = {
    name: "help",
    description: "Show available commands",
    usage: "help",
    run(ctx) {
      ctx.pushLine("AVAILABLE COMMANDS", "info");
      ctx.pushLine("  help        Show this help");
      ctx.pushLine("  home        Go to home");
      ctx.pushLine("  apps        List applications");
      ctx.pushLine("  extensions  List browser extensions");
      ctx.pushLine("  about       About Merttekinler.com");
      ctx.pushLine("  contact     Contact information");
      ctx.pushLine("  clear       Clear terminal");
      ctx.pushLine("  open <slug> Open app or extension");
    },
  };

  const homeCmd: Command = {
    name: "home",
    description: "Navigate home",
    usage: "home",
    run() {
      navigate("/");
    },
  };

  const appsCmd: Command = {
    name: "apps",
    description: "List applications",
    usage: "apps",
    run() {
      navigate("/apps");
    },
  };

  const extensionsCmd: Command = {
    name: "extensions",
    description: "List browser extensions",
    usage: "extensions",
    run() {
      navigate("/extensions");
    },
  };

  const aboutCmd: Command = {
    name: "about",
    description: "About this project",
    usage: "about",
    run() {
      navigate("/about");
    },
  };

  const contactCmd: Command = {
    name: "contact",
    description: "Contact information",
    usage: "contact",
    run() {
      navigate("/contact");
    },
  };

  const clearCmd: Command = {
    name: "clear",
    description: "Clear terminal output",
    usage: "clear",
    run(ctx) {
      ctx.clear();
    },
  };

  const openCmd: Command = {
    name: "open",
    description: "Open an app or extension",
    usage: "open <slug>",
    run(_ctx, args) {
      const slug = args[0];
      if (!slug) {
        _ctx.pushLine("Usage: open <slug>", "error");
        return;
      }
      if (appSlugs.includes(slug)) {
        navigate(`/apps/${slug}`);
        return;
      }
      if (extSlugs.includes(slug)) {
        navigate(`/extensions/${slug}`);
        return;
      }
      _ctx.pushLine(`Unknown item: ${slug}`, "error");
    },
  };

  return [helpCmd, homeCmd, appsCmd, extensionsCmd, aboutCmd, contactCmd, clearCmd, openCmd];
}
