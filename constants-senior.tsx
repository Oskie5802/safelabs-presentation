import {
  Banknote,
  BrainCircuit,
  Copy,
  FishSymbol,
  Flag,
  Globe,
  Image as ImageIcon,
  Info,
  Keyboard,
  KeyRound,
  LockKeyhole,
  LogIn,
  MailWarning,
  MessageSquareWarning,
  MousePointerClick,
  QrCode,
  ShieldCheck,
  Siren,
  Smartphone,
  Terminal,
  Usb,
  UserRound,
  Users,
  UserX,
} from "lucide-react";
import { SlideContent, SlideType } from "./types";

import appleKeychainImg from "./assets/applekeychain.png";
import authenticatorImg from "./assets/authenticator.png";
import fakeigImg from "./assets/fbweb.png";
import gpsImg from "./assets/gps.png";
import kluczImg from "./assets/klucz.jpeg";
import mailImg from "./assets/fbmail.png";
import mailDetailsImg from "./assets/fbdetails.png";
import osintImg from "./assets/osint.png";
import oszustwoBlikImg from "./assets/oszustwo-blik.png";
import paczkaImg from "./assets/paczka.png";
import smsImg from "./assets/sms.png";

/**
 * ==========================================
 * KONFIGURACJA PREZENTACJI - WERSJA DLA SENIORÓW
 * ==========================================
 */

export const PRESENTATION_TITLE_SENIOR = "Bezpieczeństwo Haseł";

