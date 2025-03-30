import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

interface TechItem {
  icon: string;
  name: string;
  descriptionKey: string;
}

const techStack: TechItem[] = [
  {
    icon: "ri-reactjs-line",
    name: "React",
    descriptionKey: "tech.react"
  },
  {
    icon: "ri-code-box-line",
    name: "Next.js",
    descriptionKey: "tech.nextjs"
  },
  {
    icon: "ri-cube-line",
    name: "Three.js",
    descriptionKey: "tech.threejs"
  },
  {
    icon: "ri-robot-line",
    name: "GPT-4",
    descriptionKey: "tech.gpt4"
  }
];

interface ComparisonItem {
  featureKey: string;
  traditional: string;
  digimaatwerk: string;
}

const comparisonData: ComparisonItem[] = [
  {
    featureKey: "tech.compare.performance",
    traditional: "70-80%",
    digimaatwerk: "95%+"
  },
  {
    featureKey: "tech.compare.3d",
    traditional: "Limited",
    digimaatwerk: "Advanced"
  },
  {
    featureKey: "tech.compare.ai",
    traditional: "Basic",
    digimaatwerk: "Full GPT-4 & RAG"
  },
  {
    featureKey: "tech.compare.scalability",
    traditional: "Medium",
    digimaatwerk: "Enterprise-grade"
  },
  {
    featureKey: "tech.compare.timetomarket",
    traditional: "3-6 months",
    digimaatwerk: "4-8 weeks"
  }
];

const TechStackSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="tech-stack" className="py-24 bg-gradient-to-b from-secondary to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">{t('tech.title')}</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">{t('tech.subtitle')}</p>
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
                <p className="text-foreground/60 text-sm text-center">{t(tech.descriptionKey)}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-header font-semibold mb-6 text-center">{t('tech.compare.title')}</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left p-3 border-b border-secondary">{t('tech.compare.feature')}</th>
                    <th className="text-center p-3 border-b border-secondary">{t('tech.compare.traditional')}</th>
                    <th className="text-center p-3 border-b border-secondary">{t('tech.compare.digimaatwerk')}</th>
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
                      <td className="p-3 border-b border-secondary/50">{t(item.featureKey)}</td>
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
