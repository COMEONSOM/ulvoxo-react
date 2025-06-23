import { motion } from "framer-motion";
import "../components/styles/AboutCompany.css";

export default function AboutCompany() {
  return (
    <section
      id="about"
      className="relative z-10 px-5 py-24 max-w-5xl mx-auto text-white font-sans"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        <p className="text-lg leading-relaxed mb-12 text-justify">
          Welcome to <strong>ULVOXO</strong>, the tech solutions startup
          dedicated to empowering micro, small, and medium enterprises (MSMEs)—
          and the next generation of entrepreneurs—with cutting-edge digital
          tools and financial education. Founded by a passionate team of six,
          our mission is simple: to make India financially literate and
          technologically self-sufficient, one MSME at a time.
        </p>

        <h3 className="text-2xl font-semibold mb-6 text-sky-300">
          Our Different Work Areas
        </h3>

        <div className="space-y-6">
          {[
            {
              title: "ULVOXO INSTITUTE OF MODERN TECH",
              color: "text-blue-400",
              desc: [
                [
                  "What it is:",
                  "A financial-literacy and investing-education platform for MSMEs and college students.",
                ],
                ["Access:", "Free to registered users (login required)."],
                [
                  "Why it exists:",
                  "High-quality courses at nominal prices—no ads, no hidden fees. Special Diwali discount to increase awareness.",
                ],
              ],
            },
            {
              title: "ULVOXO FINANCE",
              color: "text-green-400",
              desc: [
                [
                  "What it is:",
                  "A suite of investor tools—trackers, analyzers, calculators, and more.",
                ],
                ["Access:", "Completely free, no login required."],
                [
                  "Why it exists:",
                  "Data and insights for beginners and pros alike— ULVOXO FINANCE is always free and ad-free.",
                ],
              ],
            },
            {
              title: "ULVOXO AI",
              color: "text-purple-400",
              desc: [
                [
                  "What it is:",
                  "AI aggregator platform—find AI tools, prompt generators, image apps, and data science notebooks.",
                ],
                ["Access:", "Lifetime free access."],
                [
                  "Why it exists:",
                  "Save time hunting for AI tools. ULVOXO AI curates and organizes them all in one place.",
                ],
              ],
            },

            {
              title: "ULVOXO SUPERTECH",
              color: "text-purple-400",
              desc: [
                [
                  "What it is:",
                  "AI aggregator platform—find AI tools, prompt generators, image apps, and data science notebooks.",
                ],
                ["Access:", "Lifetime free access."],
                [
                  "Why it exists:",
                  "Save time hunting for AI tools. ULVOXO  curates and organizes them all in one place.",
                ],
              ],
            },
          ].map(({ title, color, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-xl p-6 shadow-md backdrop-blur-sm"
            >
              <h4 className={`text-xl font-bold mb-2 ${color}`}>{title}</h4>
              {desc.map(([label, text]) => (
                <p key={label}>
                  <strong>{label}</strong> {text}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-2xl font-semibold mb-4 text-sky-300">
            Why ULVOXO Stands Out
          </h3>
          <ul className="list-disc list-inside space-y-4 text-base text-gray-200">
            <li>
              <strong>User-First Philosophy:</strong> No ads, no gimmicks—ever.
              We grow alongside our users, reinvesting every rupee back into
              improving our platforms.
            </li>
            <li>
              <strong>Transparent Pricing:</strong> Our only revenue comes from
              ULVOXO INSTITUTE courses, priced competitively, with unmatched real-world
              depth.
            </li>
            <li>
              <strong>Small Team, Big Impact:</strong> Just six of us—but we’ve
              supported our first two customers from day one, and remain as
              committed now as ever.
            </li>
            <li>
              <strong>Community Engagement:</strong> Every Diwali, we run a
              promo to spread awareness—outside that, no sales distractions.
            </li>
          </ul>
        </div>

        <p className="mt-12 text-lg font-medium text-center">
          At ULVOXO, we believe empowering MSMEs with technology and
          financial know-how will reshape India’s economy.
          <span className="block mt-4">
            Thank you for trusting us on your journey to growth and innovation.
          </span>
          <span className="block mt-2 font-semibold">
            Join us and experience the ULVOXO difference!
          </span>
        </p>
      </motion.div>
    </section>
  );
}
