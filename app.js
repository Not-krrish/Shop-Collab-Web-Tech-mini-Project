// ===== NexLocal App — Main Application Logic =====

// ===== MOCK DATA =====
const MOCK_BUSINESSES = [
    { id:1, name:"Chapter & Verse Books", emoji:"📚", cat:"Bookstore", distance:"150m", lat:19.0760, lng:72.8777, match:87, desc:"Independent bookstore with rare collections" },
    { id:2, name:"Glow Up Salon", emoji:"💇", cat:"Salon & Spa", distance:"200m", lat:19.0770, lng:72.8790, match:82, desc:"Premium hair styling and beauty treatments" },
    { id:3, name:"FitZone Gym", emoji:"🏋️", cat:"Gym & Fitness", distance:"350m", lat:19.0745, lng:72.8800, match:74, desc:"24/7 fitness center with personal trainers" },
    { id:4, name:"Fresh Basket Grocery", emoji:"🛒", cat:"Grocery Store", distance:"180m", lat:19.0755, lng:72.8760, match:79, desc:"Organic groceries and local produce" },
    { id:5, name:"Stitch & Style", emoji:"👗", cat:"Boutique", distance:"420m", lat:19.0780, lng:72.8810, match:68, desc:"Handcrafted fashion and designer wear" },
    { id:6, name:"QuickFix Repairs", emoji:"🔧", cat:"Repair Shop", distance:"500m", lat:19.0735, lng:72.8750, match:61, desc:"Electronics and appliance repair services" },
    { id:7, name:"Brew & Beans Café", emoji:"☕", cat:"Café", distance:"100m", lat:19.0762, lng:72.8785, match:92, desc:"Artisanal coffee and fresh pastries" },
    { id:8, name:"Wellness Pharmacy", emoji:"💊", cat:"Pharmacy", distance:"280m", lat:19.0750, lng:72.8795, match:65, desc:"Complete healthcare and wellness products" },
];

const MOCK_COLLABS = [
    { id:1, biz:MOCK_BUSINESSES[0], status:"active", since:"Jan 2026", referrals:42, coupons:18, revenue:"₹12.4K" },
    { id:2, biz:MOCK_BUSINESSES[1], status:"active", since:"Feb 2026", referrals:28, coupons:12, revenue:"₹8.2K" },
    { id:3, biz:MOCK_BUSINESSES[2], status:"active", since:"Dec 2025", referrals:56, coupons:34, revenue:"₹22.1K" },
    { id:4, biz:MOCK_BUSINESSES[6], status:"active", since:"Mar 2026", referrals:15, coupons:8, revenue:"₹5.6K" },
    { id:5, biz:MOCK_BUSINESSES[3], status:"active", since:"Nov 2025", referrals:38, coupons:22, revenue:"₹14.8K" },
    { id:6, biz:MOCK_BUSINESSES[4], status:"pending", since:"—", referrals:0, coupons:0, revenue:"—" },
    { id:7, biz:MOCK_BUSINESSES[5], status:"pending", since:"—", referrals:0, coupons:0, revenue:"—" },
    { id:8, biz:MOCK_BUSINESSES[7], status:"pending", since:"—", referrals:0, coupons:0, revenue:"—" },
];

const MOCK_PROMOS = [
    { id:1, title:"Coffee + Book Bundle", partner:"📚 Chapter & Verse", desc:"Buy a coffee and get 15% off any book next door!", discount:15, redeemed:48, max:100, start:"Mar 1", end:"Apr 30", status:"active" },
    { id:2, title:"Gym & Glow Package", partner:"💇 Glow Up Salon", desc:"Monthly gym members get a free haircut consultation", discount:20, redeemed:22, max:50, start:"Mar 10", end:"May 15", status:"active" },
    { id:3, title:"Fresh Morning Deal", partner:"🛒 Fresh Basket", desc:"Show your café receipt for 10% off groceries", discount:10, redeemed:65, max:200, start:"Feb 15", end:"Apr 15", status:"active" },
    { id:4, title:"Style & Sip", partner:"👗 Stitch & Style", desc:"Fashion shoppers get a complimentary espresso", discount:0, redeemed:0, max:75, start:"Apr 1", end:"Jun 1", status:"draft" },
];

