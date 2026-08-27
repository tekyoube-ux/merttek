import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mert Tekin.",
};

export default function ContactPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <ContactClient />
      </div>
    </section>
  );
}
