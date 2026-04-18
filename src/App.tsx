import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products as SAMPLE_PRODUCTS, categories as SITE_CATEGORIES } from './data/products';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Instagram, 
  MessageCircle, 
  ArrowRight, 
  Plus, 
  Zap, 
  Package, 
  Crown, 
  Sparkles, 
  Shirt, 
  Award, 
  Camera, 
  Moon, 
  Sun,
  LogOut,
  Search,
  Heart,
  Filter,
  Truck,
  Youtube,
  Facebook,
  Twitter,
  ChevronDown,
  LayoutGrid,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
  Star,
  Mail,
  Phone,
  Gem,
  CheckCircle
} from 'lucide-react';

// --- Types ---

type View = 'login' | 'customer' | 'admin' | 'shop' | 'about' | 'contact' | 'projects' | 'wishlist';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  category: string;
  badge?: string | null;
  description: string;
  image: string;
  secondaryImage?: string; // Hover editorial view
  moreImages?: string[];
  isNew?: boolean;
  rating?: number;
  reviews?: any; // Can be number or array
  inStock?: boolean;
  stockCount?: number;
  campusPickup?: boolean;
  tags?: string[];
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  courier?: string;
  milestones?: { date: string; status: string; description: string; }[];
  date: string;
}

// --- Constants ---

const BRAND_GRADIENT = "from-[#0096ff] to-[#00d4ff]";
const BRAND_TEXT = "text-[#0096ff]";

const MEDIA = {
  hero: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop",
  products: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576566582418-d0f50ec437e6?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523398363243-ce9bbbd06948?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop"
  ]
};

// --- Mock Data Based on Uploaded Images ---

const PROJECTS = [
  {
    id: 'p1',
    title: 'Midnight in Nairobi',
    year: '2024',
    description: 'A cinematic lookbook documenting the nocturnal pulse of the city.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p2',
    title: 'Archive Series: Denim',
    year: '2023',
    description: 'Restructuring vintage textures into modern architectural silhouettes.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop'
  }
];

// --- Shared Components ---

// --- Shared Components ---

/**
 * FOOTER COMPONENT
 * Design Principle: Professionalism & Clarity
 */
