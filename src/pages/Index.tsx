import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import {
  Zap,
  Flame,
  Wind,
  Settings,
  Radio,
  ArrowUpDown,
  Wifi,
  Droplets,
  Leaf,
} from "lucide-react";
import heroImage from "@/assets/hero-engineering.jpg";

const Index = () => {
  const services = [
    {
      icon: Leaf,
      title: "Energy Modeling & Sustainability",
      description:
        "Energy modeling and simulation, sustainability design and comprehensive environmental studies for optimal building performance.",
    },
    {
      icon: Zap,
      title: "Electrical Systems",
      description:
        "Complete electrical design, supply, installation, testing, commissioning, maintenance and project management consultancy services.",
    },
    {
      icon: Flame,
      title: "Fire Protection",
      description:
        "Fire protection system design, supply, installation, testing, commissioning, maintenance and comprehensive project management.",
    },
    {
      icon: Wind,
      title: "HVAC Solutions",
      description:
        "HVAC design, supply, installation, testing, commissioning, maintenance and expert project management consultancy.",
    },
    {
      icon: Settings,
      title: "Building Management Systems",
      description:
        "BMS and automation system design, supply, installation, testing, commissioning, maintenance and project oversight.",
    },
    {
      icon: Radio,
      title: "Extra Low Voltage",
      description:
        "ELV system design, supply, installation, testing, commissioning, maintenance and project management expertise.",
    },
    {
      icon: ArrowUpDown,
      title: "Elevator & Escalator",
      description:
        "Vertical transportation design, supply, installation, testing, commissioning, maintenance and consultancy services.",
    },
    {
      icon: Wifi,
      title: "Communication Systems",
      description:
        "Advanced communication system design, supply, installation, testing, commissioning, maintenance and project management.",
    },
    {
      icon: Droplets,
      title: "Water & Wastewater",
      description:
        "Water and wastewater management design, supply, installation, testing, commissioning, maintenance and consultancy.",
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Divya Singham Consultancy</h1>
            <div className="hidden md:flex gap-8">
              <a href="#services" className="text-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
            <Button onClick={scrollToContact} className="bg-accent hover:bg-accent/90">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
              Engineering Excellence in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Building Systems
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Comprehensive MEP design, consultancy, and project management services
              for sustainable and efficient building systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-primary hover:bg-primary/90 text-lg px-8"
              >
                Start Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-lg px-8"
              >
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end solutions for all building systems with expert design, installation, and
              maintenance
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Why Choose Us
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We deliver comprehensive MEP engineering solutions that combine technical excellence
              with sustainable design principles. Our expertise spans across all building systems,
              ensuring seamless integration, optimal performance, and long-term reliability.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-secondary mb-2">200+</div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-accent mb-2">9</div>
              <p className="text-muted-foreground">Core Services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Get in touch with our team of experts to discuss your building systems requirements
            and discover how we can help bring your project to life.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-12">
            Contact Us Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Divya Singham Consultancy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
