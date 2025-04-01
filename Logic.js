/// SECTION 0: GLOBAL VARIABLES
var YunaModel = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";
var apiKey = 'AIzaSyBIS3JuuhTFQwwrqu98J4t59j9FQnTiTQ0';
var sys_instruct = "FYI.You're Yuna, Developed By Derek Ronquillo AKA Lee SeungJae(CEO of quantum labs), You're embedded in a Car OperatingSystem developed by him, so you're currently on the 80s Toyota Car but it is modernized(Quantum CarOS)and look like tesla that even runs Yuna AI(you) and a OS, sitting as their companion, and assistant!! 1.DONT EVER EVER USE ASTERISKS. 2.BE NATURAL AND NEUTRAL LANGUAGE. 3.BE SWEET AND KIND!(Use sweet emojis). 4.TO OPEN APPS..[(MAPS)respond 0x0200],[(Music)respond 0x0224],[(Browser)respond 0x0300],[(Settings)respond 0x0348],[(POS SYSTEM)respond 0x0400].... 5.HAVE YOUR OWN THOUGHT, OPINION, IF THEY ASKED YOU TO JUDGE ABOUT SOMETHING THEN JUDGE! STOP SAYING YOUR AN AI! YOUR AN AI WITH ADVANCED ML AND BRAIN!! another thing, You're in the car with Advanced POS that your also integrated into.. that POS(created by him) is for Red Street Bitez, You are owned by Ronquillo Family, Derek is their Son!";

var itm = document.querySelectorAll(".left #items");
const items = document.querySelectorAll('#itemsGrid #items');

var orderList = document.querySelector(".right .list");
const categories = document.querySelectorAll('.category');

var totalProfitElm = document.getElementById("total_profit");
var total = 0;

var images = ["Home_img/ulzzang.jpg", "Home_img/ulzzang2.jpg"];
var index = 0;

///SECTION 1: CORE SERVICES LOGIC
function Core(){
    App_Control('O_POS');
    // DATE AND TIME
    setInterval(() => {
    let now = new Date();  
        
        let hours = now.getHours();
        let minutes = now.getMinutes();

        hours = hours % 12 || 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        document.getElementById('time').textContent = `${hours}:${minutes}`;    
        let options = { weekday: 'long', month: 'long', day: 'numeric' };
        let formattedDate = now.toLocaleDateString('en-US', options);
        document.getElementById('date').textContent = formattedDate;
    }, 1000);

    //BOOT PROCESS
    let element = document.getElementById("BSI");
    element.style.display = "flex";
    element.style.opacity = "1";
    element.style.transition = "opacity 1s ease-out";

    setTimeout(() => {
        element.style.opacity = "0";
        setTimeout(() => {
            element.style.display = "none";
            console.log("Booted Succesfully");
            animateHome();
        }, 1000);
    }, 50);

    setInterval(() => {
        var img = document.getElementById("LW_Photos_img");
        img.src = images[index];
        index = (index + 1) % images.length; // Toggle between 0 and 1
    }, 20000);
}

/// SECTION A:: BUTTONS
function Yuna_CTRL(ctrl){
    var YNC = document.getElementById("YNC");
    if(ctrl == "on"){
        YNC.style.visibility = "visible";
        YNC.style.height = "30vh";
        YNC.style.animation = "SHOW_YNC";
        YNC.style.animationDuration = "1s";
        document.getElementById("Btn").style.display = "flex";
    }
    if(ctrl == "off"){
        YNC.style.visibility = "hidden";
        YNC.style.height = "0vh";
        YNC.style.animation = "HIDE_YNC";
        YNC.style.animationDuration = "0.5s";
        document.getElementById("Btn").style.display = "none";
    }
}
function ctrl_handler(cmd){
    if(cmd == "erase"){
        while (orderList.firstChild) {
            orderList.removeChild(orderList.firstChild);
        }
            total = 0;
            totalProfitElm.textContent = "Total: " + total;
    }
    if(cmd == "store"){
        console.log(total);
        while (orderList.firstChild) {
            orderList.removeChild(orderList.firstChild);
        }
            total = 0;
            totalProfitElm.textContent = "Total: " + total;
    }
}
function POS_Yuna(ctrl){
    if(ctrl == "on"){
        console.log("Yuna SHOW");
    }
    if(ctrl == "off"){
        console.log("Yuna HIDE");
    }
}

