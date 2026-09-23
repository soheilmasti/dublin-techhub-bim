import { useEffect } from 'react';
import { LanguageCode } from './i18n';

interface SEOProps {
  view: string;
  language: LanguageCode;
  selectedProjectName?: string;
  selectedCategoryName?: string;
}

const SEO_TITLES: Record<LanguageCode, { default: string; outsourcing: string; dublin: string; resume: string; projects: string; clientPortal: string; partners: string; rnd: string }> = {
  en: {
    default: 'BIMCO | Cost-Effective BIM Outsourcing & Revit Modeling | UK, Ireland & Europe',
    outsourcing: 'BIM Outsourcing for Architecture Studios | Save up to 50% | UK & Ireland',
    dublin: 'Dublin TechHub BIM Showcase | LOD 350/400 Case Study | BIMCO',
    resume: 'Architectural Portfolio & Professional BIM Expertise | BIMCO Studio',
    projects: 'Architectural & Technical BIM Projects Archive | BIMCO',
    clientPortal: 'Client Portal & Live Order Tracker | Deliverables & LOD | BIMCO',
    partners: 'Join Our Architectural & BIM Partner Talent Network | BIMCO',
    rnd: 'BIM R&D Lab & Computational Plugins | Revit API, AI & Automation | BIMCO'
  },
  es: {
    default: 'BIMCO | Outsourcing BIM y Modelado Revit Económico para Estudios | España y Europa',
    outsourcing: 'Servicios de Outsourcing BIM para Arquitectura | Ahorro hasta 50% | Europa',
    dublin: 'Caso de Éxito BIM: Dublin TechHub | Nivel de Detalle LOD 350/400 | BIMCO',
    resume: 'Perfil Profesional y Experiencia en Arquitectura y BIM | BIMCO',
    projects: 'Archivo de Proyectos de Arquitectura y BIM | BIMCO',
    clientPortal: 'Portal de Clientes y Seguimiento de Proyectos en Vivo | BIMCO',
    partners: 'Únete a Nuestra Red de Colaboradores y Talento BIM | BIMCO',
    rnd: 'Laboratorio I+D BIM y Plugins Computacionales | Revit API e IA | BIMCO'
  },
  ca: {
    default: 'BIMCO | Externalització BIM i Modelat Revit per a Estudis d’Arquitectura',
    outsourcing: 'Serveis d’Externalització BIM per a Arquitectura | Estalvi fins al 50%',
    dublin: 'Demostració BIM Dublin TechHub | Estudi de Cas LOD 350/400 | BIMCO',
    resume: 'Perfil Professional i Trajectòria en Arquitectura BIM | BIMCO',
    projects: 'Arxiu de Projectes d’Arquitectura i BIM | BIMCO',
    clientPortal: 'Portal de Clients i Seguiment de Projectes en Viu | BIMCO',
    partners: 'Uneix-te a la Nostra Xarxa de Col·laboradors BIM | BIMCO',
    rnd: 'Laboratori R+D BIM i Plugins Computacionals | Revit API i IA | BIMCO'
  },
  de: {
    default: 'BIMCO | Kostengünstiges BIM-Outsourcing & Revit-Modellierung | Europa',
    outsourcing: 'BIM-Outsourcing für Architekturbüros | Bis zu 50% Kostenersparnis',
    dublin: 'Dublin TechHub BIM Fallstudie | LOD 350/400 Detaillierung | BIMCO',
    resume: 'Architektur-Portfolio & BIM-Expertise | BIMCO',
    projects: 'Archiv für Architektur- und BIM-Projekte | BIMCO',
    clientPortal: 'Kundenportal & Live-Projektverfolgung | BIM-Lieferungen | BIMCO',
    partners: 'BIM-Talent- und Partnernetzwerk beitreten | BIMCO',
    rnd: 'BIM F&E-Labor & Rechen-Plugins | Revit API & KI-Automation | BIMCO'
  },
  fr: {
    default: 'BIMCO | Sous-traitance BIM & Modélisation Revit Économique | Europe',
    outsourcing: 'Sous-traitance BIM pour Cabinets d’Architecture | Économies jusqu’à 50%',
    dublin: 'Étude de Cas BIM Dublin TechHub | LOD 350/400 | BIMCO',
    resume: 'Profil Professionnel & Expertise Architecture BIM | BIMCO',
    projects: 'Archive des Projets d’Architecture et BIM | BIMCO',
    clientPortal: 'Portail Clients & Suivi de Projet en Direct | BIMCO',
    partners: 'Rejoignez Notre Réseau de Partenaires et Talents BIM | BIMCO',
    rnd: 'Laboratoire R&D BIM et Plugins Computationnels | API Revit et IA | BIMCO'
  },
  it: {
    default: 'BIMCO | Outsourcing BIM & Modellazione Revit Economica per Studi | Europa',
    outsourcing: 'Servizi di Outsourcing BIM per Architetti | Risparmio fino al 50%',
    dublin: 'Case Study BIM Dublin TechHub | Livello di Dettaglio LOD 350/400 | BIMCO',
    resume: 'Profilo Professionale & Competenze BIM e Architettura | BIMCO',
    projects: 'Archivio Progetti di Architettura e BIM | BIMCO',
    clientPortal: 'Portale Clienti & Tracciamento Progetti Live | BIMCO',
    partners: 'Unisciti alla Nostra Rete di Partner e Talenti BIM | BIMCO',
    rnd: 'Laboratorio R&S BIM e Plugin Computazionali | API Revit e IA | BIMCO'
  },
  fa: {
    default: 'BIMCO | برون‌سپاری تخصصی و اقتصادی مدل‌سازی BIM و رویت برای انگلستان و اروپا',
    outsourcing: 'خدمات برون‌سپاری BIM برای دفاتر معماری | تا ۵۰٪ صرفه‌جویی در هزینه',
    dublin: 'پروژه برجسته BIM دابلین تک‌هاب | سطح جزئیات LOD 350/400 | BIMCO',
    resume: 'رزومه، مدارک بین‌المللی و سوابق معماری و BIM | BIMCO',
    projects: 'آرشیو ۱۹ پروژه معماری و مدل‌سازی BIM | BIMCO',
    clientPortal: 'پورتال سفارشات و رهگیری زنده پیشرفت مدل‌سازی BIM | BIMCO',
    partners: 'پیوستن به شبکه همکاران و متخصصین معماری و بیم | BIMCO',
    rnd: 'واحد R&D و نوآوری دیجیتال | پلاگین‌های اختصاصی Revit و الگوریتم‌های هوش مصنوعی | BIMCO'
  }
};

