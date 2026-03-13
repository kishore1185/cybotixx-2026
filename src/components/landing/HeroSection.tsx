"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

const HeroSection = () => {
  return (
    <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">

      {/* subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">

        {/* PARTICLE TEXT */}
        <ParticleTextEffect text="CYBOTIXX" />

        {/* Content appears AFTER particle animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2.8,
            duration: 0.8,
            ease: "easeOut",
          }}
        >

          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
            BCA Tech Forum
          </p>

          <p className="font-mono text-sm sm:text-base text-muted-foreground mb-2 tracking-wider">
            Innovate. Code. Create.
          </p>

          <p className="text-muted-foreground max-w-md mx-auto mt-4 mb-10 text-sm leading-relaxed">
            A student-driven tech community fostering innovation through hackathons,
            coding contests, workshops, and collaborative learning.
          </p>

          <div className="flex items-center justify-center gap-4">

            <Link href="/register">
              <Button size="lg" className="font-mono text-sm tracking-wider gap-2">
                Register Now <ArrowRight size={16} />
              </Button>
            </Link>

            <a href="#about">
              <Button variant="outline" size="lg" className="font-mono text-sm tracking-wider">
                Learn More
              </Button>
            </a>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;