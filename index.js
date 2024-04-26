// import "styles.css";

const menuLinks = [
    { text: 'about', href: '/about' },
    {
        text: 'catalog', href: '#', subLinks: [
            { text: 'all', href: '/catalog/all' },
            { text: 'top selling', href: '/catalog/top' },
            { text: 'search', href: '/catalog/search' },
        ]
    },
    {
        text: 'orders', href: '#', subLinks: [
            { text: 'new', href: '/orders/new' },
            { text: 'pending', href: '/orders/pending' },
            { text: 'history', href: '/orders/history' },
        ]
    },
    {
        text: 'account', href: '#', subLinks: [
            { text: 'profile', href: '/account/profile' },
            { text: 'sign out', href: '/account/signout' },
        ]
    },
];

// Part 1
const mainEl = document.querySelector("main");
mainEl.style.setProperty("backGroundColor", "--main-bg");

mainEl.style.backgroundColor = "var(--main-bg)";

mainEl.innerHTML = "<h1>DOM Manipulation</h1>";

mainEl.classList.add("flex-ctr");

// Part 2
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.setProperty("height", "100%");
topMenuEl.style.setProperty("background-color", "var(--top-menu-bg)");
topMenuEl.classList.add("flex-around");

// Part 3
menuLinks.forEach((link) => {
    const a = document.createElement("a");
    a.setAttribute("href", link.href);
    a.textContent = link.text;
    topMenuEl.appendChild(a);
});

// Adding Interactivity

// DOM Manipulation Part Two
// Part 3: Creating the Submenu

const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");

subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// Part 4 & 5:
let oldEventTarget = "";

const topMenuLinks = topMenuEl.querySelectorAll("a");

topMenuEl.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.localName !== 'a') {
        return;
    }
    topMenuLinks.forEach((element) => {
        if (element !== event.target) {
            element.classList.remove("active");
        }
    })

    for (i = 0; i < menuLinks.length; i++) {
        if (oldEventTarget === event.target) {
            subMenuEl.style.top = "0%";
            oldEventTarget = "";
            break;
        }
        if (menuLinks[i].text === event.target.textContent && menuLinks[i].subLinks) {
            subMenuEl.style.top = "100%";
            buildSubmenu(menuLinks[i].subLinks)
            oldEventTarget = event.target
            break;
        } else {
            subMenuEl.style.setProperty("top", "0%");
            mainEl.innerHTML = `<h1>${event.target.textContent}<h1>`
        }
    }
    event.target.classList.toggle("active");
})

function buildSubmenu (subLinkArr) {
    subMenuEl.textContent = "";

    subLinkArr.forEach((link) => {
       const aEl = document.createElement("a");
       aEl.setAttribute("href", link.href);
       aEl.textContent = link.text;
       subMenuEl.appendChild(aEl);
       
    })

}

subMenuEl.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.localName !== 'a') {
        return;
    }
    subMenuEl.style.setProperty("top", "0%")
    topMenuLinks.forEach((element) => {
            element.classList.remove("active");
    })
    mainEl.innerHTML = `<h1>${event.target.textContent}<h1>`;
})






