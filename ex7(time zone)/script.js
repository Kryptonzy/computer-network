// 引入 dayjs 和 timezone 插件
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// 显示当前时间
function updateTime(timezone = 'local') {
    const timeDisplay = document.getElementById('time-display');
    
    let now;
    if (timezone === 'local') {
        now = dayjs().format('YYYY-MM-DD HH:mm:ss');
    } else {
        now = dayjs().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    }
    
    timeDisplay.textContent = `当前时间：${now}`;
}

// 初始显示本地时间
updateTime();

// 初始化 micromodal
MicroModal.init();

// 绑定按钮点击事件
document.getElementById('openModal').addEventListener('click', function() {
    MicroModal.show('modal-1');
});

// 当模态框关闭时更新时区
document.querySelector('[data-micromodal-close]').addEventListener('click', function() {
    const selectedTimezone = document.getElementById('timezone-select').value;
    updateTime(selectedTimezone);
});