const MOCK_CHATS = [
    { id:1, name:"Chapter & Verse Books", emoji:"📚", lastMsg:"Sure, let's launch the bundle next week!", time:"2m", unread:2 },
    { id:2, name:"Glow Up Salon", emoji:"💇", lastMsg:"The gym collab numbers look great", time:"15m", unread:1 },
    { id:3, name:"FitZone Gym", emoji:"🏋️", lastMsg:"Can we extend the promotion?", time:"1h", unread:0 },
    { id:4, name:"Fresh Basket Grocery", emoji:"🛒", lastMsg:"New organic stock arriving Friday", time:"3h", unread:0 },
    { id:5, name:"Brew & Beans Café", emoji:"☕", lastMsg:"Let's plan a joint weekend event", time:"1d", unread:0 },
];

const MOCK_MESSAGES = [
    { from:"them", text:"Hey! Our customers have been loving the book+coffee combo 📖☕", time:"10:30 AM" },
    { from:"me", text:"That's amazing! We saw a 23% increase in afternoon footfall", time:"10:32 AM" },
    { from:"them", text:"Same here! How about we extend it through May?", time:"10:35 AM" },
    { from:"me", text:"Absolutely. Should we bump the discount to 20%?", time:"10:38 AM" },
    { from:"them", text:"Let's keep it at 15% but add a loyalty stamp card", time:"10:40 AM" },
    { from:"me", text:"Love that idea! I'll draft the new coupon design tonight", time:"10:42 AM" },
    { from:"them", text:"Sure, let's launch the bundle next week!", time:"10:45 AM" },
];

const MOCK_NOTIFS = [
    { icon:"🤝", text:"Stitch & Style wants to collaborate with you", time:"2 min ago", unread:true },
    { icon:"🎟️", text:"3 new coupon redemptions on 'Coffee + Book Bundle'", time:"15 min ago", unread:true },
    { icon:"👥", text:"Fresh Basket referred 5 customers to you today", time:"1 hour ago", unread:true },
    { icon:"💬", text:"New message from Glow Up Salon", time:"2 hours ago", unread:false },
    { icon:"📊", text:"Weekly analytics report is ready", time:"5 hours ago", unread:false },
    { icon:"🎉", text:"Your promotion 'Gym & Glow' hit 50% redemptions!", time:"1 day ago", unread:false },
];

// ===== SPA ROUTER =====
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('pageTitle');

    function navigate(pageName) {
        pages.forEach(p => p.classList.remove('active'));
        navItems.forEach(n => n.classList.remove('active'));
        document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));

        const target = document.getElementById('page-' + pageName);
        const navTarget = document.querySelector(`.nav-item[data-page="${pageName}"]`);
        const botTarget = document.querySelector(`.bottom-nav-item[data-page="${pageName}"]`);
        
        if (target) target.classList.add('active');
        if (navTarget) navTarget.classList.add('active');
        if (botTarget) botTarget.classList.add('active');
        
        pageTitle.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        window.location.hash = pageName;
    }

    // Bind sidebar links
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(item.dataset.page);
            document.getElementById('sidebar').classList.remove('open');
        });
    });

    // Bind bottom nav links
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(item.dataset.page);
        });
    });

    // Mobile menu
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('open');
    });

    // Handle hash navigation
    const hash = window.location.hash.replace('#','') || 'dashboard';
    navigate(hash);

    // Init all sections
    initDashboard();
    initDiscover();
    initCollaborations();
    initPromotions();
    initChat();
    initAnalytics();
    initNotifications();
    initSettings();

    // Global Search Functionality
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            // Search in Discover
            document.querySelectorAll('.biz-card').forEach(card => {
                const name = card.querySelector('.biz-name').textContent.toLowerCase();
                if (name.includes(query)) card.style.display = 'block';
                else card.style.display = 'none';
            });

            // Search in Collabs
            document.querySelectorAll('.collab-card').forEach(card => {
                const name = card.querySelector('.collab-name').textContent.toLowerCase();
                if (name.includes(query)) card.style.display = 'block';
                else card.style.display = 'none';
            });
        });
    }

    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(reg => console.log('ServiceWorker registered:', reg.scope))
                .catch(err => console.log('ServiceWorker fail:', err));
        });
    }
});

