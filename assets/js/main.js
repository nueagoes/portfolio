/********** lenis **********/
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 500); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

//lenis ScrollTo
document.querySelectorAll('.go-intro').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        lenis.scrollTo(document.querySelector('.sc-intro'))
    })
})

document.querySelectorAll('.go-about').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        lenis.scrollTo(document.querySelector('.sc-about'))
    })
})

document.querySelectorAll('.go-works').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        lenis.scrollTo(document.querySelector('.sc-works'))
    })
})

document.querySelectorAll('.go-design').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
  
      const target = document.querySelector('.sc-design')
      const top = target.offsetTop
      const height = target.offsetHeight
  
      const destination = top + height / 2
  
      lenis.scrollTo(destination)
    })
  })
  
  
document.querySelectorAll('.go-contact').forEach((btn) => {
btn.addEventListener('click', (e) => {
        e.preventDefault()
        lenis.scrollTo(document.querySelector('#footer'))
    })
})


let mm = gsap.matchMedia();

// 공통
mm.add("all", () => {

    /********** loading **********/
    const loadingTl = gsap.timeline({
        onComplete: function(){
            $('body').addClass('loading-end');
            headerTl.play();
        }
    })
    .fromTo('.loading .logo path', {
        strokeDasharray: 3530,
        strokeDashoffset: 3530,
    }, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.out"
    })
    .fromTo('.loading .logo path', {
        fill: 'rgba(255,255,255,0)',
    }, {
        fill: 'rgba(255,255,255,1)',
        duration: 0.3,
        ease: "power2.out"
    });


    /********** header **********/ 
    // slideDown
    const headerTl = gsap.timeline({
        paused: true,
        onComplete: function(){
            introTl.play();
        }
    })
    .fromTo('#header',{
        yPercent: -100,
    },{
        yPercent: 0,
    })

    // time
    const time = $('#header .util-area .time span')
    setInterval(()=>{
        let now = new Date();
        let hour = now.getHours().toString().padStart(2,'0');
        let min = now.getMinutes().toString().padStart(2,'0');

        time[0].innerText = hour;
        time[1].innerText = min;
    }, 1000)



    //mobile-menu
    $('#header .menu-btn').click(function(){
        $(this).toggleClass('on');
        $('#header .mobile-menu-pop').toggleClass('on');
        $('body').toggleClass('scroll-none');
    })

    $('.mobile-menu-pop .menu-item a').click(function(){
        $('.mobile-menu-pop').removeClass('on');
        $('#header .menu-btn').removeClass('on');
    })



    /********** sc-intro **********/
    const introTl = gsap.timeline({
        paused: true,
    })
    .to('.sc-intro .line .text', {
        transform: 'translateY(0)',
        stagger: 0.2,
    },'text')
    .to('.sc-intro .line i', {
        clipPath: 'inset(0 0 0 0)',
    },'text+=0.2')
    .to('.sc-intro .nav-area', {
        autoAlpha: 1,
        duration: 0.5,
    })



    /********** sc-about **********/

    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.sc-about',
            start: '0% 80%',
        }
    })
    .to('.sc-about .group-right .title',{
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
    })
    .to('.sc-about .group-right .desc',{
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
    })

    // 콘텐츠만큼의 높이 설정 함수
    function setContentHeight() {
        const $about = $('.sc-about');
        const $sticky = $('.sc-about > .sticky');
        const $inner = $sticky.find('.sticky-inner');

        const innerHeight = $inner.outerHeight();

        // sc-about 높이 설정
        $about.height(innerHeight * 2);
        $sticky.height(innerHeight);

        // sc-works 위로 올리기
        $('.sc-works').css('margin-top', `-${innerHeight}px`);
    }

    // 콘텐츠만큼의 높이 설정 - 문서 로드 시 바로 실행
    $(document).ready(function() {
    setContentHeight();
    });

    // 콘텐츠만큼의 높이 설정 - 창 크기가 바뀔 때마다 다시 실행
    $(window).on('resize', function() {
    setContentHeight();
    });
  




      /********** sc-works **********/
    // thumb-box hover 비디오
    $('.sc-works .work-item .thumb-box').hover(function(){
        const video = $(this).find('video').get(0);
        if (video) {
        video.pause();
        video.currentTime = 0; 
        video.play(); 
        }
    });




    /********** sc-design **********/
    const designSwiper = new Swiper('.sc-design .swiper',{
        slidesPerView: 'auto',
        spaceBetween: 20,
        breakpoints: {
            767: {
              spaceBetween: 40,
            },
          },
        
    })

    // 콘텐츠만큼의 높이 설정 함수
    function setDesignHeight() {
        const $design = $('.sc-design');
        const $sticky2 = $('.sc-design .sticky');
        const $inner2 = $sticky2.find('.sticky-inner');
      
        const innerHeight2 = $inner2.outerHeight();
      
        // sc-design 높이 설정 (내부 콘텐츠 높이의 두 배)
        $design.height(innerHeight2 * 2);
        // sticky의 높이 설정
        $sticky2.height(innerHeight2);
      
        // sc-design의 margin-top을 내부 콘텐츠 높이만큼 음수 값으로 설정
        $('.sc-design').css('margin-top', `-${innerHeight2}px`);
      }
      
      // 콘텐츠만큼의 높이 설정 함수 - 문서 로드 시 실행
      $(document).ready(function() {
        setDesignHeight();
      });
      
      // 콘텐츠만큼의 높이 설정 함수 - 창의 크기가 변경될 때마다 실행 (resize 이벤트 바인딩)
      $(window).on('resize', function() {
        setDesignHeight();
      });
      


    /********** design-modal **********/
    let scrollPos = 0;

    // 모달 열기
    $('.sc-design .work-item .thumb').on('click', function(e){
        e.preventDefault();

        // 현재 스크롤 위치 저장
        scrollPos = $(window).scrollTop();

        // body 고정 (스크롤 차단)
        $('body').css({
            position: 'fixed',
            top: `-${scrollPos}px`,
            width: '100%'
        });

        // 모달 표시
        $('.design-modal, .modal-overlay').fadeIn(200);
        let designSrc = $(this).find('img').attr('data-num');
        $('.design-modal .modal-img').attr('src','./assets/images/' + designSrc + '.png');
        $('.design-modal').scrollTop(0);
    });

    // 모달 닫기
    function closeModal(){
    $('.modal-overlay, .design-modal').fadeOut(200, function(){
        // body 고정 해제 + 스크롤 복원
        $('body').css({
        position: '',
        top: '',
        width: ''
        });
        window.scrollTo(0, scrollPos);
    });
    }

    $('.modal-overlay, .design-modal .close').on('click', closeModal);
    $(document).on('keyup', function(e){
    if (e.key === 'Escape') closeModal();
    });

    // 모달 내부에서만 스크롤 허용
    $('.design-modal').on('wheel touchmove', function(e){
    e.stopPropagation();
    });



    /********** footer **********/
    //탑버튼
    $('#footer .btn-top').click(function(){
        window.scrollTo({top:0, behavior: 'smooth'});
    })



});






