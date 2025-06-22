import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

const PrivacyPolicy = () => {
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
            {language === 'nl' ? 'Privacybeleid' : 'Privacy Policy'}
          </h1>

          {language === 'nl' ? (
            // Dutch version
            <div className="prose prose-invert max-w-none prose-headings:font-header prose-p:text-foreground/80">
              <h2 className="text-2xl font-bold mt-8 mb-4">Uw privacy bij Digimaatwerk</h2>
              <p>
                Digimaatwerk respecteert uw privacy en verwerkt uw gegevens in overeenstemming met de Algemene 
                Verordening Gegevensbescherming (AVG). In dit privacybeleid leggen wij uit welke persoonlijke 
                gegevens wij verwerken, waarom we dat doen en hoe we uw gegevens beschermen.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-2">Welke gegevens verwerken wij?</h3>
              <p>Wij kunnen de volgende gegevens verwerken:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Naam</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer</li>
                <li>IP-adres</li>
                <li>Browsinggedrag (cookies)</li>
                <li>Projectinformatie die u verstrekt via onze formulieren</li>
              </ul>

              <h3 className="text-xl font-bold mt-6 mb-2">Waarom verwerken wij uw gegevens?</h3>
              <p>Wij verwerken uw gegevens voor de volgende doeleinden:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Om contact met u op te nemen over uw projectaanvraag</li>
                <li>Voor het leveren van onze diensten, zoals webontwikkeling en automatisering</li>
                <li>Voor het verbeteren van onze website en diensten</li>
                <li>Om te voldoen aan wettelijke verplichtingen</li>
              </ul>

              <h3 className="text-xl font-bold mt-6 mb-2">Wie heeft toegang tot uw gegevens?</h3>
              <p>
                Uw gegevens worden alleen gedeeld met derden indien noodzakelijk voor het uitvoeren van onze diensten, 
                zoals hostingproviders of betalingsverwerkers. Wij zorgen ervoor dat deze partijen voldoen aan de AVG.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-2">Hoe lang bewaren wij uw gegevens?</h3>
              <p>
                Uw gegevens worden bewaard zolang als nodig is om de bovengenoemde doeleinden te bereiken. 
                Wij verwijderen uw gegevens zodra deze niet meer nodig zijn.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-2">Uw rechten</h3>
              <p>U heeft het recht om:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Uw gegevens in te zien</li>
                <li>Uw gegevens te wijzigen of te verwijderen</li>
                <li>Bezwaar te maken tegen verwerking</li>
                <li>Uw toestemming in te trekken</li>
              </ul>

              <h3 className="text-xl font-bold mt-6 mb-2">Cookies</h3>
              <p>
                Onze website gebruikt cookies om uw ervaring te verbeteren. Wij onderscheiden de volgende soorten cookies:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Noodzakelijke cookies:</strong> Essentieel voor het functioneren van de website</li>
                <li><strong>Analytische cookies:</strong> Helpen ons begrijpen hoe bezoekers de website gebruiken</li>
                <li><strong>Marketing cookies:</strong> Gebruikt voor het tonen van relevante advertenties</li>
                <li><strong>Voorkeurscookies:</strong> Onthouden uw voorkeuren en instellingen</li>
              </ul>
              <p>
                U kunt uw cookie-voorkeuren beheren via de cookie-instellingen die verschijnen bij uw eerste bezoek aan onze website.
              </p>

              <p>
                Voor vragen of verzoeken kunt u contact opnemen via{' '}
                <a href="mailto:info@digimaatwerk.nl" className="text-accent hover:underline">
                  info@digimaatwerk.nl
                </a>
                .
              </p>
            </div>
          ) : (
            // English version
            <div className="prose prose-invert max-w-none prose-headings:font-header prose-p:text-foreground/80">
              <h2 className="text-2xl font-bold mt-8 mb-4">Your Privacy at Digimaatwerk</h2>
              <p>
                Digimaatwerk respects your privacy and processes your data in accordance with the General 
                Data Protection Regulation (GDPR). This privacy policy explains what personal data we process, 
                why we do so, and how we protect your data.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-2">What data do we process?</h3>
              <p>We may process the following data:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>IP address</li>
                <li>Browsing behavior (cookies)</li>
                <li>Project information provided through our forms</li>
              </ul>

              <h3 className="text-xl font-bold mt-6 mb-2">Why do we process your data?</h3>
              <p>We process your data for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>To contact you regarding your project inquiry</li>
                <li>To deliver our services, such as web development and automation</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h3 className="text-xl font-bold mt-6 mb-2">Who has access to your data?</h3>
              <p>
                Your data will only be shared with third parties if necessary to perform our services, 
                such as hosting providers or payment processors. We ensure these parties comply with GDPR.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-2">How long do we retain your data?</h3>
              <p>
                Your data is retained for as long as necessary to achieve the aforementioned purposes. 
                We delete your data when it is no longer needed.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-2">Your rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your data</li>
                <li>Modify or delete your data</li>
                <li>Object to processing</li>
                <li>Withdraw your consent</li>
              </ul>

              <h3 className="text-xl font-bold mt-6 mb-2">Cookies</h3>
              <p>
                Our website uses cookies to improve your experience. We distinguish between the following types of cookies:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Necessary cookies:</strong> Essential for the website to function</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use the website</li>
                <li><strong>Marketing cookies:</strong> Used to show relevant advertisements</li>
                <li><strong>Preference cookies:</strong> Remember your preferences and settings</li>
              </ul>
              <p>
                You can manage your cookie preferences through the cookie settings that appear when you first visit our website.
              </p>

              <p>
                For questions or requests, please contact us at{' '}
                <a href="mailto:info@digimaatwerk.nl" className="text-accent hover:underline">
                  info@digimaatwerk.nl
                </a>
                .
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

export default PrivacyPolicy;