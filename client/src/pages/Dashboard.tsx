import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { apiRequest } from '@/lib/queryClient';

interface ContentItem {
  slug: string;
  title: string;
  status?: 'draft' | 'published';
}

interface ContentSectionProps {
  title: string;
  items: ContentItem[];
  contentType: 'case-studies' | 'blog' | 'services' | 'portfolio';
  onEdit: (item: ContentItem) => void;
  onDelete: (item: ContentItem) => void;
  onPublish: (item: ContentItem) => void;
  onRevoke: (item: ContentItem) => void;
  onCreateNew: () => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  items,
  contentType,
  onEdit,
  onDelete,
  onPublish,
  onRevoke,
  onCreateNew
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button 
          onClick={onCreateNew}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Nieuwe {title.slice(0, -1)}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Titel</th>
              <th className="py-3 px-4 text-left">Slug</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Acties</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.slug} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">{item.slug}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`h-2 w-2 rounded-full mr-1 ${
                        item.status === 'published' ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      {item.status === 'published' ? 'Live' : 'Concept'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => onEdit(item)} 
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      {item.status === 'published' ? (
                        <button 
                          onClick={() => onRevoke(item)} 
                          className="text-orange-600 hover:text-orange-800"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button 
                          onClick={() => onPublish(item)} 
                          className="text-green-600 hover:text-green-800"
                        >
                          Publish
                        </button>
                      )}
                      <button 
                        onClick={() => onDelete(item)} 
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 px-4 text-center text-gray-500">
                  Geen {title.toLowerCase()} gevonden
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'case-studies' | 'blog' | 'services' | 'portfolio';
  item?: ContentItem;
  onSave: (data: any) => void;
}

