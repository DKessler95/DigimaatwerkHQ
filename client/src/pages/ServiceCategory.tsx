import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'wouter';
import { useLanguage } from '@/lib/languageContext';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useGLTF, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Loader2 } from 'lucide-react';

// Animation for AI Chatbots
const ChatbotAnimation = () => {
  const { viewport } = useThree();
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t / 4) / 8;
      group.current.position.y = Math.sin(t / 2) / 10;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial 
            color="#10B981" 
            attach="material" 
            distort={0.4} 
            speed={2} 
            roughness={0}
            metalness={0.7}
          />
        </Sphere>
        
        <Sphere args={[0.3, 32, 32]} position={[-1.5, 0.5, 0]}>
          <MeshDistortMaterial 
            color="#0EA5E9" 
            attach="material" 
            distort={0.2} 
            speed={5} 
            roughness={0}
            metalness={0.2}
          />
        </Sphere>
        
        <Sphere args={[0.5, 32, 32]} position={[1.5, -0.5, 0]}>
          <MeshDistortMaterial 
            color="#8B5CF6" 
            attach="material" 
            distort={0.3} 
            speed={3} 
            roughness={0.2}
            metalness={0.5}
          />
        </Sphere>
      </Float>
    </group>
  );
};

// Animation for Workflow Automation
const AutomationAnimation = () => {
  const { viewport } = useThree();
  const group = useRef<THREE.Group>(null);
  const gears = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t / 5) / 10;
      group.current.position.y = Math.sin(t / 3) / 15;
    }
    
    if (gears.current) {
      gears.current.children.forEach((gear, i) => {
        gear.rotation.z = t * (i % 2 === 0 ? 1 : -1) / 2;
      });
    }
  });

  return (
    <group ref={group}>
      <group ref={gears}>
        {[...Array(5)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.sin(i / 5 * Math.PI * 2) * 1.2,
              Math.cos(i / 5 * Math.PI * 2) * 1.2,
              0
            ]}
          >
            <torusGeometry args={[0.3, 0.1, 16, 32]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#F59E0B" : "#D97706"} 
              metalness={0.8} 
              roughness={0.2} 
            />
          </mesh>
        ))}
      </group>
      
      <mesh>
        <torusGeometry args={[0.6, 0.2, 16, 100]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

// Animation for Web Development
const WebDevAnimation = () => {
  const { viewport } = useThree();
  const group = useRef<THREE.Group>(null);
  const boxesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t / 4) / 6;
      group.current.position.y = Math.sin(t / 2) / 12;
    }
    
    if (boxesRef.current) {
      boxesRef.current.children.forEach((box, i) => {
        box.position.y = Math.sin(t + i * 0.5) * 0.2;
        box.rotation.x = t * 0.2;
        box.rotation.z = t * 0.2;
      });
    }
  });

  return (
    <group ref={group}>
      <group ref={boxesRef}>
        {[...Array(9)].map((_, i) => {
          const x = (i % 3 - 1) * 0.6;
          const z = (Math.floor(i / 3) - 1) * 0.6;
          return (
            <mesh key={i} position={[x, 0, z]}>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial 
                color={['#3B82F6', '#2563EB', '#1D4ED8'][i % 3]} 
                metalness={0.4} 
                roughness={0.2} 
              />
            </mesh>
          );
        })}
      </group>
      
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[2, 0.05, 2]} />
        <meshStandardMaterial 
          color="#60A5FA" 
          opacity={0.6} 
          transparent 
          metalness={0.5} 
          roughness={0.1} 
        />
      </mesh>
    </group>
  );
};

// Scene component that selects animation based on category
const Scene = ({ category }: { category: string }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
      
      {category === 'ai-chatbots' && <ChatbotAnimation />}
      {category === 'workflow-automation' && <AutomationAnimation />}
      {category === 'web-development' && <WebDevAnimation />}
    </>
  );
};