// ===== DASHBOARD =====
function initDashboard() {
    animateCounters();
    renderActivityFeed();
    renderPendingRequests();
    renderTopPartners();
    renderReferralChart('referralChart');
}

function animateCounters() {
    document.querySelectorAll('.stat-value[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current;
        }, 30);
    });
}

function renderActivityFeed() {
    const feed = document.getElementById('activityFeed');
    if (!feed) return;
    const activities = [
        { color:'var(--green)', text:'Fresh Basket referred 5 customers', time:'1h ago' },
        { color:'var(--pink)', text:'Coupon redeemed: Coffee + Book Bundle', time:'2h ago' },
        { color:'var(--purple)', text:'Glow Up Salon accepted your request', time:'4h ago' },
        { color:'var(--blue)', text:'New message from FitZone Gym', time:'6h ago' },
        { color:'var(--orange)', text:'Promotion "Morning Deal" reaching 50%', time:'1d ago' },
    ];
    feed.innerHTML = activities.map(a => `
        <div class="activity-item">
            <div class="activity-dot" style="background:${a.color}"></div>
            <span class="activity-text">${a.text}</span>
            <span class="activity-time">${a.time}</span>
        </div>`).join('');
}

function renderPendingRequests() {
    const list = document.getElementById('pendingRequests');
    if (!list) return;
    const pending = MOCK_COLLABS.filter(c => c.status === 'pending');
    list.innerHTML = pending.map(c => `
        <div class="request-item" id="req-${c.id}">
            <div class="request-avatar">${c.biz.emoji}</div>
            <div class="request-info"><span class="request-name">${c.biz.name}</span><span class="request-cat">${c.biz.cat}</span></div>
            <div class="request-actions">
                <button class="btn-sm btn-primary" onclick="acceptRequest(${c.id})">Accept</button>
                <button class="btn-sm btn-ghost" onclick="declineRequest(${c.id})">Decline</button>
            </div>
        </div>`).join('');
}

// Attach to window so onclick works
window.acceptRequest = function(id) {
    const el = document.getElementById('req-' + id);
    if(el) {
        el.innerHTML = '<div style="color:var(--green);font-size:0.85rem">✅ Request Accepted</div>';
        setTimeout(() => el.remove(), 2000);
    }
};
window.declineRequest = function(id) {
    const el = document.getElementById('req-' + id);
    if(el) {
        el.innerHTML = '<div style="color:var(--red);font-size:0.85rem">❌ Request Declined</div>';
        setTimeout(() => el.remove(), 2000);
    }
};

function renderTopPartners() {
    const list = document.getElementById('topPartners');
    if (!list) return;
    const active = MOCK_COLLABS.filter(c => c.status === 'active').sort((a,b) => b.referrals - a.referrals);
    list.innerHTML = active.map((c,i) => `
        <div class="partner-item">
            <div class="partner-rank">${i+1}</div>
            <span style="font-size:1.1rem">${c.biz.emoji}</span>
            <span class="partner-name">${c.biz.name}</span>
            <span class="partner-score">${c.referrals} referrals</span>
        </div>`).join('');
}

