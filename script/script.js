let smartLoc = navigator.userAgent
let pickclick = (smartLoc.match(/iPad/i) || smartLoc.match(/iPhone/)) ? "touchstart" : "click";

const body = document.body;

const modalForm = document.querySelector('.modal__form-result');

const headerList = document.querySelector('.header__list')

let menuOpen = false;

const swiper = new Swiper('.feed__swiper', {
    effect: 'fade',
    fade: {
        crossFade: true
    },
    navigation: {
        nextEl: '.feed__next',
        prevEl: '.feed__prev'
    },
    speed: 2000
})

window.addEventListener("DOMContentLoaded", () => {
    fetchData();
    const headerBurger = document.querySelector('.header__burger');
    menuLog(menuOpen, headerBurger, document.querySelector('.header__nav'), document.querySelector('.header__list'));
})

window.addEventListener(pickclick, (e) => {
    const modal = document.querySelector('.modal');
    if(e.target.closest('.banner__fun-btn')) {
        const beforeWidth = body.offsetWidth;
        modal.classList.remove('hide');
        body.classList.add('stuck');
    }
    if(e.target.closest('.modal__close')) {
        modal.classList.add('hide')
        body.classList.remove('stuck');
    }
    const headerBurger = e.target.closest('.header__burger');
    if(headerBurger) {
        menuOpen = !menuOpen;
        menuLog(menuOpen, headerBurger, document.querySelector('.header__nav'), document.querySelector('.header__list'));
    }
})

async function fetchData() {
    fetch('./data/data.json')
    .then(response => response.json())
    .then(i => {
        i.forEach(p => {
            if(p.type == 'feed') {
                
                typeHTML(p, '.feed__swiper-wrapper')

            }
            if(p.type == 'chart') {
                typeHTML(p, '.chart__list')
            }
            
        })
    })
    .catch(() => {
        alert("Проблемы с сервером!!! Страница полностью не загружена")
    })
}

function typeHTML(typeEl, block) {
    const subArr = typeEl.items;
    const blockEl = document.querySelector(block);
    if(typeEl.type == 'feed') {
        subArr.forEach(o => {
            const html = `
            <div class="feed__swiper-slide swiper-slide">
    
                <h4 class="feed__title">${o.title}</h4>
    
                <p class="feed__text">${o.text}</p>
    
                <div class="feed__author">${o.author}</div>
    
            </div>`;
            blockEl.insertAdjacentHTML('beforeend', html);
        })
    }
    if(typeEl.type == 'chart') {
        subArr.forEach(o => {
            const html = `
            <li>
                <p class="chart__list-title">${o.title}</p>
                <div class="chart__list-menu"><p>${o.firstMenu}<div class="dots"><span class="dots__item"><div class="dots__item-dot"></div></span></div>${o.doubleMenu}</p></div>
            </li>`;
            blockEl.insertAdjacentHTML('beforeend', html);
        })
    }
}

function menuLog(menu, burger, nav, list) {
    if(menu == false) {
        burger.classList.remove('active');
        nav.classList.remove('active')
        list.classList.remove('active');
        setTimeout(() => {
            list.classList.add('none')
        }, 600);
        body.classList.remove('hide')
    } else {
        burger.classList.add('active');
        nav.classList.add('active')
        list.classList.remove('none')
        setTimeout(() => {
            list.classList.add('active')
        }, 200)
        body.classList.add('hide')
    }
}

const form = document.forms['form'];

console.log(form)

form.addEventListener('submit', () => {
    formDataSend();
})

async function formDataSend() {
    const data = formValue(form);
    console.log(form)
    const response = await formSend(data);
    console.log(response)
    if(response.ok) {
        modalForm.classList.remove('hide');
        modalForm.classList.add('success');
        const newHTML = `<p>Форма успешно отправлена! <a href="server" class="server__message">Посмотреть на заявку</a></p>`
        modalForm.insertAdjacentHTML('beforeend', newHTML)
        formReset()
    } else {
        modalForm.classList.remove('hide');
        modalForm.classList.add('error');
        modalForm.innerText = 'Не удалось отправить форму';
    }
}

function formValue(value) {
    return new FormData(value);
}

async function formSend(data) {
    return await fetch('./form.php', {
        method: 'POST',
        body: data
    })
}

function formReset() {
    form.reset();
    setTimeout(() => {
        modalForm.classList.add('hide');
        modalForm.innerHTML = '';
    }, 5000)
}



//TEL VALID
const eventCallback = function (e) {
    const el = e.target;
    const clearVal = el.dataset.phoneClear;
    const pattern = el.dataset.phonePattern;
    const matrix__def = '+7(___)___-__-__';
    const matrix = pattern ? pattern : matrix__def;
    let i = 0;
    let def = matrix.replace(/\D/g,""); 
    let val = e.target.value.replace(/\D/g,"");

    if(clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) { 
            e.target.value = '';
            return;
        }
    }

    if(def.length >= val.length) val = def;

    e.target.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    }) 

}

const phoneInputs = document.querySelectorAll('[data-phone-pattern]');

for(let elem of phoneInputs) {
    for(let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCallback)
    }
}