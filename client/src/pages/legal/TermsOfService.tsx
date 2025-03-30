import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';

const TermsOfService = () => {
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
            {language === 'nl' ? 'Algemene Voorwaarden' : 'Terms of Service'}
          </h1>

          {language === 'nl' ? (
            // Dutch version
            <div className="prose prose-invert max-w-none prose-headings:font-header prose-p:text-foreground/80">
              <h2 className="text-2xl font-bold mt-8 mb-4">Algemene voorwaarden van Digimaatwerk</h2>
              
              <p>
                Door gebruik te maken van onze website en diensten gaat u akkoord met deze algemene voorwaarden. 
                Deze voorwaarden regelen het gebruik van onze website, de levering van diensten en uw rechten als klant.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">1. Definities</h3>
              <p>
                In deze algemene voorwaarden wordt verstaan onder:<br />
                <strong>Digimaatwerk:</strong> de onderneming gevestigd te Amsterdam, ingeschreven bij de Kamer van Koophandel.<br />
                <strong>Klant:</strong> de natuurlijke persoon of rechtspersoon die een overeenkomst aangaat met Digimaatwerk.<br />
                <strong>Diensten:</strong> alle diensten die door Digimaatwerk worden aangeboden, waaronder webontwikkeling, 
                chatbot-implementatie en workflowautomatisering.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">2. Toepasselijkheid</h3>
              <p>
                Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en leveringen 
                van Digimaatwerk, tenzij uitdrukkelijk schriftelijk anders is overeengekomen.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">3. Offertes en aanbiedingen</h3>
              <p>
                Alle offertes en aanbiedingen van Digimaatwerk zijn vrijblijvend, tenzij in de offerte een termijn 
                voor aanvaarding is gesteld. Een offerte of aanbieding vervalt indien het product waarop de offerte 
                of de aanbieding betrekking heeft in de tussentijd niet meer beschikbaar is.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">4. Uitvoering van de overeenkomst</h3>
              <p>
                Digimaatwerk zal de overeenkomst naar beste inzicht en vermogen en overeenkomstig de eisen van goed 
                vakmanschap uitvoeren. Digimaatwerk heeft het recht bepaalde werkzaamheden te laten verrichten door derden.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">5. Betaling en incassokosten</h3>
              <p>
                Betaling dient steeds te geschieden binnen 14 dagen na factuurdatum. Indien de klant in gebreke blijft in de 
                tijdige betaling van een factuur, dan is de klant van rechtswege in verzuim.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">6. Intellectuele eigendom</h3>
              <p>
                Digimaatwerk behoudt zich de rechten en bevoegdheden voor die hem toekomen op grond van de Auteurswet en 
                andere intellectuele wet- en regelgeving. Digimaatwerk heeft het recht de door de uitvoering van een 
                overeenkomst aan zijn zijde toegenomen kennis ook voor andere doeleinden te gebruiken.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">7. Aansprakelijkheid</h3>
              <p>
                Indien Digimaatwerk aansprakelijk mocht zijn, dan is deze aansprakelijkheid beperkt tot hetgeen in deze 
                bepaling is geregeld. Digimaatwerk is niet aansprakelijk voor schade, van welke aard ook, ontstaan doordat 
                Digimaatwerk is uitgegaan van door of namens de klant verstrekte onjuiste en/of onvolledige gegevens.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">8. Toepasselijk recht en geschillen</h3>
              <p>
                Op alle rechtsbetrekkingen waarbij Digimaatwerk partij is, is uitsluitend het Nederlands recht van toepassing. 
                De rechter in de vestigingsplaats van Digimaatwerk is bij uitsluiting bevoegd van geschillen kennis te nemen.
              </p>
              
              <p className="mt-8">
                Voor vragen over onze algemene voorwaarden kunt u contact opnemen via{' '}
                <a href="mailto:info@digimaatwerk.nl" className="text-accent hover:underline">
                  info@digimaatwerk.nl
                </a>
                .
              </p>
            </div>
          ) : (
            // English version
            <div className="prose prose-invert max-w-none prose-headings:font-header prose-p:text-foreground/80">
              <h2 className="text-2xl font-bold mt-8 mb-4">Terms and Conditions of Digimaatwerk</h2>
              
              <p>
                By using our website and services, you agree to these terms and conditions. 
                These terms govern the use of our website, the delivery of services, and your rights as a customer.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">1. Definitions</h3>
              <p>
                In these terms and conditions:<br />
                <strong>Digimaatwerk:</strong> the company located in Amsterdam, registered with the Chamber of Commerce.<br />
                <strong>Customer:</strong> the natural person or legal entity that enters into an agreement with Digimaatwerk.<br />
                <strong>Services:</strong> all services offered by Digimaatwerk, including web development, 
                chatbot implementation, and workflow automation.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">2. Applicability</h3>
              <p>
                These terms and conditions apply to all offers, agreements, and deliveries 
                by Digimaatwerk, unless explicitly agreed otherwise in writing.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">3. Quotes and offers</h3>
              <p>
                All quotes and offers from Digimaatwerk are non-binding, unless a deadline 
                for acceptance has been set in the offer. A quote or offer expires if the product 
                to which the quote or offer relates is no longer available.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">4. Execution of the agreement</h3>
              <p>
                Digimaatwerk will execute the agreement to the best of its knowledge and ability and in accordance 
                with the requirements of good workmanship. Digimaatwerk has the right to have certain work performed by third parties.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">5. Payment and collection costs</h3>
              <p>
                Payment must always be made within 14 days of the invoice date. If the customer fails to make 
                timely payment of an invoice, the customer is legally in default.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">6. Intellectual property</h3>
              <p>
                Digimaatwerk reserves the rights and powers that accrue to it under the Copyright Act and 
                other intellectual property laws and regulations. Digimaatwerk has the right to use the knowledge 
                gained through the execution of an agreement for other purposes.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">7. Liability</h3>
              <p>
                If Digimaatwerk is liable, this liability is limited to what is regulated in this provision. 
                Digimaatwerk is not liable for damage of any kind resulting from Digimaatwerk relying on 
                incorrect and/or incomplete information provided by or on behalf of the customer.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">8. Applicable law and disputes</h3>
              <p>
                Dutch law exclusively applies to all legal relationships to which Digimaatwerk is a party. 
                The court in Digimaatwerk's place of business has exclusive jurisdiction to hear disputes.
              </p>
              
              <p className="mt-8">
                For questions about our terms and conditions, please contact us at{' '}
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

export default TermsOfService;