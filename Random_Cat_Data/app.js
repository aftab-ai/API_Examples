let url = "https://catfact.ninja/fact";     // Random cat fact link.-----------------
let url2 = "https://api.thecatapi.com/v1/images/search";    // Radom cat image link.-----------------

let btn = document.querySelector(".btn");
let p = document.querySelector("#result");
let img = document.querySelector("#result2")
let div = document.getElementById("main");
let res1 = document.getElementById("result");
let res2 = document.getElementById("result2");

btn.addEventListener("click", async () => {
    div.classList.add("main");      // Class added to div.-----------------
    res1.classList.add("result");   // Class added to p.----------------
    res2.classList.add("result2");  // Class added to img.-------------------

    // Print cat fact.----------------
    let fact = await getFacts();
    p.innerHTML = fact;

    // Print cat image.-------------------
    let photo = await getImg();
    img.setAttribute("src", photo);
});

// Function for get random cat fact.-----------------
async function getFacts() {         
    try {
        let res = await axios.get(url);
        return res.data.fact;
    }   catch (e) {
        return "No fact found.";
    }
}

// Function for get random cat image.----------------
async function getImg() {
    try {
        let res = await axios.get(url2);
        return res.data[0].url;
    }   catch (e) {
        return "No img found";
    }
}