const SEO_DESCRIPTIONS: Record<LanguageCode, string> = {
  en: 'Nearshore architectural BIM outsourcing services for UK, Irish & European architecture practices. High-precision Revit modeling, clash detection, and construction documentation complying with ISO 19650 at up to 50% lower costs.',
  es: 'Servicios de outsourcing BIM para estudios de arquitectura en Reino Unido, Irlanda y Europa. Modelado Revit de alta precisión bajo norma ISO 19650 con hasta un 50% de ahorro.',
  ca: 'Serveis d’externalització BIM per a estudis d’arquitectura a Europa. Modelat Revit amb màxima precisió sota la norma ISO 19650 i estalvi de fins al 50%.',
  de: 'BIM-Outsourcing für europäische Architekturbüros. Hochpräzise Revit-Modellierung nach ISO 19650 mit bis zu 50% Ersparnis.',
  fr: 'Services de sous-traitance BIM pour architectes européens. Modélisation Revit de haute précision conforme à la norme ISO 19650 avec jusqu’à 50% d’économies.',
  it: 'Servizi di outsourcing BIM per studi di architettura europei. Modellazione Revit di precisione conforme a ISO 19650 con risparmio fino al 50%.',
  fa: 'خدمات برون‌سپاری مدل‌سازی BIM و نقشه‌کشی رویت برای دفاتر معماری انگلستان، ایرلند و اروپا با استاندارد بین‌المللی ISO 19650 و صرفه‌جویی تا ۵۰٪.'
};

export const updateMetaTags = ({ view, language, selectedProjectName, selectedCategoryName }: SEOProps) => {
  const langTitles = SEO_TITLES[language] || SEO_TITLES.en;
  let title = langTitles.default;

  if (selectedProjectName) {
    title = `${selectedProjectName} | BIMCO`;
  } else if (selectedCategoryName) {
    title = `${selectedCategoryName} | BIMCO`;
  } else if (view === 'bim-outsourcing') {
    title = langTitles.outsourcing;
  } else if (view === 'client-portal') {
    title = langTitles.clientPortal;
  } else if (view === 'partners') {
    title = langTitles.partners;
  } else if (view === 'rnd') {
    title = langTitles.rnd;
  } else if (view === 'dublin-bim-audit') {
    title = langTitles.dublin;
  } else if (view === 'resume') {
    title = langTitles.resume;
  } else if (view === 'grid') {
    title = langTitles.projects;
  }

  // Set document title
  document.title = title;

  // Set meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  const description = SEO_DESCRIPTIONS[language] || SEO_DESCRIPTIONS.en;
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  }

  // Set canonical URL based on query
  let canonicalUrl = 'https://bimco.es/';
  if (view !== '3d' || language !== 'en') {
    const params = new URLSearchParams();
    if (language !== 'en') params.set('lang', language);
    if (view !== '3d') params.set('view', view);
    canonicalUrl = `https://bimco.es/?${params.toString()}`;
  }

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonicalUrl);
  }

  // Update OpenGraph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
};

export const useSEO = (props: SEOProps) => {
  useEffect(() => {
    updateMetaTags(props);
  }, [props.view, props.language, props.selectedProjectName, props.selectedCategoryName]);
};
