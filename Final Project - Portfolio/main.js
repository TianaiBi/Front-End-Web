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

// fetch data
if (gridContainer) {
    fetchPortfolio();
}

async function fetchPortfolio() {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
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
                <div class="description-text">
                    ${description}
                </div>
            </div>

        </div>
    `;

    modalBody.innerHTML = htmlContent;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
};

// close modal
closeModalBtn.onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // restore scrolling
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};