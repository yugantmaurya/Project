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

    function getSliderDetails() {
        const cardWidth = postCards[0].getBoundingClientRect().width
        const trackStyle = window.getComputedStyle(postTrack)
        const gap = parseFloat(trackStyle.gap) || 0
        const visibleCards = Math.max(1, Math.round((postSlider.clientWidth + gap) / (cardWidth + gap)))
        const maxIndex = Math.max(0, postCards.length - visibleCards)

        return { cardWidth, gap, maxIndex }
    }

    function updatePostSlider() {
        const { cardWidth, gap, maxIndex } = getSliderDetails()

        currentIndex = Math.min(currentIndex, maxIndex)
        postTrack.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`
        prevBtn.disabled = currentIndex === 0
        nextBtn.disabled = currentIndex === maxIndex
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1)
        updatePostSlider()
    })

    nextBtn.addEventListener('click', () => {
        const { maxIndex } = getSliderDetails()
        currentIndex = Math.min(maxIndex, currentIndex + 1)
        updatePostSlider()
    })

    window.addEventListener('resize', updatePostSlider)
    updatePostSlider()
}
