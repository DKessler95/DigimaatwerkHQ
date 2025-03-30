import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

const GooglePrivacyPolicy = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-primary pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-secondary/80 backdrop-blur-md rounded-2xl p-8 shadow-lg"
        >
          <h1 className="text-3xl font-header font-bold mb-8 text-center">
            {language === 'nl' ? 'Google Privacybeleid' : 'Google Privacy Policy'}
          </h1>

          {language === 'nl' ? (
            // Dutch version
            <div className="prose prose-invert max-w-none prose-headings:font-header prose-p:text-foreground/80">
              <h2 className="text-2xl font-bold mt-8 mb-4">Privacybeleid van Google</h2>
              <p>
                Ons contactformulier maakt gebruik van Google reCAPTCHA om spam te voorkomen. 
                Uw gebruik van reCAPTCHA is onderworpen aan het 
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">
                  Privacybeleid van Google
                </a> 
                en de 
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">
                  Servicevoorwaarden van Google
                </a>.
              </p>
              
              <p>
                Door gebruik te maken van ons contactformulier, stemt u in met het verzamelen en verwerken 
                van gegevens door Google, zoals beschreven in hun privacybeleid.
              </p>
              
              <p>
                Google reCAPTCHA verzamelt hardwaregegevens, software- en apparaatinformatie, en andere details
                om te bepalen of het formulier wordt ingevuld door een mens of door een geautomatiseerd systeem.
              </p>
              
              <p>
                Voor volledige informatie over de gegevens die Google verzamelt en hoe deze worden verwerkt, 
                raden wij u aan het actuele Privacybeleid van Google te lezen via de bovenstaande link.
              </p>
            </div>
          ) : (
            // English version
            <div className="prose prose-invert max-w-none prose-headings:font-header prose-p:text-foreground/80">
              <h2 className="text-2xl font-bold mt-8 mb-4">Google Privacy Policy</h2>
              <p>
                Our contact form uses Google reCAPTCHA to prevent spam. Your use of reCAPTCHA is subject to the
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">
                  Google Privacy Policy
                </a> 
                and 
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">
                  Google Terms of Service
                </a>.
              </p>
              
              <p>
                By using our contact form, you consent to the collection and processing of data by Google 
                as described in their privacy policy.
              </p>
              
              <p>
                Google reCAPTCHA collects hardware data, software and device information, and other details 
                to determine whether the form is being filled out by a human or by an automated system.
              </p>
              
              <p>
                For complete information about the data Google collects and how it is processed, 
                we recommend reading Google's current Privacy Policy via the link above.
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <a 
              href="/" 
              className="px-6 py-2 bg-accent text-primary font-medium rounded-lg transition-colors hover:bg-accent/90"
            >
              {language === 'nl' ? 'Terug naar Home' : 'Back to Home'}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GooglePrivacyPolicy;