// 768 이상
mm.add("(min-width: 768px)", () => {


  /********** sc-works **********/
    // hover시 나머지 work-item dimmed
    $('.sc-works .work-item').hover(function(){
        $('.sc-works .work-item').not(this).addClass('dimmed');
    }, function(){
        $('.sc-works .work-item').removeClass('dimmed');
    })

    $('.sc-works .work-item .thumb-box').hover(function(){
        $(this).addClass('on');
        $('.work-cursor').addClass('on');
    }, function(){
        $(this).removeClass('on');
        $('.work-cursor').removeClass('on');
    })

    //hover시 마우스효과
    $(window).mousemove(function(e){
        x= e.clientX;
        y= e.clientY;

        gsap.to('.work-cursor',{
            x:x,
            y:y,
            duration: 0.05,
            ease: 'none'
        })
    })


    //bottom-marquee 영역에서 header 없어지기
    const headerUp = gsap.timeline ({
        scrollTrigger: {
            trigger: '.bottom-marquee',
            start: '100% 100%',
            // toggleActions: 'play none none reverse'
            onEnter: () => {
                gsap.to('#header', { yPercent: -100, duration: 0.3 });
            },
            onLeaveBack: () => {
            gsap.to('#header', { yPercent: 0, duration: 0.3 });
            }
        }
    })


});






// 767 이하
mm.add("(max-width: 767px)", () => {
});


/*****.loading 제어*****/
//  로딩화면 노출 여부 체크
const isResizeReload = sessionStorage.getItem("resizeReload");

// 리사이즈 새로고침이 아니면 로딩화면 보여줌
if (!isResizeReload) {
  document.querySelector(".loading").style.display = "block";
} else {
  // 리사이즈로 인한 새로고침이면 로딩화면 건너뜀
  document.querySelector(".loading").style.display = "none";

  // 플래그 초기화
  sessionStorage.removeItem("resizeReload");
}




let initialWidth = window.innerWidth;

window.addEventListener('resize', function() {
  const newWidth = window.innerWidth;
  
  // 767 경계선을 넘을 때만 새로고침
  if (
    (initialWidth >= 768 && newWidth < 768) ||
    (initialWidth < 768 && newWidth >= 768)
  ) {
    sessionStorage.setItem("resizeReload", "true");
    window.location.reload();
  }


  /***** header 스크롤 효과 *****/
    let lastScroll = 0;

    $(window).scroll(function(){
        curr = $(this).scrollTop(); 
    
        if (curr > lastScroll) {
            $('#header').addClass('hide')
        }else {
            $('#header').removeClass('hide')
        }
    
        lastScroll = curr;

    });


});