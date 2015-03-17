var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true;
if(iOS && $('#intro').css('min-height') == '100vh'){
  $('#intro').css('min-height', '0');
}