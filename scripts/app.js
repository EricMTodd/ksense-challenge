const postsUrl = 'https://jsonplaceholder.typicode.com/posts'
const usersUrl = 'https://jsonplaceholder.typicode.com/users'

fetch(usersUrl)
.then(response => response.json())
.then(users => {
  users.map(user => {
    let table = document.querySelector('table')
    let tableHeader = document.createElement('th')
    tableHeader.id = user.id
    tableHeader.className = 'username'
    tableHeader.innerText = user.username
    tableHeader.addEventListener('click', () => {
      fetch(postsUrl)
      .then(response => response.json())
      .then(posts => {
        let userPosts = posts.filter(post => post.userId === user.id)
        let orderedList = document.querySelector('ol')
        orderedList.innerText = ''
        userPosts.map(post => {
          let listItem = document.createElement('li')
          let title = document.createElement('h2')
          title.innerText = post.title
          let body = document.createElement('p')
          body.innerText = post.body
          listItem.appendChild(title)
          listItem.appendChild(body)
          orderedList.appendChild(listItem)
        })
      })
      .catch(error => console.log(error))
    })
    table.appendChild(tableHeader)
  })
})
.catch(error => console.log(error))
