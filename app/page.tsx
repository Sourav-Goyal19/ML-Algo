"use client";
import { Button } from "@/components/ui/button";
import { Cpu, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LandingPage() {
  const features = [
    {
      title: "Interactive Visualizations",
      description:
        "Explore how algorithms like Linear Regression, K-Means, and Decision Trees work step-by-step.",
    },
    {
      title: "Dataset Analysis",
      description:
        "Upload datasets and watch the magic as models analyze and train in real-time.",
    },
    {
      title: "Learn by Doing",
      description:
        "Experiment with algorithms, fine-tune parameters, and visualize results instantly.",
    },
  ];

  const mlFeatures = [
    {
      title: "Explore ML Algorithms",
      description:
        "Understand the theory and math behind popular algorithms with easy-to-follow visual explanations.",
      icon: Cpu,
    },
    {
      title: "Upload Your Own Dataset",
      description:
        "See how your data interacts with ML models, complete with training stats and performance metrics.",
      icon: ArrowRight,
    },
    {
      title: "Ask Questions, Get Answers",
      description:
        "Input any machine learning-related query, and let our platform generate an interactive tutorial or visualization.",
      icon: Zap,
    },
    {
      title: "Preloaded Datasets & Examples",
      description:
        "Learn faster with curated datasets and practical real-world examples.",
      icon: Cpu,
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Sign Up or Log In",
      description:
        "Create an account to access all features and save your progress.",
    },
    {
      step: "2",
      title: "Ask or Upload",
      description:
        "Input a machine learning question or upload a dataset to start exploring.",
    },
    {
      step: "3",
      title: "Watch and Learn",
      description:
        "View step-by-step animations, visualizations, and results tailored to your input.",
    },
  ];

  const testimonials = [
    {
      testimonial:
        "I finally understand how machine learning works, thanks to the interactive explanations!",
      name: "Samanpreet Singh",
      role: "Data Analyst",
    },
    {
      testimonial:
        "This platform made it so easy to visualize my datasets and see the results of ML algorithms.",
      name: "Sourav",
      role: "Student",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto relative bg-gray-900 text-white">
      <Header />
      <main>
        <section className="px-6 lg:px-14 min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-black to-gray-900">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent"
          >
            Learn Machine Learning the{" "}
            <span className="leading-[1.2]">Smart Way!</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl md:text-[22px] max-w-4xl text-white/80 font-normal"
          >
            Upload your datasets or ask questions, and watch as machine learning
            concepts come to life through visual explanations, interactive
            demos, and step-by-step guidance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button className="text-[18px] py-6 px-5 transition bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-80">
              Get Started for Free
            </Button>
            <Button className="text-[18px] py-6 px-5 transition bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800">
              Login to Explore
            </Button>
          </motion.div>
        </section>

        <section className="px-6 lg:px-14 py-20 bg-gradient-to-b from-black/30 to-gray-900 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
            What is ML Algo?
          </h2>
          <p className="text-lg max-w-4xl mx-auto text-white/70 mb-12">
            Our platform is designed to make machine learning simple and
            engaging. Whether you're just starting or looking to deepen your
            understanding, we've got you covered.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/5 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-blue-300 mb-2">
                  {point.title}
                </h3>
                <p className="text-white/70">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 lg:px-14 py-20 bg-gradient-to-b from-black/30 to-gray-900 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Why Use ML Algo?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mlFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <feature.icon className="text-black w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 lg:px-14 py-20 bg-gradient-to-b from-black/30 to-gray-900 text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
            How Does It Work?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/5 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <h3 className="text-5xl font-bold text-blue-300 mb-4">
                  {step.step}
                </h3>
                <h4 className="text-2xl font-semibold mb-4">{step.title}</h4>
                <p className="text-white/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <Button className="text-[18px] py-6 px-5 bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-80 transition">
              Ready to Get Started? Sign Up Today!
            </Button>
          </motion.div>
        </section>

        <section className="px-6 lg:px-14 py-20 bg-gradient-to-b from-black/30 to-gray-900 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="bg-white/5 p-8 rounded-lg shadow-lg"
              >
                <p className="text-xl italic text-white/70 mb-4">
                  "{testimonial.testimonial}"
                </p>
                <p className="font-semibold text-blue-300">
                  {testimonial.name}, {testimonial.role}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 lg:px-14 py-20 bg-gradient-to-b from-black/30 to-gray-900 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Have Questions? Get in Touch!
          </h2>
          <p className="text-lg max-w-4xl mx-auto text-white/70 mb-12">
            Whether you're a beginner or an expert, we're here to help you. Drop
            us a message or join our community to learn more.
          </p>
          <div className="flex-col flex md:flex-row justify-center gap-4">
            <Button className="px-8 py-4 text-lg bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-80 transition duration-200 ease-in-out">
              Contact Us
            </Button>
            <Button className="px-8 py-4 text-lg bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800">
              Join Our Community
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
