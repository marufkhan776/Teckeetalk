// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Blog Search and Filter Functionality
let currentFilter = 'all';
let currentView = 'grid';
let searchTerm = '';

// Search functionality
function searchPosts() {
    searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filterPosts();
}

// Filter functionality
function filterPosts() {
    const posts = document.querySelectorAll('.post-card');
    let visibleCount = 0;

    posts.forEach(post => {
        const category = post.getAttribute('data-category');
        const title = post.getAttribute('data-title').toLowerCase();
        const content = post.querySelector('p').textContent.toLowerCase();
        
        const matchesCategory = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = searchTerm === '' || 
                            title.includes(searchTerm) || 
                            content.includes(searchTerm) ||
                            category.toLowerCase().includes(searchTerm);

        if (matchesCategory && matchesSearch) {
            post.style.display = 'block';
            visibleCount++;
            post.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            post.style.display = 'none';
        }
    });

    document.getElementById('postCount').textContent = `মোট ${visibleCount}টি পোস্ট`;
}

// Category filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-category');
        filterPosts();
    });
});

// View toggle functionality
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.getAttribute('data-view');
        
        const postsGrid = document.getElementById('postsGrid');
        if (currentView === 'list') {
            postsGrid.classList.add('list-view');
        } else {
            postsGrid.classList.remove('list-view');
        }
    });
});

// Search input event listener
if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('input', searchPosts);
}



// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}



// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize filters on page load
document.addEventListener('DOMContentLoaded', () => {
    filterPosts();
});

