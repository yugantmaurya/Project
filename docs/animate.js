function showslidebar(){
    const slidebar = document.querySelector('.slidebar')
    slidebar.style.display = 'flex'
}

function hideslidebar(){
    const slidebar = document.querySelector('.slidebar')
    slidebar.style.display = 'none'
}

const postSlider = document.querySelector('.post-slider')
const postTrack = document.querySelector('.post-track')
const postCards = document.querySelectorAll('.post-track .Card')
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')

if (postSlider && postTrack && postCards.length && prevBtn && nextBtn) {
    let currentIndex = 0
    let swipeStartX = 0
    let swipeEndX = 0

    function getSliderDetails() {
        const cardWidth = postCards[0].getBoundingClientRect().width
        const trackStyle = window.getComputedStyle(postTrack)
        const gap = parseFloat(trackStyle.gap) || 0
        const visibleCards = Math.max(1, Math.round((postSlider.clientWidth + gap) / (cardWidth + gap)))
        const maxIndex = Math.max(0, postCards.length - visibleCards)

        return { cardWidth, gap, maxIndex }
    }

    function slideTo(index) {
        const { maxIndex } = getSliderDetails()

        currentIndex = Math.min(Math.max(index, 0), maxIndex)
        updatePostSlider()
    }

    function updatePostSlider() {
        const { cardWidth, gap, maxIndex } = getSliderDetails()

        currentIndex = Math.min(currentIndex, maxIndex)
        postTrack.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`
        prevBtn.disabled = currentIndex === 0
        nextBtn.disabled = currentIndex === maxIndex
    }

    prevBtn.addEventListener('click', () => {
        slideTo(currentIndex - 1)
    })

    nextBtn.addEventListener('click', () => {
        slideTo(currentIndex + 1)
    })

    postSlider.addEventListener('pointerdown', (event) => {
        swipeStartX = event.clientX
        swipeEndX = event.clientX
    })

    postSlider.addEventListener('pointermove', (event) => {
        swipeEndX = event.clientX
    })

    postSlider.addEventListener('pointerup', () => {
        const swipeDistance = swipeEndX - swipeStartX

        if (Math.abs(swipeDistance) < 50) return
        slideTo(currentIndex + (swipeDistance < 0 ? 1 : -1))
    })

    window.addEventListener('resize', updatePostSlider)
    updatePostSlider()
}
