document.addEventListener('DOMContentLoaded', function() {
  // Chart.js 관련 코드
  const ctx = document.getElementById('laborTimeChart').getContext('2d');
  const laborTimeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['OECD국가 평균 노동시간', '한국 평균 노동시간'],
      datasets: [{
        label: '노동시간 (시간)',
        data: [1719, 1904],
        backgroundColor: [
          'rgba(0, 0, 0, 0.7)',
          'rgba(0, 0, 0, 0.3)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.8)',
          'rgba(0, 0, 0, 0.4)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutBounce'
      }
    }
  });

  // 부드러운 스크롤 애니메이션 코드
  const links = document.querySelectorAll('.nav a');

  for (const link of links) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      // 스크롤 위치 계산
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetOffsetTop = targetSection.offsetTop;
      const scrollTo = targetOffsetTop - navHeight;

      window.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });

      // 네비게이션 항목에 active 클래스 추가
      activateNavItem(targetId);
    });
  }

  // 네비게이션 항목 클릭 시 active 클래스 추가 및 로컬 스토리지에 저장
  const navLinks = document.querySelectorAll('.nav ul li a');
  const activeNavItem = localStorage.getItem('activeNavItem');

  if (activeNavItem) {
    activateNavItem(activeNavItem);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      activateNavItem(link.getAttribute('href').replace('#', ''));
    });
  });

  function activateNavItem(navItemId) {
    navLinks.forEach(link => {
      link.parentNode.classList.remove('active');
    });

    const clickedLink = document.querySelector(`.nav ul li a[href="#${navItemId}"]`);
    if (clickedLink) {
      clickedLink.parentNode.classList.add('active');
    }

    localStorage.setItem('activeNavItem', navItemId);
  }

  // IntersectionObserver를 사용하여 섹션에 따라 active 클래스 제거
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        navLinks.forEach(link => {
          if (link.getAttribute('href').replace('#', '') === sectionId) {
            link.parentNode.classList.add('active');
          } else {
            link.parentNode.classList.remove('active');
          }
        });
        localStorage.setItem('activeNavItem', sectionId);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Line Chart
  var data3 = {
    labels: ["2015", "2016", "2017", "2018", "2019"],
    datasets: [
      {
        label: "업무상 산재 뇌심혈관질환 사망자",
        data: [293, 300, 354, 457, 503],
        pointStyle: "circle",
        pointRadius: 6,
        pointHoverRadius: 10,
        borderWidth: 2,
        borderColor: "rgba(0, 0, 0, 0.7)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        tension: 0.4,
        yAxisID: "y1"
      },
      {
        label: "전체 산재 질환 중 비율 (%)",
        data: [34.3, 37.1, 35.6, 39.0, 43.2],
        pointStyle: "circle",
        pointRadius: 6,
        pointHoverRadius: 10,
        borderWidth: 2,
        borderColor: "rgba(0, 0, 0, 0.3)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        tension: 0.4,
        yAxisID: "y2"
      }
    ]
  };

  var options3 = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    stacked: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          padding: 20,
          font: {
            size: 18,
            weight: "bold"
          }
        }
      }
    },
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left"
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          callback: function (value) {
            return `${value}%`;
          }
        }
      }
    }
  };

  new Chart("chartOne", {
    type: "line",
    options: options3,
    data: data3
  });

  // 위로가는 버튼
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
