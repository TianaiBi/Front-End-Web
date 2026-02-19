// API
const spaceID = 'yz6c6czi7zqw'; 
const accessToken = '4iYjuf19eUH_j2U7vZrwS65ChVwhh1HSgRk-mN4r-Fg'; 
const contentTypeID = 'portfolio'; 
const endpoint = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=${contentTypeID}&include=10`;

const gridContainer = document.getElementById('work-grid');
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal-btn');

// menu
const menu = document.getElementById("navbar");
const openBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");

if (openBtn) {
    openBtn.onclick = () => { menu.classList.add("open"); };
    closeBtn.onclick = () => { menu.classList.remove("open"); };
}

// name color change animation
const fixedName = document.querySelector('.fixed-name:not(.small)');

if (fixedName) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPercent = scrollTop / docHeight;
        const bgPosition = scrollPercent * 100;
        
        fixedName.style.backgroundPosition = `0% ${bgPosition}%`;

        //how far from the bottom of the page
        const distanceToBottom = docHeight - scrollTop;
        const fadeStart = windowHeight + 200;

        if (distanceToBottom < fadeStart) {
            let opacity = distanceToBottom / fadeStart;
            fixedName.style.opacity = opacity;
        } else {
            fixedName.style.opacity = 1;
        }
    });
}

// fetch data
if (gridContainer) {
    fetchPortfolio();
}

async function fetchPortfolio() {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        data.items.sort((a, b) => {
            const yearA = parseInt(a.fields.year) || 0;
            const yearB = parseInt(b.fields.year) || 0;
            return yearB - yearA; 
        });
        renderGrid(data.items, data.includes);
        
        checkUrlParams();
        
    } catch (error) {
        console.error("Error:", error);
    }
}

function renderGrid(items, includes) {
    gridContainer.innerHTML = ''; 

    items.forEach(item => {
        const fields = item.fields;
        let thumbUrl = '';
        if (fields.thumbnail) {
            const asset = includes.Asset.find(a => a.sys.id === fields.thumbnail.sys.id);
            if (asset) thumbUrl = asset.fields.file.url;
        }

        const card = document.createElement('article');
        card.className = 'project-card';
        
        const cat = fields.category ? fields.category : 'other';
        card.setAttribute('data-category', cat);

        card.innerHTML = `
            <img src="https:${thumbUrl}" alt="${fields.title}">
            <h3>${fields.title}</h3>
            <p>${cat}</p>
        `;
        card.addEventListener('click', () => openModal(fields, includes));
        gridContainer.appendChild(card);
    });
}

// filter
function filterGrid(category, clickedBtn) {
    if (clickedBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
    }

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    if (category) {
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        
        if (targetBtn) {
            filterGrid(category, targetBtn);
        }
    }
}

const filterMenu = document.querySelector('.filter-menu');
const filterBtns = document.querySelectorAll('.filter-btn');

if (filterMenu && filterBtns) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            //Get the exact visual position of button and menu
            const menuRect = filterMenu.getBoundingClientRect();
            const btnRect = btn.getBoundingClientRect();

            //Calculate the center of the menu and the button
            const menuCenter = menuRect.width / 2;
            const btnCenter = btnRect.left - menuRect.left + (btnRect.width / 2);

            //Find the difference (How far off-center is it?)
            const offset = btnCenter - menuCenter;

            //Adjust the scroll position by that difference
            filterMenu.scrollBy({
                left: offset,
                behavior: 'smooth'
            });
        });
    });
}

// modal
const openModal = (fields, includes) => {
    
    modalBody.innerHTML = '';

    // get fields
    const title = fields.title;
    const category = fields.category;
    const year = fields.year || ""; 
    const description = fields.description || "";
    const videoLink = fields.videoLink; 
    const webLink = fields.websiteLink;
    const gallery = fields.gallery; 
    
    let htmlContent = `
        <div class="modal-header-row">
            <h1 class="big-art-title">${title}</h1>
        </div>

        <div class="modal-split-layout">
            
            <div class="media-column">
                
                <div class="meta-info">
                    <p class="meta-category">${category}</p>
                    <p class="meta-year">${year}</p>
                </div>

                ${(() => {
                    if (videoLink) {
                        let videoId = '';
                        if (videoLink.includes('youtu.be/')) {
                            videoId = videoLink.split('youtu.be/')[1].split('?')[0];
                        }
                        
                        if (videoId) {
                            return `
                            <div class="video-container">
                                <iframe src="https://www.youtube.com/embed/${videoId}?=1&rel=0" 
                                    frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
                            </div>`;
                        }
                    }
                    return ''; // returns nothing if no video
                })()}

                ${webLink ? `
                    <div style="margin-bottom: 30px;">
                        <a href="${webLink}" target="_blank" class="play-btn">
                            ▶ Launch Interactive Piece
                        </a>
                    </div>` : ''}

                ${(() => {
                    if (gallery && gallery.length > 0) {
                        let galleryHtml = `<div class="gallery-stack">`;
                        gallery.forEach(imageRef => {
                            const asset = includes.Asset.find(a => a.sys.id === imageRef.sys.id);
                            if (asset) {
                                galleryHtml += `<img src="https:${asset.fields.file.url}" class="modal-img" loading="lazy" alt="Detail">`;
                            }
                        });
                        galleryHtml += `</div>`;
                        return galleryHtml;
                    }
                    return '';
                })()}
            </div>

            <div class="info-column">
                <h3 class="concept-header">DESCRIPTION</h3>
                <div class="description-text">${description}</div>
            </div>

        </div>
    `;

    modalBody.innerHTML = htmlContent;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
};

// close modal
if (closeModalBtn) {
    closeModalBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // restore scrolling

        const iframe = document.querySelector(".modal iframe");
        if (iframe) {
            const tempSrc = iframe.src;
            iframe.src = "";       // kill source
            iframe.src = tempSrc;  // reset to start
        }
    };
}

if (modal) {
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';

            const iframe = document.querySelector(".modal iframe");
            if (iframe) {
                const tempSrc = iframe.src;
                iframe.src = "";
                iframe.src = tempSrc;
            }
        }
    };
}

// Copyright Year Auto-Update
const yearSpan = document.getElementById('copyright-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Close menu on nav link click
const navLinks = document.querySelectorAll('#navbar a');

if (navLinks) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // When clicked, remove the "open" class to hide the menu
            if (menu) {
                menu.classList.remove("open");
            }
        });
    });
}