// Main component for service category page
const ServiceCategory = () => {
  const { category } = useParams();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Map category to title and description
  const getCategoryDetails = () => {
    switch (category) {
      case 'ai-chatbots':
        return {
          title: 'AI Chatbots',
          subtitle: 'Intelligente gesprekspartners voor uw klanten',
          description: `Onze AI-gestuurde chatbots bieden 24/7 ondersteuning voor uw klanten. 
          Ze leren van elk gesprek, begrijpen complexe vragen en geven relevante antwoorden. 
          Verhoog de klanttevredenheid en verminder de werkdruk van uw team met onze slimme chatbot-oplossingen.`,
          features: [
            'Integratie met uw huidige systemen en databases',
            'Meertalige ondersteuning voor internationale klanten',
            'Aanpasbare persoonlijkheid en huisstijl',
            'Gedetailleerde rapportages en inzichten',
            'Naadloze overdracht naar menselijke medewerkers indien nodig'
          ],
          technicalDetails: `We gebruiken de nieuwste ontwikkelingen in natuurlijke taalverwerking (NLP) en machine learning. 
          Onze chatbots worden gebouwd met GPT-technologie en kunnen worden geïntegreerd met uw CRM, helpdesk of website.`
        };
      case 'workflow-automation':
        return {
          title: 'Workflow Automatisering',
          subtitle: 'Efficiëntere processen, minder handwerk',
          description: `Transformeer uw bedrijfsprocessen met onze automatiseringsoplossingen. 
          We identificeren repetitieve taken en stroomlijnen deze met slimme digitale workflows. 
          Bespaar tijd, verminder fouten en laat uw team focussen op wat echt belangrijk is.`,
          features: [
            'Visuele workflow-ontwerpen zonder programmeerkennis',
            'Integratie met meer dan 1000+ apps en diensten',
            'Aangepaste rapportages en dashboards',
            'Gecentraliseerd beheer van alle workflows',
            'Realtime monitoring en foutafhandeling'
          ],
          technicalDetails: `Onze oplossingen zijn gebouwd op robuuste platforms zoals n8n, Make (Integromat) en Zapier. 
          We bieden ook maatwerk API-integraties voor specifieke behoeften.`
        };
      case 'web-development':
        return {
          title: 'Webontwikkeling',
          subtitle: 'Moderne websites en applicaties',
          description: `Van responsive websites tot complexe webapplicaties, wij bouwen digitale oplossingen die indruk maken. 
          Met een focus op gebruikerservaring, performance en schaalbaarheid creëren we platforms die uw bedrijf helpen groeien.`,
          features: [
            'Mobiel-vriendelijk ontwerp voor alle apparaten',
            'Zoekmachinevriendelijke structuur (SEO)',
            'Snelle laadtijden en optimale performance',
            'Gebruiksvriendelijk content management',
            'Veilige betalingsintegraties indien nodig'
          ],
          technicalDetails: `We werken met moderne technologieën zoals React, Next.js en Node.js. 
          Voor e-commerce projecten gebruiken we Shopify of WooCommerce, afhankelijk van uw specifieke behoeften.`
        };
      default:
        return {
          title: 'Digitale diensten',
          subtitle: 'Technologische oplossingen op maat',
          description: 'We bieden diverse digitale diensten aan voor uw bedrijf.',
          features: [],
          technicalDetails: ''
        };
    }
  };

  // Get the right details based on the category
  const details = getCategoryDetails();
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-primary to-secondary">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section with 3D animation */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div className="w-full lg:w-1/2">
            <motion.h1 
              className="text-4xl md:text-5xl font-header font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {details.title}
            </motion.h1>
            <motion.p 
              className="text-xl text-foreground/80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {details.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-foreground/70 mb-8">
                {details.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-6 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition">
                  Contact opnemen
                </Link>
                <Link href="#examples" className="px-6 py-3 bg-transparent text-accent font-medium rounded-lg border border-accent hover:bg-accent/10 transition">
                  Voorbeelden bekijken
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="w-full lg:w-1/2 h-[400px] rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full h-full">
              <Canvas>
                <Scene category={category || ''} />
              </Canvas>
            </div>
          </motion.div>
        </div>
        
        {/* Features section */}
        <div className="mb-16">
          <motion.h2 
            className="text-3xl font-header font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Wat we bieden
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-secondary/30 backdrop-blur-sm p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <span className="text-accent text-xl">✓</span>
                </div>
                <p>{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Technical details and process section */}
        <div className="mb-16 bg-secondary/20 backdrop-blur-sm p-8 rounded-xl">
          <motion.h2 
            className="text-3xl font-header font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Technische details
          </motion.h2>
          <motion.p 
            className="text-foreground/70 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {details.technicalDetails}
          </motion.p>
          
          <motion.h3 
            className="text-2xl font-header font-semibold mt-8 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ons proces
          </motion.h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            {['Analyse & Planning', 'Ontwikkeling', 'Testen', 'Implementatie', 'Ondersteuning'].map((step, index) => (
              <motion.div 
                key={index}
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold mr-2">
                    {index + 1}
                  </div>
                  <h4 className="font-medium">{step}</h4>
                </div>
                <div className={`h-1 bg-accent/30 mt-2 ${index === 4 ? '' : 'mb-4'}`}></div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Examples and CTA section */}
        <div id="examples" className="mb-16">
          <motion.h2 
            className="text-3xl font-header font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Voorbeelden & Integraties
          </motion.h2>
          
          <div className="bg-primary/30 backdrop-blur-md p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-header font-semibold mb-4">Bekijk onze demo</h3>
            <p className="mb-6">Ontdek hoe onze {details.title} werken in de praktijk. Probeer onze interactieve demo!</p>
            
            {/* Example integration showcase based on category */}
            {category === 'ai-chatbots' && (
              <div className="border border-accent/20 rounded-xl p-4 bg-secondary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent">🤖</span>
                  </div>
                  <h4 className="font-medium">Chatbot Demo</h4>
                </div>
                <p className="text-sm text-foreground/70 mb-4">
                  Onze chatbot kan vragen beantwoorden over uw producten, openingstijden en meer. 
                  Probeer het met vragen als "Wat zijn jullie diensten?" of "Kan ik een afspraak maken?"
                </p>
                <Link href="#contact" className="text-accent hover:underline">
                  Probeer onze volledige chatbot demo →
                </Link>
              </div>
            )}
            
            {category === 'workflow-automation' && (
              <div className="border border-accent/20 rounded-xl p-4 bg-secondary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent">⚙️</span>
                  </div>
                  <h4 className="font-medium">Automatisering Demo</h4>
                </div>
                <p className="text-sm text-foreground/70 mb-4">
                  Ontdek hoe automatisering uw contactformulier kan verbinden met uw CRM, e-mailmarketing en meer.
                  Vul ons contactformulier in om de automatisering in actie te zien.
                </p>
                <Link href="#contact" className="text-accent hover:underline">
                  Bekijk de workflow demo →
                </Link>
              </div>
            )}
            
            {category === 'web-development' && (
              <div className="border border-accent/20 rounded-xl p-4 bg-secondary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent">🌐</span>
                  </div>
                  <h4 className="font-medium">Website Demonstratie</h4>
                </div>
                <p className="text-sm text-foreground/70 mb-4">
                  Bekijk onze portfolio van websites en webapplicaties. 
                  Zie hoe we responsieve ontwerpen maken die er geweldig uitzien op elk apparaat.
                </p>
                <Link href="/case-studies" className="text-accent hover:underline">
                  Bekijk ons portfolio →
                </Link>
              </div>
            )}
          </div>
          
          {/* Integration examples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div 
              className="bg-secondary/20 backdrop-blur-sm p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-semibold mb-2">CRM Integratie</h3>
              <p className="text-sm text-foreground/70">
                Naadloze verbinding met populaire CRM's zoals Salesforce, HubSpot en Microsoft Dynamics.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/20 backdrop-blur-sm p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-semibold mb-2">E-commerce</h3>
              <p className="text-sm text-foreground/70">
                Integreer met Shopify, WooCommerce, en andere e-commerce platforms.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/20 backdrop-blur-sm p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-semibold mb-2">API Koppelingen</h3>
              <p className="text-sm text-foreground/70">
                Aangepaste API-integraties voor specifieke systemen en applicaties.
              </p>
            </motion.div>
          </div>
          
          {/* CTA */}
          <motion.div 
            className="bg-accent/10 rounded-xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-header font-bold mb-4">
              Klaar om te beginnen met {details.title}?
            </h2>
            <p className="max-w-2xl mx-auto mb-6">
              Neem contact met ons op voor een vrijblijvend gesprek over uw project.
              We denken graag met u mee over de mogelijkheden!
            </p>
            <Link href="#contact" className="inline-block px-8 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition">
              Neem contact op
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory;