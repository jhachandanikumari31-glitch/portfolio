export const SITE = {
  name: 'Grihanirman',
  tagline: 'Innovating IoT, STEM & Firmware',
  email: 'hello@grihanirman.com',
  phone: '+91 98765 43210',
  address: 'Block 12, Tech Park Road, Bengaluru, India',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/sensor', label: 'Sensor Data' },
  { href: '/contact', label: 'Contact' },
] as const;

export const CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
] as const;

export const STATS = [
  { value: '120+', label: 'Projects delivered' },
  { value: '10', label: 'Sensor channels' },
  { value: '50+', label: 'Workshops hosted' },
  { value: '15+', label: 'Partner institutions' },
] as const;

export const SERVICES = [
  {
    title: 'IoT Development',
    description: 'Custom sensor networks, cloud integrations, and analytics-ready smart systems.',
  },
  {
    title: 'STEM Teaching',
    description: 'Hands-on STEM curriculum, labs, and mentorship for learners of all levels.',
  },
  {
    title: 'Firmware Development',
    description: 'Embedded firmware design for microcontrollers, reliability testing, and secure updates.',
  },
  {
    title: 'Workshops',
    description: 'Practical workshops for students, educators, and teams focused on real-world technologies.',
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      'Grihanirman delivered our IoT proof-of-concept on time with a strong focus on usability and documentation.',
    author: 'Arjun, Product Manager',
  },
  {
    quote:
      'The STEM workshops were engaging, structured, and helped our students gain confidence in technology.',
    author: 'Meera, School Coordinator',
  },
] as const;

export const PARTNERS = ['Tech Labs', 'EduHub', 'Smart Devices', 'FutureForge'] as const;

export const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.149356089823!2d77.59456261526059!3d12.971598690856773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fd2974d3efd%3A0x9f1fcad5c3a3b9b!2sBengaluru!5e0!3m2!1sen!2sin!4v1684325173456!5m2!1sen!2sin';
