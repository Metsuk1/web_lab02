// Scroll Progress Bar Script
$(window).on("scroll", function () {
  let pageHeight = $(document).height() - $(window).height();
  let scrollValue = $(window).scrollTop();
  let scrollPercent = (scrollValue / pageHeight) * 100;
  $("#scroll-progress").css("width", scrollPercent + "%");
});

$(document).ready(function () {
  $('.stat-number').each(function () {
    let $this = $(this);
    let target = +$this.attr('data-target');
    let count = 0;

    let updateCounter = setInterval(() => {
      if (count < target) {
        count += Math.ceil(target / 100); // скорость
        $this.text(count);
      } else {
        $this.text(target);
        clearInterval(updateCounter);
      }
    }, 40);
  });
});