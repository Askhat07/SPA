// serviceWorkerRegistration.ts
const publicUrl = process.env.REACT_APP_PUBLIC_URL || "/"; // Правильное использование переменной окружения

// Регистрация Service Worker
export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `${publicUrl}/service-worker.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log(
            "Service Worker registered with scope: ",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    });
  }
}
