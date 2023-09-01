const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json()

    const tabContainer = document.getElementById("tab-container")

    data.data.forEach(category => {
        const div = document.createElement("div")
        div.innerHTML = `
        <button onclick="handleLoadVideos('${category.category_id}')" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-gray-200 rounded-sm lg:rounded-md hover:bg-[#f35d71] normal-case">${category.category}</button>

        `;
        tabContainer.appendChild(div)

    });


}

const handleLoadVideos = async (categoryId) => {
    console.log(categoryId)
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json()
    console.log(data.data.length)
    const warningContainer = document.getElementById("warning-container")
    warningContainer.innerHTML = " "
    if(data.data.length === 0) {
        const div = document.createElement("div")
        div.setAttribute("class", "mt-24")
        div.innerHTML = `
        <div class="flex justify-center mb-6">
        <img class="text-center" src="./images/Icon.png">
        </div>
        <h1 class="font-bold text-2xl text-center">Oops!! Sorry, There is no <br> content here</h1>
        `
        warningContainer.appendChild(div)
    }
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = " "
    data.data.forEach(video => {
        console.log(video)
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="card">
        <figure><img class="w-full h-[200px]" src='${video.thumbnail
            }'></figure>
        <div class="flex justify-end relative mr-4">
            <div  class="w-fit p-1 absolute bottom-[20px] rounded-sm">
                <p id="time-container" class="text-white text-[10px]">${timeConverter(video.others.posted_date)}</p>
            </div>
        </div>

        <div class="flex gap-3 mt-8">
            <img class="h-14 w-14  rounded-full" src='${video.authors[0].profile_picture}' alt="">
            <div class="space-y-3">
                <h1 class="font-bold text-xl">${video.title}</h1>
                <div class="flex items-center gap-2">
                    <p class="text-lg text-gray-500">${video.authors[0].profile_name}</p>
                    <img class="h-full" src="${video.authors[0].verified ? './images/verified.png' : ' '}">   
                </div>
                <p class="text-lg text-gray-500">${video.others.views} views</p>
            </div>
        </div>
    </div>
        `

    cardContainer.appendChild(div)


    })

}


const timeConverter = (sec) => {
    if (!sec) {
        document.getElementById("time-container").classList.add = "invisible";
        return ''
    }
    else {
        const hrs = Math.floor(sec / 3600);
        const min = Math.floor((sec - (hrs * 3600)) / 60);
        if (hrs >= 24) {
            const days = hrs / 24;
            if (days > 360) {
                const years = Math.floor(days / 360);
                return `${years} years ago`
            }
            return `${days} days ago`
        }
        return `${hrs} hrs ${min} min ago`;
    }

    
}


handleLoadVideos("1000")
handleCategory()