export const SENIOR_SLIDES: SlideContent[] = [
  // SLAJD 1: Intro / Logo
  {
    id: "intro",
    type: SlideType.TITLE,
    title: "SAFE",
    subtitle: "LABS",
    icon: ShieldCheck,
  },

  // SLAJD 5: Znane schematy
  {
    id: "common-patterns",
    type: SlideType.WARNING,
    mainText: 'Znane hasła typu: "12345678", "zaq12wsx" albo "haslo123".',
    icon: Keyboard,
    accentColor: "#FF2A2A",
  },

  // SLAJD 2: Krótkie hasła
  {
    id: "short-pass",
    type: SlideType.WARNING,
    mainText: "Hasło krótsze niż 8 znaków.",
    icon: LockKeyhole,
    accentColor: "#FF2A2A",
  },

  // SLAJD 4: Dane osobowe
  {
    id: "personal-data",
    type: SlideType.WARNING,
    mainText: "W haśle imię (swoje, psa, kota) lub data urodzenia.",
    icon: UserRound,
    accentColor: "#FF2A2A",
  },

  // SLAJD 3: To samo hasło
  {
    id: "same-pass",
    type: SlideType.WARNING,
    mainText: "To samo hasło do różnych portali.",
    icon: Copy,
    accentColor: "#FF2A2A",
  },

  // SLAJD 5.5: Dlaczego takie zasady?
  {
    id: "why-rules",
    type: SlideType.TITLE,
    title: "DLACZEGO",
    subtitle: "TAKIE ZASADY?",
    icon: Info,
    accentColor: "#FF2A2A",
  },

  // SLAJD X: Live Demo Bruteforce
  {
    id: "live-bruteforce",
    type: SlideType.LIVE_DEMO,
    hideLogo: true,
    title: "ATAK BRUTEFORCE",
    mainText: "oskar@gmail.com",
    icon: Terminal,
    accentColor: "#00F3FF",
  },

  // SLAJD 6: Live Demo (Tytuł sekcji weryfikacji)
  {
    id: "live-demo",
    type: SlideType.TITLE,
    title: "SPRAWDŹ",
    subtitle: "SWOJE HASŁO",
    icon: Globe,
    accentColor: "#00F3FF",
  },

  // SLAJD 6.5: Osadzona strona (Iframe)
  {
    id: "live-demo-web",
    hideLogo: true,
    type: SlideType.IFRAME,
    contentUrl: "https://safelabs.pl/sprawdz-haslo",
    icon: Globe,
  },

  // === PRZEJŚCIE: JAK ZAPAMIĘTAĆ ===
  {
    id: "how-to-remember",
    type: SlideType.TITLE,
    title: "JAK ZAPAMIĘTAĆ",
    subtitle: "TAKIE DŁUGIE HASŁO?",
    icon: BrainCircuit,
    accentColor: "#00F3FF",
  },

  // SLAJD 7: Password Manager (Zdjęcia)
  {
    id: "pass-manager",
    type: SlideType.IMAGE,
    title: "ROZWIĄZANIE",
    mainText: "MENEDŻER HASEŁ",
    description: "Używaj wbudowanych menedżerów haseł.",
    icon: KeyRound,
    accentColor: "#00FF41",
    images: [
      {
        url: gpsImg,
        caption: "Menedżer haseł Google",
      },
      {
        url: appleKeychainImg,
        caption: "Apple iCloud Keychain",
      },
    ],
  },

  // === PRZEJŚCIE: DODATKOWA OCHRONA ===
  {
    id: "extra-protection",
    type: SlideType.TITLE,
    title: "DODATKOWA",
    subtitle: "WARSTWA OCHRONY",
    icon: ShieldCheck,
    accentColor: "#00FF41",
  },

  // SLAJD 8: Weryfikacja dwuetapowa (Zdjęcia)
  {
    id: "2fa",
    type: SlideType.IMAGE,
    title: "BEZPIECZEŃSTWO",
    mainText: "WERYFIKACJA DWUETAPOWA",
    description: "Zawsze włączaj 2FA gdzie to możliwe.",
    icon: Smartphone,
    accentColor: "#00FF41",
    images: [
      {
        url: authenticatorImg,
        caption: "Aplikacja Authenticator",
        className: "h-[70vh] w-auto",
      },
      {
        url: smsImg,
        caption: "Kod SMS",
        className: "h-[70vh] w-auto",
      },
    ],
  },

  // === SEKCJA PHISHING ===
  {
    id: "phishing-section",
    type: SlideType.TITLE,
    title: "PHISHING",
    subtitle: "JAK TO DZIAŁA?",
    description: "Wyjaśnienie mechanizmu wyłudzania danych.",
    icon: FishSymbol,
    accentColor: "#FF2A2A",
  },

  // === PRZYKŁADY ===

  // SLAJD 9: SMS Przykład
  {
    id: "ex-sms",
    type: SlideType.IMAGE,
    title: "PRZYKŁAD 1",
    mainText: 'SMS "Dopłata do paczki"',
    icon: MessageSquareWarning,
    accentColor: "#FF2A2A",
    images: [{ url: paczkaImg, className: "w-[55vw] h-auto" }],
  },

  // SLAJD 10: SMS Wyjaśnienie
  {
    id: "ex-sms-expl",
    type: SlideType.IMAGE,
    title: "PRZYKŁAD 1",
    mainText: "Wyjaśnienie",
    description: "Weryfikuj linki i dokładnie je sprawdzaj.",
    icon: Info,
    images: [
      {
        url: paczkaImg,
        caption: "Zwróć uwagę na link",
        className: "w-[55vw] h-auto",
        arrow: { x: 50, y: 57, direction: "up" },
      },
    ],
  },

  // SLAJD 13: Fałszywe Maile
  {
    id: "ex-bank",
    type: SlideType.IMAGE,
    title: "PRZYKŁAD 2",
    mainText: "FAŁSZYWE MAILE",
    icon: MailWarning,
    accentColor: "#FF2A2A",
    images: [{ url: mailImg }],
  },

  // SLAJD 14: Fałszywe Maile Wyjaśnienie
  {
    id: "ex-bank-expl",
    type: SlideType.IMAGE,
    title: "PRZYKŁAD 2",
    mainText: "Wyjaśnienie",
    description: "Spoofing adresu nadawcy i fałszywe linki logowania.",
    icon: Info,
    images: [
      {
        url: mailDetailsImg,
        caption: "Zwróć uwagę na szczegóły nadawcy",
      },
    ],
  },

  // SLAJD 15: Fałszywy panel
  {
    id: "ex-panel",
    type: SlideType.IMAGE,
    title: "PRZYKŁAD 3",
    mainText: "FAŁSZYWY PANEL LOGOWANIA",
    icon: LogIn,
    accentColor: "#FF2A2A",
    images: [
      {
        url: fakeigImg,
        className: "h-[75vh] max-w-none w-auto",
      },
    ],
  },

  // SLAJD 16: Fałszywy panel Wyjaśnienie
  {
    id: "ex-panel-expl",
    type: SlideType.IMAGE,
    title: "PRZYKŁAD 3",
    mainText: "Wyjaśnienie",
    description: "Różnice w domenie i wyglądzie strony logowania.",
    icon: Info,
    images: [
      {
        url: fakeigImg,
        caption: "Zwróć uwagę na URL",
        className: "h-[75vh] max-w-none w-auto",
        zoom: 7,
        zoomOrigin: { x: 6, y: -4 },
      },
    ],
  },

  // SLAJD 16.5: Widok z perspektywy hakera
  {
    id: "hacker-panel",
    hideLogo: true,
    type: SlideType.SPLIT_IFRAME,
    title: "ATAK W CZASIE RZECZYWISTYM",
    contentUrl: "https://s--minoroskar18.replit.app",
    fakeUrl: "https://wwwfaccebook.com",
    rightContentUrl: "https://s--minoroskar18.replit.app/creds",
    refreshInterval: 2000,
  },

  // === SOCJOTECHNIKA SEKCJA ===

  {
    id: "socjo-section",
    type: SlideType.TITLE,
    title: "SOCJOTECHNIKA",
    subtitle: "HAKOWANIE LUDZI",
    icon: Users,
    accentColor: "#FF2A2A",
  },

  // SLAJD 18: Socjotechnika - Na znajomego
  {
    id: "socjo-friend",
    type: SlideType.IMAGE,
    title: "SOCJOTECHNIKA",
    mainText: 'METODA "NA ZNAJOMEGO"',
    icon: MessageSquareWarning,
    accentColor: "#FF2A2A",
    images: [
      {
        url: oszustwoBlikImg,
        className: "h-[75vh] w-auto",
      },
    ],
  },

  // SLAJD 19: Socjotechnika - Ogólnie
  {
    id: "socjo-gen",
    type: SlideType.LIST,
    title: "",
    mainText: "INNE ATAKI SOCJOTECHNICZNE",
    icon: BrainCircuit,
  },

  // === HARDWARE SECURITY ===

  {
    id: "hardware-title",
    type: SlideType.TITLE,
    title: "UWAŻAJ",
    subtitle: "CO PODŁĄCZASZ DO KOMPUTERA",
    icon: Usb,
    accentColor: "#FF2A2A",
  },

  {
    id: "hardware-donts",
    type: SlideType.LIST,
    title: "FIZYCZNE BEZPIECZEŃSTWO",
    mainText: "CZEGO NIE WPINAĆ?",
    bulletPoints: [
      "Znalezione pendrive'y ",
      "Nieznane kable USB ",
      "Urządzenia typu Rubber Ducky ",
    ],
    icon: Usb,
    accentColor: "#FF2A2A",
  },

  // === OSINT ===

  {
    id: "osint-section",
    type: SlideType.TITLE,
    title: "OSINT",
    subtitle: "CZYLI ILE MOŻNA WYCZYTAĆ ZE ZDJĘCIA",
    icon: ImageIcon,
    accentColor: "#00F3FF",
  },

  {
    id: "osint-qr",
    type: SlideType.IMAGE,
    title: "OSINT",
    mainText: "Kody QR",
    description: "Uważaj gdzie zamieszczasz kody QR.",
    icon: QrCode,
    accentColor: "#FF2A2A",
    images: [
      {
        url: osintImg,
        className: "h-[65vh] w-auto",
      },
    ],
  },

  {
    id: "how-to-copy-key",
    type: SlideType.IMAGE,
    title: "OSINT",
    mainText: "JAK ŁATWO DOROBIĆ KLUCZ",
    description: "Wystarczy zdjęcie klucza, by stworzyć jego kopię.",
    icon: ImageIcon,
    accentColor: "#FF2A2A",
    images: [
      {
        url: kluczImg,
        className: "h-[65vh] w-auto",
      },
    ],
  },

  {
    id: "osint-dont-upload",
    type: SlideType.LIST,
    title: "OSINT",
    mainText: "CZEGO NIE WRZUCAĆ?",
    bulletPoints: [
      "Zdjęcia dowodu osobistego / paszportu",
      "Zdjęcia kart płatniczych",
      "Bilety lotnicze i na koncerty",
      "Zdjęcia kluczy do mieszkania",
    ],
    icon: Globe,
    accentColor: "#FF2A2A",
  },

  // === ZAKOŃCZENIE ===

  {
    id: "what-now",
    type: SlideType.TITLE,
    title: "CO ROBIĆ",
    subtitle: "GDY COŚ PÓJDZIE NIE TAK?",
    icon: Siren,
    accentColor: "#FF2A2A",
  },

  {
    id: "case-clicked",
    type: SlideType.INFO,
    mainText: "Kliknąłem w link i podałem hasło.",
    icon: MousePointerClick,
    accentColor: "#00F3FF",
  },

  {
    id: "case-stolen",
    type: SlideType.INFO,
    mainText: "Ktoś ukradł mi konto na Facebooku.",
    icon: UserX,
    accentColor: "#00F3FF",
  },

  {
    id: "case-blik",
    type: SlideType.INFO,
    mainText: "Wysłałem kod BLIK.",
    icon: Banknote,
    accentColor: "#00F3FF",
  },

  // SLAJD 25.5: Podsumowanie (Tytuł sekcji)
  {
    id: "summary-section",
    type: SlideType.TITLE,
    title: "PODSUMOWANIE",
    subtitle: "CZEGO SIĘ NAUCZYLIŚMY",
    icon: ShieldCheck,
    accentColor: "#00FF41",
  },

  // SLAJD 26: Podsumowanie (Powtórka)
  {
    id: "summary",
    type: SlideType.LIST,
    mainText: "POWTÓRKA",
    bulletPoints: [
      "Zasady doboru silnego hasła",
      "Używać menedżera haseł i weryfikacji dwuetapowej",
      "Sprawdzanie URL i adresów e-mail",
      "Potwierdzaj prośby o pieniądze telefonicznie",
      "Nie wysyłaj zdjęć z ważnymi kodami QR",
      "Sprawdzaj co podpinasz do swojego komputera",
    ],
    icon: ShieldCheck,
    hideLogo: true,
    accentColor: "#00FF41",
  },

  // SLAJD 27: Zakończenie
  {
    id: "end",
    type: SlideType.TITLE,
    title: "DZIĘKUJEMY ZA UWAGĘ",
    credits: [
      {
        title: "Projekt przygotowują",
        people: [
          "Kamil Zdebski",
          "Mikołaj Piech",
          "Oskar Minor",
          "Oskar Śledź",
          "Oscar Mika",
          "Emilia Zawada",
        ],
      },
      {
        title: "Opiekunowie",
        people: ["P. Daniel Sikora", "P. Oskar Kowalski"],
      },
    ],
    partners: [
      {
        name: "ZSTiB Brzesko",
        href: "https://zstib.edu.pl/",
        logoUrl: "https://safelabs.pl/assets/zstib-DdCdGpdU.svg",
      },
      {
        name: "MOK",
        href: "https://mok-brzesko.pl/",
        logoUrl: "https://safelabs.pl/assets/mok-logo-DYVVDbFf.png",
      },
      {
        name: "Biblioteka Brzesko",
        href: "https://mok-brzesko.pl/",
        logoUrl: "https://safelabs.pl/assets/biblioteka-DbvJfrBC.png",
      },
      {
        name: "Uniwersytet 3 wieku",
        href: "https://mok-brzesko.pl/",
        logoUrl: "https://www.safelabs.pl/assets/utw-logo-CfHAR9zp.png",
      },
    ],
    icon: Flag,
    accentColor: "#00FF41",
  },
];
