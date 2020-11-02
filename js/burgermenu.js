const menu = document.body.querySelector(".menu"),
      burger = document.body.querySelector(".burgermenu"),
      burgermenu = document.body.querySelector(".burgermenu__block"),
      burgerClose = document.body.querySelector(".menu__exit"),
      active = "active";

burgermenu.onclick = function(event){
    menu.classList.toggle(active);
    document.body.classList.toggle("modalActive");
}
burgerClose.onclick = function(event){
    menu.classList.remove(active);
    document.body.classList.remove("modalActive");
}

let navItems = Array.from(document.body.querySelectorAll("[data-relocate]"));

if(navItems.length >= 1 && window.innerWidth <= 565){
    relocate(navItems);
}

function relocate(items){
    itemsSorted = items.sort((cur, next) => {
        let curN = cur.dataset.relocate.split(",")[1].trim();
        let nextN = next.dataset.relocate.split(",")[1].trim();

        curN = curN ? curN : 1;
        nextN = nextN ? nextN : 1;

        if(curN < nextN){
            return -1;
        } else if(curN > nextN){
            return 1;
        } else {
            return 0;
        }
    });

    for(let element of itemsSorted){
        let place = element.dataset.relocate.split(",")[0].trim();

        document.body.querySelector(place).append(element);
    }
}