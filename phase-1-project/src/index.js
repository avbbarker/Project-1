let currentAlbum

fetch("http://localhost:3000/albums")
.then(res => res.json())
.then(data => {
    data.forEach(albums => loadAlbums(albums))
    displayAlbum(data[0])
    listenedToggle()
    addlistens()
})

function loadAlbums(albums) {
    const albumList = document.querySelector("#album-list")
    const albumMenu = document.createElement("img")

    albumMenu.src = albums.image
    albumList.appendChild(albumMenu)
    albumMenu.addEventListener("click", () => {
        displayAlbum(albums)
    })
}

function displayAlbum(album) {

    currentAlbum = album

    const albumImage = document.querySelector("#detail-image")
    const title = document.querySelector("#title")
    const artist = document.querySelector("#artist")
    const yearReleased = document.querySelector("#year-released")
    const description = document.querySelector("#description")
    const listened = document.querySelector("#listened")
    const amount = document.querySelector("#amount")

    albumImage.src = album.image
    title.textContent = album.title
    artist.textContent = album.artist
    yearReleased.textContent = album.release_year
    description.textContent = album.description
    amount.textContent = album.times_listened + " times played" 
    listened.textContent = album.listened ? "Purchased" : "Not Purchased"
}

function listenedToggle () {

    const listened = document.querySelector("#listened")

    listened.addEventListener("click", () => {
        currentAlbum.listened = !currentAlbum.listened
        listened.textContent = currentAlbum.listened ? "Purchased" : "Not Purchased"
    })
}

function addlistens () {
    const listensForm = document.querySelector("#listens-form")
    const amount = document.querySelector("#amount")

    listensForm.addEventListener("submit", (e) => {
        e.preventDefault()
        currentAlbum.times_listened += parseInt(e.target["listens-amount"].value)
        amount.textContent = currentAlbum.times_listened + " times played"
        e.target.reset()
    })
}
