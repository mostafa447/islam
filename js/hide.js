// الحصول على جميع العناصر التي تحتوي على القائمة المنسدلة والأيقونة
const dropdownLinks = document.querySelectorAll(".services");

dropdownLinks.forEach(link => {
    const dropdown = link.querySelector(".drop-down");
    const icon = link.querySelector(".dropdown-icon");

    if (dropdown && icon) {
        link.addEventListener("click", (event) => {
            event.stopPropagation(); // منع الحدث من الفقاعة

            // إظهار/إخفاء القائمة عند النقر على العنصر
            const isVisible = dropdown.classList.contains("visible");
            closeAllDropdowns(); // إغلاق جميع القوائم الأخرى أولاً

            if (!isVisible) {
                dropdown.classList.add("visible");
                icon.classList.add("rotated");
            }
        });
    }
});

// إغلاق جميع القوائم المنسدلة
function closeAllDropdowns() {
    dropdownLinks.forEach(link => {
        const dropdown = link.querySelector(".drop-down");
        const icon = link.querySelector(".dropdown-icon");
        dropdown.classList.remove("visible");
        icon.classList.remove("rotated");
    });
}

// إغلاق القوائم المنسدلة عند النقر خارجها
document.addEventListener("click", (event) => {
    closeAllDropdowns(); // إغلاق جميع القوائم عند النقر على أي مكان خارجها
});