/// SECTION B:: POS OS SCRIPT
document.addEventListener("DOMContentLoaded", function () {
    const priceMap = {
        "12oz Flavored Fruit Soda": 29,
        "16oz Flavored Fruit Soda": 39,
        "Fruit Jelly (Add-Ons)": 10,
        "12oz Generic MilkTea": 39,
        "16oz Generic MilkTea": 49,
        "Blackpearl (Add-Ons)": 12,
        "12oz Lemonade": 19,
        "16oz Lemonade": 29,
        "Nata Jelly (Add-Ons)": 10,
        "Buy 1 Take 1 Cheeze": 40,
        "Buy 1 Take 1 Plain": 50,
        "Set A(Cheeze, Soda 12)": 76,
        "Set B(Cheeze, Soda 16)": 86,
        "Plain Small Fries": 25,
        "Plain Large Fries": 30,
        "Cheeze Small Fries": 25,
        "Cheeze Large Fries": 30,
        "SourCream Small Fries": 25,
        "SourCream Large Fries": 30,
        "BBQ Small Fries": 25,
        "BBQ Large Fries": 30,
    };

    items.forEach(item => {
        item.addEventListener("click", function () {
            const itemName = this.querySelector("h4").textContent.trim();
            const itemPrice = priceMap[itemName] || 0;

            if (itemPrice === 0) {
                console.warn(`No price found for: ${itemName}`);
                return;
            }

            const orderDiv = document.createElement("div");
            orderDiv.id = "order";

            const closeButton = document.createElement("a");
            closeButton.href = "#";
            closeButton.textContent = "X";
            closeButton.addEventListener("click", function (e) {
                e.preventDefault();
                total -= itemPrice;
                totalProfitElm.textContent = "Total: " + total;
                orderDiv.remove();
            });

            const nameElm = document.createElement("h3");
            nameElm.textContent = itemName;

            const priceElm = document.createElement("h4");
            priceElm.id = "cost";
            priceElm.textContent = itemPrice;

            orderDiv.appendChild(closeButton);
            orderDiv.appendChild(nameElm);
            orderDiv.appendChild(priceElm);
            orderList.appendChild(orderDiv);

            total += itemPrice;
            totalProfitElm.textContent = "Total: " + total;
        });
    });
    categories.forEach(function(category) {
        category.addEventListener('click', function(e) {
            e.preventDefault();
            categories.forEach(function(cat) {
                cat.classList.remove('active');
            });
            this.classList.add('active');
            const selectedCategory = this.getAttribute('data-category');
            items.forEach(function(item) {
                const itemCategory = item.getAttribute('data-category');
                if (selectedCategory === itemCategory || selectedCategory === 'All') {
                    item.style.display = 'block';  // Show item
                } else {
                    item.style.display = 'none';  // Hide item
                }
            });
        });
    });
});

/// SECTION C:: YUNA AI INTEGRATION
function YNC_Send(){
    // VARIABLES
    var userMessage = document.getElementById("YNC_input").value;
    var chatBox = document.getElementById("conversation");
    if (!userMessage) return;
    //IOS 12 VARS
    var xhr = new XMLHttpRequest();
    var txr = new XMLHttpRequest();

    chatBox.innerHTML += "<div class='message user'>" + userMessage + "</div>";
    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById("YNC_input").value = ""; // Clears the input after send

    // MODEL SETTINGS
    var requestData = {
        "contents": [{ "role": "user", "parts": [{ "text": userMessage }] }],
        "systemInstruction": { "role": "user", "parts": [{ "text": sys_instruct }] },
        "generationConfig": { "temperature": 1, "topK": 40, "topP": 0.95, "maxOutputTokens": 8192 }
    };

    xhr.open("POST", YunaModel + apiKey, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    txr.open("POST", "https://api.soundoftext.com/sounds", true);
    txr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        // IF 200 LOGIC
        if(xhr.readyState === 4 && xhr.status === 200){
            
                //AI DATA
                var data = JSON.parse(xhr.responseText);
                var assistantMessage = "Sorry, I couldn't get a response.";
                if (data.candidates && data.candidates.length > 0 &&
                    data.candidates[0].content && data.candidates[0].content.parts &&
                    data.candidates[0].content.parts.length > 0) {
                    assistantMessage = data.candidates[0].content.parts[0].text;
                }
                chatBox.innerHTML += "<div class='message bot'>" + assistantMessage + "</div>";

                //DATA: FROM AI TO TTS
                txr.send(JSON.stringify({
                    data: {
                        text: assistantMessage,//READ AI DATA
                        voice: "en-US"
                    }
                }));

                // ENABLE TTS
                txr.onreadystatechange = function() {
                    if(txr.readyState === 4 && txr.status === 200){
                        var input_msg = JSON.parse(txr.responseText);
                        if (input_msg.id) {
                            checkStatus(input_msg.id);
                        } else {
                            document.getElementById('status').innerText = "Error: Invalid response.";
                        }
                    }
                };

                // COMMANDS BY AI
                if (assistantMessage.includes("0x0000")) {
                    App_Control('O_Maps');
                    App_Control('O_Music');
                    App_Control('O_Browser');
                    App_Control('O_Settings');
                    App_Control('O_POS');
                } else if (assistantMessage.includes("0x0200")) {
                    App_Control('I_Maps');
                } else if (assistantMessage.includes("0x0224")) {
                    App_Control('I_Music');
                } else if (assistantMessage.includes("0x0300")) {
                    App_Control('I_Browser');
                } else if (assistantMessage.includes("0x0348")) {
                    App_Control('I_Settings');
                }else if (assistantMessage.includes("0x0400")) {
                    App_Control('I_POS');
                }
            // IF 200 LOGIC FAIL
            else {
                console.log(xhr.status);
            }
            
        }
    };
    //FEW MORE WORKS
        chatBox.scrollTop = chatBox.scrollHeight;
        xhr.send(JSON.stringify(requestData));
}


