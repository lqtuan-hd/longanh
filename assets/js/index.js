"use strict";

AOS.init();

function f(n) {
  return n < 10 ? '0' + n : n;
}

var date = new Date("August 28, 2022 12:00:00");
if (window.location.href.indexOf("nhatrai") > -1) {
  date = new Date("September 04, 2022 12:00:00");
}

var timerId = countdown(date, function (ts) {
  var html = "\n        <li>\n            <span class=\"count\">".concat(ts.days || '0', "</span>\n            <span class=\"unit\">Ng\xE0y</span>\n        </li>\n        <li>\n            <span class=\"count\">").concat(f(ts.hours || '0'), "</span>\n            <span class=\"unit\">Gi\u1EDD</span>\n        </li>\n        <li>\n            <span class=\"count\">").concat(f(ts.minutes || '0'), "</span>\n            <span class=\"unit\">Ph\xFAt</span>\n        </li>\n        <li>\n            <span class=\"count\">").concat(f(ts.seconds || '0'), "</span>\n            <span class=\"unit\">Gi\xE2y</span>\n        </li>\n    ");
  document.getElementById("pageTimer").innerHTML = html;
}, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);

var getParams = function getParams(url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }

  return params;
};

var xungho = {
  "em": "Anh/Chị",
  "cháu": "Ông / bà",
  "mình": "Bạn"
};
var params = getParams(window.location.href);
var x = params.x;
var y = params.y;

if (x && y) {
  set(x, y);
  window.history.replaceState({}, document.title, "/");
} else {
  var x = Cookies.get('X');
  var y = Cookies.get('Y');

  if (x && y) {
    set(x, y);
  } else {
    $("#envelop").remove();
  }
}

function set(x, y) {
  $(".xung-ho").html(xungho[x]);
  $(".xung-ho-mine").html(x);
  $("#guest").html(y.replace(/\+/g, " "));
  Cookies.set('X', x);
  Cookies.set('Y', y);
}

$('.nav-main .nav-link').on('click', function () {
  var target = $(this).attr("href");
  if (target != "/") $('html, body').animate({
    scrollTop: $(target).offset().top - 30
  }, 500);
});