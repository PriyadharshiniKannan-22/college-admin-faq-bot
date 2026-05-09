"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Bot,
  GraduationCap,
  ArrowRight,
  BrainCircuit,
  FileText,
  ShieldCheck,
  WandSparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Academic Guidance",
    description:
      "Get instant answers for academics, exams, regulations, and college workflows.",
  },
  {
    icon: FileText,
    title: "Smart Knowledge Search",
    description:
      "Search policies, circulars, syllabi, and notices using AI-powered retrieval.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Responses",
    description:
      "Answers grounded in official institutional documents and trusted sources.",
  },
  {
    icon: WandSparkles,
    title: "Premium AI Experience",
    description:
      "A futuristic student assistant designed with elegance, speed, and clarity.",
  },
];

export default function PremiumLandingPage() {
  const router = useRouter();

  const { user, isSignedIn } = useUser();
  useEffect(() => {

    if (!isSignedIn) return;

    const role = user?.publicMetadata?.role;

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/chat");
    }

  }, [isSignedIn, user, router]);

  return (
    <div className="relative min-h-[100vh] bg-black text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-violet-600/30 blur-3xl" />

        <div className="absolute right-[-10%] top-[20%] h-[380px] w-[380px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-[-10%] left-[35%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />

      </div>

      {/* NAVBAR */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                College Hub AI
              </h1>

              <p className="text-xs text-zinc-400">
                Intelligent Student Platform
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">

            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              Features
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              About
            </button>

            <button className="text-sm text-zinc-300 transition hover:text-white">
              Dashboard
            </button>
            
              <>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className="rounded-2xl text-white hover:bg-white/10 hover:text-white"
                  >
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button className="rounded-2xl bg-white text-black hover:bg-zinc-200">
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section 
        id = "about"
        className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center gap-16 px-6 py-20 lg:flex-row"
      >

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-violet-300" />

            <span className="text-sm text-zinc-300">
              AI-Powered Student Experience
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Your Campus.
            <br />

            <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
              Reimagined with AI.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            A premium AI assistant for students — helping with academics,
            examinations, placements, scholarships, hostel support, and more.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Button
              onClick={() => {
                if (!isSignedIn) return;

                const role = user?.publicMetadata?.role;

                if (role === "admin") {
                  router.push("/admin");
                } else {
                  router.push("/chat");
                }
              }}
              className="h-14 rounded-2xl bg-white px-8 text-base text-black hover:bg-zinc-200"
            >
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
                }}
              className="h-14 rounded-2xl border-white/10 bg-white/5 px-8 text-base text-white backdrop-blur-xl hover:bg-white/10 hover:text-white"
            >
              Watch Demo
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">

            {[
              "24/7 AI Assistance",
              "Document Search",
              "Smart Sessions",
              "Premium UX",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300 backdrop-blur-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex flex-1 items-center justify-center"
        >

          {/* ORB GLOW */}
          <div className="absolute h-[450px] w-[450px] rounded-full bg-gradient-to-br from-violet-500/40 via-cyan-500/20 to-fuchsia-500/30 blur-3xl" />

          {/* FLOATING CARD */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-md"
          >

            <Card className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">

              <CardContent className="p-0">

                <div className="border-b border-white/10 px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-cyan-300 shadow-lg">
                      <Bot className="h-6 w-6 text-black" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        College Hub AI
                      </h3>

                      <p className="text-sm text-zinc-300">
                        Smart Student Assistant
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6">

                  <div className="ml-auto max-w-[85%] rounded-3xl bg-white px-5 py-4 text-black shadow-lg">
                    What are the rules for semester examinations?
                  </div>

                  <div className="max-w-[90%] rounded-3xl border border-white/10 bg-black/40 px-5 py-4 text-zinc-100 backdrop-blur-xl">
                    Students must carry valid ID cards and hall tickets.
                    Reporting time is usually 30 minutes before the exam.
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">

                    <div className="h-3 w-3 animate-pulse rounded-full bg-violet-400" />

                    <p className="text-sm text-zinc-300">
                      AI is searching institutional knowledge base...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="relative z-10 mx-auto max-w-7xl px-6 py-24"
      >

        <div className="mb-14 text-center">

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-300">
            Features
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Designed for the Modern Student.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:border-violet-400/30 hover:bg-white/10">

                  <CardContent className="p-7">

                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-500/20 border border-white/10">
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="leading-relaxed text-zinc-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
