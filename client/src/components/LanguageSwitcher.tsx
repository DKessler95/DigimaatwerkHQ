import { useLanguage } from '@/lib/languageContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { GlobeIcon } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <GlobeIcon className="h-4 w-4" />
          <span className="hidden md:inline">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLanguage('nl')}
          className={`${language === 'nl' ? 'bg-accent/10 font-medium' : ''}`}
        >
          🇳🇱 {t('language.dutch')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={`${language === 'en' ? 'bg-accent/10 font-medium' : ''}`}
        >
          🇬🇧 {t('language.english')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;