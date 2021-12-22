$(document).ready(function () {

    const brandsSlider = $('.brands').slick({
        arrows: false,
        autoplay: true,
        centerPadding: 20,
        draggable: false,
        pauseOnHover: false,
        swipe: false,
        touchMove: false,
        variableWidth: true,
        autoplaySpeed: 0,
        speed: 4000,
        cssEase: 'linear'
    })

    $('.header__link, .footer__link').click(function (e) {
        e.preventDefault()

        $('.header__link').removeClass('active')
        $(this).addClass('active')

        const section = $(this).attr('href').slice(1)
        $('html, body').animate({
            scrollTop: $('.' + section).position().top - $('.header').height()
        }, 900)

        if ($(window).width() < 768) {
            $('.header__nav').slideUp(300)
            setTimeout(() => {
                $('.header__nav').hide()
            }, 300)
            $('.burger').removeClass('show')
        }
    })

    let sectionsOffsetTop = []
    $('section').each((idx, section) => { sectionsOffsetTop.push($(section).offset().top) })

    $(window).scroll(function () {
        let scrolled = $(window).scrollTop()
        let current

        sectionsOffsetTop.forEach((offset, idx) => {
            try {
                const nextSection = $($('section').get(idx + 1))
                if (scrolled > offset && scrolled < nextSection.offset().top) {
                    current = idx - 1
                }
            } catch(error) {
                ///
            }
        })

        $('.header__link').removeClass('active')
        $('.header .header__link').eq(current).addClass('active')
    })


    $('.filter__header').click(function () {
        $(this).next().slideToggle()
        $(this).parent().toggleClass('filter--open')
    })


    $('.range input').on('input', function () {
        $(this).prev().children().last().text(`${$(this).val()} ₽`)
    })

    $('.ordering').click(function () {
        let idx = $(this).find('span.active').index()
        $(this).find('span').removeClass('active')
        if (idx == $(this).children().length - 1) {
            $(this).find('span:first-child').addClass('active')
        }
        else {
            idx++
            $(this).find(`span:nth-child(${idx + 1})`).addClass('active')
        }
    })


    function cardRender(data) {
        let res = `<a href="#" class="card">
        <div class="card__img">
            <img src="${data.img}" alt="">
        </div>`

        if (data.newPrice) {
            res += `<div class="card__badge"><span>%</span></div>`
        }

        res += `<div class="card__content">
        <h3 class="card__title">${data.title}</h3>
        <p class="card__model">
            Model modelname
        </p>`

        if (data.newPrice) {
            res += `
                    <div class="card__price card__price--sale">
                        <span>${ data.newPrice.toLocaleString() } ₽</span>
                        <span>${ data.price.toLocaleString() } ₽</span>
                    </div>
                </div>
            </a>`
        } else {
            res += `
                    <div class="card__price">
                        <span>${ data.price.toLocaleString() } ₽</span>
                    </div>
                </div>
            </a>`
        }

        return res
    }

    // тестовые данные карточек
    const cards = [
        {
            img: 'img/glasses-1.jpg',
            title: 'Очки Polaroid',
            newPrice: 7250,
            price: 8500
        }, 
        {
            img: 'img/glasses-2.jpg',
            title: 'Очки Gevance',
            price: 10250
        },
        {
            img: 'img/glasses-3.jpg',
            title: 'Очки Rayban',
            price: 12890
        },
    ]

    $('.catalog__more').click(function (e) {
        e.preventDefault()
        cards.forEach(data => {
            $(this).before(cardRender(data))
        })
    })

    $('.sale').click(function(e) {
        e.preventDefault()
        $('.modal-sale').css({'display': 'flex'})
    })

    $('.modal__close').click(function() {
        $(this).closest('.modal').hide()
    })

    $('.modal').click(function(e) {
        if (e.target == this) {
            $(this).hide()
        }
    })

    $('.form-feedback').on('submit', function(e) {
        e.preventDefault()

        const form = $(this)

        const nameInp = form.find('input[name="name"]')
        const surnameInp = form.find('input[name="surname"]')
        const emailInp = form.find('input[name="email"]')
        const telInp = form.find('input[name="tel"]')

        form.find('.error-message').hide()

        let valid = true

        if (nameInp.val().length < 2) {
            let errorMessage = nameInp.next('.error-message')
            errorMessage.show()
            errorMessage.text('Поле "Имя" должно содержать не менее 2х символов.')
            valid = false
        }

        if (!nameInp.val().length) {
            let errorMessage = nameInp.next('.error-message')
            errorMessage.show()
            errorMessage.text('Поле "Имя" обязательно к заполнению')
            valid = false
        }

        if (!new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(emailInp.val())) {
            let errorMessage = emailInp.next('.error-message')
            errorMessage.show()
            errorMessage.text('Введите корректный адрес почты')
            valid = false
        }

        if (!emailInp.val().length) {
            let errorMessage = emailInp.next('.error-message')
            errorMessage.show()
            errorMessage.text('Поле "E-mail" обязательно к заполнению')
            valid = false
        }

        if (!new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).test(telInp.val())) {
            let errorMessage = telInp.next('.error-message')
            errorMessage.show()
            errorMessage.text('Введите корректный номер телефона')
            valid = false
        }

        if (!telInp.val().length) {
            let errorMessage = telInp.next('.error-message')
            errorMessage.show()
            errorMessage.text('Поле "Номер телефона" обязательно к заполнению')
            valid = false
        }

        if (valid) {
            alert('Отправка формы..')
            form.get(0).reset()
        }
    })


    $('.burger').click(function(e) {
        $(this).toggleClass('show')
        $('.header__nav').slideToggle(300)
    })

    $('.filter-button').click(function(e) {
        $('.filters').show()
        setTimeout(() => {
            $('.filters').addClass('show')
        }, 50)
    })

    $('.filters__close').click(function() {  
        $('.filters').removeClass('show')
        setTimeout(() => {
            $('.filters').hide()
        }, 300)
    })
})