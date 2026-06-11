import { createFileRoute } from "@tanstack/react-router";
import { Headphones, Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | LL Studio Music" },
      { name: "description", content: "Get in touch with LL Studio Music for ghost production inquiries, custom projects, and exclusive tracks." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Get in Touch</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Ready to acquire a track or have questions? Reach out directly &mdash; we respond within hours.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10">
              <Headphones className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">WhatsApp</h3>
              <p className="text-sm text-muted-foreground">Fastest response</p>
              <a
                href="https://wa.me/5575981109129"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-gold hover:underline"
              >
                +55 75 98110-9129
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10">
              <Mail className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Email</h3>
              <p className="text-sm text-muted-foreground">For detailed inquiries</p>
              <a
                href="mailto:llstudio.wav@gmail.com"
                className="mt-1 inline-block text-gold hover:underline"
              >
                llstudio.wav@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10">
              <Clock className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Response Time</h3>
              <p className="text-sm text-muted-foreground">
                We typically respond within a few hours during business hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10">
              <MapPin className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Online Worldwide</h3>
              <p className="text-sm text-muted-foreground">
                Serving DJs, labels, and artists globally.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Inquiry Form */}
        <div className="rounded-2xl border border-border/50 bg-card p-8">
          <h3 className="text-lg font-semibold text-foreground">Send a Quick Inquiry</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us what you're looking for and we'll get back to you.
          </p>

          <form
            action="mailto:llstudio.wav@gmail.com"
            method="post"
            encType="text/plain"
            className="mt-6 space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Your name or artist alias"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Tell us about the track(s) you're interested in or describe what you need..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-gold-muted"
            >
              Send Inquiry
            </button>
          </form>

          <div className="mt-6 border-t border-border/50 pt-6 text-center">
            <p className="text-sm text-muted-foreground">Prefer WhatsApp?</p>
            <a
              href="https://wa.me/5575981109129"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-surface-elevated"
            >
              <Headphones className="h-4 w-4 text-gold" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
