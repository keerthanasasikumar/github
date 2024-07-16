function search() {
    var name = document.getElementById("text").value;
    console.log(name);
    fetch(`https://api.github.com/users/${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById("result").innerHTML = `<img src="${data.avatar_url}" alt="user_avatar"><h2>${data.login}</h2>`;
            return fetch(`https://api.github.com/users/${name}/repos`);
        })
        .then(response => response.json())
        .then(repos => {
            const repoList = repos.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('');
            document.getElementById("repo-list").innerHTML = `<h3>Repositories:</h3><ol>${repoList}</ol>`;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("result").innerHTML = "User not found";
            document.getElementById("repo-list").innerHTML = ""; // Clear previous repo list if any
        });
}

