// التحقق من حالة الدارك موود عند تحميل الصفحة
$(document).ready(function() {
    if (localStorage.getItem("darkMode") === "enabled") {
        $("body").addClass("dark");
        $("nav").addClass("navbardark").removeClass("navbar");
        $("select").addClass("selectdark").removeClass("selectwhite");
        $("button").addClass("btndark").removeClass("btnwhite");
        $(".change img").attr("src", "../imgs/sun.png");
    }
});

// تبديل الدارك موود عند الضغط على الزر
$(".change").on("click", function() {
    $("body, nav, select, button, hr, input, form, img").addClass("transition-enabled");
    $("body").toggleClass("dark");
    $("nav").toggleClass("navbar navbardark");
    $("select").toggleClass("selectwhite selectdark");
    $("button").toggleClass("btnwhite btndark");
    $(".change img").attr("src", function(index, attr) {
        return attr === "../imgs/sun.png" ? "../imgs/moon.png" : "../imgs/sun.png";
    });

    // حفظ حالة الدارك موود في localStorage
    if ($("body").hasClass("dark")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('menu-check');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('change', function() {
        if (this.checked) {
            navbar.classList.add('active'); // إضافة فئة active لإظهار القائمة
        } else {
            navbar.classList.remove('active'); // إزالة فئة active لإخفاء القائمة
        }
    });
});