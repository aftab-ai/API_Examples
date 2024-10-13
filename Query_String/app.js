let url = "http://universities.hipolabs.com/search?name=";  // API link of university----------------
let btn = document.querySelector("button");
let ol = document.getElementById("list");

// Button click event-------------
btn.addEventListener("click", async () => {
    let country = document.querySelector(".inp").value;     // Take a input value as a search---------------
    let colArr = await getColleges(country);
    ol.classList.add("list");
    show(colArr);
});

// Result shows----------------
function show(colArr) {
    let list = document.querySelector("#list");
    list.innerText = "";

    for (col of colArr) {
        let li = document.createElement("li");              // Create a list element---------------
        li.innerText = col.name;                            // Added list text as a university name-----------
        li.classList.add("data");                           // Added class to the li element------------
        list.appendChild(li);
    }
}

// API + input serch---------------
async function getColleges(country) {                       // Calling API-----------------
    try {
        let res = await axios.get(url + country);
        return res.data;
    }   catch (e) {
        return [];
    }
}