const Footer = ({ onPageChange }: { onPageChange: (v: View) => void }) => {
  return (
    <footer className="pt-32 pb-48 px-6 border-t bg-black border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0096ff]/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Logo Section */}
        <div className="space-y-8">
          <button onClick={() => onPageChange('customer')} className="flex flex-col items-start gap-1 group">
            <span className={`text-4xl font-black bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent tracking-[0.2em] leading-none transition-all group-hover:tracking-[0.25em] italic`}>
              AMARU
            </span>
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-neutral-500">Exquisite $$ Embraced</span>
          </button>
          <p className="text-neutral-500 font-light leading-relaxed max-w-sm text-sm">
            Forging a new dimension of street luxury. AMARU is an archive of identity, designed for those who navigate the world with intentionality and grit.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <Instagram size={18} />, link: "#", color: "hover:bg-gradient-to-tr hover:from-purple-500 hover:to-orange-500" },
              { icon: <Facebook size={18} />, link: "#", color: "hover:bg-[#1877F2]" },
              { icon: <MessageCircle size={18} />, link: "https://tiktok.com", color: "hover:bg-black" } // Using MessageCircle as placeholder for TikTok if icon not avail
            ].map((social, idx) => (
              <button key={idx} className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all ${social.color} shadow-xl`}>
                {social.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="micro-label mb-10 text-white">Quick Links</div>
          <ul className="space-y-6">
            {['Home', 'Shop', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => onPageChange(item.toLowerCase() as View)}
                  className="text-neutral-500 hover:text-[#0096ff] font-black text-[11px] uppercase tracking-[0.3em] transition-all"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <div className="micro-label mb-10 text-white">Contact Details</div>
          <ul className="space-y-6">
            <li className="flex items-center gap-4 group">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#0096ff]"><Phone size={16} /></div>
               <div>
                  <div className="text-[9px] uppercase font-black text-neutral-600 mb-0.5">Phone</div>
                  <div className="text-[11px] font-black text-white">+254 746 746904</div>
               </div>
            </li>
            <li className="flex items-center gap-4 group">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#0096ff]"><Mail size={16} /></div>
               <div>
                  <div className="text-[9px] uppercase font-black text-neutral-600 mb-0.5">Email</div>
                  <div className="text-[11px] font-black text-white uppercase tracking-tight">info@amaruofficial.com</div>
               </div>
            </li>
            <li className="flex items-center gap-4 group">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#0096ff]"><MapPin size={16} /></div>
               <div>
                  <div className="text-[9px] uppercase font-black text-neutral-600 mb-0.5">Location</div>
                  <div className="text-[11px] font-black text-white">Kenya</div>
               </div>
            </li>
          </ul>
        </div>

        {/* Branding Message */}
        <div>
          <div className="micro-label mb-10 text-white">The Studio</div>
          <div className="bg-neutral-900/50 p-8 rounded-[2rem] border border-white/5">
             <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-[0.2em] leading-relaxed mb-6">
               Need a website like this?
             </p>
             <a 
               href="https://macreativesstudio.github.io" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-3 text-[#0096ff] font-black uppercase text-[10px] tracking-[0.3em] hover:tracking-[0.35em] transition-all"
             >
               Talk to Ma Creatives Studio <ArrowRight size={14} />
             </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-600">
          © 2026 AMARU OFFICIAL. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black uppercase tracking-widest text-neutral-800">AMARU / ACCESS / GRIT</span>
        </div>
      </div>
    </footer>
  );
};

const Navbar = ({ onViewChange, currentView, onSearchOpen, wishlistCount, onCartOpen }: { 
  onViewChange: (v: View) => void, 
  currentView: View,
  onSearchOpen: () => void,
  wishlistCount: number,
  onCartOpen: () => void
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'customer', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl shadow-black/50' 
        : 'bg-black py-8 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Side: Brand Identity */}
        <button onClick={() => onViewChange('customer')} className="flex flex-col items-start gap-1 group">
          <span className={`text-2xl font-black bg-gradient-to-r ${BRAND_GRADIENT} bg-clip-text text-transparent tracking-[0.25em] leading-none transition-all group-hover:tracking-[0.3em] group-hover:scale-[1.02] transform-gpu`}>
            AMARU
          </span>
          <span className="text-[9px] uppercase font-black tracking-[0.4em] text-neutral-400 opacity-60 group-hover:opacity-100 transition-opacity">Exquisite $$ Embraced</span>
        </button>

        {/* Center: Navigation */}
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link, idx) => (
            <button 
              key={`${link.id}-${idx}`}
              onClick={() => onViewChange(link.id as View)}
              className={`text-[10px] font-black tracking-[0.4em] transition-all uppercase relative group ${
                currentView === link.id ? BRAND_TEXT : 'text-neutral-500 hover:text-white'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#0096ff] transition-all duration-300 ${currentView === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
        </div>

        {/* Right Side: Utils */}
        <div className="flex items-center gap-3 md:gap-6">
          <button 
            onClick={() => onViewChange('wishlist')}
            className={`relative p-2.5 rounded-full border transition-all ${currentView === 'wishlist' ? 'bg-[#0096ff] border-[#0096ff] text-white shadow-lg shadow-[#0096ff]/20' : 'bg-white/5 border-white/5 text-neutral-400 hover:text-white hover:bg-white/10'}`}
          >
            <Heart size={18} fill={currentView === 'wishlist' ? "currentColor" : "none"} />
            {wishlistCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-white text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#0096ff]"
              >
                {wishlistCount}
              </motion.span>
            )}
          </button>

          <button 
            onClick={onSearchOpen}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-800 transition-all text-neutral-400 hover:text-white border border-white/5"
          >
            <Search size={18} />
          </button>

          <button 
            onClick={onCartOpen}
            className="hidden md:flex w-10 h-10 rounded-full items-center justify-center bg-white/5 border border-white/5 text-neutral-400 hover:text-white transition-all relative"
          >
            <ShoppingBag size={18} />
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-800 text-white"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/5 overflow-hidden"
          >
            <div className="p-10 flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <button 
                  key={`mobile-${link.id}-${idx}`}
                  onClick={() => {
                    onViewChange(link.id as View);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-2xl font-black uppercase tracking-tighter italic text-left ${currentView === link.id ? 'text-[#0096ff]' : 'text-neutral-500'}`}
                >
                  {link.label}
                </button>
              ))}
              <hr className="border-white/5" />
              <button 
                onClick={() => {
                   onViewChange('login');
                   setIsMobileMenuOpen(false);
                }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600 hover:text-[#0096ff] transition-colors self-start"
              >
                Access Nexus Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- View Components ---

const LoginView = ({ onLogin }: { onLogin: (role: 'customer' | 'admin') => void, key?: string }) => {
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  const handlePortalAccess = () => {
    if (accessCode === 'secure_password_2024') {
      onLogin('admin');
    } else {
      setError('ACCESS DENIED: INVALID KEY');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center font-mono">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <img 
          src={MEDIA.hero} 
          className="w-full h-full object-cover opacity-10 grayscale brightness-50"
          alt="Security Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        {/* Animated Grid Line Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg w-full mx-6 p-1 bg-gradient-to-b from-[#0096ff]/20 to-transparent rounded-[2rem]"
      >
        <div className="bg-neutral-950/80 backdrop-blur-2xl rounded-[1.9rem] p-10 border border-white/5 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <div className={`w-2 h-2 rounded-full ${isEncrypted ? 'bg-green-500' : 'bg-[#0096ff] animate-pulse shadow-[0_0_10px_#0096ff]'}`} />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-black italic tracking-tighter mb-2 text-gradient">ADMIN ACCESS</h1>
            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-neutral-600">Encrypted Management Terminal</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest text-neutral-500 ml-1">Identity Token</label>
              <input 
                type="text" 
                placeholder="ADMINISTRATOR ID"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-5 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest text-neutral-500 ml-1">Access Fragment</label>
              <div className="relative">
                <input 
                  type="password" 
                  autoFocus
                  placeholder="••••••••••••"
                  className={`w-full bg-black/40 border ${error ? 'border-red-500/50' : 'border-white/5'} rounded-xl px-6 py-5 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800`}
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePortalAccess()}
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] font-black text-red-500 text-center tracking-widest uppercase"
              >
                {error}
              </motion.p>
            )}
            
            <button 
              onClick={handlePortalAccess}
              className="w-full group relative py-6 bg-white text-black rounded-xl overflow-hidden font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:bg-[#0096ff] hover:text-white"
            >
              <span className="relative z-10">Bypass Protocol</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0096ff] to-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button 
              onClick={() => onLogin('customer')}
              className="w-full py-4 text-neutral-600 hover:text-neutral-400 font-black text-[9px] uppercase tracking-[0.3em] transition-all"
            >
              Abord Transmission
            </button>
          </div>

          <div className="mt-12 flex justify-between items-center opacity-20">
             <div className="w-8 h-[1px] bg-white" />
             <div className="text-[8px] font-black tracking-widest uppercase">System Core v4.0.2</div>
             <div className="w-8 h-[1px] bg-white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="flex flex-col animate-pulse">
    <div className="aspect-[3/4] md:aspect-[4/5] bg-neutral-900 rounded-[1.5rem] md:rounded-[2.5rem] border border-neutral-800" />
    <div className="px-2 pt-6 flex flex-col gap-3">
       <div className="h-4 bg-neutral-900 rounded-full w-1/3" />
       <div className="h-6 bg-neutral-900 rounded-lg w-2/3" />
       <div className="h-8 bg-neutral-900 rounded-lg w-full" />
    </div>
  </div>
);

const QuickViewModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAdd, 
  onToggleWishlist, 
  isWishlisted,
  isLoading
}: { 
  product: Product | null, 
  isOpen: boolean, 
  onClose: () => void, 
  onAdd: (p: Product) => void,
  onToggleWishlist: (id: string) => void,
  isWishlisted: boolean,
  isLoading?: boolean
}) => {
  if (!product && !isLoading) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-[#050505] border border-neutral-800 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[2rem] md:rounded-[4rem] relative shadow-[0_0_100px_rgba(0,150,255,0.1)]"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-10 p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white"
            >
              <X size={24} />
            </button>

            {isLoading ? (
              <div className="grid lg:grid-cols-2 gap-12 md:gap-20 p-8 md:p-20 animate-pulse">
                <div className="aspect-[4/5] bg-neutral-900 rounded-[2rem]" />
                <div className="space-y-8">
                  <div className="h-4 bg-neutral-900 w-24 rounded-full" />
                  <div className="h-20 bg-neutral-900 w-full rounded-2xl" />
                  <div className="h-12 bg-neutral-900 w-48 rounded-2xl" />
                  <div className="h-32 bg-neutral-900 w-full rounded-3xl" />
                </div>
              </div>
            ) : product && (
              <div className="grid lg:grid-cols-2 gap-12 md:gap-20 p-8 md:p-20">
                <div className="space-y-6">
                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-neutral-800 p-1 bg-neutral-900 group relative"
                   >
                      <motion.img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700" 
                        whileHover={{ scale: 1.1, y: -10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                   </motion.div>
                   <div className="grid grid-cols-4 gap-4">
                      {[product.image, product.secondaryImage, ...(product.moreImages || [])].filter(Boolean).slice(0, 4).map((img, i) => (
                        <div key={i} className="aspect-square rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer hover:border-[#0096ff] transition-all group">
                          <img src={img} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                        </div>
                      ))}
                   </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="micro-label mb-4 text-[#0096ff]">{product.category}</div>
                      <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">{product.name}</h2>
                    </div>
                    <button 
                      onClick={() => onToggleWishlist(product.id)}
                      className={`p-5 rounded-full backdrop-blur-xl border border-white/5 transition-all
                        ${isWishlisted ? 'bg-[#0096ff] text-white shadow-lg' : 'bg-black/40 text-white hover:scale-110 hover:bg-neutral-800'}`}
                    >
                      <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
                    </button>
                  </div>

                  <div className="flex items-center gap-6 mb-12">
                     <div className="text-4xl font-black italic tracking-tighter uppercase whitespace-nowrap">Ksh {product.price.toLocaleString()}</div>
                     <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                        <Star size={16} className="text-yellow-400" fill="currentColor" />
                        <span className="text-sm font-black">{product.rating || '4.8'}</span>
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest ml-2">{typeof product.reviews === 'number' ? product.reviews : (product.reviews?.length || '12')} Reviews</span>
                     </div>
                  </div>

                  <p className="text-neutral-500 text-lg leading-relaxed font-light mb-12">
                    {product.description}
                  </p>

                  <div className="space-y-4 mb-20">
                    <div className="flex justify-between">
                       <div className="micro-label opacity-40 uppercase tracking-widest">Dimensions of identity</div>
                       <button className="text-[8px] font-black uppercase text-[#0096ff] tracking-widest">Sizing Guide</button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                        <button key={s} className="w-16 h-16 rounded-2xl border border-neutral-800 hover:border-[#0096ff] transition-all font-black text-xs hover:text-white text-neutral-600 flex items-center justify-center hover:bg-[#0096ff]/5">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => { onAdd(product); onClose(); }}
                    className="bg-white text-black py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl shadow-[#0096ff]/20 flex items-center justify-center gap-4 active:scale-95 mt-auto"
                  >
                    Acquire for Archive <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Review Section */}
            <div className="border-t border-neutral-800 p-8 md:p-20 bg-neutral-900/30">
               <div className="flex justify-between items-end mb-12">
                  <div>
                    <div className="micro-label mb-4 opacity-50">Transmissions</div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter italic">Vocal Feedback</h3>
                  </div>
                  <button className="text-[9px] font-black uppercase text-[#0096ff] tracking-[0.4em] hover:text-white transition-all">Submit Review</button>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  {(product.reviews || []).length > 0 ? (
                    product.reviews?.map((review) => (
                      <div key={review.id} className="bg-black/40 border border-neutral-800 p-8 rounded-[2rem]">
                        <div className="flex justify-between items-center mb-4">
                          <div className="font-black text-sm uppercase italic tracking-widest">{review.userName}</div>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} size={10} className={i <= review.rating ? "text-yellow-400" : "text-neutral-800"} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <p className="text-neutral-500 text-sm italic font-light leading-relaxed mb-4">"{review.comment}"</p>
                        <div className="text-[8px] font-mono text-neutral-800 uppercase tracking-widest">{review.date}</div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center opacity-30 border border-dashed border-neutral-800 rounded-[2rem]">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em]">Awaiting First Transmission</p>
                    </div>
                  )}
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SearchOverlay = ({ isOpen, onClose, query, setQuery }: { isOpen: boolean, onClose: () => void, query: string, setQuery: (q: string) => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-6 md:p-20"
        >
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-center mb-12">
               <span className="micro-label">Search Archive</span>
               <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all">
                  <X size={32} />
               </button>
            </div>
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-500" size={32} />
              <input 
                autoFocus
                type="text" 
                placeholder="TYPE TO UNLOCK..."
                className="w-full bg-transparent border-b-2 border-neutral-800 focus:border-[#0096ff] py-8 pl-14 text-2xl md:text-5xl font-black uppercase tracking-tighter outline-none transition-all placeholder:text-neutral-900"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <span className="micro-label opacity-40">Suggestions:</span>
              {['Signature', 'Hoodies', 'Nairobi', 'Archive'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setQuery(s)}
                  className="text-[10px] font-black uppercase tracking-widest text-[#0096ff] hover:text-white"
                >
                  #{s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectsView = () => {
  return (
    <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="micro-label mb-6">Archive</div>
        <h1 className="text-5xl md:text-8xl font-black mb-20 uppercase italic tracking-tighter">PROJECTS</h1>
        <div className="grid gap-20">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
            >
              <div className="flex-1 w-full aspect-[4/3] overflow-hidden rounded-[3rem] border border-neutral-800 relative group">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10">
                   <div className="text-4xl font-black italic uppercase tracking-tighter">{project.year}</div>
                </div>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-4xl md:text-6xl font-black uppercase italic mb-8 tracking-tighter">{project.title}</h3>
                <p className="text-neutral-500 text-xl leading-relaxed font-light mb-12">{project.description}</p>
                <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#0096ff] hover:text-white transition-colors">
                  View Entry <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WishlistView = ({ products, onAdd, onToggleWishlist, onQuickView, onPageChange }: { products: Product[], onAdd: (p: Product) => void, onToggleWishlist: (id: string) => void, onQuickView: (p: Product) => void, onPageChange: (v: View) => void }) => {
  return (
    <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto text-center md:text-left">
        <div className="micro-label mb-6">Personal Collection</div>
        <h1 className="text-5xl md:text-8xl font-black mb-20 uppercase italic tracking-tighter">YOUR <span className="text-gradient">VAULT</span></h1>
        
        {products.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 3 }}
               className="w-32 h-32 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-10 shadow-2xl relative"
            >
               <div className="absolute inset-0 bg-[#0096ff]/10 blur-xl rounded-full" />
               <Heart size={48} className="text-[#0096ff] relative z-10" fill="currentColor" />
            </motion.div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4 text-white">Your Vault is Silent</h2>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 mb-10 max-w-xs mx-auto leading-loose">The archives are awaiting your selection. Start collecting pieces that define your identity.</p>
            <button 
              onClick={() => onPageChange('shop')} 
              className="bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] px-12 py-5 rounded-full hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl shadow-[#0096ff]/20 flex items-center gap-4"
            >
              Start Curating <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={onAdd} 
                onToggleWishlist={onToggleWishlist} 
                isWishlisted={true}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQty, 
  onCheckout 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[], 
  onUpdateQty: (id: string, delta: number) => void,
  onCheckout: () => void
}) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-neutral-900 z-[101] border-l border-neutral-800 flex flex-col"
          >
            <div className="p-8 border-b border-neutral-800 flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <ShoppingBag size={20} className="text-[#0096ff]" />
                  <h3 className="font-black tracking-widest uppercase text-sm">Your Bag</h3>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
                  <X size={24} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-24 h-24 rounded-full bg-neutral-800/50 border border-neutral-700 flex items-center justify-center mb-10 shadow-2xl relative"
                  >
                     <ShoppingBag size={40} className="text-neutral-500" />
                  </motion.div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Bag Empty</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-10 leading-loose">Revolutionary streetwear is just a click away. Don't leave your archive incomplete.</p>
                  <button 
                    onClick={onClose} 
                    className="bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] px-12 py-5 rounded-full hover:bg-[#0096ff] hover:text-white transition-all shadow-xl w-full"
                  >
                    View Drops
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-6 group">
                    <img src={item.image} className="w-24 h-32 object-cover rounded-2xl border border-neutral-800 group-hover:border-[#0096ff]/50 transition-colors" alt="" />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-black uppercase text-xs tracking-tight mb-1 group-hover:text-[#0096ff] transition-colors">{item.name}</h4>
                        <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Ksh {item.price.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <button 
                              onClick={() => onUpdateQty(item.id, -1)}
                              className="w-10 h-10 rounded-xl border border-neutral-800 flex items-center justify-center hover:bg-white/5 transition-all active:scale-90"
                            >
                              <ArrowRight size={14} className="rotate-180" />
                            </button>
                            <span className="font-black text-xs w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQty(item.id, 1)}
                              className="w-10 h-10 rounded-xl border border-neutral-800 flex items-center justify-center hover:bg-white/5 transition-all active:scale-90"
                            >
                              <Plus size={14} />
                            </button>
                         </div>
                         <button 
                          onClick={() => onUpdateQty(item.id, -item.quantity)}
                          className="text-[8px] text-neutral-800 hover:text-red-500 font-black uppercase tracking-widest transition-colors"
                         >
                           Remove
                         </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 bg-black/40 border-t border-neutral-800">
               <div className="flex justify-between items-end mb-8">
                 <div className="micro-label">Account Balance</div>
                 <div className="text-3xl font-light italic">Ksh <span className="font-black text-gradient">{subtotal.toLocaleString()}</span></div>
               </div>
               <button 
                disabled={items.length === 0}
                onClick={onCheckout}
                className="w-full bg-[#0096ff] text-white py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] shadow-2xl shadow-[#0096ff]/40 hover:scale-[1.02] transition-all disabled:opacity-50"
               >
                 Review Order & Pay
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProductCard = ({ 
  product, 
  onAdd, 
  onToggleWishlist, 
  isWishlisted,
  onQuickView
}: { 
  product: Product, 
  onAdd: (p: Product) => void,
  onToggleWishlist: (id: string) => void,
  isWishlisted: boolean,
  onQuickView?: (p: Product) => void,
  key?: string | number
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col"
    >
      <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden relative rounded-[1.5rem] md:rounded-[2.5rem] bg-neutral-900 border border-neutral-800 transition-all duration-700 glow-hover cursor-pointer" onClick={() => onQuickView?.(product)}>
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${product.secondaryImage ? 'group-hover:opacity-0' : ''}`}
          referrerPolicy="no-referrer"
        />
        {product.secondaryImage && (
          <img 
            src={product.secondaryImage} 
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
            alt=""
          />
        )}
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full backdrop-blur-xl border border-white/5 transition-all z-10
            ${isWishlisted ? 'bg-[#0096ff] text-white shadow-lg shadow-[#0096ff]/40 scale-110' : 'bg-black/40 text-white hover:scale-110 hover:bg-neutral-800'}`}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
        </button>

        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-2 z-10">
          {product.badge && (
            <span className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] shadow-2xl backdrop-blur-2xl border border-white/10 
              ${product.badge === 'Grail' ? 'bg-yellow-500 text-black border-yellow-400' : 'bg-[#0096ff] text-white shadow-[#0096ff]/20'}`}>
              {product.badge}
            </span>
          )}
          {product.campusPickup && (
            <span className="px-3 py-1.5 rounded-xl bg-black/80 text-white text-[7px] font-black uppercase tracking-[0.2em] border border-white/5 shadow-2xl backdrop-blur-xl flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0096ff] animate-pulse" /> Campus Hub
            </span>
          )}
          {product.price < 1000 && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/90 text-white text-[7px] font-black uppercase tracking-[0.2em] border border-white/5 shadow-2xl backdrop-blur-xl flex items-center gap-2">
              <Zap size={8} fill="currentColor" /> Under 1K
            </span>
          )}
        </div>

        <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-2">
          {onQuickView && (
            <button 
              className="w-full bg-white/10 backdrop-blur-xl text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-white/20 transition-all border border-white/10"
              onClick={() => onQuickView(product)}
            >
              Quick View <ExternalLink size={14} />
            </button>
          )}
          <button 
            className="w-full bg-white text-black py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl active:scale-95"
            onClick={() => onAdd(product)}
          >
            Add to Bag <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="px-2 pt-6 flex flex-col">
        <div className="flex justify-between items-start mb-2">
           <div className="micro-label text-neutral-500">{product.category}</div>
           <div className="flex items-center gap-1">
              <Star size={10} className="text-[#0096ff]" fill="currentColor" />
              <span className="text-[10px] font-black">{product.rating || '4.5'}</span>
           </div>
        </div>
        <h3 className="font-bold text-sm md:text-md mb-2 tracking-tight group-hover:text-[#0096ff] transition-colors uppercase h-5 overflow-hidden">{product.name}</h3>
        <div className="flex justify-between items-baseline mb-3">
          <div className="flex flex-col">
            <span className="text-2xl font-black italic tracking-tighter text-white">Ksh {Math.floor(product.price).toLocaleString()}</span>
            <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-[0.2em]">{product.stockCount ? `${product.stockCount} Pieces Available` : 'Ready to Ship'}</span>
          </div>
          {(product.isNew || product.badge === 'NEW') && (
            <span className="text-[9px] font-black text-[#0096ff] uppercase tracking-widest border-b border-[#0096ff]/30 pb-0.5">Fresh In</span>
          )}
        </div>
        {product.stockCount && product.stockCount < 10 && (
          <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest flex items-center gap-2">
            <Clock size={10} /> Low Inventory
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Page Views ---

const HomeView = ({ onPageChange, onCategoryChange, onAdd, onToggleWishlist, wishlist, onQuickView, products }: { 
  onPageChange: (v: View) => void, 
  onCategoryChange: (c: string) => void,
  onAdd: (p: Product) => void,
  onToggleWishlist: (id: string) => void,
  wishlist: string[],
  onQuickView: (p: Product) => void,
  products: Product[]
}) => {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden">
        {/* Abstract Glow Elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#0096ff]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#00d4ff]/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 w-full z-10 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-10">
                <span className="micro-label">Global Access</span>
                <div className="h-px w-12 bg-white/20" />
                <span className="text-[10px] font-black uppercase text-[#0096ff] tracking-widest animate-pulse flex items-center gap-2">
                  <MapPin size={10} /> Nairobi Core
                </span>
              </div>
              <h1 className="text-6xl md:text-[8rem] font-light leading-[0.85] mb-12 tracking-tighter uppercase italic py-4">
                Own Your<br />
                <span className="text-gradient font-black">Attitude</span>
              </h1>
              <p className="text-neutral-500 text-lg md:text-xl mb-14 leading-relaxed max-w-lg font-light tracking-wide">
                Revolutionary streetwear designed near the pulse of the city. 
                Shipping worldwide from Nairobi, embracing those who refuse to blend in.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <button 
                  onClick={() => onPageChange('shop')}
                  className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                >
                  Explore Catalog <ArrowRight size={16} />
                </button>
                <div className="flex items-center gap-4 pt-4 sm:pt-0">
                  <div className="flex -space-x-4">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-neutral-800">
                           <img src={`https://picsum.photos/seed/user-${i}/100/100`} alt="" />
                        </div>
                     ))}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-neutral-500">
                    JOINED BY <span className="text-white font-black italic">500+</span> REBELS
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-[#0096ff]/10 rounded-[4rem] rotate-6 -z-10" />
                <div className="w-full h-full bg-neutral-900 border border-neutral-800 rounded-[4rem] overflow-hidden group">
                  <img src={MEDIA.hero} alt="AMARU Streetwear" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 px-6 bg-black border-y border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Premium Materials", val: "Archive Denim", icon: <ShieldCheck size={16} /> },
              { label: "Local Production", val: "Nairobi Core", icon: <MapPin size={16} /> },
              { label: "Global Logistics", val: "Door-to-Door", icon: <Truck size={16} /> },
              { label: "Elite Support", val: "Concierge 24/7", icon: <Award size={16} /> }
            ].map((v, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-[#0096ff]">{v.icon}</div>
                <div className="micro-label mb-2 opacity-50">{v.label}</div>
                <div className="text-xl font-black uppercase font-display italic tracking-widest">{v.val}</div>
              </div>
            ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6">
            <div>
              <div className="micro-label mb-4 text-gradient">Latest Inflow</div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Featured Fragments</h2>
            </div>
            <button 
              onClick={() => onPageChange('shop')}
              className="group text-neutral-500 hover:text-white transition-all font-black tracking-[0.4em] flex items-center gap-4 text-[10px] uppercase"
            >
              PROJECT ACCESS <div className="p-3 md:p-4 rounded-full border border-neutral-800 group-hover:border-[#0096ff] transition-all"><ChevronRight size={16} /></div>
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {products.slice(0, 4).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={onAdd} 
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Invariants Section */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
            {[
              { 
                title: "Excellence", 
                body: "Every thread is chosen for longevity. Every design is crafted for impact. No shortcuts. Just AMARU.", 
                accent: BRAND_GRADIENT 
              },
              { 
                title: "Nairobi Soul", 
                body: "We represent the heart of East African creativity, taking local grit to a global stage.", 
                accent: "from-[#0096ff] to-cyan-400" 
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-neutral-900 border border-neutral-800 p-12 md:p-20 rounded-[2.5rem] md:rounded-[4rem] group hover:border-[#0096ff] transition-all"
              >
                <h3 className={`text-4xl md:text-6xl font-black italic uppercase mb-8 tracking-tighter group-hover:text-white transition-colors text-gradient`}>
                  {card.title}
                </h3>
                <p className="text-neutral-500 text-lg leading-relaxed font-light">
                  {card.body}
                </p>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Categories Bento */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="micro-label mb-8 md:mb-12 text-center text-gradient">The Collection Types</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Plus size={28} />, name: 'CAMPUS ESSENTIALS' },
              { icon: <Package size={28} />, name: 'SWEATSHIRTS' },
              { icon: <Shirt size={28} />, name: 'SHIRTS' },
              { icon: <LayoutGrid size={28} />, name: 'JEANS' },
            ].map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                onClick={() => {
                  onCategoryChange(cat.name);
                  onPageChange('shop');
                }}
                className="bg-neutral-900/40 border border-neutral-800 p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] text-center cursor-pointer hover:border-[#0096ff] transition-all group"
              >
                <div className="text-[#0096ff] mb-4 md:mb-6 flex justify-center group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-black text-sm md:text-lg uppercase tracking-tight">{cat.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Banner */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-neutral-900 border border-neutral-800 p-12 md:p-32 rounded-[4rem] overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#0096ff]/5 to-transparent pointer-events-none" />
            <div className="micro-label mb-10">Signature Release</div>
            <h2 className="text-6xl md:text-[8rem] font-light uppercase mb-12 leading-none tracking-tighter italic">
              REBELLION<br />
              <span className="font-black">STUDIO</span>
            </h2>
            <button 
              onClick={() => onPageChange('shop')}
              className="bg-white text-black px-16 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-xl"
            >
              Explore Drops
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

// --- Shop View ---
const ShopView = ({ 
  products, 
  onAdd, 
  activeCategory, 
  setActiveCategory, 
  onToggleWishlist, 
  wishlist,
  onQuickView,
  sortOrder,
  setSortOrder,
  priceRange,
  setPriceRange,
  isLoading
}: { 
  products: Product[], 
  onAdd: (p: Product) => void,
  activeCategory: string,
  setActiveCategory: (c: string) => void,
  onToggleWishlist: (id: string) => void,
  wishlist: string[],
  onQuickView: (p: Product) => void,
  sortOrder: string,
  setSortOrder: (s: string) => void,
  priceRange: [number, number],
  setPriceRange: (r: [number, number]) => void,
  isLoading: boolean
}) => {
  const categories = SITE_CATEGORIES;

  return (
    <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div className="relative">
            <div className="micro-label mb-4 text-[#0096ff] flex items-center gap-2">
              <Zap size={10} fill="currentColor" /> Verified Retail Partner
            </div>
            <h1 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter italic leading-[0.8] mb-8">
              THE <span className="text-gradient hover:animate-pulse transition-all">CATALOG</span>
            </h1>
            
            <div className="flex flex-wrap gap-4 items-center mb-8">
               <div className="flex bg-neutral-900 rounded-2xl p-1.5 border border-white/5">
                 {['Grid', 'Focus'].map(m => (
                    <button key={m} className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest ${m === 'Grid' ? 'bg-white text-black' : 'text-neutral-500'}`}>{m}</button>
                 ))}
               </div>
               <div className="h-4 w-px bg-white/10" />
               <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black uppercase text-neutral-600 tracking-widest">Pricing:</span>
                  <select 
                    value={`${priceRange[0]}-${priceRange[1]}`} 
                    onChange={(e) => {
                      const [min, max] = e.target.value.split('-').map(Number);
                      setPriceRange([min, max]);
                    }}
                    className="bg-transparent text-[9px] font-black uppercase tracking-widest outline-none text-[#0096ff] cursor-pointer"
                  >
                    <option value="0-10000" className="bg-black">All Segments</option>
                    <option value="0-1000" className="bg-black">Under 1K</option>
                    <option value="1000-2000" className="bg-black">1K - 2K</option>
                    <option value="2000-10000" className="bg-black">Premium Range</option>
                  </select>
               </div>
               <div className="h-4 w-px bg-white/10" />
               <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black uppercase text-neutral-600 tracking-widest">Sort:</span>
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-transparent text-[9px] font-black uppercase tracking-widest outline-none text-[#0096ff] cursor-pointer"
                  >
                    <option value="pop" className="bg-black">Popularity</option>
                    <option value="low" className="bg-black">Budget (Low)</option>
                    <option value="high" className="bg-black">Elite (High)</option>
                    <option value="alpha" className="bg-black">A - Z</option>
                  </select>
               </div>
            </div>

            <p className="text-neutral-500 font-light max-w-lg uppercase tracking-widest text-[10px] leading-relaxed">
              Serving the elite student body of Nairobi. 
              Interactive fragments curated for identity and status.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 bg-neutral-900/50 p-2 md:p-3 rounded-3xl border border-white/5 backdrop-blur-xl">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all
                  ${activeCategory === cat ? 'bg-white text-black shadow-2xl' : 'text-neutral-500 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-12 md:gap-y-20 relative">
            {[1,2,3,4,5,6,7,8].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="py-60 text-center relative">
            <div className="absolute inset-0 bg-gradient-radial from-[#0096ff]/5 to-transparent blur-3xl pointer-events-none" />
            <h2 className="text-2xl font-black uppercase tracking-[0.5em] text-neutral-700">Stock Depleted</h2>
            <p className="mt-4 text-neutral-500 font-light uppercase text-[10px] tracking-widest">Check back shortly for new drops.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-12 md:gap-y-20 relative">
             {/* Abstract Grid Elements */}
             <div className="absolute top-0 right-[-10%] w-64 h-64 bg-[#0096ff]/5 blur-3xl rounded-full pointer-events-none" />
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={onAdd}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// --- About View ---
const AboutView = ({ onPageChange }: { onPageChange: (v: View) => void }) => {
  return (
    <div className="bg-black">
      {/* SECTION 1 — HERO BANNER */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544022613-e879a7935ed9?q=80&w=2000" 
            alt="About AMARU" 
            className="w-full h-full object-cover opacity-40 brightness-50"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-8 leading-none">
              About <span className="text-gradient">AMARU</span>
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed uppercase">
              More Than Fashion — A Movement of Confidence, Identity, and Style
            </p>
            <button 
              onClick={() => onPageChange('shop')}
              className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl active:scale-95"
            >
              Shop the Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — OUR STORY */}
      <section className="py-24 md:py-48 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-12 text-center md:text-left">
            <div className="micro-label text-[#0096ff]">Origins</div>
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">The Genesis</h2>
            <div className="space-y-8 text-neutral-400 text-xl md:text-2xl font-light leading-relaxed">
              <p>
                AMARU is forged in the fire of urban creativity. We began as a rejection of the ordinary—a pursuit of a silhouette that speaks before you do.
              </p>
              <p>
                We believe that every thread is a choice, and every design is a statement of intent. Our archive is built for those who navigate the concrete jungle with both grit and grace.
              </p>
              <p>
                This isn't just apparel. It's an armor of confidence, a texture of rebellion, and a blueprint for the modern soul.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4 — MISSION & VISION */}
      <section className="py-24 px-6 border-y border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
           <div className="bg-neutral-900/50 p-12 md:p-20 rounded-[3rem] border border-white/5 group hover:border-[#0096ff]/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#0096ff]/10 flex items-center justify-center text-[#0096ff] mb-8"><Award size={24} /></div>
              <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter">Our Mission</h3>
              <p className="text-neutral-500 text-lg leading-relaxed font-light">
                To deliver premium fashion that inspires confidence, creativity, and individuality while maintaining affordability and quality.
              </p>
           </div>
           <div className="bg-neutral-900/50 p-12 md:p-20 rounded-[3rem] border border-white/5 group hover:border-[#0096ff]/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#0096ff]/10 flex items-center justify-center text-[#0096ff] mb-8"><Sparkles size={24} /></div>
              <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter">Our Vision</h3>
              <p className="text-neutral-500 text-lg leading-relaxed font-light">
                To become a recognized fashion brand known for bold design, quality craftsmanship, and customer satisfaction across Africa and beyond.
              </p>
           </div>
        </div>
      </section>

      {/* SECTION 5 — OUR VALUES */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <div className="micro-label mb-6 text-[#0096ff]">Core Principles</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">The AMARU Standard</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { title: "INTEGRITY", desc: "Durable textiles curated for the long-form journey.", icon: <ShieldCheck size={32} /> },
             { title: "VISION", desc: "Constant evolution. Innovative silhouettes that lead.", icon: <Zap size={32} /> },
             { title: "COMMUNITY", desc: "A shared identity built on trust and mutual respect.", icon: <Heart size={32} /> },
             { title: "INTENT", desc: "Every detail serves a purpose. No filler, only essence.", icon: <Award size={32} /> }
           ].map((v, i) => (
             <div key={i} className="bg-neutral-900/40 p-12 rounded-[2.5rem] border border-white/5 hover:border-[#0096ff]/40 transition-all group text-center">
                <div className="text-[#0096ff] mb-8 flex justify-center group-hover:scale-110 transition-transform">{v.icon}</div>
                <h4 className="text-xl font-black uppercase italic mb-4 tracking-tighter">{v.title}</h4>
                <p className="text-neutral-500 text-sm font-light leading-relaxed">{v.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* SECTION 6 — WHY CHOOSE AMARU */}
      <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto mb-24">
          <div className="micro-label mb-6 text-[#0096ff]">The Archive Protocol</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">The AMARU Experience</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             { title: "ARCHIVE QUALITY", desc: "Superior textiles sourced for their elite hand-feel and longevity.", icon: <Gem size={24} /> },
             { title: "AVANT-GARDE CUTS", desc: "Street-inspired silhouettes that challenge conventional urban wear.", icon: <LayoutGrid size={24} /> },
             { title: "DEMOCRATIC LUXURY", desc: "Premium aesthetics made accessible to those who define the culture.", icon: <Package size={24} /> },
             { title: "ELITE CONCIERGE", desc: "A direct human-to-human connection for all your logistical needs.", icon: <MessageCircle size={24} /> },
             { title: "RAPID TRANSIT", desc: "Expedited logistic pipelines ensuring your archive arrives on beat.", icon: <Truck size={24} /> },
             { title: "VERIFIED IDENTITY", desc: "Join 1,000+ rebels who navigate the city in AMARU.", icon: <ShieldCheck size={24} /> }
           ].map((item, i) => (
             <div key={i} className="flex gap-8 p-10 bg-neutral-900 rounded-[2.5rem] border border-white/5 hover:border-[#0096ff]/20 transition-all backdrop-blur-xl">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#0096ff]/10 flex items-center justify-center text-[#0096ff]">{item.icon}</div>
                <div>
                   <h5 className="text-lg font-black uppercase mb-2 tracking-tight">{item.title}</h5>
                   <p className="text-neutral-500 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* SECTION 7 — CALL TO ACTION */}
      <section className="py-24 md:py-48 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-900 to-black p-12 md:p-32 rounded-[3.5rem] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[#0096ff]/5 blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 leading-none">Join the Movement</h2>
            <p className="text-neutral-400 text-xl md:text-2xl font-light mb-12 uppercase tracking-wide">
              Step into confidence. Wear your identity. Experience the power of style with AMARU.
            </p>
            <button 
              onClick={() => onPageChange('shop')}
              className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl active:scale-95"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Contact View ---
const ContactView = () => {
  return (
    <div className="bg-black">
      {/* SECTION 1 — HERO SECTION */}
      <section className="pt-48 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
             <div className="micro-label mb-6 text-[#0096ff]">Support Hub</div>
             <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-8 leading-none">Contact <span className="text-gradient hover:animate-pulse cursor-default">AMARU</span></h1>
             <p className="text-xl md:text-2xl font-light text-neutral-400 mb-6 uppercase tracking-widest">We're Here to Help You</p>
             <p className="text-neutral-500 max-w-xl mx-auto font-light leading-relaxed">
               Have a question about our products, orders, or delivery? Our team is ready to assist you.
             </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — CONTACT INFORMATION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { label: "Phone", val: "+254 746 746904", sub: "Direct Line", icon: <Phone size={24} />, link: "tel:+254746746904" },
             { label: "WhatsApp", val: "Chat Online", sub: "Fast Response", icon: <MessageCircle size={24} />, link: "https://wa.me/254746746904" },
             { label: "Email", val: "info@amaruofficial.com", sub: "Official Queries", icon: <Mail size={24} />, link: "mailto:info@amaruofficial.com" },
             { label: "Location", val: "Kenya", sub: "Nairobi Core", icon: <MapPin size={24} /> }
           ].map((card, i) => (
             <a 
               key={i} 
               href={card.link}
               target={card.link?.startsWith('http') ? "_blank" : undefined}
               className="bg-neutral-900/50 p-10 rounded-[2.5rem] border border-white/5 hover:border-[#0096ff]/40 transition-all group flex flex-col items-center text-center"
             >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#0096ff] mb-6 group-hover:scale-110 transition-transform">{card.icon}</div>
                <div className="micro-label mb-2 opacity-40">{card.label}</div>
                <div className="text-lg font-black uppercase mb-1">{card.val}</div>
                <div className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{card.sub}</div>
             </a>
           ))}
        </div>
        <div className="max-w-7xl mx-auto mt-12 bg-[#050505] p-10 rounded-[2.5rem] border border-white/5 text-center">
           <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                 <Clock size={20} className="text-[#0096ff]" />
                 <span className="micro-label">Business Hours:</span>
              </div>
              <div className="text-lg font-black uppercase italic tracking-widest">Monday — Saturday: 8:00 AM — 6:00 PM</div>
           </div>
        </div>
      </section>

      {/* SECTION 3 — CONTACT FORM */}
      <section className="py-24 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Send a Manifest</h2>
            <p className="text-neutral-500 font-light uppercase text-xs tracking-widest">Our agents will respond within 24 hours</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-black tracking-widest text-neutral-600 ml-4">Full Name</label>
                <input 
                  type="text" 
                  placeholder="EX: JOHN DOE"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-black tracking-widest text-neutral-600 ml-4">Email Address</label>
                <input 
                  type="email" 
                  placeholder="EX: INFO@MAIL.COM"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest text-neutral-600 ml-4">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+254 --- --- ---"
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black tracking-widest text-neutral-600 ml-4">Message</label>
              <textarea 
                rows={6}
                placeholder="WHAT'S ON YOUR MIND?"
                className="w-full bg-black/40 border border-white/5 rounded-3xl px-8 py-6 text-xs font-black tracking-widest focus:border-[#0096ff]/40 outline-none transition-all placeholder:text-neutral-800 resize-none"
              ></textarea>
            </div>
            <button 
              className="w-full py-6 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 4 — TRUST BUILDING */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <div className="micro-label mb-6 text-[#0096ff]">Reliability</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Why Customers Trust AMARU</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: <ShieldCheck size={28} />, title: "Secure Orders", desc: "Encoded checkout transmissions" },
               { icon: <Clock size={28} />, title: "Fast Response Time", desc: "Under 12 hour response window" },
               { icon: <Truck size={28} />, title: "Reliable Delivery", desc: "Verified global logistics network" },
               { icon: <Heart size={28} />, title: "Customer Support", desc: "Human-centric concierge help" }
             ].map((item, i) => (
               <div key={i} className="text-center group">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-[#0096ff] group-hover:bg-[#0096ff] group-hover:text-white transition-all shadow-xl shadow-[#0096ff]/10">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-black uppercase italic tracking-tighter mb-2 leading-none">{item.title}</h4>
                  <p className="text-neutral-600 text-[10px] font-black uppercase tracking-widest">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHATSAPP QUICK CONTACT */}
      <section className="py-24 md:py-48 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-r from-[#25D366]/20 to-transparent p-12 md:p-32 rounded-[3.5rem] border border-[#25D366]/20 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
               <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">Need Help Fast?</h2>
               <p className="text-neutral-400 text-xl font-light uppercase tracking-widest max-w-sm">Chat with us instantly on WhatsApp and get quick assistance.</p>
            </div>
            <button 
              onClick={() => window.open('https://wa.me/254746746904', '_blank')}
              className="bg-[#25D366] text-white px-12 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:scale-105 transition-all shadow-2xl shadow-[#25D366]/40 flex items-center gap-4"
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </button>
            <div className="absolute top-0 right-0 p-8 opacity-10"><MessageCircle size={200} /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Admin Section ---
const AdminView = ({ 
  onPageChange, 
  orders, 
  products, 
  onAddProduct,
  onDeleteProduct
}: { 
  onPageChange: (v: View) => void, 
  orders: Order[],
  products: Product[],
  onAddProduct: (p: Product) => void,
  onDeleteProduct: (id: string) => void
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Sweatshirts',
    description: '',
    badge: '',
    stockCount: 50,
    campusPickup: true,
    inStock: true
  });
  const [imageFile, setImageFile] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !imageFile) {
      alert('Missing payload: Name, Price, and Asset required.');
      return;
    }

    const p: Product = {
      id: `sku-${Date.now()}`,
      name: newProduct.name!,
      price: Number(newProduct.price),
      category: newProduct.category || 'Sweatshirts',
      description: newProduct.description || 'Premium archive fragment.',
      image: imageFile,
      badge: newProduct.badge || null as any,
      rating: 5,
      reviews: 0,
      inStock: true,
      stockCount: newProduct.stockCount || 50,
      campusPickup: true,
      tags: ['New Release', 'Admin Managed']
    };

    onAddProduct(p);
    setIsAdding(false);
    setNewProduct({
      name: '',
      price: 0,
      category: 'Sweatshirts',
      description: '',
      badge: '',
      stockCount: 50
    });
    setImageFile(null);
  };

  return (
    <section className="pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6 md:gap-8">
           <div>
              <div className="micro-label mb-2 md:mb-4 text-[#0096ff]">Command Module</div>
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic break-words leading-none">Management</h1>
           </div>
           <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <button 
                onClick={() => setActiveTab('inventory')}
                className={`flex-1 md:flex-none px-6 md:px-8 py-2 md:py-3 rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-[#0096ff] text-white shadow-lg shadow-[#0096ff]/20' : 'bg-white/5 text-neutral-500 border border-white/5'}`}
              >
                Inventory
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex-1 md:flex-none px-6 md:px-8 py-2 md:py-3 rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-[#0096ff] text-white shadow-lg shadow-[#0096ff]/20' : 'bg-white/5 text-neutral-500 border border-white/5'}`}
              >
                Orders ({orders.length})
              </button>
              <button 
                onClick={() => onPageChange('login')}
                className="px-6 md:px-8 py-2 md:py-3 border border-red-500/20 text-red-500 rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-all"
              >
                Exit Console
              </button>
           </div>
        </div>

        {activeTab === 'inventory' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-20">
                {[
                  { label: 'ARCHIVE DEPTH', val: products.length, suffix: 'SKUs' },
                  { label: 'RETAIL VALUE', val: '2.4M', suffix: 'Ksh' },
                  { label: 'STOCK HEALTH', val: '100', suffix: '%' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-neutral-900/50 border border-neutral-800/50 p-8 md:p-12 rounded-[2.5rem] shadow-xl group hover:border-[#0096ff]/30 transition-all backdrop-blur-sm">
                    <div className="micro-label mb-4 opacity-40">{stat.label}</div>
                    <div className="flex items-baseline gap-2">
                       <p className="text-3xl md:text-5xl font-black text-white">{stat.val}</p>
                       <span className="text-[10px] font-black text-[#0096ff] uppercase tracking-widest">{stat.suffix}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] md:rounded-[4rem] overflow-hidden">
              <div className="p-8 md:p-12 border-b border-neutral-800 flex justify-between items-center bg-black/20 backdrop-blur-sm">
                  <h3 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter">Inventory Archive</h3>
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-white text-black px-6 md:px-10 py-3 md:py-4 rounded-full font-black text-[8px] md:text-[10px] uppercase tracking-widest hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl active:scale-95"
                  >
                    Initiate Drop +
                  </button>
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#050505] text-neutral-600 uppercase text-[8px] md:text-[9px] font-black tracking-[0.3em] border-b border-neutral-800">
                        <tr>
                          <th className="px-12 py-8">Entity Details</th>
                          <th className="px-12 py-8 hidden sm:table-cell">Category</th>
                          <th className="px-12 py-8">Valuation</th>
                          <th className="px-12 py-8 text-right">Protocol</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-12 py-8 flex items-center gap-6">
                              <img src={p.image} className="w-16 h-20 object-cover rounded-2xl border border-neutral-800 shadow-lg" alt="" />
                              <div>
                                <div className="font-black text-sm md:text-lg uppercase group-hover:text-[#0096ff] transition-colors leading-tight">{p.name}</div>
                                <div className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-1">ID: {p.id.slice(0, 12)}</div>
                              </div>
                            </td>
                            <td className="px-12 py-8 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500 hidden sm:table-cell">{p.category}</td>
                            <td className="px-12 py-8 font-mono text-sm md:text-xl italic whitespace-nowrap">Ksh {p.price.toLocaleString()}</td>
                            <td className="px-12 py-8 text-right">
                              <button 
                                onClick={() => onDeleteProduct(p.id)}
                                className="text-neutral-800 hover:text-red-500 transition-all uppercase font-black text-[8px] md:text-[10px] tracking-widest p-4 hover:bg-red-500/5 rounded-full"
                              >
                                Decommission
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
              </div>
            </div>

            {/* Direct Upload Modal */}
            <AnimatePresence>
              {isAdding && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
                >
                  <motion.div 
                    initial={{ y: 50, scale: 0.95 }}
                    animate={{ y: 0, scale: 1 }}
                    className="bg-neutral-900 border border-neutral-800 w-full max-w-2xl rounded-[3rem] overflow-hidden p-8 md:p-12 relative my-auto shadow-[0_0_100px_rgba(0,150,255,0.1)]"
                  >
                    <button onClick={() => setIsAdding(false)} className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-neutral-500 hover:text-white transition-all"><X size={24} /></button>
                    <div className="micro-label mb-4 text-[#0096ff]">New Fragment Integration</div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-10 leading-none">Initiate <span className="text-gradient">Drop</span></h2>
                    
                    <form onSubmit={handleCreate} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 ml-4">Segment Identity</label>
                          <input 
                            required
                            type="text" 
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-xs font-black uppercase outline-none focus:border-[#0096ff]/50 transition-all placeholder:text-neutral-800"
                            placeholder="PRODUCT NAME"
                            value={newProduct.name}
                            onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 ml-4">Retail Valuation (Ksh)</label>
                          <input 
                            required
                            type="number" 
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-xs font-black uppercase outline-none focus:border-[#0096ff]/50 transition-all placeholder:text-neutral-800"
                            placeholder="EX: 1500"
                            value={newProduct.price}
                            onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 ml-4">Category Node</label>
                          <select 
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-xs font-black uppercase outline-none focus:border-[#0096ff]/50 cursor-pointer transition-all"
                            value={newProduct.category}
                            onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                          >
                            {SITE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 ml-4">Identity Marker (Badge)</label>
                          <input 
                            type="text" 
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-xs font-black uppercase outline-none focus:border-[#0096ff]/50 transition-all placeholder:text-neutral-800"
                            placeholder="EX: GRAIL, NEW, LIMITLESS"
                            value={newProduct.badge}
                            onChange={e => setNewProduct({...newProduct, badge: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 ml-4">Fragment Narrative</label>
                        <textarea 
                          rows={3}
                          className="w-full bg-black border border-white/5 rounded-3xl px-6 py-5 text-xs font-black uppercase outline-none focus:border-[#0096ff]/50 resize-none transition-all placeholder:text-neutral-800"
                          placeholder="DETAILED DESCRIPTION..."
                          value={newProduct.description}
                          onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0096ff] ml-4 flex items-center gap-2">
                           <Camera size={14} /> Direct Asset Upload
                        </label>
                        <div className="flex items-center gap-8 p-8 border-2 border-dashed border-[#0096ff]/10 rounded-[2rem] group hover:border-[#0096ff]/40 transition-all cursor-pointer relative bg-black/40">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          {imageFile ? (
                            <img src={imageFile} className="w-24 h-32 object-cover rounded-2xl shadow-2xl ring-2 ring-[#0096ff]" alt="Preview" />
                          ) : (
                            <div className="w-24 h-32 rounded-2xl bg-neutral-900 flex items-center justify-center text-neutral-700 group-hover:text-[#0096ff] transition-all group-hover:scale-105 transform-gpu shadow-inner"><Plus size={32} /></div>
                          )}
                          <div>
                            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Select Primary Visual</div>
                            <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-600 mt-2 max-w-[200px] leading-relaxed">
                               Browse your device for high-resolution fragments to archive.
                            </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-8 bg-white text-black rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#0096ff] hover:text-white transition-all shadow-2xl shadow-[#0096ff]/20 active:scale-[0.98] mt-6"
                      >
                        Publish Identity to Universe
                      </button>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] md:rounded-[4rem] overflow-hidden">
             <div className="p-8 md:p-12 border-b border-neutral-800">
                  <h3 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter">Order Transmission Logs</h3>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-[#050505] text-neutral-600 uppercase text-[8px] md:text-[9px] font-black tracking-[0.3em] border-b border-neutral-800">
                        <tr>
                          <th className="px-6 md:px-12 py-4 md:py-8">Vector ID</th>
                          <th className="px-6 md:px-12 py-4 md:py-8">Customer Node</th>
                          <th className="px-6 md:px-12 py-4 md:py-8 whitespace-nowrap">Total Value</th>
                          <th className="px-6 md:px-12 py-4 md:py-8">Status</th>
                          <th className="px-6 md:px-12 py-4 md:py-8 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {orders.length === 0 ? (
                          <tr><td colSpan={5} className="p-24 text-center opacity-40 micro-label">Awaiting First Transmission...</td></tr>
                        ) : (
                          orders.map(order => (
                            <React.Fragment key={order.id}>
                              <tr className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 md:px-12 py-4 md:py-8 font-mono text-[8px] md:text-[10px] opacity-40">{order.id}</td>
                                <td className="px-6 md:px-12 py-4 md:py-8 font-black uppercase text-[10px] md:text-xs text-white group-hover:text-[#0096ff] transition-colors">
                                  {order.customerName}
                                  <div className="text-[7px] text-neutral-600 lowercase tracking-widest mt-1">
                                    {order.items.length} items • {new Date(order.date || '').toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="px-12 py-8 font-mono text-sm md:text-base italic whitespace-nowrap">Ksh {order.total.toLocaleString()}</td>
                                <td className="px-6 md:px-12 py-4 md:py-8">
                                  <div className="flex flex-col gap-2">
                                    <span className={`w-fit px-4 py-1.5 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                                      {order.status}
                                    </span>
                                    {order.trackingNumber && (
                                      <div className="text-[8px] font-mono opacity-40 uppercase">{order.courier}: {order.trackingNumber}</div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 md:px-12 py-4 md:py-8 text-right">
                                  <button className="text-[#0096ff] font-black text-[8px] md:text-[10px] uppercase tracking-widest border border-[#0096ff]/30 px-4 py-2 rounded-full hover:bg-[#0096ff] hover:text-white transition-all">Manifest</button>
                                </td>
                              </tr>
                              {order.milestones && (
                                <tr>
                                  <td colSpan={5} className="px-12 py-8 bg-black/40 border-b border-neutral-800">
                                    <div className="flex flex-col gap-6">
                                      <div className="micro-label opacity-30">Detailed Tracking Timeline</div>
                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                        {order.milestones.map((m, i) => (
                                          <div key={i} className="relative pl-6 border-l border-[#0096ff]/20">
                                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#0096ff]" />
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#0096ff] mb-1">{m.status}</div>
                                            <div className="text-[9px] text-neutral-500 uppercase mb-2">{new Date(m.date).toLocaleString()}</div>
                                            <p className="text-[10px] text-neutral-400 font-light italic">{m.description}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))
                        )}
                    </tbody>
                 </table>
              </div>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('customer');
  const [activeCategory, setActiveCategory] = useState<string>('All Drops');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('pop');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [allProducts, setAllProducts] = useState<Product[]>(SAMPLE_PRODUCTS);

  // Persistence (Mock)
  useEffect(() => {
    const savedCart = localStorage.getItem('amaru_cart');
    const savedWishlist = localStorage.getItem('amaru_wishlist');
    const savedProducts = localStorage.getItem('amaru_products');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedProducts) setAllProducts(JSON.parse(savedProducts));
  }, []);

  useEffect(() => {
    localStorage.setItem('amaru_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amaru_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('amaru_products', JSON.stringify(allProducts));
  }, [allProducts]);

  // Loading simulation when category changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeCategory, sortOrder, priceRange]);

  const handlePageChange = (v: View) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView(v);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckout = () => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      customerName: 'Guest User',
      items: cart,
      total,
      status: 'pending',
      milestones: [
        { date: new Date().toISOString(), status: 'pending', description: 'Order transmission received by AMARU Nexus.' }
      ],
      date: new Date().toISOString()
    };
    
    setOrders([newOrder, ...orders]);
    
    // WhatsApp Integration for checkout
    const itemsText = cart.map(item => `📦 *${item.name}*\n   Qty: ${item.quantity}\n   Price: Ksh ${item.price.toLocaleString()}`).join('\n\n');
    const message = `*NEW ORDER FROM AMARU WEBSITE*\n\n*Customer:* ${newOrder.customerName}\n\n*Items:*\n${itemsText}\n\n*Total: Ksh ${total.toLocaleString()}*\n\n_Please confirm availability for pickup/delivery._`;
    window.open(`https://wa.me/254746746904?text=${encodeURIComponent(message)}`, '_blank');
    
    setCart([]);
    setIsCartOpen(false);
    // Silent success or custom elegant modal would be better than window.alert
    setTimeout(() => {
      handlePageChange('customer');
    }, 500);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddProduct = (p: Product) => {
    setAllProducts(prev => [p, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this SKU from the archive?')) {
      setAllProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredProducts = allProducts.filter(p => {
    const activeCatUpper = activeCategory.toUpperCase();
    const isUnder1K = activeCatUpper === 'UNDER 1K';
    
    const matchesCategory = activeCatUpper === 'ALL DROPS' || 
                            p.category.toUpperCase() === activeCatUpper ||
                            (activeCatUpper === 'CAMPUS ESSENTIALS' && p.campusPickup) ||
                            (isUnder1K && p.price < 1000);
                            
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
                         
    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortOrder === 'low') return a.price - b.price;
    if (sortOrder === 'high') return b.price - a.price;
    if (sortOrder === 'alpha') return a.name.localeCompare(b.name);
    return (b.rating || 0) - (a.rating || 0); // Default/Pop
  });

  return (
    <div className="min-h-screen selection:bg-[#0096ff]/30 transition-colors duration-500 bg-black text-white">
      {view !== 'login' && (
        <Navbar 
          onViewChange={handlePageChange} 
          currentView={view} 
          onSearchOpen={() => setIsSearchOpen(true)}
          wishlistCount={wishlist.length}
          onCartOpen={() => setIsCartOpen(true)}
        />
      )}

      {/* Floating Action Center */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
        {/* WhatsApp Concierge */}
        <button 
          onClick={() => window.open('https://wa.me/254746746904?text=Hello%20AMARU%20Concierge!', '_blank')}
          className="bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all border border-white/10 group relative"
        >
          <MessageCircle size={24} />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/5">
            Concierge Online
          </span>
        </button>
        
        {/* Cart Trigger */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-[#0096ff] text-white p-5 rounded-full shadow-2xl shadow-[#0096ff]/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center relative border border-[#00d4ff]/20"
        >
          <ShoppingBag size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#0096ff]">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        query={searchQuery} 
        setQuery={setSearchQuery} 
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onCheckout={handleCheckout}
      />

      <QuickViewModal 
        isOpen={!!quickViewProduct}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAdd={addToCart}
        onToggleWishlist={toggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
      />

      <AnimatePresence mode="wait">
        {view === 'login' ? (
          <LoginView key="login-view" onLogin={(role) => handlePageChange(role)} />
        ) : (
          <motion.main
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {view === 'customer' && (
              <HomeView 
                onPageChange={handlePageChange} 
                onCategoryChange={setActiveCategory} 
                onAdd={addToCart} 
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                products={allProducts}
              />
            )}
            {view === 'shop' && (
              <ShopView 
                products={filteredProducts} 
                onAdd={addToCart} 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                isLoading={isLoading}
              />
            )}
            {view === 'wishlist' && (
              <WishlistView 
                products={allProducts.filter(p => wishlist.includes(p.id))} 
                onAdd={addToCart}
                onToggleWishlist={toggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onPageChange={handlePageChange}
              />
            )}
            {view === 'projects' && <ProjectsView />}
            {view === 'about' && <AboutView onPageChange={handlePageChange} />}
            {view === 'contact' && <ContactView />}
            {view === 'admin' && (
              <AdminView 
                onPageChange={handlePageChange} 
                orders={orders} 
                products={allProducts}
                onAddProduct={handleAddProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            )}
            {view !== 'admin' && <Footer onPageChange={handlePageChange} />}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