// Blog Modal Functionality
const modal = document.getElementById('blogModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

// Blog content data
const blogPosts = {
    'ai-future': {
        title: 'কৃত্রিম বুদ্ধিমত্তা: ভবিষ্যতের প্রযুক্তি',
        content: `
            <div class="blog-meta">
                <span>১৫ জানুয়ারি, ২০২৪</span>
                <span>এআই</span>
                <span><i class="fas fa-clock"></i> ৫ মিনিট পড়া</span>
            </div>
            <div class="blog-content">
                <p>আজকের বিশ্বে কৃত্রিম বুদ্ধিমত্তা (এআই) আমাদের জীবনের প্রতিটি ক্ষেত্রে প্রবেশ করেছে। চ্যাটজিপিটি, ডাল-ই, মিডজার্নি - এই সব এআই টুল আমাদের কাজের ধরন পরিবর্তন করে দিয়েছে।</p>
                
                <h3>এআই কি?</h3>
                <p>কৃত্রিম বুদ্ধিমত্তা হল কম্পিউটার বিজ্ঞানের একটি শাখা যা কম্পিউটারকে মানুষের মতো চিন্তা করতে এবং শিখতে সাহায্য করে। মেশিন লার্নিং, ডিপ লার্নিং এবং নিউরাল নেটওয়ার্ক হল এআই-এর মূল ভিত্তি।</p>
                
                <h3>এআই-এর প্রকারভেদ</h3>
                <ul>
                    <li><strong>ন্যারো এআই:</strong> নির্দিষ্ট কাজের জন্য তৈরি</li>
                    <li><strong>জেনারেল এআই:</strong> মানুষের মতো সাধারণ বুদ্ধিমত্তা</li>
                    <li><strong>সুপার এআই:</strong> মানুষের চেয়ে বেশি বুদ্ধিমান</li>
                </ul>
                
                <h3>বর্তমান ব্যবহার</h3>
                <p>আজকাল এআই ব্যবহৃত হচ্ছে:</p>
                <ul>
                    <li>ভার্চুয়াল অ্যাসিস্ট্যান্ট (সিরি, আলেক্সা)</li>
                    <li>রেকমেন্ডেশন সিস্টেম (নেটফ্লিক্স, অ্যামাজন)</li>
                    <li>অটোনমাস ভেহিকল</li>
                    <li>মেডিকেল ডায়াগনোসিস</li>
                </ul>
                
                <p>এআই আমাদের ভবিষ্যত গঠনে গুরুত্বপূর্ণ ভূমিকা পালন করবে। আমাদের উচিত এটিকে সঠিকভাবে ব্যবহার করা।</p>
            </div>
        `
    },
    'data-analysis': {
        title: 'ডেটা বিশ্লেষণের গুরুত্ব',
        content: `
            <div class="blog-meta">
                <span>১২ জানুয়ারি, ২০২৪</span>
                <span>ডেটা বিশ্লেষণ</span>
                <span><i class="fas fa-clock"></i> ৭ মিনিট পড়া</span>
            </div>
            <div class="blog-content">
                <p>আজকের ডিজিটাল যুগে ডেটা হল নতুন তেল। প্রতিদিন আমরা লক্ষ লক্ষ ডেটা পয়েন্ট তৈরি করছি, কিন্তু এই ডেটা থেকে অর্থপূর্ণ তথ্য বের করা হল আসল চ্যালেঞ্জ।</p>
                
                <h3>ডেটা বিশ্লেষণ কি?</h3>
                <p>ডেটা বিশ্লেষণ হল কাঁচা ডেটাকে প্রক্রিয়া করে অর্থপূর্ণ তথ্য এবং অন্তর্দৃষ্টি বের করার প্রক্রিয়া। এটি ব্যবসায়িক সিদ্ধান্ত গ্রহণে সাহায্য করে।</p>
                
                <h3>ডেটা বিশ্লেষণের ধাপ</h3>
                <ol>
                    <li><strong>ডেটা সংগ্রহ:</strong> বিভিন্ন উৎস থেকে ডেটা সংগ্রহ</li>
                    <li><strong>ডেটা পরিষ্কার:</strong> ভুল এবং অসম্পূর্ণ ডেটা সরানো</li>
                    <li><strong>ডেটা এক্সপ্লোরেশন:</strong> ডেটার প্যাটার্ন খুঁজে বের করা</li>
                    <li><strong>মডেলিং:</strong> স্ট্যাটিসটিক্যাল মডেল তৈরি</li>
                    <li><strong>ইন্টারপ্রিটেশন:</strong> ফলাফল ব্যাখ্যা করা</li>
                </ol>
                
                <h3>ব্যবহৃত টুল</h3>
                <ul>
                    <li>পাইথন (প্যান্ডাস, নামপাই)</li>
                    <li>আর প্রোগ্রামিং</li>
                    <li>SQL</li>
                    <li>Tableau</li>
                    <li>Power BI</li>
                </ul>
                
                <p>ডেটা বিশ্লেষণ আজকের ব্যবসায়িক জগতের একটি অপরিহার্য অংশ। সঠিকভাবে ব্যবহার করলে এটি ব্যবসাকে নতুন উচ্চতায় নিয়ে যেতে পারে।</p>
            </div>
        `
    },
    'tech-trends': {
        title: 'আধুনিক প্রযুক্তির প্রবণতা',
        content: `
            <div class="blog-meta">
                <span>১০ জানুয়ারি, ২০২৪</span>
                <span>প্রযুক্তি</span>
                <span><i class="fas fa-clock"></i> ৬ মিনিট পড়া</span>
            </div>
            <div class="blog-content">
                <p>২০২৪ সালে প্রযুক্তি জগতে অনেক নতুন প্রবণতা দেখা যাচ্ছে। এই প্রবণতাগুলি আমাদের ভবিষ্যত জীবনকে প্রভাবিত করবে।</p>
                
                <h3>২০২৪ সালের প্রধান প্রবণতা</h3>
                <ul>
                    <li><strong>কৃত্রিম বুদ্ধিমত্তা:</strong> জেনারেটিভ এআই এবং এআই-পাওয়ারড টুল</li>
                    <li><strong>ক্লাউড কম্পিউটিং:</strong> হাইব্রিড এবং মাল্টি-ক্লাউড সলিউশন</li>
                    <li><strong>ইন্টারনেট অফ থিংস (IoT):</strong> স্মার্ট সিটি এবং কানেক্টেড ডিভাইস</li>
                    <li><strong>ব্লকচেইন:</strong> ডিফাই এবং NFT</li>
                    <li><strong>সাইবার সিকিউরিটি:</strong> জিরো-ট্রাস্ট আর্কিটেকচার</li>
                </ul>
                
                <h3>প্রযুক্তির প্রভাব</h3>
                <p>এই প্রযুক্তিগুলি আমাদের কাজ, শিক্ষা এবং জীবনযাত্রাকে পরিবর্তন করবে। আমাদের উচিত এই পরিবর্তনের সাথে খাপ খাইয়ে নেওয়া।</p>
            </div>
        `
    },
    'machine-learning': {
        title: 'মেশিন লার্নিং: প্রাথমিক ধারণা',
        content: `
            <div class="blog-meta">
                <span>৮ জানুয়ারি, ২০২৪</span>
                <span>মেশিন লার্নিং</span>
                <span><i class="fas fa-clock"></i> ৮ মিনিট পড়া</span>
            </div>
            <div class="blog-content">
                <p>মেশিন লার্নিং হল কৃত্রিম বুদ্ধিমত্তার একটি গুরুত্বপূর্ণ শাখা। এটি কম্পিউটারকে ডেটা থেকে শিখতে সাহায্য করে।</p>
                
                <h3>মেশিন লার্নিং কি?</h3>
                <p>মেশিন লার্নিং হল একটি প্রযুক্তি যা কম্পিউটারকে ডেটা থেকে স্বয়ংক্রিয়ভাবে শিখতে এবং উন্নতি করতে সাহায্য করে। এটি স্পষ্টভাবে প্রোগ্রাম না করে প্যাটার্ন শিখে।</p>
                
                <h3>মেশিন লার্নিং-এর প্রকারভেদ</h3>
                <ul>
                    <li><strong>সুপারভাইজড লার্নিং:</strong> লেবেলযুক্ত ডেটা দিয়ে প্রশিক্ষণ</li>
                    <li><strong>আনসুপারভাইজড লার্নিং:</strong> লেবেল ছাড়া ডেটা থেকে প্যাটার্ন শিখা</li>
                    <li><strong>রিইনফোর্সমেন্ট লার্নিং:</strong> ট্রায়াল এবং এরর দিয়ে শিখা</li>
                </ul>
                
                <h3>প্রয়োগ ক্ষেত্র</h3>
                <ul>
                    <li>ইমেজ রিকগনিশন</li>
                    <li>স্পিচ রিকগনিশন</li>
                    <li>রেকমেন্ডেশন সিস্টেম</li>
                    <li>ফ্রড ডিটেকশন</li>
                    <li>মেডিকেল ডায়াগনোসিস</li>
                </ul>
                
                <p>মেশিন লার্নিং আমাদের ভবিষ্যত প্রযুক্তির ভিত্তি। এটি শিখলে অনেক নতুন সম্ভাবনা খুলে যাবে।</p>
            </div>
        `
    },
    'python-data': {
        title: 'পাইথন দিয়ে ডেটা বিশ্লেষণ',
        content: `
            <div class="blog-meta">
                <span>৫ জানুয়ারি, ২০২৪</span>
                <span>প্রোগ্রামিং</span>
                <span><i class="fas fa-clock"></i> ১০ মিনিট পড়া</span>
            </div>
            <div class="blog-content">
                <p>পাইথন হল ডেটা বিশ্লেষণের জন্য সবচেয়ে জনপ্রিয় প্রোগ্রামিং ভাষা। এর সহজ সিনট্যাক্স এবং শক্তিশালী লাইব্রেরি এটিকে আদর্শ করে তুলেছে।</p>
                
                <h3>পাইথন কেন ডেটা বিশ্লেষণের জন্য?</h3>
                <ul>
                    <li>সহজ এবং পড়া যায়</li>
                    <li>বিশাল লাইব্রেরি ইকোসিস্টেম</li>
                    <li>শক্তিশালী ডেটা সাইন্স টুল</li>
                    <li>বড় কমিউনিটি সাপোর্ট</li>
                </ul>
                
                <h3>প্রধান লাইব্রেরি</h3>
                <ul>
                    <li><strong>প্যান্ডাস:</strong> ডেটা ম্যানিপুলেশন এবং বিশ্লেষণ</li>
                    <li><strong>নামপাই:</strong> সংখ্যাত্মক গণনা</li>
                    <li><strong>ম্যাটপ্লটলিব:</strong> ডেটা ভিজ্যুয়ালাইজেশন</li>
                    <li><strong>সাইকিট-লার্ন:</strong> মেশিন লার্নিং</li>
                    <li><strong>সিপি:</strong> স্ট্যাটিসটিক্যাল মডেলিং</li>
                </ul>
                
                <h3>বেসিক উদাহরণ</h3>
                <p>একটি সাধারণ ডেটা বিশ্লেষণের উদাহরণ দেখি:</p>
                <pre><code>
import pandas as pd
import matplotlib.pyplot as plt

# ডেটা লোড
df = pd.read_csv('data.csv')

# বেসিক স্ট্যাটিসটিক্স
print(df.describe())

# ভিজ্যুয়ালাইজেশন
df.plot(kind='bar')
plt.show()
                </code></pre>
                
                <p>পাইথন দিয়ে ডেটা বিশ্লেষণ শিখলে অনেক নতুন দরজা খুলে যাবে। এটি একটি মূল্যবান দক্ষতা।</p>
            </div>
        `
    },
    'big-data': {
        title: 'বিগ ডেটা এবং এর চ্যালেঞ্জ',
        content: `
            <div class="blog-meta">
                <span>৩ জানুয়ারি, ২০২৪</span>
                <span>বিগ ডেটা</span>
                <span><i class="fas fa-clock"></i> ৯ মিনিট পড়া</span>
            </div>
            <div class="blog-content">
                <p>আজকের বিশ্বে প্রতিদিন বিপুল পরিমাণ ডেটা তৈরি হচ্ছে। এই বিগ ডেটা প্রক্রিয়াকরণ এবং বিশ্লেষণ একটি বড় চ্যালেঞ্জ।</p>
                
                <h3>বিগ ডেটা কি?</h3>
                <p>বিগ ডেটা হল এমন ডেটা যা প্রচলিত ডেটাবেস সিস্টেম দিয়ে প্রক্রিয়া করা যায় না। এটি তিনটি ভি দ্বারা চিহ্নিত:</p>
                <ul>
                    <li><strong>ভলিউম:</strong> বিপুল পরিমাণ ডেটা</li>
                    <li><strong>ভেলোসিটি:</strong> দ্রুত ডেটা প্রবাহ</li>
                    <li><strong>ভ্যারাইটি:</strong> বিভিন্ন ধরনের ডেটা</li>
                </ul>
                
                <h3>বিগ ডেটার উৎস</h3>
                <ul>
                    <li>সোশ্যাল মিডিয়া</li>
                    <li>সেন্সর ডেটা</li>
                    <li>লগ ফাইল</li>
                    <li>ই-কমার্স ট্রানজেকশন</li>
                    <li>মোবাইল অ্যাপ ডেটা</li>
                </ul>
                
                <h3>প্রক্রিয়াকরণের চ্যালেঞ্জ</h3>
                <ul>
                    <li>ডেটা স্টোরেজ</li>
                    <li>প্রসেসিং পাওয়ার</li>
                    <li>ডেটা কোয়ালিটি</li>
                    <li>প্রাইভেসি এবং সিকিউরিটি</li>
                    <li>রিয়েল-টাইম প্রসেসিং</li>
                </ul>
                
                <h3>সমাধান</h3>
                <p>বিগ ডেটা প্রক্রিয়াকরণের জন্য বিভিন্ন টেকনোলজি ব্যবহার করা হয়:</p>
                <ul>
                    <li>হ্যাডুপ</li>
                    <li>স্পার্ক</li>
                    <li>নোজ</li>
                    <li>ক্লাউড কম্পিউটিং</li>
                </ul>
                
                <p>বিগ ডেটা আমাদের ভবিষ্যতের ডিজিটাল অর্থনীতির ভিত্তি। এটি সঠিকভাবে ব্যবহার করলে অনেক সুযোগ তৈরি হবে।</p>
            </div>
        `
    }
};

function openBlogModal(blogId) {
    const blog = blogPosts[blogId];
    if (blog) {
        modalContent.innerHTML = `
            <h2>${blog.title}</h2>
            ${blog.content}
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        modalContent.style.animation = 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

function closeBlogModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners
closeBtn.addEventListener('click', closeBlogModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeBlogModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeBlogModal();
    }
});

// Initialize filters on page load
document.addEventListener('DOMContentLoaded', () => {
    filterPosts();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add hover effects to post cards
document.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 