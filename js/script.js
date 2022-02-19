// Бургер
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');

iconMenu.addEventListener("click", function (event) {
	iconMenu.classList.toggle('active');
	menuBody.classList.toggle('active');
	document.querySelector('body').classList.toggle('lock');
});

menuBody.addEventListener("click", function (event) {
	iconMenu.classList.remove('active');
	menuBody.classList.remove('active');
	document.querySelector('body').classList.remove('lock');
});


// Скролл до разделов меню
const menuLinks = document.querySelectorAll('a[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuClick);
	});

	function onMenuClick(event) {
		const menuLink = event.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const offsetPosition = gotoBlock.getBoundingClientRect().top;

			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth'
			});
			event.preventDefault();
		}
	}
}

// Подключение слайдера
if (document.querySelector('.slider__body')) {
	const myTextSlider = new Swiper('.slider__body', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		autoHeight: true,

		simulateTouch: true,
		touchRatio: 1,
		touchAngle: 45,
		grabCursor: true,

		keyboard: {
			// Включить\выключить
			enable: true,
			// только когда слайдер
			// в пределах вьюпорта
			onlyInViewport: true,
			// Включить\выключить
			// Управление клавишами
			// pageUp, pageDown
			pageupDown: true,
		},

	});
};

// Изменение стилей при фокусе input и неправильном вводе email
const input = document.querySelector('.input');
let placeholder = input.getAttribute('placeholder');

input.addEventListener("focus", function (event) {
	if (input.nextElementSibling) {
		input.classList.remove('_error');
		input.nextElementSibling.remove();
	};
	if (input.getAttribute('placeholder')) {
		placeholder = input.getAttribute('placeholder');
	};
	input.setAttribute('placeholder', '');
	input.classList.add('_active');
});

input.addEventListener("blur", function (e) {
	if (!input.value) {
		input.setAttribute('placeholder', placeholder);
		input.classList.remove('_active');
	}
});

const subscribeForm = document.forms.subscribe;
function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
};

subscribeForm.addEventListener('submit', function (event) {
	if (emailTest(input)) {
		console.log(input.parentElement);
		input.parentElement.insertAdjacentHTML(
			"beforeend",
			`<div class="subscribe__input_error">
				Введите правильный email
			</div>`
		);
		input.classList.add('_error');
		event.preventDefault();
	}
});