// ===== SIMPLE CHART RENDERER =====
function renderReferralChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const data = [12, 19, 8, 25, 18, 32, 28, 15, 22, 35, 42, 38];
    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const max = Math.max(...data);
    container.innerHTML = `<div style="display:flex;align-items:flex-end;gap:8px;height:100%;padding-top:1rem">
        ${data.map((v,i) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end">
            <span style="font-size:0.65rem;color:var(--text-3)">${v}</span>
            <div style="width:100%;height:${(v/max)*80}%;background:var(--gradient);border-radius:6px 6px 0 0;transition:height 1s ease;min-height:4px"></div>
            <span style="font-size:0.6rem;color:var(--text-3)">${labels[i]}</span>
        </div>`).join('')}
    </div>`;
}

// ===== DISCOVER =====
function initDiscover() {
    renderBusinessList();
    initMap();
    
    // Filters logic
    document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
        renderBusinessList(e.target.value);
    });
    
    // Locate me logic
    document.getElementById('locateBtn')?.addEventListener('click', (e) => {
        const btn = e.target;
        btn.innerText = 'Locating...';
        setTimeout(() => {
            btn.innerText = '📍 Located';
            alert('Location updated successfully!');
            setTimeout(() => btn.innerText = '📍 My Location', 2000);
        }, 1000);
    });
}

function renderBusinessList(filterCat = 'all') {
    const list = document.getElementById('businessList');
    if (!list) return;
    
    let filtered = MOCK_BUSINESSES;
    if (filterCat !== 'all') {
        filtered = MOCK_BUSINESSES.filter(b => b.cat.toLowerCase().includes(filterCat.replace(' ', '')));
    }

    list.innerHTML = filtered.map(b => `
        <div class="biz-card" data-id="${b.id}">
            <div class="biz-card-header">
                <span class="biz-emoji">${b.emoji}</span>
                <span class="biz-distance">📍 ${b.distance}</span>
            </div>
            <div class="biz-name">${b.name}</div>
            <div class="biz-cat">${b.cat}</div>
            <div class="biz-match">
                <div class="match-bar"><div class="match-fill" style="width:${b.match}%"></div></div>
                <span class="match-pct">${b.match}% match</span>
            </div>
            <div class="biz-actions">
                <button class="btn-sm btn-primary btn-full" onclick="event.stopPropagation(); alert('Collaboration request sent to ${b.name}'); this.innerText='Sent ✅'; this.disabled=true;">🤝 Collaborate</button>
            </div>
        </div>`).join('');
        
    if (filtered.length === 0) list.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-3)">No businesses found in this category.</div>';
}

function initMap() {
    const container = document.getElementById('mapContainer');
    if (!container || container.dataset.init) return;
    container.dataset.init = 'true';

    // Use observer to init map when discover page becomes visible
    const observer = new MutationObserver(() => {
        const discoverPage = document.getElementById('page-discover');
        if (discoverPage.classList.contains('active') && !container._leaflet_id) {
            setTimeout(() => createMap(container), 100);
        }
    });
    observer.observe(document.getElementById('page-discover'), { attributes: true, attributeFilter: ['class'] });

    // Also check immediately
    if (document.getElementById('page-discover').classList.contains('active')) {
        setTimeout(() => createMap(container), 300);
    }
}

function createMap(container) {
    const map = L.map(container).setView([19.0760, 72.8777], 15);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        maxZoom: 19
    }).addTo(map);

    // Your business marker
    const myIcon = L.divIcon({ html:'<div style="background:linear-gradient(135deg,#8a2be2,#ec4899);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.4)">☕</div>', className:'', iconSize:[32,32] });
    L.marker([19.0760, 72.8777], { icon: myIcon }).addTo(map).bindPopup('<b>The Daily Roast</b><br>Your Business');

    // Nearby business markers
    MOCK_BUSINESSES.forEach(b => {
        const icon = L.divIcon({ html:`<div style="background:var(--surface-2,#1a1d2e);width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid rgba(255,255,255,0.2);box-shadow:0 2px 8px rgba(0,0,0,0.3)">${b.emoji}</div>`, className:'', iconSize:[30,30] });
        L.marker([b.lat, b.lng], { icon }).addTo(map)
            .bindPopup(`<b>${b.name}</b><br>${b.cat}<br><span style="color:#22c55e">${b.match}% match</span>`);
    });

    setTimeout(() => map.invalidateSize(), 200);
}

// ===== COLLABORATIONS =====
function initCollaborations() {
    renderCollabs('active');
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCollabs(tab.dataset.tab);
        });
    });
}

function renderCollabs(filter) {
    const grid = document.getElementById('collabGrid');
    if (!grid) return;
    let items = MOCK_COLLABS;
    if (filter === 'active') items = items.filter(c => c.status === 'active');
    else if (filter === 'pending') items = items.filter(c => c.status === 'pending');

    grid.innerHTML = items.map(c => `
        <div class="collab-card">
            <div class="collab-top">
                <div class="collab-avatar">${c.biz.emoji}</div>
                <div style="flex:1"><div class="collab-name">${c.biz.name}</div><div style="font-size:0.78rem;color:var(--text-3)">${c.biz.cat} · ${c.biz.distance}</div></div>
                <span class="collab-status status-${c.status}">${c.status}</span>
            </div>
            <div style="font-size:0.82rem;color:var(--text-2)">Since ${c.since}</div>
            <div class="collab-stats">
                <div class="collab-stat"><span class="collab-stat-val">${c.referrals}</span><span class="collab-stat-label">Referrals</span></div>
                <div class="collab-stat"><span class="collab-stat-val">${c.coupons}</span><span class="collab-stat-label">Coupons</span></div>
                <div class="collab-stat"><span class="collab-stat-val">${c.revenue}</span><span class="collab-stat-label">Revenue</span></div>
            </div>
        </div>`).join('');

    if (items.length === 0) {
        grid.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-3)">No collaborations found in this category.</div>';
    }
}

// ===== PROMOTIONS =====
function initPromotions() {
    renderPromos();
    const modal = document.getElementById('promoModal');
    document.getElementById('newPromoBtn')?.addEventListener('click', () => modal.classList.add('active'));
    document.getElementById('closePromoModal')?.addEventListener('click', () => modal.classList.remove('active'));
    modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    document.getElementById('promoForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.remove('active');
        alert('🚀 Promotion created successfully!');
    });
}

function renderPromos() {
    const grid = document.getElementById('promoGrid');
    if (!grid) return;
    grid.innerHTML = MOCK_PROMOS.map(p => `
        <div class="promo-card">
            <div class="promo-banner">
                <span class="promo-type">${p.type || 'Partnership'}</span>
                ${p.discount ? `<span style="font-size:1.1rem;font-weight:700;color:var(--primary-blue)">${p.discount}% OFF</span>` : `<span style="font-size:0.9rem;font-weight:600;color:var(--primary-blue)">Special Offer</span>`}
            </div>
            <div class="promo-body">
                <div class="promo-title">${p.title}</div>
                <div class="promo-partner"><span>🤝</span> with ${p.partner}</div>
                
                <div class="promo-metrics">
                    <div class="promo-metric">
                        <span class="promo-metric-val">${p.redeemed} / ${p.max}</span>
                        <span class="promo-metric-label">Redeemed</span>
                    </div>
                    <div class="promo-metric" style="align-items:flex-end">
                        <span class="promo-metric-val" style="color:${p.status === 'active' ? 'var(--green-success)' : 'var(--text-muted)'}">${p.status.toUpperCase()}</span>
                        <span class="promo-metric-label">Status</span>
                    </div>
                </div>

                <div class="promo-footer">
                    <button class="promo-btn">Edit</button>
                    <button class="promo-btn share">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                        Share
                    </button>
                </div>
            </div>
        </div>`).join('');
}

// ===== CHAT =====
let socket;
let realChatHistory = [];
let activeChatId = 1;

function initChat() {
    renderChatList();
    renderMessages();
    
    // Connect to Node server if running
    if (typeof io !== 'undefined') {
        socket = io();
        
        socket.on('chatHistory', (history) => {
            realChatHistory = history;
            renderMessages();
        });

        socket.on('newMessage', (msg) => {
            realChatHistory.push(msg);
            renderMessages();
            // Show a tiny popup notification if we have one
            if (msg.senderId !== socket.id) {
                // optionally alert or show indicator
            }
        });
    } else {
        // Fallback for Mock UI testing without Node server
        console.warn("Socket.io not found. Real-time chat disabled.");
    }

    document.getElementById('sendBtn')?.addEventListener('click', sendMessage);
    document.getElementById('messageInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function renderChatList() {
    const list = document.getElementById('chatList');
    if (!list) return;
    list.innerHTML = MOCK_CHATS.map((c, i) => `
        <div class="chat-contact ${i===0?'active':''}" data-chat="${c.id}">
            <div class="avatar">${c.emoji}</div>
            <div class="chat-contact-info">
                <div class="chat-contact-name">${c.name}</div>
                <div class="chat-contact-last">${c.lastMsg}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
                <span class="chat-contact-time">${c.time}</span>
                ${c.unread ? `<span class="unread-badge">${c.unread}</span>` : ''}
            </div>
        </div>`).join('');

    list.querySelectorAll('.chat-contact').forEach(el => {
        el.addEventListener('click', () => {
            list.querySelectorAll('.chat-contact').forEach(c => c.classList.remove('active'));
            el.classList.add('active');
            activeChatId = parseInt(el.dataset.chat);
            const chat = MOCK_CHATS.find(c => c.id == activeChatId);
            if (chat) {
                document.querySelector('.chat-partner-info .avatar').textContent = chat.emoji;
                document.querySelector('.chat-partner-info h4').textContent = chat.name;
            }
            renderMessages();
        });
    });
}

function renderMessages() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    // Use real socket history if we are connected, otherwise fallback to mock
    const source = (socket && realChatHistory.length > 0) ? realChatHistory : MOCK_MESSAGES;
    
    // Filter by the currently active chat tab (assume unassigned messages belong to chat 1 for the demo)
    const filteredSource = source.filter(msg => !msg.chatId || msg.chatId === activeChatId);
    
    container.innerHTML = filteredSource.map(msg => {
        // Determine if message is from "me" or "them"
        let isMe = false;
        if (socket && msg.senderId) {
            isMe = (msg.senderId === socket.id);
        } else {
            isMe = (msg.from === 'me'); // Legacy mock logic
        }

        return `
        <div class="msg ${isMe ? 'sent' : 'received'}">
            ${socket ? `<strong style="font-size:0.75rem;opacity:0.7;display:block;margin-bottom:2px">${isMe ? 'You' : (msg.emoji + ' ' + msg.name)}</strong>` : ''}
            ${msg.text}
            <div class="msg-time">${msg.time}</div>
        </div>`;
    }).join('');
    
    // Auto-scroll to bottom smoothly
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (!text) return;
    
    if (socket) {
        // Send to real Node server!
        socket.emit('sendMessage', {
            text: text,
            chatId: activeChatId,
            name: "The Daily Roast", // Simulated logged in user name
            emoji: "☕"
        });
        input.value = '';
    } else {
        // Legacy Mock behavior
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
        MOCK_MESSAGES.push({ from: 'me', text: text, time: time, chatId: activeChatId });
        renderMessages();
        input.value = '';

        setTimeout(() => {
            const replies = ["That sounds great! 🎉","Let me check and get back to you","Absolutely, let's do it!","I'll share the details with my team","Perfect, looking forward to it! 🙌"];
            const reply = replies[Math.floor(Math.random() * replies.length)];
            MOCK_MESSAGES.push({ from: 'them', text: reply, time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }), chatId: activeChatId });
            renderMessages();
        }, 1200);
    }
}

// ===== ANALYTICS =====
function initAnalytics() {
    renderReferralChart('revenueChart');
    renderCouponChart();
    renderAnalyticsPartners();
    renderCategoryBreakdown();
    document.querySelectorAll('.period').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.period').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function renderCouponChart() {
    const container = document.getElementById('couponChart');
    if (!container) return;
    const data = [5, 12, 8, 18, 22, 15, 28];
    const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const max = Math.max(...data);
    container.innerHTML = `<div style="display:flex;align-items:flex-end;gap:12px;height:100%;padding-top:1rem">
        ${data.map((v,i) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end">
            <span style="font-size:0.7rem;color:var(--text-3)">${v}</span>
            <div style="width:100%;height:${(v/max)*80}%;background:linear-gradient(180deg,var(--pink),var(--purple));border-radius:6px 6px 0 0;transition:height 1s ease"></div>
            <span style="font-size:0.65rem;color:var(--text-3)">${labels[i]}</span>
        </div>`).join('')}
    </div>`;
}

function renderAnalyticsPartners() {
    const container = document.getElementById('analyticsPartners');
    if (!container) return;
    const partners = MOCK_COLLABS.filter(c => c.status === 'active').sort((a,b) => b.referrals - a.referrals);
    container.innerHTML = partners.map((c,i) => `
        <div class="partner-item">
            <div class="partner-rank">${i+1}</div>
            <span style="font-size:1.1rem">${c.biz.emoji}</span>
            <span class="partner-name">${c.biz.name}</span>
            <span class="partner-score">${c.revenue}</span>
        </div>`).join('');
}

function renderCategoryBreakdown() {
    const container = document.getElementById('categoryBreakdown');
    if (!container) return;
    const cats = [
        { label:"Cafés", pct:35, color:"var(--purple)" },
        { label:"Salons", pct:25, color:"var(--pink)" },
        { label:"Gyms", pct:20, color:"var(--blue)" },
        { label:"Grocery", pct:12, color:"var(--green)" },
        { label:"Other", pct:8, color:"var(--orange)" },
    ];
    container.innerHTML = cats.map(c => `
        <div class="breakdown-item">
            <span class="breakdown-label">${c.label}</span>
            <div class="breakdown-bar"><div class="breakdown-fill" style="width:${c.pct}%;background:${c.color}"></div></div>
            <span class="breakdown-val">${c.pct}%</span>
        </div>`).join('');
}

// ===== NOTIFICATIONS =====
function initNotifications() {
    const btn = document.getElementById('notifBtn');
    const panel = document.getElementById('notifPanel');
    btn?.addEventListener('click', () => panel.classList.toggle('open'));
    document.getElementById('markAllRead')?.addEventListener('click', () => {
        document.querySelectorAll('.notif-item').forEach(n => n.classList.remove('unread'));
        document.querySelector('.notif-dot').style.display = 'none';
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (panel?.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)) {
            panel.classList.remove('open');
        }
    });
    renderNotifs();
}

