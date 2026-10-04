import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  getDemoUser, 
  saveDemoUser, 
  signOutDemoUser, 
  getDemoOrders, 
  getDemoCustomerDetails, 
  saveDemoCustomerDetails 
} from '../utils/userAccount';
import { getRecentlyViewedProducts, getProductsByIds } from '../data/fashionProducts';
import ProductCard from '../components/ProductCard';
import { 
  User, 
  Package, 
  Heart, 
  Clock, 
  MapPin, 
  HelpCircle, 
  LogOut, 
  Edit3, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';

export default function AccountPage({
  wishlistIds = [],
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  cartItems = [],
  showToast
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from URL path
  const getActiveTabFromPath = () => {
    if (location.pathname.includes('/account/orders')) return 'orders';
    if (location.pathname.includes('/account/details')) return 'details';
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath());
  const [user, setUser] = useState(() => getDemoUser());
  const [orders, setOrders] = useState(() => getDemoOrders());
  const [savedDetails, setSavedDetails] = useState(() => getDemoCustomerDetails() || {
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '' });
  const [detailsSuccess, setDetailsSuccess] = useState(false);

  // Sync state on location/storage change
  useEffect(() => {
    setActiveTab(getActiveTabFromPath());
    setUser(getDemoUser());
    setOrders(getDemoOrders());
    const dt = getDemoCustomerDetails();
    if (dt) setSavedDetails(dt);
  }, [location.pathname]);

  // Derived data arrays
  const wishlistProducts = getProductsByIds(wishlistIds);
  const recentlyViewedProducts = getRecentlyViewedProducts();
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Demo Sign In Action
  const handleDemoSignIn = () => {
    const demoProfile = saveDemoUser({
      name: 'VS Customer',
      email: 'customer@vs-demo.com',
      phone: '+91 98765 43210',
      joined: '2026'
    });
    setUser(demoProfile);
    if (showToast) showToast('Signed into demo account.', 'info');
  };

  // Sign Out Action
  const handleSignOut = () => {
    signOutDemoUser();
    setUser(null);
    if (showToast) showToast("You've been signed out of the demo account.", 'info');
    navigate('/account');
  };

  // Profile Edit Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = saveDemoUser({
      ...user,
      name: profileForm.name || user.name,
      email: profileForm.email || user.email,
      phone: profileForm.phone || user.phone
    });
    setUser(updated);
    setIsEditProfileOpen(false);
    if (showToast) showToast('Demo profile updated locally.', 'info');
  };

  // Save Customer Address Details
  const handleSaveDetails = (e) => {
    e.preventDefault();
    const updated = saveDemoCustomerDetails(savedDetails);
    if (updated) {
      setSavedDetails(updated);
      setDetailsSuccess(true);
      setTimeout(() => setDetailsSuccess(false), 2500);
      if (showToast) showToast('Saved shipping details updated locally.', 'info');
    }
  };

  // OPEN EDIT PROFILE MODAL
  const openEditModal = () => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
      setIsEditProfileOpen(true);
    }
  };

  // ----------------------------------------------------
  // GUEST / SIGNED-OUT DEMO ENTRY VIEW
  // ----------------------------------------------------
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 space-y-12">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 px-3.5 py-1 rounded-full">
            CUSTOMER PORTAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
            Welcome to VS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
            Your style, your wishlist, your orders — all in one place. Sign in to access your demo profile and saved details.
          </p>
        </div>

        {/* Action Card */}
        <div className="bg-white dark:bg-[#18181C] p-8 sm:p-10 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm max-w-md mx-auto space-y-6 text-center">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto text-neutral-900 dark:text-neutral-100">
            <User className="w-8 h-8 stroke-[1.5]" />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleDemoSignIn}
              className="w-full py-4 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-black dark:hover:bg-white transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Demo Sign In</span>
            </button>

            <button
              onClick={() => navigate('/shop')}
              className="w-full py-3.5 bg-white dark:bg-[#18181C] border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Continue as Guest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-start space-x-2 text-left text-[11px] text-neutral-500 dark:text-neutral-400">
            <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>
              Demo account — account profile data is stored locally in this browser. No password or real authentication required.
            </span>
          </div>
        </div>

        {/* Quick Features Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="bg-white/80 dark:bg-[#18181C]/80 p-5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 space-y-2">
            <Package className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
            <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase">Demo Order History</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Review demo checkout confirmations locally.</p>
          </div>
          <div className="bg-white/80 dark:bg-[#18181C]/80 p-5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 space-y-2">
            <Heart className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
            <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase">Saved Wishlist</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Keep track of your favorite fashion objects.</p>
          </div>
          <div className="bg-white/80 dark:bg-[#18181C]/80 p-5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 space-y-2">
            <MapPin className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
            <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase">Saved Delivery Details</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Prefill address during demo checkout.</p>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // SIGNED-IN CUSTOMER ACCOUNT DASHBOARD VIEW
  // ----------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Account Profile Header Banner */}
      <div className="bg-white dark:bg-[#18181C] p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-black text-xl flex items-center justify-center shrink-0 shadow-sm">
            {user.name ? user.name.charAt(0).toUpperCase() : 'V'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">{user.name}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded">
                Demo Profile
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {user.email} {user.phone ? `• ${user.phone}` : ''} • Member since {user.joined}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openEditModal}
            className="px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center space-x-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2.5 bg-white dark:bg-[#18181C] border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors flex items-center space-x-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar & Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (Desktop) / Navigation Tabs (Mobile) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white dark:bg-[#18181C] p-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-1 hidden lg:block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 px-3 py-2 block">
              MY ACCOUNT
            </span>
            {[
              { id: 'overview', label: 'Overview', path: '/account', icon: User },
              { id: 'orders', label: 'My Orders', path: '/account/orders', icon: Package, badge: orders.length },
              { id: 'wishlist', label: 'Wishlist', path: '/account', icon: Heart, badge: wishlistIds.length },
              { id: 'recently-viewed', label: 'Recently Viewed', path: '/account', icon: Clock, badge: recentlyViewedProducts.length },
              { id: 'details', label: 'Saved Details', path: '/account/details', icon: MapPin }
            ].map((nav) => {
              const Icon = nav.icon;
              const isActive = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => {
                    setActiveTab(nav.id);
                    if (nav.path !== location.pathname) navigate(nav.path);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{nav.label}</span>
                  </span>
                  {nav.badge !== undefined && nav.badge > 0 && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white dark:bg-black/20 dark:text-neutral-900' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                    }`}>
                      {nav.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 px-3 py-2 block">
                SUPPORT
              </span>
              <Link
                to="/help"
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-all"
              >
                <span className="flex items-center space-x-2.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help & FAQs</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
              </Link>
            </div>
          </div>

          {/* Mobile Tab Pills Bar */}
          <div className="lg:hidden flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {[
              { id: 'overview', label: 'Overview', path: '/account' },
              { id: 'orders', label: `Orders (${orders.length})`, path: '/account/orders' },
              { id: 'wishlist', label: `Wishlist (${wishlistIds.length})`, path: '/account' },
              { id: 'recently-viewed', label: `Recent (${recentlyViewedProducts.length})`, path: '/account' },
              { id: 'details', label: 'Saved Details', path: '/account/details' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.path !== location.pathname) navigate(tab.path);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                    : 'bg-white dark:bg-[#18181C] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content View Area (Cols 4-12) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Shopping Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div 
                  onClick={() => { setActiveTab('wishlist'); }} 
                  className="bg-white dark:bg-[#18181C] p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all space-y-1"
                >
                  <span className="text-2xl font-black text-neutral-900 dark:text-neutral-100">{wishlistIds.length}</span>
                  <p className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Saved Wishlist</p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">Objects saved for later</p>
                </div>

                <div 
                  onClick={() => navigate('/cart')} 
                  className="bg-white dark:bg-[#18181C] p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all space-y-1"
                >
                  <span className="text-2xl font-black text-neutral-900 dark:text-neutral-100">{totalCartCount}</span>
                  <p className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Shopping Bag</p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">Items in active bag</p>
                </div>

                <div 
                  onClick={() => { setActiveTab('recently-viewed'); }} 
                  className="bg-white dark:bg-[#18181C] p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all space-y-1"
                >
                  <span className="text-2xl font-black text-neutral-900 dark:text-neutral-100">{recentlyViewedProducts.length}</span>
                  <p className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Recently Viewed</p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium font-mono">Session history</p>
                </div>

                <div 
                  onClick={() => { setActiveTab('orders'); navigate('/account/orders'); }} 
                  className="bg-white dark:bg-[#18181C] p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all space-y-1"
                >
                  <span className="text-2xl font-black text-neutral-900 dark:text-neutral-100">{orders.length}</span>
                  <p className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Demo Orders</p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">Checkout records</p>
                </div>
              </div>

              {/* Demo Orders Overview Card */}
              <div className="bg-white dark:bg-[#18181C] p-6 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">Recent Demo Orders</h3>
                  <button
                    onClick={() => { setActiveTab('orders'); navigate('/account/orders'); }}
                    className="text-xs font-bold text-neutral-900 dark:text-neutral-100 hover:underline uppercase tracking-wider"
                  >
                    View All Orders ({orders.length})
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-8 space-y-2">
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">No demo orders yet.</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Your demo checkout orders will appear here.</p>
                    <Link to="/shop" className="inline-block mt-2 px-4 py-2 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 2).map((ord) => (
                      <div key={ord.id} className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 font-mono">{ord.id}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                              {ord.status}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                            {ord.date} • {ord.itemCount} {ord.itemCount === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 justify-between sm:justify-end">
                          <span className="text-sm font-black text-neutral-900 dark:text-neutral-100">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                          <button
                            onClick={() => { setActiveTab('orders'); navigate('/account/orders'); }}
                            className="px-3 py-1.5 bg-white dark:bg-[#18181C] border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-800 dark:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: MY ORDERS (/account/orders) */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">MY DEMO ORDERS</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                    Demo checkout orders stored locally in this browser.
                  </p>
                </div>
                <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-mono">
                  {orders.length} {orders.length === 1 ? 'Record' : 'Records'}
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-[#18181C] rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400 dark:text-neutral-500">
                    <Package className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">No demo orders yet.</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                      Your demo checkout confirmations will appear here after placing a test order.
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    className="inline-block px-6 py-3 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black dark:hover:bg-white transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white dark:bg-[#18181C] rounded-3xl border border-neutral-200/80 dark:border-neutral-800 p-6 shadow-xs space-y-4">
                      
                      {/* Order Summary Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-black font-mono text-neutral-900 dark:text-neutral-100">{order.id}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full">
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                            Placed on {order.date} • Demo record
                          </p>
                        </div>

                        <div className="text-right sm:text-right">
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">Total</span>
                          <span className="text-base font-black text-neutral-900 dark:text-neutral-100">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Purchased Item Cards */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => {
                          const img = (item.images && item.images.length > 0) ? item.images[0] : (item.image || '');
                          const price = item.salePrice ?? item.price ?? 0;

                          return (
                            <div key={idx} className="flex items-center space-x-4 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200/60 dark:border-neutral-700/60">
                              <img src={img} alt={item.name} className="w-14 h-16 object-cover rounded-xl bg-neutral-200 dark:bg-neutral-700 shrink-0" />
                              <div className="flex-1">
                                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{item.name}</h4>
                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                                  Qty: {item.quantity || 1} {item.selectedSize ? `• Size ${item.selectedSize}` : ''}
                                </p>
                              </div>
                              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                ₹{(price * (item.quantity || 1)).toLocaleString('en-IN')}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-2 text-[11px] text-neutral-400 dark:text-neutral-500 font-medium flex items-center space-x-1.5 border-t border-neutral-100 dark:border-neutral-800">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                        <span>Demo Order — saved locally in this browser for showcase purposes.</span>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">SAVED WISHLIST</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">Objects saved to your personal collection.</p>
                </div>
                <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  {wishlistIds.length} {wishlistIds.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-[#18181C] rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400 dark:text-neutral-500">
                    <Heart className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Your wishlist is waiting.</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                      Save pieces you love and come back to them anytime.
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    className="inline-block px-6 py-3 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black dark:hover:bg-white transition-colors"
                  >
                    Explore New Arrivals
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  {wishlistProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      isWishlisted={true}
                      onToggleWishlist={onToggleWishlist}
                      onAddToCart={onAddToCart}
                      onQuickView={onQuickView}
                      onOpenDetail={(prod) => navigate(`/product/${prod.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RECENTLY VIEWED */}
          {activeTab === 'recently-viewed' && (
            <div className="space-y-6">
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">RECENTLY VIEWED</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium font-mono">Session exploration history.</p>
                </div>
                <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-mono">
                  {recentlyViewedProducts.length} Objects
                </span>
              </div>

              {recentlyViewedProducts.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-[#18181C] rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400 dark:text-neutral-500">
                    <Clock className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Nothing here yet.</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                      Products you view while browsing will appear here automatically.
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    className="inline-block px-6 py-3 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black dark:hover:bg-white transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  {recentlyViewedProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      isWishlisted={wishlistIds.includes(p.id)}
                      onToggleWishlist={onToggleWishlist}
                      onAddToCart={onAddToCart}
                      onQuickView={onQuickView}
                      onOpenDetail={(prod) => navigate(`/product/${prod.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SAVED DETAILS (/account/details) */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <h2 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">SAVED SHOPPING DETAILS</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                  Save your delivery address for convenient demo checkout prefilling.
                </p>
              </div>

              {detailsSuccess && (
                <div className="p-4 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-900 rounded-2xl text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Saved shopping details updated locally!</span>
                </div>
              )}

              <form onSubmit={handleSaveDetails} className="bg-white dark:bg-[#18181C] p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={savedDetails.fullName}
                      onChange={(e) => setSavedDetails(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="e.g. Vasanth Sai"
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs font-medium text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:bg-white dark:focus:bg-[#18181C] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={savedDetails.phone}
                        onChange={(e) => setSavedDetails(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs font-medium text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:bg-white dark:focus:bg-[#18181C] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        value={savedDetails.pincode}
                        onChange={(e) => setSavedDetails(prev => ({ ...prev, pincode: e.target.value }))}
                        placeholder="6-digit PIN"
                        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs font-medium text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:bg-white dark:focus:bg-[#18181C] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={savedDetails.address}
                      onChange={(e) => setSavedDetails(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Flat, building, or street details"
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs font-medium text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:bg-white dark:focus:bg-[#18181C] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={savedDetails.city}
                        onChange={(e) => setSavedDetails(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="e.g. Mumbai"
                        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs font-medium text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:bg-white dark:focus:bg-[#18181C] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={savedDetails.state}
                        onChange={(e) => setSavedDetails(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="e.g. Maharashtra"
                        className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs font-medium text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 focus:bg-white dark:focus:bg-[#18181C] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                    <ShieldCheck className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                    <span>Saved details are stored locally in this browser.</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black dark:hover:bg-white transition-colors"
                  >
                    Save Details
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs" onClick={() => setIsEditProfileOpen(false)} />
          <div className="relative bg-[#FAF9F5] dark:bg-[#141418] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 border border-neutral-200 dark:border-neutral-800 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Edit Demo Profile</h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Profile data is saved locally in this browser.</p>
              </div>
              <button onClick={() => setIsEditProfileOpen(false)} className="p-1 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#18181C] border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 block">Email Address</label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#18181C] border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 block">Phone Number</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#18181C] border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 font-medium"
                />
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 py-3 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black dark:hover:bg-white"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
