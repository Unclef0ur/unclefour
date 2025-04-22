document.addEventListener("DOMContentLoaded", function () {
    const page = window.location.pathname.split("/").pop();
    setActiveNavbar(page);
    if (page === "index.html") {
        handleTrangChu();
    } else if (page === "khampha.html") {
        handleKhamPha();
    }
});
function setActiveNavbar(currentPage) {
    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active-nav");
        }
    });
}
function handleTrangChu() {
    const mainContent = document.getElementById('mainContent');
    const mediaContainer = document.getElementById('media-container');
    let currentMedia = null;
    let currentSongItem = null;    

    const firstSong = document.querySelector('.song-item');
    if (firstSong) {
        const imageUrl = firstSong.getAttribute('data-image');
        const mainContent = document.getElementById('mainContent');
        if (imageUrl && mainContent) {
            mainContent.style.backgroundImage = `url('${imageUrl}')`;
        }
    }

    const songs = document.querySelectorAll('.song-item');
    songs.forEach(song => {
        song.addEventListener('mouseover', function () {
            const imageUrl = this.getAttribute('data-image');
            if (mainContent) mainContent.style.backgroundImage = `url('${imageUrl}')`;
        });

        song.addEventListener('click', function () {
            const iframeSrc = this.getAttribute('data-video');
            if (!iframeSrc) return;

            if (iframeSrc === currentMedia) {
                mediaContainer.innerHTML = '';
                this.classList.remove("active");
                currentMedia = null;
                return;
            }

            mediaContainer.innerHTML = `
                <iframe style="border-radius:12px" src="${iframeSrc}" width="100%" height="152"
                    frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>
            `;

            if (currentSongItem) currentSongItem.classList.remove("active");
            this.classList.add("active");
            currentSongItem = this;
            currentMedia = iframeSrc;
        });
    });
}
function handleKhamPha() {
    const itemsPerPage = 3;
    const songList = document.querySelectorAll(".songmention-List .background-hover");
    const pagination = document.getElementById("pagination");
    const mentionbg = document.querySelectorAll('.background-mention');
    let currentPage = 1;

    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        songList.forEach((item, index) => {
            item.style.display = (index >= start && index < end) ? "inline-block" : "none";
        });

        currentPage = page;
        updatePagination();
    }

    function updatePagination() {
        const totalPages = Math.ceil(songList.length / itemsPerPage);
        pagination.innerHTML = "";

        const prevBtn = document.createElement("button");
        prevBtn.textContent = "←";
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => showPage(currentPage - 1);
        pagination.appendChild(prevBtn);

        let startPage = Math.max(currentPage - 1,1);
        let endPage = Math.min(startPage+2,totalPages);
        if(endPage-startPage<2){
            startPage=Math.max(endPage-2,1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            if(i== currentPage) btn.classList.add("active");
            btn.onclick = () =>showPage(i);
            pagination.appendChild(btn);
        }

        const nextBtn = document.createElement("button");
        nextBtn.textContent = "→";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => showPage(currentPage + 1);
        pagination.appendChild(nextBtn);
    }

    mentionbg.forEach(mbg => {
        const bgImageUrl = mbg.getAttribute('data-image');
        if (bgImageUrl) mbg.style.backgroundImage = `url('${bgImageUrl}')`;
        mbg.onclick = () => {
            const songUrl = mbg.getAttribute("data-url");
            if (songUrl) window.open(songUrl, "_blank");
        };
    });

    showPage(1);
}