function renderNotifs() {
    const list = document.getElementById('notifList');
    if (!list) return;
    list.innerHTML = MOCK_NOTIFS.map(n => `
        <div class="notif-item ${n.unread?'unread':''}">
            <div class="notif-icon">${n.icon}</div>
            <div>
                <div class="notif-text">${n.text}</div>
                <div class="notif-time">${n.time}</div>
            </div>
        </div>`).join('');
}

// ===== SETTINGS =====
function initSettings() {
    const form = document.getElementById('settingsForm');
    if (!form) return;
    
    // Simulate user choosing an avatar emoji/image click
    const avatarPreview = document.getElementById('settingsAvatarPreview');
    avatarPreview?.addEventListener('click', () => {
        const emojis = ['DR', '☕', '🥐', '🍔', '🛒', '✂️'];
        const current = avatarPreview.textContent;
        const next = emojis[(emojis.indexOf(current) + 1) % emojis.length];
        avatarPreview.textContent = next;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get values
        const newName = document.getElementById('settingsName').value;
        const newCatEmoji = document.getElementById('settingsEmoji').value;
        const newCatName = document.getElementById('settingsCatName').value;
        const newAvatar = document.getElementById('settingsAvatarPreview').textContent;
        
        // Update DOM across the app
        const globalName = document.getElementById('globalName');
        const globalCat = document.getElementById('globalCat');
        const globalAvatar = document.getElementById('globalAvatar');
        
        if(globalName) globalName.textContent = newName;
        if(globalCat) globalCat.textContent = `${newCatEmoji} ${newCatName}`;
        if(globalAvatar) globalAvatar.textContent = newAvatar;
        
        // Also update standard class names if needed
        document.querySelectorAll('.user-name').forEach(el => el.textContent = newName);
        document.querySelectorAll('.user-role').forEach(el => el.textContent = `${newCatEmoji} ${newCatName}`);
        document.querySelectorAll('.user-avatar').forEach(el => el.textContent = newAvatar);
        
        alert("✅ Profile settings saved successfully! Your profile is updated everywhere.");
    });
}
