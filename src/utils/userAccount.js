// Demo Customer Account & Local Storage Utilities for VS Store
// Clearly labeled demo-only storage for local browser demonstration without external backend

const DEMO_USER_KEY = 'vs_demo_user';
const DEMO_ORDERS_KEY = 'vs_demo_orders';
const DEMO_CUSTOMER_DETAILS_KEY = 'vs_demo_customer_details';

// 1. Demo Profile Utilities
export const getDemoUser = () => {
  try {
    const saved = localStorage.getItem(DEMO_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const saveDemoUser = (user) => {
  if (!user) return null;
  const userProfile = {
    name: user.name?.trim() || 'VS Customer',
    email: user.email?.trim() || 'customer@vs-demo.com',
    phone: user.phone?.trim() || '',
    joined: user.joined || '2026',
    isDemo: true
  };
  try {
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(userProfile));
    return userProfile;
  } catch {
    return null;
  }
};

export const signOutDemoUser = () => {
  try {
    localStorage.removeItem(DEMO_USER_KEY);
    return true;
  } catch {
    return false;
  }
};

// 2. Demo Orders Utilities
export const getDemoOrders = () => {
  try {
    const saved = localStorage.getItem(DEMO_ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const addDemoOrder = (orderPayload) => {
  if (!orderPayload || !orderPayload.items) return null;

  const newOrder = {
    id: `VS-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    items: orderPayload.items || [],
    itemCount: orderPayload.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    totalAmount: orderPayload.totalAmount || 0,
    shippingAddress: orderPayload.shippingAddress || null,
    status: 'Demo Confirmed',
    isDemo: true
  };

  try {
    const existing = getDemoOrders();
    const updated = [newOrder, ...existing];
    localStorage.setItem(DEMO_ORDERS_KEY, JSON.stringify(updated));
    return newOrder;
  } catch {
    return null;
  }
};

// 3. Demo Saved Customer Details (Shipping Address) Utilities
export const getDemoCustomerDetails = () => {
  try {
    const saved = localStorage.getItem(DEMO_CUSTOMER_DETAILS_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const saveDemoCustomerDetails = (details) => {
  if (!details) return null;
  const addressDetails = {
    fullName: details.fullName?.trim() || '',
    phone: details.phone?.trim() || '',
    address: details.address?.trim() || '',
    city: details.city?.trim() || '',
    state: details.state?.trim() || '',
    pincode: details.pincode?.trim() || '',
    isDemo: true
  };
  try {
    localStorage.setItem(DEMO_CUSTOMER_DETAILS_KEY, JSON.stringify(addressDetails));
    return addressDetails;
  } catch {
    return null;
  }
};
