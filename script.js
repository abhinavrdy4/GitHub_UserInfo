document.getElementById('search').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            displayProfile(data);
        })
        .catch(error => {
            document.getElementById('profile').innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
});

function displayProfile(user) {
    document.getElementById('profile').innerHTML = `
        <div class="profile-card">
            <img src="${user.avatar_url}" alt="Profile Picture">
            <h2>${user.name || user.login}</h2>
            <p>${user.bio || "No bio available"}</p>
            <p><strong>Public Repos:</strong> ${user.public_repos}</p>
            <p><strong>Followers:</strong> ${user.followers}</p>
            <p><strong>Following:</strong> ${user.following}</p>
            <a href="${user.html_url}" target="_blank">View Profile</a>
        </div>
    `;
    document.getElementById('search').addEventListener('click', function () {
        const username = document.getElementById('username').value;
        const profileContainer = document.getElementById('profile');
        const loadingSpinner = document.getElementById('loading');
    
        if (!username) {
            alert('Please enter a GitHub username');
            return;
        }
    
        profileContainer.innerHTML = ''; // Clear old data
        loadingSpinner.style.display = 'block'; // Show loading
    
        fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(data => {
                loadingSpinner.style.display = 'none'; // Hide loading
                displayProfile(data);
            })
            .catch(error => {
                loadingSpinner.style.display = 'none'; // Hide loading
                profileContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
            });
    });
    
}