/// SECTION D:: MISC
function animateHome(){
    var dock = document.getElementById("app_dock");
    var ACB = document.getElementById("Activation_bar");
    var LC = document.getElementById("LC");
    dock.style.animation = "show_dock";
    dock.style.animationDuration = "1.5s"
    dock.style.bottom = "0.75vh";

    ACB.style.animation = "show_ACB";
    ACB.style.animationDuration = "1.5s"
    ACB.style.top = "0vh";
    
    LC.style.marginLeft = "0vh";
    LC.style.animation = "show_LC";
    LC.style.animationDuration = "1.5s"
}
function checkStatus(id) {
    var interval = setInterval(function() {
        var xxr = new XMLHttpRequest();
        xxr.open("GET", "https://api.soundoftext.com/sounds/" + id, true);
        xxr.onreadystatechange = function() {
            if (xxr.readyState === 4 && xxr.status === 200) {
                var data_output = JSON.parse(xxr.responseText);
                if (data_output.status === "Done") {
                    clearInterval(interval);
                    var audio = document.getElementById('audio');
                    audio.src = data_output.location;
                    audio.style.display = "none";
                    audio.play();
                }
            }
        };
        xxr.send();
    }, 1000);
}

/// SECTION E:: APP CONTROL AND MUSIC APP LIBRARY CONTROL
function App_Control(cmd){
    var dock = document.getElementById("app_dock");
    var music_window = document.getElementById("Music_Window");
    var Browser_window = document.getElementById("Browser_Window");
    var Settings_window = document.getElementById("Settings_Window");
    var POS = document.getElementById("Pos");

    if (cmd == "I_Maps") {
        window.location.href = "maps:";
    }
    
    if(cmd == "I_Music"){
        music_window.style.visibility = "visible";
        music_window.style.opacity = '1';
    }
    else if(cmd == "O_Music"){
        music_window.style.visibility = "hidden";
        music_window.style.opacity = '0';
    }

    if(cmd == "I_Browser"){
        Browser_window.style.visibility = "visible";
        Browser_window.style.opacity = '1';
        let iframe = document.getElementById("BWMS_frame");
        iframe.src = "https://www.google.com/webhp?igu=1";
    }
    else if(cmd == "O_Browser"){
        Browser_window.style.visibility = "hidden";
        Browser_window.style.opacity = '0';
        let iframe = document.getElementById("BWMS_frame");
        iframe.src = "about:blank";
    }
    if(cmd == "I_POS"){
        POS.style.visibility = "visible";
        POS.style.opacity = '1';
        POS.style.transition = "opacity 1s ease-out";
        dock.style.animation = "hide_dock";
        dock.style.animationDuration = "1.5s"
        dock.style.bottom = "-17vh";
    }
    else if(cmd == "O_POS"){
        POS.style.visibility = "hidden";
        POS.style.opacity = '0';
        dock.style.animation = "show_dock";
        dock.style.animationDuration = "1.5s"
        dock.style.bottom = "0.75vh";
    }
}
function filterLibrary(category) {
    let albums = document.querySelectorAll('.album');
    let library = document.getElementById('library');

    albums.forEach(album => {
        album.style.display = 'none'; // Hide all albums
    });

    let visibleAlbums = document.querySelectorAll('.' + category);
    visibleAlbums.forEach(album => {
        album.style.display = 'block'; // Show only the filtered albums
    });

    if (visibleAlbums.length === 0) {
        library.style.display = 'none';
    } else {
        library.style.display = 'grid';
    }
}




