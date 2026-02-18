import { 
  ShieldCheck, 
  LockKeyhole, 
  Copy, 
  UserRound, 
  Keyboard,
  Terminal,
  KeyRound,
  Smartphone,
  MessageSquareWarning,
  Info,
  Instagram,
  MailWarning,
  LogIn,
  FishSymbol,
  Users,
  BrainCircuit,
  Image as ImageIcon,
  QrCode,
  Siren,
  MousePointerClick,
  UserX,
  Banknote,
  Flag,
  Globe
} from 'lucide-react';
import { SlideContent, SlideType } from './types';

import authenticatorImg from './assets/authenticator.png';
import smsImg from './assets/sms.png';
import gpsImg from './assets/gps.png';
import paczkaImg from './assets/paczka.png';
import freeiphoneImg from './assets/freeiphone.png';
import fakeigImg from './assets/fakeig.png';
import osintImg from './assets/osint.png';

/**
 * ==========================================
 * KONFIGURACJA PREZENTACJI
 * ==========================================
 */

export const PRESENTATION_TITLE = "Bezpieczeństwo Haseł";

export const SLIDES: SlideContent[] = [
  // SLAJD 1: Intro / Logo
  {
    id: 'intro',
    type: SlideType.TITLE,
    title: 'SAFE',
    subtitle: 'LABS',
    description: 'Zarządzanie Tożsamością i Bezpieczeństwem',
    icon: ShieldCheck, 
  },
  
  // SLAJD 2: Krótkie hasła
  {
    id: 'short-pass',
    type: SlideType.WARNING,
    mainText: 'Hasło krótsze niż 8 znaków.',
    icon: LockKeyhole,
    accentColor: '#FF2A2A' // Cyber Red
  },

  // SLAJD 3: To samo hasło
  {
    id: 'same-pass',
    type: SlideType.WARNING,
    mainText: 'To samo hasło do różnych portali.',
    icon: Copy,
    accentColor: '#FF2A2A'
  },

  // SLAJD 4: Dane osobowe
  {
    id: 'personal-data',
    type: SlideType.WARNING,
    mainText: 'W haśle imię (swoje, psa, kota) lub data urodzenia.',
    icon: UserRound,
    accentColor: '#FF2A2A'
  },

  // SLAJD 5: Znane schematy
  {
    id: 'common-patterns',
    type: SlideType.WARNING,
    mainText: 'Znane hasła typu: "12345678", "zaq12wsx" albo "haslo123".',
    icon: Keyboard,
    accentColor: '#FF2A2A'
  },

  // === SEKCJA LIVE DEMO ===

  // SLAJD 6: Live Demo (Tylko tytuł sekcji)
  {
    id: 'live-demo',
    type: SlideType.TITLE,
    title: 'LIVE DEMO',
    subtitle: 'ŁAMANIE HASEŁ',
    icon: Terminal,
    accentColor: '#00F3FF'
  },

  // SLAJD 6.5: Osadzona strona (Iframe)
  {
    id: 'live-demo-web',
    type: SlideType.IFRAME,
    contentUrl: 'https://safelabs.pl/sprawdz-haslo',
    icon: Globe,
  },

  // === PRZEJŚCIE: JAK ZAPAMIĘTAĆ ===
  {
    id: 'how-to-remember',
    type: SlideType.TITLE,
    title: 'JAK ZAPAMIĘTAĆ',
    subtitle: 'TAKIE DŁUGIE HASŁO?',
    icon: BrainCircuit,
    accentColor: '#00F3FF'
  },

  // SLAJD 7: Password Manager (Zdjęcia)
  {
    id: 'pass-manager',
    type: SlideType.IMAGE,
    title: 'ROZWIĄZANIE',
    mainText: 'PASSWORD MANAGER',
    description: 'Używaj wbudowanych menedżerów haseł.',
    icon: KeyRound,
    accentColor: '#00FF41',
    images: [
      { 
        url: gpsImg, 
        caption: 'Google Password Manager' 
      },
      { 
        url: 'https://placehold.co/400x700/1a1a1a/00F3FF?text=Apple+Keychain', 
        caption: 'Apple iCloud Keychain' 
      }
    ]
  },

  // === PRZEJŚCIE: DODATKOWA OCHRONA ===
  {
    id: 'extra-protection',
    type: SlideType.TITLE,
    title: 'DODATKOWA',
    subtitle: 'WARSTWA OCHRONY',
    icon: ShieldCheck,
    accentColor: '#00FF41'
  },

  // SLAJD 8: Weryfikacja dwuetapowa (Zdjęcia)
  {
    id: '2fa',
    type: SlideType.IMAGE,
    title: 'BEZPIECZEŃSTWO',
    mainText: 'WERYFIKACJA DWUETAPOWA',
    description: 'Zawsze włączaj 2FA gdzie to możliwe.',
    icon: Smartphone,
    accentColor: '#00FF41',
    images: [
      { 
        url: authenticatorImg, 
        caption: 'Aplikacja Authenticator' 
      },
      { 
        url: smsImg, 
        caption: 'Kod SMS' 
      }
    ]
  },

  // === SEKCJA PHISHING (Zaktualizowana) ===
  {
    id: 'phishing-section',
    type: SlideType.TITLE,
    title: 'PHISHING',
    subtitle: 'JAK TO DZIAŁA?',
    description: 'Wyjaśnienie mechanizmu wyłudzania danych.',
    icon: FishSymbol, 
    accentColor: '#00F3FF'
  },

  // === PRZYKŁADY ===

  // SLAJD 9: SMS Przykład
  {
    id: 'ex-sms',
    type: SlideType.IMAGE,
    title: 'PRZYKŁAD 1',
    mainText: 'SMS "Dopłata do paczki"',
    icon: MessageSquareWarning,
    accentColor: '#FF2A2A',
    images: [{ url: paczkaImg }]
  },

  // SLAJD 10: SMS Wyjaśnienie
  {
    id: 'ex-sms-expl',
    type: SlideType.IMAGE,
    title: 'PRZYKŁAD 1',
    mainText: 'Wyjaśnienie',
    description: 'Weryfikuj linki i dokładnie je sprawdzaj.',
    icon: Info,
    images: [{ 
       url: paczkaImg, 
       caption: 'Zwróć uwagę na link',
       arrow: { x: 50, y: 60, direction: 'up' }
    }]
  },

  // SLAJD 11: Instagram Przykład
  {
    id: 'ex-insta',
    type: SlideType.IMAGE,
    title: 'PRZYKŁAD 2',
    mainText: 'INSTAGRAM',
    icon: Instagram,
    accentColor: '#FF2A2A',
    images: [{ url: freeiphoneImg }]
  },

  // SLAJD 12: Instagram Wyjaśnienie
  {
    id: 'ex-insta-expl',
    type: SlideType.IMAGE,
    title: 'PRZYKŁAD 2',
    mainText: 'Wyjaśnienie',
    description: 'Zawsze weryfikuj profil.',
    icon: Info,
    images: [{ 
      url: freeiphoneImg, 
    }]
  },

  // SLAJD 13: Mail z Banku
  {
    id: 'ex-bank',
    type: SlideType.WARNING,
    title: 'PRZYKŁAD 3',
    mainText: 'MAIL Z BANKU',
    icon: MailWarning,
    accentColor: '#FF2A2A'
  },

  // SLAJD 14: Mail z Banku Wyjaśnienie
  {
    id: 'ex-bank-expl',
    type: SlideType.INFO,
    title: 'PRZYKŁAD 3',
    mainText: 'Wyjaśnienie',
    description: 'Spoofing adresu nadawcy i fałszywe linki logowania.',
    icon: Info,
  },

  // SLAJD 15: Fałszywy panel
  {
    id: 'ex-panel',
    type: SlideType.IMAGE,
    title: 'PRZYKŁAD 4',
    mainText: 'FAŁSZYWY PANEL LOGOWANIA',
    icon: LogIn,
    accentColor: '#FF2A2A',
    images: [{ url: fakeigImg }]
  },

  // SLAJD 16: Fałszywy panel Wyjaśnienie
  {
    id: 'ex-panel-expl',
    type: SlideType.IMAGE,
    title: 'PRZYKŁAD 4',
    mainText: 'Wyjaśnienie',
    description: 'Różnice w domenie i wyglądzie strony logowania.',
    icon: Info,
    images: [{ 
       url: fakeigImg, 
       caption: 'Zwróć uwagę na URL',
       arrow: { x: 30, y: 10, direction: 'up' },
       className: 'h-[75vh] max-w-none w-auto'
    }]
  },

  // === SOCJOTECHNIKA SEKCJA (NOWA) ===

  {
    id: 'socjo-section',
    type: SlideType.TITLE,
    title: 'SOCJOTECHNIKA',
    subtitle: 'HAKOWANIE LUDZI',
    icon: Users,
    accentColor: '#FF2A2A'
  },

  // SLAJD 18: Socjotechnika - Na znajomego
  {
    id: 'socjo-friend',
    type: SlideType.WARNING,
    title: 'SOCJOTECHNIKA',
    mainText: 'METODA "NA ZNAJOMEGO"',
    icon: MessageSquareWarning, // Zmieniono ikonę, żeby nie duplikować Users z tytułu sekcji
    accentColor: '#FF2A2A'
  },

  // SLAJD 19: Socjotechnika - Ogólnie
  {
    id: 'socjo-gen',
    type: SlideType.INFO,
    title: 'SOCJOTECHNIKA',
    mainText: 'Ogólnie',
    description: 'Manipulacja psychologiczna w celu uzyskania informacji.',
    icon: BrainCircuit,
  },

  // === OSINT ===

  // SLAJD 20: OSINT (Tytuł sekcji)
  {
    id: 'osint-section',
    type: SlideType.TITLE,
    title: 'OSINT',
    subtitle: 'CZYLI ILE MOŻNA WYCZYTAĆ ZE ZDJĘCIA',
    icon: ImageIcon,
    accentColor: '#00F3FF'
  },

  // SLAJD 21: OSINT QR
  {
    id: 'osint-qr',
    type: SlideType.IMAGE,
    title: 'OSINT',
    mainText: 'Kody QR',
    description: 'Uważaj gdzie zamieszczasz kody QR.',
    icon: QrCode,
    accentColor: '#FF2A2A',
    images: [{ url: osintImg }]
  },

  // === ZAKOŃCZENIE ===

  // SLAJD 22: Co robić jak jest przypał
  {
    id: 'what-now',
    type: SlideType.TITLE,
    title: 'CO ROBIĆ',
    subtitle: 'JAK JEST PRZYPAŁ?',
    icon: Siren, 
    accentColor: '#FF2A2A'
  },

  // SLAJD 23: Kliknąłem w link
  {
    id: 'case-clicked',
    type: SlideType.INFO,
    mainText: 'Kliknąłem w link i podałem hasło.',
    icon: MousePointerClick,
    accentColor: '#00F3FF'
  },

  // SLAJD 24: Kradzież konta
  {
    id: 'case-stolen',
    type: SlideType.INFO,
    mainText: 'Ktoś ukradł mi konto na FB/Insta.',
    icon: UserX,
    accentColor: '#00F3FF'
  },

  // SLAJD 25: Kod Blik
  {
    id: 'case-blik',
    type: SlideType.INFO,
    mainText: 'Wysłałem kod BLIK.',
    icon: Banknote,
    accentColor: '#00F3FF'
  },

  // SLAJD 26: Zakończenie
  {
    id: 'end',
    type: SlideType.TITLE,
    title: 'ZAKOŃCZENIE',
    description: 'Dziękujemy za uwagę.',
    icon: Flag,
    accentColor: '#00FF41'
  },
];
