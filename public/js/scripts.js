/*!
 * Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
 */
window.addEventListener('DOMContentLoaded', () => {
  let scrollPos = 0
  const mainNav = document.getElementById('mainNav')

  // mainNav가 null이 아닌지 확인
  if (mainNav) {
    const headerHeight = mainNav.clientHeight

    window.addEventListener('scroll', function () {
      const currentTop = document.body.getBoundingClientRect().top * -1

      if (currentTop < scrollPos) {
        // 스크롤을 위로 올릴 때
        if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
          mainNav.classList.add('is-visible')
        } else {
          console.log(123)
          mainNav.classList.remove('is-visible', 'is-fixed')
        }
      } else {
        // 스크롤을 아래로 내릴 때
        mainNav.classList.remove('is-visible')
        if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
          mainNav.classList.add('is-fixed')
        }
      }
      scrollPos = currentTop
    })
  } else {
    // console.error('mainNav 요소를 찾을 수 없습니다.')
    console.log('mainNav 요소를 찾을 수 없습니다.')
  }
})
