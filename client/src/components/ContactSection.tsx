import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/languageContext';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  consent: boolean;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  message: '',
  consent: false
};

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: language === 'nl' ? "Toestemming vereist" : "Consent required",
        description: language === 'nl' ? "Accepteer de privacyverklaring om het formulier te verzenden." : "Please accept the privacy policy to submit the form.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Submit the form data to the API  
      console.log('Submitting form data:', formData);
      await apiRequest('POST', '/api/contact', formData);
      
      toast({
        title: language === 'nl' ? "Bericht verzonden!" : "Message sent!",
        description: language === 'nl' ? "Bedankt voor je bericht. We nemen snel contact met je op." : "Thanks for reaching out. We'll get back to you soon."
      });
      
      // Reset the form
      setFormData(initialFormData);
    } catch (error) {
      toast({
        title: language === 'nl' ? "Fout" : "Error",
        description: language === 'nl' ? "Er is iets misgegaan. Probeer het later opnieuw." : "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-accent to-primary"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-header font-bold mb-4">
            {language === 'nl' ? 'Neem Contact Op' : 'Get in Touch'}
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {language === 'nl' 
              ? 'Klaar om je digitale transformatie te starten? Neem vandaag nog contact met ons op.' 
              : 'Ready to start your digital transformation journey? Contact us today.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 bg-secondary/80 backdrop-blur-md rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-foreground/80 mb-2">
                    {language === 'nl' ? 'Naam' : 'Name'}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    className="w-full bg-primary border border-secondary p-3 rounded-lg text-foreground focus:outline-none focus:border-accent" 
                    placeholder={language === 'nl' ? 'Jouw naam' : 'Your name'}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-foreground/80 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="w-full bg-primary border border-secondary p-3 rounded-lg text-foreground focus:outline-none focus:border-accent" 
                    placeholder={language === 'nl' ? "jouw@email.nl" : "your@email.com"}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-foreground/80 mb-2">
                  {language === 'nl' ? 'Bedrijf' : 'Company'}
                </label>
                <input 
                  type="text" 
                  id="company" 
                  name="company"
                  className="w-full bg-primary border border-secondary p-3 rounded-lg text-foreground focus:outline-none focus:border-accent" 
                  placeholder={language === 'nl' ? 'Jouw bedrijfsnaam' : 'Your company name'}
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="projectType" className="block text-foreground/80 mb-2">
                  {language === 'nl' ? 'Type project' : 'Project Type'}
                </label>
                <select 
                  id="projectType" 
                  name="projectType"
                  className="w-full bg-primary border border-secondary p-3 rounded-lg text-foreground focus:outline-none focus:border-accent"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option value="">{language === 'nl' ? 'Selecteer project type' : 'Select project type'}</option>
                  <option value="chatbot">AI Chatbot</option>
                  <option value="automation">
                    {language === 'nl' ? 'Werkstroom Automatisering' : 'Workflow Automation'}
                  </option>
                  <option value="web">
                    {language === 'nl' ? 'Webontwikkeling' : 'Web Development'}
                  </option>
                  <option value="other">
                    {language === 'nl' ? 'Anders' : 'Other'}
                  </option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-foreground/80 mb-2">
                  {language === 'nl' ? 'Bericht' : 'Message'}
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={4} 
                  className="w-full bg-primary border border-secondary p-3 rounded-lg text-foreground focus:outline-none focus:border-accent" 
                  placeholder={language === 'nl' ? 'Vertel ons over jouw project' : 'Tell us about your project'}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="consent" 
                  name="consent"
                  className="mt-1 mr-3"
                  checked={formData.consent}
                  onChange={handleCheckboxChange}
                  required
                />
                <label htmlFor="consent" className="text-sm text-foreground/70">
                  {language === 'nl' 
                    ? <>Ik geef toestemming aan Digimaatwerk om mijn gegevens te verwerken in overeenstemming met het <a href="/privacy-policy" className="text-accent hover:underline">Privacybeleid</a>. Deze site wordt beschermd door reCAPTCHA en het Google <a href="/google-privacy-policy" className="text-accent hover:underline">Privacybeleid</a> en de <a href="/terms-of-service" className="text-accent hover:underline">Servicevoorwaarden</a> zijn van toepassing.</>
                    : <>I consent to Digimaatwerk processing my data in accordance with the <a href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</a>. This site is protected by reCAPTCHA and the Google <a href="/google-privacy-policy" className="text-accent hover:underline">Privacy Policy</a> and <a href="/terms-of-service" className="text-accent hover:underline">Terms of Service</a> apply.</>
                  }
                </label>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-accent text-primary font-header font-medium rounded-lg transition hover:bg-accent/90 disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === 'nl' ? "Verzenden..." : "Sending...") 
                    : (language === 'nl' ? "Verstuur Bericht" : "Send Message")
                  }
                </button>
              </div>
            </form>
          </motion.div>
          
          <motion.div 
            className="bg-secondary/80 backdrop-blur-md rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            
            <h3 className="text-xl font-header font-semibold mb-6 text-center">
              {language === 'nl' ? 'Contactgegevens' : 'Contact Information'}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mr-4">
                  <i className="ri-map-pin-line text-accent"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{language === 'nl' ? 'Adres' : 'Address'}</h4>
                  <p className="text-foreground/70">Star Numanstraat 79a<br />9714JL Groningen<br />{language === 'nl' ? 'Nederland' : 'The Netherlands'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mr-4">
                  <i className="ri-mail-line text-accent"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a href="mailto:info@digimaatwerk.nl" className="text-foreground/70 hover:text-accent">info@digimaatwerk.nl</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mr-4">
                  <i className="ri-phone-line text-accent"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{language === 'nl' ? 'Telefoon' : 'Phone'}</h4>
                  <a href="tel:+31637353483" className="text-foreground/70 hover:text-accent">+31 637353483</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mr-4">
                  <i className="ri-whatsapp-line text-accent"></i>
                </div>
                <div>
                  <h4 className="font-medium mb-1">WhatsApp</h4>
                  <a href="https://wa.me/31637353483" className="text-foreground/70 hover:text-accent">
                    {language === 'nl' ? 'Stuur een bericht' : 'Send a message'}
                  </a>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-header font-semibold mt-10 mb-6 text-center">
              {language === 'nl' ? 'Volg Ons' : 'Follow Us'}
            </h3>
            <div className="flex justify-center space-x-4">
              <a href="https://linkedin.com/company/digimaatwerk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center hover:bg-accent/30 transition">
                <i className="ri-linkedin-fill text-accent"></i>
              </a>
              <a href="https://instagram.com/digimaatwerk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center hover:bg-accent/30 transition">
                <i className="ri-instagram-fill text-accent"></i>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
