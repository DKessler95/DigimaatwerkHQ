import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Code, Server, Database, Cpu, Cloud } from 'lucide-react';

interface ServiceFeature {
  name: string;
  description: string;
}

interface TechItem {
  name: string;
  description: string;
}

interface Service {
  slug: string;
  title: string;
  icon: string;
  short_description: string;
  featured_image: string;
  order: number;
  features: ServiceFeature[];
  tech_stack: TechItem[];
  content: string;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'chat-bot':
      return <Cpu className="h-6 w-6" />;
    case 'web-dev':
      return <Code className="h-6 w-6" />;
    case 'automation':
      return <Server className="h-6 w-6" />;
    case 'cloud':
      return <Cloud className="h-6 w-6" />;
    default:
      return <Database className="h-6 w-6" />;
  }
};

export function CMSServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchServices() {
      try {
        // Add timestamp to prevent caching
        const response = await fetch(`/api/services?lang=${language}&t=${Date.now()}`);
        const data = await response.json();
        if (data.success) {
          const sortedServices = data.data.sort((a: Service, b: Service) => a.order - b.order);
          console.log('Fetched services:', sortedServices.map(s => s.title));
          setServices(sortedServices);
          if (sortedServices.length > 0) {
            setActiveTab(sortedServices[0].slug);
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [language]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="w-full py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="w-full py-24 text-center">
        <h3 className="text-2xl font-semibold">
          {language === 'nl' ? 'Geen diensten gevonden' : 'No services found'}
        </h3>
      </div>
    );
  }

  const activeService = services.find(service => service.slug === activeTab);

  return (
    <section 
      id="services" 
      className="w-full py-24 bg-slate-50 dark:bg-slate-900"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'nl' ? 'Onze Diensten' : 'Our Services'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'nl' 
              ? 'Wij leveren geavanceerde digitale oplossingen die uw bedrijf transformeren.'
              : 'We deliver advanced digital solutions that transform your business.'}
          </p>
        </div>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex justify-center mb-8 bg-background p-1 overflow-x-auto">
            {services.map((service) => (
              <TabsTrigger 
                key={service.slug} 
                value={service.slug}
                className="flex items-center gap-2 px-4 py-2"
              >
                {getIconComponent(service.icon)}
                <span className="hidden sm:inline">{service.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {services.map((service) => (
            <TabsContent 
              key={service.slug} 
              value={service.slug} 
              className="mt-0"
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                          {getIconComponent(service.icon)}
                          <span className="sr-only">{service.title}</span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                        <CardDescription className="text-base">{service.short_description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.div 
                          className="grid sm:grid-cols-2 gap-4"
                          variants={container}
                          initial="hidden"
                          animate="show"
                        >
                          {service.features.slice(0, 4).map((feature, index) => (
                            <motion.div key={index} variants={item}>
                              <Card className="h-full border shadow-sm">
                                <CardHeader className="p-4">
                                  <CardTitle className="text-base">{feature.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full mt-2">
                          <span>
                            {language === 'nl' ? 'Lees meer over' : 'Learn more about'} {service.title}
                          </span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </div>
                
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="border-0 shadow-lg h-full">
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {language === 'nl' ? 'Technologieën' : 'Technologies'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {service.tech_stack.map((tech, index) => (
                            <div key={index} className="flex flex-col space-y-1">
                              <div className="flex items-start">
                                <Badge className="mr-2 mt-1" variant="outline">
                                  {index + 1}
                                </Badge>
                                <div>
                                  <h4 className="font-medium">{tech.name}</h4>
                                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          <span>
                            {language === 'nl' ? 'Neem contact op' : 'Contact us'}
                          </span>
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}