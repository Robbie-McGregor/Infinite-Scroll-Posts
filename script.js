const postContainer = document.getElementById('posts-container')
const loading = document.querySelector('.loader')
const filter = document.getElementById('filter')

let limit = 7
let page = 1


//Fetch POSTS from API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}_&page=${page}`);

    const data = await res.json()

    return data
}

//Show posts in the DOM
async function showPosts() {
    const posts = await getPosts()
    posts.forEach(post => {
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML = `
            <div class="number">${post.id}</div>        
            <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        `
        postContainer.appendChild(postEl)
    });
    console.log(page)
}

//Show loader & fetch more posts
function showLoading() {
    loading.classList.add('show')
    setTimeout(() => {
        loading.classList.remove('show')
        setTimeout(() => {
            page++
            showPosts()
        }, 300)
    }, 1000)
    // showPosts()

}

//Show initial posts
showPosts()

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading()

    }
})


