# Digimaatwerk Project Calculator Prijsstructuur

## Basisprijs per Project Type en Schaal

### Website / App
| Schaal     | Prijs    | Beschrijving                            |
|------------|----------|----------------------------------------|
| Klein      | €650     | Basis website (tot 5 pagina's)          |
| Middel     | €1.250   | Geavanceerde website (tot 10 pagina's)  |
| Groot      | €2.500   | Maatwerk applicatie                     |

### AI & Chatbot
De prijs wordt berekend als `website prijs × 1.2`
| Schaal     | Berekening       | Prijs      |
|------------|------------------|------------|
| Klein      | €650 × 1.2       | €780       |
| Middel     | €1.250 × 1.2     | €1.500     |
| Groot      | €2.500 × 1.2     | €3.000     |

### Automatisering
De prijs wordt berekend als `website prijs × 1.3`
| Schaal     | Berekening       | Prijs      |
|------------|------------------|------------|
| Klein      | €650 × 1.3       | €845       |
| Middel     | €1.250 × 1.3     | €1.625     |
| Groot      | €2.500 × 1.3     | €3.250     |

### Gecombineerd Project
De prijs wordt berekend als `website prijs × 2.5`
| Schaal     | Berekening       | Prijs      |
|------------|------------------|------------|
| Klein      | €650 × 2.5       | €1.625     |
| Middel     | €1.250 × 2.5     | €3.125     |
| Groot      | €2.500 × 2.5     | €6.250     |

## Aanvullende Features per Project Type

### Website / App Features
| Feature                                  | Prijs    |
|------------------------------------------|----------|
| Contactformulier met email service       | €100     |
| Extra pagina's (per 5)                   | €150     |
| Blog functionaliteit                     | €350     |
| Gebruikersauthenticatie                  | €450     |
| E-commerce functionaliteit               | €850     |
| CMS systeem                              | €550     |
| Meertalige website                       | €100     |
| 3D visualisaties (Start van)             | €100     |

### AI & Chatbot Features
| Feature                                  | Prijs    |
|------------------------------------------|----------|
| Basis chatbot (FAQ)                      | €500     |
| Meertalige chatbot                       | €200     |
| CRM-integratie                           | €300     |
| Geavanceerde AI-functionaliteit (NLU/NLP)| €750     |
| Chatbot met betalingsverwerking          | €600     |
| Analytics dashboard                      | €350     |

### Automatisering Features
| Feature                                  | Prijs    |
|------------------------------------------|----------|
| Workflow automatisering                  | €400     |
| Integratie met bestaande tools           | €300     |
| Automatische e-mailflows                 | €250     |
| Data-analyse en rapportage               | €500     |
| Realtime meldingen                       | €200     |

### Gecombineerd Project Features
| Feature                                  | Prijs    |
|------------------------------------------|----------|
| Website met chatbot integratie           | €1.000   |
| Automatisering gekoppeld aan website     | €750     |
| E-commerce met AI-aanbevelingen          | €1.200   |
| Dynamische content op basis van AI       | €900     |
| Contactformulier met email service       | €100     |
| Meertalige website                       | €100     |

## Tijdlijn Prioriteit Multipliers
| Prioriteit | Tijdsreductie | Prijsmultiplier |
|------------|---------------|----------------|
| Standaard  | 0%            | 1.0            |
| Versneld   | 25%           | 1.25           |
| Spoed      | 40%           | 1.5            |

## Support Pakketten (Maandelijkse kosten)
| Support Package | Prijs/maand |
|----------------|-------------|
| Geen           | €0          |
| Basic          | €29         |
| Standaard      | €69         |
| Premium        | €129        |

## Prijsberekening Formule

De totale projectprijs wordt berekend met de volgende formule:

```
TotaalPrijs = (BasisPrijs + FeaturesKosten) × TijdlijnMultiplier
```

Het resultaat wordt met een marge van ±5% weergegeven om flexibiliteit te bieden:
- Minimum prijs = TotaalPrijs × 0.95
- Maximum prijs = TotaalPrijs × 1.05

De maandelijkse support kosten worden apart weergegeven.

## Tijdlijn Berekening (in weken)

De tijdlijn wordt berekend op basis van de volgende formule:

```
BasisTijd = 
  - Klein project: 2 weken
  - Middel project: 4 weken
  - Groot project: 6 weken

FeaturesTijd = Aantal geselecteerde features ÷ 2 (afgerond naar boven)

TotaleTijd = (BasisTijd + FeaturesTijd) × TijdlijnMultiplier
```

Het resultaat wordt met een marge van ±10% weergegeven:
- Minimum tijd = TotaleTijd × 0.9 (minimaal 1 week)
- Maximum tijd = TotaleTijd × 1.1

## Code Implementatie
De relevante JavaScript code voor de prijsstructuur in het project calculator component is als volgt:

```javascript
// Prijzen per schaal en type
const getBasePrice = (): number => {
  // Website type prijzen
  if (projectType === 'web') {
    if (projectScale === 'basic') {
      return 650; // Basis website: €650
    } else if (projectScale === 'advanced') {
      return 1250; // Geavanceerde website: €1250
    } else if (projectScale === 'custom') {
      return 2500; // Maatwerk website: €2500
    }
  }
  
  // Voor andere project types
  const typeMultiplier = {
    chatbot: 1.2,
    automation: 1.3,
    web: 1,
    combined: 2.5
  };
  
  const scaleBase = {
    basic: 650,
    advanced: 1250,
    custom: 2500
  };
  
  return scaleBase[projectScale] * typeMultiplier[projectType];
};

// Tijdlijn multipliers
const getRushMultiplier = (): number => {
  const multipliers = {
    1: 1,    // Standaard
    2: 1.25, // Versneld
    3: 1.5   // Spoed
  };
  
  return multipliers[timelinePriority];
};
```

## Aanpassen van de Prijsstructuur

Om de prijsstructuur aan te passen, kunt u de volgende wijzigingen aanbrengen in het `ProjectCalculator.tsx` bestand:

1. **Aanpassen basisprijs per type en schaal**:
   - Wijzig de waarden in `scaleBase` object
   - Wijzig de typeMultiplier-waarden om de verhouding tussen verschillende projecttypes aan te passen

2. **Aanpassen feature prijzen**:
   - Zoek de betreffende feature in de arrays `webFeatures`, `chatbotFeatures`, `automationFeatures` of `combinedFeatures`
   - Wijzig de `priceImpact` waarde voor die feature

3. **Aanpassen tijdlijn multipliers**:
   - Wijzig de waarden in de `multipliers` object in de `getRushMultiplier` functie

4. **Aanpassen support pakket prijzen**:
   - Wijzig de `price` waarde in het `supportPackages` array

5. **Aanpassen van de marge**:
   - Wijzig de waarden 0.95 en 1.05 in de `calculatePrice` functie voor de prijsmarge
   - Wijzig de waarden 0.9 en 1.1 in de `calculateTimeline` functie voor de tijdlijnmarge