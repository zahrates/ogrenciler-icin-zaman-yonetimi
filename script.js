const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2,
});

document.querySelectorAll(".fade-up").forEach((element) => {
  observer.observe(element);
});
// Sayfa yüklendiğinde scroll'u yukarı sabitle böylece her yenilendiğinde aşağı kaymasın
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
/*scroll*/
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Theme Toggle
const toggle = document.getElementById('darkModeToggle');
const root = document.documentElement;
const html = document.querySelector('html');

// Sayfa yüklendiğinde hafızayı kontrol et
const savedTheme = localStorage.getItem('theme-preference');

if (savedTheme === 'dark') {
  html.classList.add('dark-mode');
  toggle.checked = true;
} else if (savedTheme === 'light') {
  html.classList.remove('dark-mode');
  toggle.checked = false;
} else {
  // Sistem tercihini kullan
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.classList.add('dark-mode');
    toggle.checked = true;
  }
}

// Butona basıldığında değişikliği yap ve kaydet
toggle.addEventListener('change', function () {
  if (this.checked) {
    html.classList.add('dark-mode');
    localStorage.setItem('theme-preference', 'dark');
    root.style.colorScheme = 'dark';
  } else {
    html.classList.remove('dark-mode');
    localStorage.setItem('theme-preference', 'light');
    root.style.colorScheme = 'light';
  }
});


/*pomodoro sayaç mantığı */
let sure = 25 * 60;
let sayac;
let kalanSure = 5000; // 25 dk sn cinsinden

function guncelle() {

    const dakika = Math.floor(sure / 60);
    const saniye = sure % 60;

    document.getElementById("timer").textContent =
        `${dakika.toString().padStart(2,"0")}:${saniye.toString().padStart(2,"0")}`;
}

function baslat(){

    if(sayac) return;

    sayac = setInterval(() => {

        if(sure > 0){
            sure--;
            guncelle();
        }
        else{
            clearInterval(sayac);
            sayac = null;
            alert("Pomodoro tamamlandı 🎉");
        }

    },1000);
}

function duraklat(){
    if (sayac){
      clearInterval(sayac);
      sayac = null;
    }
}

function devam(){
    if (!sayac && sure > 0){
      baslat();
    }
}

function sifirla(){

    if (sayac) {
      clearInterval(sayac);
      sayac = null;
    }

    sure = VARSAYILAN_SURE;
    guncelle();
}

guncelle();