const EditorModal: React.FC<EditorModalProps> = ({
  isOpen,
  onClose,
  contentType,
  item,
  onSave
}) => {
  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    content: '',
    // Andere algemene velden
  });

  useEffect(() => {
    if (item) {
      // Haal de volledige item gegevens op als we een bestaand item bewerken
      apiRequest('GET', `/api/${contentType}/${item.slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setFormData(data.data);
          }
        });
    } else {
      // Reset voor een nieuw item
      setFormData({
        title: '',
        slug: '',
        content: '',
        // Andere velden resetten
      });
    }
  }, [item, contentType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {item ? `Bewerk ${contentType === 'case-studies' ? 'Case Study' : 
                       contentType === 'blog' ? 'Blog Post' : 
                       contentType === 'portfolio' ? 'Portfolio Item' : 'Service'}` : 
                     `Nieuwe ${contentType === 'case-studies' ? 'Case Study' : 
                             contentType === 'blog' ? 'Blog Post' : 
                             contentType === 'portfolio' ? 'Portfolio Item' : 'Service'}`}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titel</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  name="content"
                  value={formData.content || ''}
                  onChange={handleChange}
                  rows={10}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                ></textarea>
              </div>

              {/* Afhankelijk van contentType, toon extra velden hier */}
              {contentType === 'case-studies' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Client</label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      name="category"
                      value={formData.category || 'Webontwikkeling'}
                      onChange={handleChange as any}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                    >
                      <option value="AI & Chatbots">AI & Chatbots</option>
                      <option value="Automatisering">Automatisering</option>
                      <option value="Webontwikkeling">Webontwikkeling</option>
                    </select>
                  </div>
                </>
              )}

              {contentType === 'services' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Icon</label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                  />
                </div>
              )}

              {contentType === 'blog' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                  />
                </div>
              )}
              
              {contentType === 'portfolio' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website URL</label>
                    <input
                      type="text"
                      name="websiteUrl"
                      value={formData.websiteUrl || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      name="category"
                      value={formData.category || 'web'}
                      onChange={handleChange as any}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                    >
                      <option value="web">Web</option>
                      <option value="automation">Automatisering</option>
                      <option value="chatbot">Chatbot</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Featured</label>
                    <select
                      name="featured"
                      value={formData.featured ? 'true' : 'false'}
                      onChange={handleChange as any}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                    >
                      <option value="true">Ja</option>
                      <option value="false">Nee</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded"
              >
                Annuleren
              </button>
              <button
                type="submit"
                className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded"
              >
                Opslaan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [caseStudies, setCaseStudies] = useState<ContentItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<ContentItem[]>([]);
  const [services, setServices] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentContentType, setCurrentContentType] = useState<'case-studies' | 'blog' | 'services' | 'portfolio'>('case-studies');
  const [currentItem, setCurrentItem] = useState<ContentItem | undefined>();
  const [portfolioItems, setPortfolioItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    // Haal alle content op bij het laden van de pagina
    const fetchAllContent = async () => {
      setLoading(true);
      try {
        const [caseStudiesRes, blogRes, servicesRes, portfolioRes] = await Promise.all([
          apiRequest('GET', '/api/case-studies').then(res => res.json()),
          apiRequest('GET', '/api/blog').then(res => res.json()),
          apiRequest('GET', '/api/services').then(res => res.json()),
          apiRequest('GET', '/api/portfolio').then(res => res.json())
        ]);

        // Voeg statussen toe (normaliter zou dit van de server komen)
        const caseStudiesWithStatus = caseStudiesRes.data.map((item: any) => ({
          ...item,
          status: Math.random() > 0.5 ? 'published' : 'draft' // Willekeurige status voor nu
        }));
        
        const blogWithStatus = blogRes.data.map((item: any) => ({
          ...item,
          status: Math.random() > 0.5 ? 'published' : 'draft'
        }));
        
        const servicesWithStatus = servicesRes.data.map((item: any) => ({
          ...item,
          status: Math.random() > 0.5 ? 'published' : 'draft'
        }));
        
        const portfolioWithStatus = portfolioRes.data.map((item: any) => ({
          ...item,
          slug: item.id, // Voor portfolio items gebruiken we 'id' als slug
          status: Math.random() > 0.5 ? 'published' : 'draft'
        }));

        setCaseStudies(caseStudiesWithStatus);
        setBlogPosts(blogWithStatus);
        setServices(servicesWithStatus);
        setPortfolioItems(portfolioWithStatus);
      } catch (err) {
        setError('Er is een fout opgetreden bij het laden van de content.');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  const openEditor = (contentType: 'case-studies' | 'blog' | 'services' | 'portfolio', item?: ContentItem) => {
    setCurrentContentType(contentType);
    setCurrentItem(item);
    setEditorOpen(true);
  };

  const handleSave = async (data: any) => {
    // Implementeer hier de daadwerkelijke opslag logica
    console.log('Saving:', currentContentType, data);
    
    try {
      // Voor bestaande items
      if (currentItem) {
        // Update logica implementeren
        // await apiRequest('PUT', `/api/${currentContentType}/${currentItem.slug}`, data);
        alert(`${currentContentType} bijgewerkt! (Simulatie)`);
      } else {
        // Creatie logica implementeren
        // await apiRequest('POST', `/api/${currentContentType}`, data);
        alert(`Nieuwe ${currentContentType} aangemaakt! (Simulatie)`);
      }

      // Herlaad data
      // Voor nu simuleren we een update in de lokale staat
      if (currentContentType === 'case-studies') {
        if (currentItem) {
          setCaseStudies(prev => prev.map(item => 
            item.slug === currentItem.slug ? {...data, status: item.status} : item
          ));
        } else {
          setCaseStudies(prev => [...prev, {...data, status: 'draft'}]);
        }
      } else if (currentContentType === 'blog') {
        if (currentItem) {
          setBlogPosts(prev => prev.map(item => 
            item.slug === currentItem.slug ? {...data, status: item.status} : item
          ));
        } else {
          setBlogPosts(prev => [...prev, {...data, status: 'draft'}]);
        }
      } else if (currentContentType === 'services') {
        if (currentItem) {
          setServices(prev => prev.map(item => 
            item.slug === currentItem.slug ? {...data, status: item.status} : item
          ));
        } else {
          setServices(prev => [...prev, {...data, status: 'draft'}]);
        }
      } else if (currentContentType === 'portfolio') {
        if (currentItem) {
          setPortfolioItems(prev => prev.map(item => 
            item.slug === currentItem.slug ? {...data, status: item.status} : item
          ));
        } else {
          setPortfolioItems(prev => [...prev, {...data, status: 'draft'}]);
        }
      }
      
      setEditorOpen(false);
    } catch (err) {
      console.error('Error saving content:', err);
      alert('Er is een fout opgetreden bij het opslaan.');
    }
  };

  const handleDelete = (contentType: 'case-studies' | 'blog' | 'services' | 'portfolio', item: ContentItem) => {
    // Implementeer hier de daadwerkelijke verwijderlogica
    if (window.confirm(`Weet je zeker dat je deze ${
      contentType === 'case-studies' ? 'case study' : 
      contentType === 'blog' ? 'blog post' : 
      contentType === 'portfolio' ? 'portfolio item' : 'service'
    } wilt verwijderen?`)) {
      console.log('Deleting:', contentType, item);
      
      // Simuleer verwijdering in de lokale staat
      if (contentType === 'case-studies') {
        setCaseStudies(prev => prev.filter(i => i.slug !== item.slug));
      } else if (contentType === 'blog') {
        setBlogPosts(prev => prev.filter(i => i.slug !== item.slug));
      } else if (contentType === 'services') {
        setServices(prev => prev.filter(i => i.slug !== item.slug));
      } else if (contentType === 'portfolio') {
        setPortfolioItems(prev => prev.filter(i => i.slug !== item.slug));
      }
      
      alert(`${contentType} verwijderd! (Simulatie)`);
    }
  };

  const handleStatusChange = (contentType: 'case-studies' | 'blog' | 'services' | 'portfolio', item: ContentItem, newStatus: 'draft' | 'published') => {
    // Implementeer hier de daadwerkelijke statuswijziging
    console.log('Changing status:', contentType, item, newStatus);
    
    // Simuleer statuswijziging in de lokale staat
    if (contentType === 'case-studies') {
      setCaseStudies(prev => prev.map(i => 
        i.slug === item.slug ? {...i, status: newStatus} : i
      ));
    } else if (contentType === 'blog') {
      setBlogPosts(prev => prev.map(i => 
        i.slug === item.slug ? {...i, status: newStatus} : i
      ));
    } else if (contentType === 'services') {
      setServices(prev => prev.map(i => 
        i.slug === item.slug ? {...i, status: newStatus} : i
      ));
    } else if (contentType === 'portfolio') {
      setPortfolioItems(prev => prev.map(i => 
        i.slug === item.slug ? {...i, status: newStatus} : i
      ));
    }
    
    alert(`Status gewijzigd naar ${newStatus}! (Simulatie)`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Probeer opnieuw
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Beheer hier al je content</p>
      </header>

      <ContentSection
        title="Case Studies"
        items={caseStudies}
        contentType="case-studies"
        onEdit={(item) => openEditor('case-studies', item)}
        onDelete={(item) => handleDelete('case-studies', item)}
        onPublish={(item) => handleStatusChange('case-studies', item, 'published')}
        onRevoke={(item) => handleStatusChange('case-studies', item, 'draft')}
        onCreateNew={() => openEditor('case-studies')}
      />

      <ContentSection
        title="Blog Posts"
        items={blogPosts}
        contentType="blog"
        onEdit={(item) => openEditor('blog', item)}
        onDelete={(item) => handleDelete('blog', item)}
        onPublish={(item) => handleStatusChange('blog', item, 'published')}
        onRevoke={(item) => handleStatusChange('blog', item, 'draft')}
        onCreateNew={() => openEditor('blog')}
      />

      <ContentSection
        title="Services"
        items={services}
        contentType="services"
        onEdit={(item) => openEditor('services', item)}
        onDelete={(item) => handleDelete('services', item)}
        onPublish={(item) => handleStatusChange('services', item, 'published')}
        onRevoke={(item) => handleStatusChange('services', item, 'draft')}
        onCreateNew={() => openEditor('services')}
      />

      <ContentSection
        title="Portfolio Items"
        items={portfolioItems}
        contentType="portfolio"
        onEdit={(item) => openEditor('portfolio', item)}
        onDelete={(item) => handleDelete('portfolio', item)}
        onPublish={(item) => handleStatusChange('portfolio', item, 'published')}
        onRevoke={(item) => handleStatusChange('portfolio', item, 'draft')}
        onCreateNew={() => openEditor('portfolio')}
      />

      <EditorModal
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        contentType={currentContentType}
        item={currentItem}
        onSave={handleSave}
      />
    </div>
  );
};

export default Dashboard;