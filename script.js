// NOTE TO PROGRAMERS: 
/* you will notice some random {} in some sections these are to collapse 
that section to prioritize whatever code you are working on. They don't 
serve any functional use, only for better readability. */


window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    // =========
    // CONSTANTS
    // =========
    // url
    const url = window.location.href;

    //simulation text section
    const response = document.getElementById("response_txt");


    // ===========
    // SIMULATIONS
    //  (GENERAL)
    // ===========

    //pollution tracking vars
    let runoff = 0;
    let industrialWaste = 0;
    let oil = 0;
    let sewage = 0;

    //change simulation variables and update response text
    function increaseRunoff() {
        runoff++;
        response.innerText = "A rainstorm brings fertilizer and chemicals into the lake.";
        updateImages();
    }
    function increaseIndustrialWaste() {
        industrialWaste++;
        response.innerText = "A nearby factory funnels wastewater into the lake.";
        updateImages();
    }
    function increaseOil() {
        oil++;
        response.innerText = "A boat carrying oil capsizes in one of the lake's feeder waterways."
        updateImages();
    }
    function increaseSewage() {
        sewage++;
        response.innerText = "Non-flushable items are flushed into the sewer system, causing it to overflow into the lake."
        updateImages();
    }

    function decreaseRunoff() {
        if (runoff > 0) {
            runoff--;
            response.innerText = "People living near the lake plant rain gardens and use fertilizer more sparingly!";
        }
        else {
            response.innerText = "The lake has no untreated runoff water in it!";
        }
        updateImages();
    }
    function decreaseIndustrialWaste() {
        if (industrialWaste > 0) {
            industrialWaste--;
            response.innerText = "A nearby factory starts filtering and treating their water waste!"
        }
        else {
            response.innerText = "There's no industrial waste water in the lake!"
        }
        updateImages();
    }
    function decreaseOil() {
        if (oil > 0) {
            oil--;
            response.innerText = "Special absorbant materials are used to soak up the oil in the lake, and micro organisms are that can break down the oil are relased!"
        }
        else {
            response.innerText = "There's no oil or grease in the lake!"
        }
        updateImages();
    }
    function decreaseSewage() {
        if (sewage > 0) {
            sewage--;
            response.innerText = "Special equiptment is used to remove sewage from the lake, and oxygen is added to the lake to help bacteria that can break down the sewage grow!"
        }
        else {
            response.innerText = "There's no sewage in the lake!"
        }
        updateImages();
    }

    //update images
    function updateImages() {
        //get updated pollution total
        var pollutionTotal = runoff + industrialWaste + oil + sewage;

        //update images on underwater simulation
        if (url.endsWith("underwaterSimulation.html")) {
            //get images by id
            const UW_background = document.getElementById("UW_background");
            const fish1 = document.getElementById("fish1");
            const fish2 = document.getElementById("fish2");
            const fish3 = document.getElementById("fish3");

            //update images based on water quality
            if (pollutionTotal <= 3) {
                UW_background.src = "images/underwaterClean.png"
                fish1.src = "images/fish1Clean.png"
                fish2.src = "images/fish2Clean.png"
                fish3.src = "images/fish3Clean.png"
            }
            else if (pollutionTotal <= 6) {
                UW_background.src = "images/underwaterMedium.png"
                fish1.src = "images/fish1Medium.png"
                fish2.src = "images/fish2Medium.png"
                fish3.src = "images/fish3Medium.png"
            }
            else {
                UW_background.src = "images/underwaterDirty.png"
                fish1.src = "images/fish1Dirty.png"
                fish2.src = "images/fish2Dirty.png"
                fish3.src = "images/fish3Dirty.png"
            }
        }

        //update images for shore simulation
        else if (url.endsWith("lakeSimulation.html")) {
            //get updated pollution total
            var pollutionTotal = runoff + industrialWaste + oil + sewage;

            //get images by id
            const LS_background = document.getElementById("LS_background");
            const animals = document.getElementById("lakeAnimals");
            const duck = document.getElementById("duck");

            //update images based on water quality
            if (pollutionTotal <= 3) {
                LS_background.src = "images/lakeClean.png";
                animals.src = "images/animalsClean.png";
                duck.style.opacity = 1;
            }
            else if (pollutionTotal <= 6) {
                LS_background.src = "images/lakeMedium.png"
                animals.src = "images/animalsMedium.png"
                duck.style.opacity = 1;
            }
            else {
                LS_background.src = "images/lakeDirty.png";
                animals.src = "images/animalsDirty.png";
                duck.style.opacity = 0;
            }
        }
    }



    // ==========
    // UNDERWATER
    // SIMULATION
    // ==========

    if (url.endsWith("underwaterSimulation.html")) {
        //id constants
        const UW_P_runOffs = document.getElementById("UW-P-runOffs");
        const UW_P_industrialWaste = document.getElementById("UW-P-industrialWaste");
        const UW_P_oil = document.getElementById("UW-P-oilGrease");
        const UW_P_sewage = document.getElementById("UW-P-sewageWastewater");
        const UW_C_runOffs = document.getElementById("UW-C-runOffs");
        const UW_C_industrialWaste = document.getElementById("UW-C-industrialWaste");
        const UW_C_oil = document.getElementById("UW-C-oilGrease");
        const UW_C_sewage = document.getElementById("UW-C-sewageWastewater");
        const underwaterReset = document.getElementById("UW_reset");


        //================
        // UW Data Section
        //================

        // Constants for calculations
        const Rv = 0.3; // Example volumetric runoff coefficient
        const P = 0.9; // Precipitation in inches
        const A = 10; // Area in acres
        const industrialConcentration = 50; // Example pollutant concentration in mg/L
        const industrialVolume = 100; // Volume of wastewater discharged
        const receivingVolume = 1000; // Volume of the receiving water body
        const oilMeasured = 20; // Measured oil concentration in mg/L
        const MAC = 100; // Maximum allowable concentration for oil and grease
        const sewageFlushVolume = 1.6; // Single toilet flush in gallons

        let waterQuality = 100; // Starting water quality percentage

        // Function to calculate runoff impact
        function calculateRunoff() {
            return (Rv * P * A) / 12;
        }

        // Function to calculate industrial waste impact
        function calculateIndustrialWaste() {
            return (industrialConcentration * industrialVolume) / receivingVolume;
        }

        // Function to calculate oil/grease impact
        function calculateOilGrease() {
            return (oilMeasured / MAC) * 100;
        }

        // Function to calculate sewage impact
        function calculateSewage() {
            return sewageFlushVolume;
        }

        // Function to update water quality and display messages
        function updateWaterQuality(change, type, action) {
            waterQuality += change;
            waterQuality = Math.max(0, Math.min(100, waterQuality)); // Clamp between 0 and 100
            const responseText = action === "add" ? `You added ${type}.` : `You removed ${type}.`;
            document.getElementById("UW_Data_response_txt").innerText = responseText;
            document.querySelector(".simulationData h4").innerText = `Water Quality: ${waterQuality.toFixed(2)}`;
        }

        // Event listeners for buttons
        UW_P_runOffs.addEventListener("click", function () {
            const change = -calculateRunoff();
            updateWaterQuality(change, "runoff", "add");
            increaseRunoff();
        });

        UW_P_industrialWaste.addEventListener("click", function () {
            const change = -calculateIndustrialWaste();
            updateWaterQuality(change, "industrial waste", "add");
            increaseIndustrialWaste();
        });

        UW_P_oil.addEventListener("click", function () {
            const change = -calculateOilGrease();
            updateWaterQuality(change, "oil/grease", "add");
            increaseOil();
        });

        UW_P_sewage.addEventListener("click", function () {
            const change = -calculateSewage();
            updateWaterQuality(change, "sewage/wastewater", "add");
            increaseSewage();
        });

        UW_C_runOffs.addEventListener("click", function () {
            const change = calculateRunoff();
            updateWaterQuality(change, "runoff", "remove");
            decreaseRunoff();
        });

        UW_C_industrialWaste.addEventListener("click", function () {
            const change = calculateIndustrialWaste();
            updateWaterQuality(change, "industrial waste", "remove");
            decreaseIndustrialWaste();
        });

        UW_C_oil.addEventListener("click", function () {
            const change = calculateOilGrease();
            updateWaterQuality(change, "oil/grease", "remove");
            decreaseOil();
        });

        UW_C_sewage.addEventListener("click", function () {
            const change = calculateSewage();
            updateWaterQuality(change, "sewage/wastewater", "remove");
            decreaseSewage();
        });

        // Reset button
        underwaterReset.addEventListener("click", function () {
            //data
            waterQuality = 100;
            document.getElementById("UW_Data_response_txt").innerText = "";
            document.querySelector(".simulationData h4").innerText = "Water Quality: 100";
            //simulation
            runoff = 0;
            industrialWaste = 0;
            oil = 0;
            sewage = 0;
            response.innerText = "";
            updateImages();
        });

    }


    // ==========
    // LAKE SHORE
    // SIMULATION
    // ==========

    if (url.endsWith("lakeSimulation.html")) {

        //constants (ids)
        const LS_P_runOffs = document.getElementById("LS-P-runOffs");
        console.log(LS_P_runOffs);
        const LS_P_industrialWaste = document.getElementById("LS-P-industrialWaste");
        const LS_P_oil = document.getElementById("LS-P-oilGrease");
        const LS_P_sewage = document.getElementById("LS-P-sewageWastewater");
        const LS_C_runOffs = document.getElementById("LS-C-runOffs");
        const LS_C_industrialWaste = document.getElementById("LS-C-industrialWaste");
        const LS_C_oil = document.getElementById("LS-C-oilGrease");
        const LS_C_sewage = document.getElementById("LS-C-sewageWastewater");
        const shoreReset = document.getElementById("LS_reset");

        //================
        // LS Data Section
        //================

        // Constants for calculations
        const Rv = 0.3; // Example volumetric runoff coefficient
        const P = 0.9; // Precipitation in inches
        const A = 10; // Area in acres
        const industrialConcentration = 50; // Example pollutant concentration in mg/L
        const industrialVolume = 100; // Volume of wastewater discharged
        const receivingVolume = 1000; // Volume of the receiving water body
        const oilMeasured = 20; // Measured oil concentration in mg/L
        const MAC = 100; // Maximum allowable concentration for oil and grease
        const sewageFlushVolume = 1.6; // Single toilet flush in gallons

        let waterQuality = 100; // Starting water quality percentage

        // Function to calculate runoff impact
        function calculateRunoff() {
            return (Rv * P * A) / 12;
        }

        // Function to calculate industrial waste impact
        function calculateIndustrialWaste() {
            return (industrialConcentration * industrialVolume) / receivingVolume;
        }

        // Function to calculate oil/grease impact
        function calculateOilGrease() {
            return (oilMeasured / MAC) * 100;
        }

        // Function to calculate sewage impact
        function calculateSewage() {
            return sewageFlushVolume;
        }

        // Function to update water quality and display messages
        function updateWaterQuality(change, type, action) {
            waterQuality += change;
            waterQuality = Math.max(0, Math.min(100, waterQuality)); // Clamp between 0 and 100
            const responseText = action === "add" ? `You added ${type}.` : `You removed ${type}.`;
            document.getElementById("LS_Data_response_txt").innerText = responseText;
            document.querySelector(".simulationData h4").innerText = `Water Quality: ${waterQuality.toFixed(2)}`;
        }

        // Event listeners for buttons
        LS_P_runOffs.addEventListener("click", function () {
            const change = -calculateRunoff();
            updateWaterQuality(change, "runoff", "add");
            increaseRunoff();
        });

        LS_P_industrialWaste.addEventListener("click", function () {
            const change = -calculateIndustrialWaste();
            updateWaterQuality(change, "industrial waste", "add");
            increaseIndustrialWaste();
        });

        LS_P_oil.addEventListener("click", function () {
            const change = -calculateOilGrease();
            updateWaterQuality(change, "oil/grease", "add");
            increaseOil();
        });

        LS_P_sewage.addEventListener("click", function () {
            const change = -calculateSewage();
            updateWaterQuality(change, "sewage/wastewater", "add");
            increaseSewage();
        });

        LS_C_runOffs.addEventListener("click", function () {
            const change = calculateRunoff();
            updateWaterQuality(change, "runoff", "remove");
            decreaseRunoff();
        });

        LS_C_industrialWaste.addEventListener("click", function () {
            const change = calculateIndustrialWaste();
            updateWaterQuality(change, "industrial waste", "remove");
            decreaseIndustrialWaste();
        });

        LS_C_oil.addEventListener("click", function () {
            const change = calculateOilGrease();
            updateWaterQuality(change, "oil/grease", "remove");
            decreaseOil();
        });

        LS_C_sewage.addEventListener("click", function () {
            const change = calculateSewage();
            updateWaterQuality(change, "sewage/wastewater", "remove");
            decreaseSewage();
        });

        // Reset button
        shoreReset.addEventListener("click", function () {
            //data
            waterQuality = 100;
            document.getElementById("LS_Data_response_txt").innerText = "";
            document.querySelector(".simulationData h4").innerText = "Water Quality: 100";
            //simulation
            runoff = 0;
            industrialWaste = 0;
            oil = 0;
            sewage = 0;
            response.innerText = "";
            updateImages();
        });

    }


    // ====
    // JSON
    // ====
    {
        // data
        // random fact + json buttons
        const P_runOffs = document.getElementsByClassName("runOffs")[0];
        const C_runOffs = document.getElementsByClassName("runOffs")[1];
        const P_industrialWaste = document.getElementsByClassName("industrialWaste")[0];
        const C_industrialWaste = document.getElementsByClassName("industrialWaste")[1];
        
        const P_oilGrease = document.getElementsByClassName("oilGrease")[0];
        const C_oilGrease = document.getElementsByClassName("oilGrease")[1];
        const P_sewageWastewater = document.getElementsByClassName("sewageWastewater")[0];
        const C_sewageWastewater = document.getElementsByClassName("sewageWastewater")[1];


        const factSection = document.getElementsByClassName("factSection")[0];

        let randomFactData = {};

        // fetch JSON
        fetch("randomFact.json")
            .then(response => response.json()) // parse if successful fetch json
            .then(data => { randomFactData = data; })// store data as var
            .catch(error => console.error("Bruhhhh...... stop messing around"));

        // random fact func
        function replaceHTMLfact(fact) {
            const factTxt = `
                <h2>Freshwater Fact:</h2>
                <p id="factTxt">${fact.fact}</p>
                <p id="source">Source: <a href="${fact.link}">${fact.source}</a></p>
                `;
            factSection.innerHTML = factTxt;
        }

        function getRandomFact(factType) {
            const r = Math.floor(Math.random() * factType.length);
            const fact = factType[r];

            replaceHTMLfact(fact);
        }

        function randomrunOffsFact() {
            getRandomFact(randomFactData.RunoffFacts)
            // console.log("Button Pressed")
        }

        function randomIndustrialWasteFact() {
            getRandomFact(randomFactData.IndustrialWasteFacts)
        }

        function randomOilGreaseFact() {
            getRandomFact(randomFactData.OilGreaseFacts)
        }

        function randomSewageWasteFact() {
            getRandomFact(randomFactData.SewageWasteWaterFacts)
        }

        

        // event listener for when button is pressed
        P_runOffs.addEventListener("click", randomrunOffsFact)
        C_runOffs.addEventListener("click", randomrunOffsFact)
        P_industrialWaste.addEventListener("click", randomIndustrialWasteFact)
        C_industrialWaste.addEventListener("click", randomIndustrialWasteFact)

        P_oilGrease.addEventListener("click", randomOilGreaseFact)
        C_oilGrease.addEventListener("click", randomOilGreaseFact)
        P_sewageWastewater.addEventListener("click", randomSewageWasteFact)
        C_sewageWastewater.addEventListener("click", randomSewageWasteFact)

    }
}

// ===========
// Home Page
// ===========
// Generate Bubbles Dynamically
const bubbleContainer = document.getElementById("bubble-container");

for (let i = 0; i < 50; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    bubble.style.animationDuration = `${5 + Math.random() * 10}s`;
    bubble.style.width = `${10 + Math.random() * 30}px`;
    bubble.style.height = bubble.style.width;
    bubbleContainer.appendChild(bubble);
}