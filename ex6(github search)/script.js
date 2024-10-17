document.getElementById('searchBtn').addEventListener('click', function () {
    const username = document.getElementById('username').value.trim();
    const profileDiv = document.getElementById('profile');
    const errorDiv = document.getElementById('error');

    // 清空之前的内容
    profileDiv.innerHTML = '';
    errorDiv.textContent = '';

    if (!username) {
        errorDiv.textContent = '请输入GitHub用户名';
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('无法找到该用户');
            }
            return response.json();
        })
        .then(data => {
            // 显示用户信息
            profileDiv.innerHTML = `
                <img src="${data.avatar_url}" alt="Avatar" width="150">
                <p><strong>用户名：</strong> ${data.login}</p>
                <p><strong>简介：</strong> ${data.bio ? data.bio : '暂无简介'}</p>
                <p><strong>公共仓库数：</strong> ${data.public_repos}</p>
                <p><strong>GitHub 主页：</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
            `;
        })
        .catch(error => {
            errorDiv.textContent = error.message;
        });
});
