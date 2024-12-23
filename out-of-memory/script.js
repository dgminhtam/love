const messages = ["Anh nhớ em ❤️"];
const notificationCount = 500;
let createdNotifications = 0;

function generateRandomNotifications() {
    for (let i = 0; i < notificationCount; i++) {
        setTimeout(() => {
            const notification = document.createElement("div");
            notification.className = "notification";

            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            notification.innerHTML = `
                <div class="notification-header">
                    <button class="minimize-btn" onclick="minimizeNotification(this)">–</button>
                    <span>Bộ nhớ đầy!</span>
                </div>
                <p>${randomMessage}</p>
            `;

            const left = Math.random() * (window.innerWidth - 240);
            const top = Math.random() * (window.innerHeight - 160);
            notification.style.left = `${left}px`;
            notification.style.top = `${top}px`;

            document.body.appendChild(notification);
            createdNotifications++;

            if (createdNotifications === notificationCount) {
                showFinalMessage();
            }
        }, i * 50);
    }
}

function minimizeNotification(button) {
    const notification = button.closest(".notification");
    if (notification) {
        notification.style.display = "none";
    }
}

function showFinalMessage() {
    const finalMessage = document.getElementById("finalMessage");
    if (finalMessage) {
        finalMessage.style.display = "block";
    }
}

(function () {
    let lastTime = 0;
    const vendors = ["ms", "moz", "webkit", "o"];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] ||
            window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            const currTime = new Date().getTime();
            const timeToCall = Math.max(0, 16 - (currTime - lastTime));
            const id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})();
