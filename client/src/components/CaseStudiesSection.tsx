import { useState } from 'react';
import { motion } from 'framer-motion';

interface CaseStudy {
  image: string;
  category: string;
  title: string;
  description: string;
  metric: {
    label: string;
    value: string;
  };
}

const caseStudies: CaseStudy[] = [
  {
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "AI & Chatbots",
    title: "E-commerce Customer Service",
    description: "Implemented an intelligent chatbot reducing customer service costs by 45% while improving satisfaction ratings.",
    metric: {
      label: "ROI",
      value: "280%"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Automation",
    title: "Financial Services Automation",
    description: "Automated document processing workflow reducing processing time from days to minutes and eliminating manual errors.",
    metric: {
      label: "Time Saved",
      value: "87%"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    title: "3D Product Configurator",
    description: "Interactive 3D product visualization platform increasing conversion rate and reducing returns for a furniture retailer.",
    metric: {
      label: "Conversion",
      value: "+32%"
    }
  }
];

type FilterCategory = 'All' | 'AI & Chatbots' | 'Automation' | 'Web Development';

const CaseStudiesSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  
  const filteredCaseStudies = activeFilter === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeFilter);

  return (
    <section id="case-studies" className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">Case Studies</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">See how we've helped businesses transform their digital operations</p>
        </div>
        
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'All' ? 'bg-accent text-primary' : 'bg-secondary/50 text-foreground hover:bg-secondary'} font-medium transition-colors`}
            onClick={() => setActiveFilter('All')}
          >
            All Projects
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'AI & Chatbots' ? 'bg-accent text-primary' : 'bg-secondary/50 text-foreground hover:bg-secondary'} font-medium transition-colors`}
            onClick={() => setActiveFilter('AI & Chatbots')}
          >
            AI & Chatbots
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'Automation' ? 'bg-accent text-primary' : 'bg-secondary/50 text-foreground hover:bg-secondary'} font-medium transition-colors`}
            onClick={() => setActiveFilter('Automation')}
          >
            Automation
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'Web Development' ? 'bg-accent text-primary' : 'bg-secondary/50 text-foreground hover:bg-secondary'} font-medium transition-colors`}
            onClick={() => setActiveFilter('Web Development')}
          >
            Web Development
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.map((study, index) => (
            <motion.div 
              key={index}
              className="bg-secondary/50 rounded-xl overflow-hidden card-hover-effect h-full flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={study.image}
                  alt={study.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-accent text-primary text-xs px-2 py-1 rounded-lg font-medium">
                  {study.category}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-header font-semibold mb-3">{study.title}</h3>
                <p className="text-foreground/70 mb-4 flex-grow">{study.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-accent">
                    <span className="font-medium">{study.metric.label}:</span> {study.metric.value}
                  </div>
                  <a href="#" className="text-foreground/70 hover:text-accent flex items-center">
                    <span>View Case</span>
                    <i className="ri-arrow-right-line ml-1"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center px-6 py-3 border border-foreground/30 rounded-lg hover:bg-secondary transition">
            <span>View All Case Studies</span>
            <i className="ri-arrow-right-line ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
