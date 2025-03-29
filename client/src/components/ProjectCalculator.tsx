import { useState } from 'react';
import { motion } from 'framer-motion';

type ProjectType = 'chatbot' | 'automation' | 'web' | 'combined';
type ProjectScale = 'small' | 'medium' | 'large';
type TimelinePriority = 1 | 2 | 3;

interface Feature {
  id: string;
  name: string;
  priceImpact: number;
}

const ProjectCalculator = () => {
  const [projectType, setProjectType] = useState<ProjectType>('chatbot');
  const [projectScale, setProjectScale] = useState<ProjectScale>('small');
  const [timelinePriority, setTimelinePriority] = useState<TimelinePriority>(1);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  const features: Feature[] = [
    { id: 'feature1', name: 'User Authentication', priceImpact: 1500 },
    { id: 'feature2', name: 'CRM Integration', priceImpact: 2000 },
    { id: 'feature3', name: 'Payment Processing', priceImpact: 2500 },
    { id: 'feature4', name: 'Analytics Dashboard', priceImpact: 3000 },
    { id: 'feature5', name: '3D Visualizations', priceImpact: 4000 },
  ];
  
  // Calculate base price based on project type and scale
  const getBasePrice = (): number => {
    const typeMultiplier = {
      chatbot: 1,
      automation: 1.2,
      web: 1.5,
      combined: 2
    };
    
    const scaleMultiplier = {
      small: 10000,
      medium: 15000,
      large: 25000
    };
    
    return scaleMultiplier[projectScale] * typeMultiplier[projectType];
  };
  
  // Calculate additional features cost
  const getFeaturesCost = (): number => {
    return features
      .filter(feature => selectedFeatures.includes(feature.id))
      .reduce((sum, feature) => sum + feature.priceImpact, 0);
  };
  
  // Calculate rush multiplier
  const getRushMultiplier = (): number => {
    const multipliers = {
      1: 1, // Standard
      2: 1.25, // Expedited
      3: 1.5 // Rush
    };
    
    return multipliers[timelinePriority];
  };
  
  // Total price calculation
  const calculatePrice = (): { min: number; max: number } => {
    const basePrice = getBasePrice();
    const featuresCost = getFeaturesCost();
    const rushMultiplier = getRushMultiplier();
    
    const total = (basePrice + featuresCost) * rushMultiplier;
    
    return {
      min: Math.round(total * 0.9),
      max: Math.round(total * 1.1)
    };
  };
  
  // Timeline calculation in weeks
  const calculateTimeline = (): { min: number; max: number } => {
    const baseTime = {
      small: 4,
      medium: 6,
      large: 10
    }[projectScale];
    
    const featureTime = Math.ceil(selectedFeatures.length / 2);
    
    // Expedited reduces time by 20%, rush by 40%
    const timeMultiplier = {
      1: 1, // Standard
      2: 0.8, // Expedited
      3: 0.6 // Rush
    }[timelinePriority];
    
    const totalTime = (baseTime + featureTime) * timeMultiplier;
    
    return {
      min: Math.max(2, Math.floor(totalTime * 0.9)),
      max: Math.ceil(totalTime * 1.1)
    };
  };
  
  const priceRange = calculatePrice();
  const timelineRange = calculateTimeline();
  
  const handleFeatureToggle = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')` 
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">Project Cost Calculator</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Estimate the cost and timeline for your digital transformation project</p>
        </div>
        
        <motion.div 
          className="bg-secondary/80 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-header font-semibold mb-6">Configure Your Project</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-foreground/80 mb-2">Project Type</label>
                  <select 
                    className="w-full bg-primary border border-secondary p-3 rounded-lg text-foreground focus:outline-none focus:border-accent"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                  >
                    <option value="chatbot">AI Chatbot</option>
                    <option value="automation">Workflow Automation</option>
                    <option value="web">Web Development</option>
                    <option value="combined">Combined Solution</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-foreground/80 mb-2">Project Scale</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button 
                      className={`${projectScale === 'small' 
                        ? 'bg-primary border border-accent text-accent' 
                        : 'bg-primary border border-secondary hover:border-accent'} p-3 rounded-lg transition-colors`}
                      onClick={() => setProjectScale('small')}
                    >
                      Small
                    </button>
                    <button 
                      className={`${projectScale === 'medium' 
                        ? 'bg-primary border border-accent text-accent' 
                        : 'bg-primary border border-secondary hover:border-accent'} p-3 rounded-lg transition-colors`}
                      onClick={() => setProjectScale('medium')}
                    >
                      Medium
                    </button>
                    <button 
                      className={`${projectScale === 'large' 
                        ? 'bg-primary border border-accent text-accent' 
                        : 'bg-primary border border-secondary hover:border-accent'} p-3 rounded-lg transition-colors`}
                      onClick={() => setProjectScale('large')}
                    >
                      Large
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-foreground/80 mb-2">Features Needed</label>
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <div className="flex items-center" key={feature.id}>
                        <input 
                          type="checkbox" 
                          id={feature.id}
                          className="mr-2"
                          checked={selectedFeatures.includes(feature.id)}
                          onChange={() => handleFeatureToggle(feature.id)}
                        />
                        <label htmlFor={feature.id}>{feature.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-foreground/80 mb-2">Timeline Priority</label>
                  <div className="relative pt-1">
                    <input 
                      type="range" 
                      className="w-full appearance-none h-1 bg-primary rounded outline-none accent-accent" 
                      min="1" 
                      max="3" 
                      step="1"
                      value={timelinePriority}
                      onChange={(e) => setTimelinePriority(parseInt(e.target.value) as TimelinePriority)}
                    />
                    <div className="flex justify-between text-xs text-foreground/60 pt-2">
                      <span>Standard</span>
                      <span>Expedited</span>
                      <span>Rush</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-header font-semibold mb-6">Estimated Results</h3>
              
              <div className="bg-primary/80 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-foreground/80">Estimated Budget Range</span>
                  <span className="text-2xl font-medium text-accent">€{priceRange.min.toLocaleString()} - €{priceRange.max.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/80">Timeline</span>
                  <span className="text-xl font-medium">{timelineRange.min}-{timelineRange.max} weeks</span>
                </div>
              </div>
              
              <div className="bg-primary/80 rounded-xl p-6 mb-8">
                <h4 className="text-lg font-medium mb-4">Included in Estimate:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                    <span>Complete project planning and design</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                    <span>Development and implementation</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                    <span>Testing and quality assurance</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                    <span>Deployment and post-launch support</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-accent text-xl mr-2 flex-shrink-0"></i>
                    <span>3 months of maintenance and updates</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <a href="#contact" className="inline-block w-full py-3 bg-accent text-primary font-header font-medium rounded-lg transition hover:bg-accent/90">
                  Get Detailed Quote
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectCalculator;
