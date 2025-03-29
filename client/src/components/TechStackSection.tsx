import { motion } from 'framer-motion';

interface TechItem {
  icon: string;
  name: string;
  description: string;
}

const techStack: TechItem[] = [
  {
    icon: "ri-reactjs-line",
    name: "React",
    description: "Front-end UI library"
  },
  {
    icon: "ri-code-box-line",
    name: "Next.js",
    description: "React framework"
  },
  {
    icon: "ri-cube-line",
    name: "Three.js",
    description: "3D visualizations"
  },
  {
    icon: "ri-robot-line",
    name: "GPT-4",
    description: "AI language model"
  }
];

interface ComparisonItem {
  feature: string;
  traditional: string;
  digimaatwerk: string;
}

const comparisonData: ComparisonItem[] = [
  {
    feature: "Performance Score",
    traditional: "70-80%",
    digimaatwerk: "95%+"
  },
  {
    feature: "3D Capabilities",
    traditional: "Limited",
    digimaatwerk: "Advanced"
  },
  {
    feature: "AI Integration",
    traditional: "Basic",
    digimaatwerk: "Full GPT-4 & RAG"
  },
  {
    feature: "Scalability",
    traditional: "Medium",
    digimaatwerk: "Enterprise-grade"
  },
  {
    feature: "Time to Market",
    traditional: "3-6 months",
    digimaatwerk: "4-8 weeks"
  }
];

const TechStackSection = () => {
  return (
    <section id="tech-stack" className="py-24 bg-gradient-to-b from-secondary to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">Our Technology Stack</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">We use cutting-edge technologies to deliver high-performance, scalable solutions</p>
        </div>
        
        <motion.div 
          className="bg-primary/50 backdrop-blur-md rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-secondary rounded-xl">
                  <i className={`${tech.icon} text-3xl text-accent`}></i>
                </div>
                <h3 className="text-lg font-header font-medium mb-1">{tech.name}</h3>
                <p className="text-foreground/60 text-sm text-center">{tech.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-header font-semibold mb-6 text-center">Compare Our Technology Capabilities</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left p-3 border-b border-secondary">Feature</th>
                    <th className="text-center p-3 border-b border-secondary">Traditional Stack</th>
                    <th className="text-center p-3 border-b border-secondary">Digimaatwerk Stack</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <td className="p-3 border-b border-secondary/50">{item.feature}</td>
                      <td className="text-center p-3 border-b border-secondary/50">{item.traditional}</td>
                      <td className="text-center p-3 border-b border-secondary/50 text-accent font-medium">{item.digimaatwerk}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
