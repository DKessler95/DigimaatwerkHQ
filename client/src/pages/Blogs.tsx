import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Blogs = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('case-studies');
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCmsContent = async () => {
      setLoading(true);
      try {
        // Case Studies
        const caseStudiesRes = await fetch(`/api/case-studies?lang=${language}`);
        const caseStudiesData = await caseStudiesRes.json();
        if (caseStudiesData.success) {
          setCaseStudies(caseStudiesData.data);
        }

        // Blog Posts
        const blogRes = await fetch(`/api/blog?lang=${language}`);
        const blogData = await blogRes.json();
        if (blogData.success) {
          setBlogPosts(blogData.data);
        }

        // Services
        const servicesRes = await fetch(`/api/services?lang=${language}`);
        const servicesData = await servicesRes.json();
        if (servicesData.success) {
          setServices(servicesData.data);
        }
      } catch (err) {
        console.error('Error fetching CMS content:', err);
        setError('Failed to load CMS content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCmsContent();
  }, [language]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">{language === 'nl' ? 'Blogs & Case Studies' : 'Blogs & Case Studies'}</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="case-studies">{language === 'nl' ? 'Case Studies' : 'Case Studies'} ({caseStudies.length})</TabsTrigger>
          <TabsTrigger value="blog">{language === 'nl' ? 'Blog Berichten' : 'Blog Posts'} ({blogPosts.length})</TabsTrigger>
          <TabsTrigger value="services">{language === 'nl' ? 'Diensten' : 'Services'} ({services.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="case-studies">
          <h2 className="text-2xl font-semibold mb-4">{language === 'nl' ? 'Case Studies' : 'Case Studies'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <a 
                key={study.slug} 
                href={`/case-study/${study.slug}`} 
                className="block transition-transform hover:scale-[1.02] duration-300"
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">{study.category}</div>
                    <CardTitle>{study.title}</CardTitle>
                    <CardDescription>{study.client} • {study.industry}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{study.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {study.featured && (
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {language === 'nl' ? 'Uitgelicht' : 'Featured'}
                      </span>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {new Date(study.date).toLocaleDateString()}
                    </div>
                    <span className="text-accent text-sm font-medium inline-flex items-center">
                      {language === 'nl' ? 'Bekijk Project' : 'View Case'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </CardFooter>
                </Card>
              </a>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="blog">
          <h2 className="text-2xl font-semibold mb-4">{language === 'nl' ? 'Blog Berichten' : 'Blog Posts'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <a 
                key={post.slug} 
                href={`/blog/${post.slug}`} 
                className="block transition-transform hover:scale-[1.02] duration-300"
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{language === 'nl' ? 'Door' : 'By'} {post.author} • {new Date(post.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-accent text-sm font-medium inline-flex items-center">
                      {language === 'nl' ? 'Lees meer' : 'Read more'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </CardFooter>
                </Card>
              </a>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="services">
          <h2 className="text-2xl font-semibold mb-4">{language === 'nl' ? 'Diensten' : 'Services'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <a 
                key={service.slug} 
                href={`/services/${service.slug}`} 
                className="block transition-transform hover:scale-[1.02] duration-300"
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>
                      <i className={service.icon}></i>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="mb-4">{service.short_description}</p>
                    {service.features && Array.isArray(service.features) && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">{language === 'nl' ? 'Kenmerken:' : 'Features:'}</h4>
                        <ul className="list-disc list-inside">
                          {service.features.slice(0, 3).map((feature: any, index: number) => (
                            <li key={index}>{feature.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      {service.tech_stack && Array.isArray(service.tech_stack) && service.tech_stack.length > 0 ? (
                        <span>
                          {language === 'nl' ? 'Technologie: ' : 'Technology: '} 
                          {service.tech_stack[0].name}
                          {service.tech_stack.length > 1 ? '...' : ''}
                        </span>
                      ) : null}
                    </div>
                    <span className="text-accent text-sm font-medium inline-flex items-center">
                      {language === 'nl' ? 'Bekijk Service' : 'View Service'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </CardFooter>
                </Card>
              </a>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Blogs;