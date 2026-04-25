export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface Statistic {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  parameters?: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  interest?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}