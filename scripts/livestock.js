const livestockDropdownData = {

    // 1. LIVESTOCK TYPES (Now separated!)
    types: [
        { id: "chicken", name: "Chicken" },
        { id: "turkey", name: "Turkey" },
        { id: "guinea_fowl", name: "Guinea Fowl" },
        { id: "duck", name: "Duck" },
        { id: "goat", name: "Goat" },
        { id: "sheep", name: "Sheep" },
        { id: "cattle", name: "Cattle (Cow/Buffalo)" }
    ],

    // 2. BREEDS (Now matched to the specific IDs above)
    breeds: {
        chicken: [
            { id: "aseel", name: "Aseel (Fighter/Country)" },
            { id: "shamo", name: "Shamo (Parrot Beak)" },
            { id: "kadaknath", name: "Kadaknath (Black Meat)" },
            { id: "vanaraja", name: "Vanaraja (Dual Purpose)" },
            { id: "broiler", name: "Commercial Broiler (Cobb/Ross)" },
            { id: "layer", name: "Commercial Layer (BV 300)" },
            { id: "desi", name: "Desi / Country Chicken" }
        ],
        
        turkey: [
            { id: "turkey_bronze", name: "Broad Breasted Bronze" },
            { id: "turkey_white", name: "Broad Breasted White" },
            { id: "turkey_desi", name: "Desi / Local Turkey" },
            { id: "turkey_nandanam", name: "Nandanam (Research Variety)" }
        ],

        guinea_fowl: [
            { id: "guinea_pearl", name: "Pearl (Grey Spot - Common)" },
            { id: "guinea_white", name: "White Guinea Fowl" },
            { id: "guinea_lavender", name: "Lavender Guinea Fowl" }
        ],

        duck: [
            { id: "duck_khaki", name: "Khaki Campbell (Egg Layer)" },
            { id: "duck_pekin", name: "White Pekin (Meat)" },
            { id: "duck_muscovy", name: "Muscovy" },
            { id: "duck_desi", name: "Indian Runner / Desi" }
        ],

        goat: [
            { id: "osmanabadi", name: "Osmanabadi" },
            { id: "jamunapari", name: "Jamunapari" },
            { id: "boer", name: "Boer (Meat)" },
            { id: "sirohi", name: "Sirohi" },
            { id: "black_bengal", name: "Black Bengal" }
        ],

        sheep: [
            { id: "nellore", name: "Nellore Brown" },
            { id: "deccani", name: "Deccani" },
            { id: "madras_red", name: "Madras Red" }
        ],

        cattle: [
            { id: "jersey", name: "Jersey" },
            { id: "hf", name: "Holstein Friesian" },
            { id: "murrah", name: "Murrah Buffalo" },
            { id: "sahiwal", name: "Sahiwal" },
            { id: "gir", name: "Gir" }
        ]
    },

    // 3. PURPOSE (Remains standard)
    purposes: [
        { id: "meat", name: "Meat (Broiler/Culling)" },
        { id: "eggs", name: "Eggs (Layer)" },
        { id: "breeding", name: "Breeding Stock (Parent)" },
        { id: "fighting", name: "Ornamental / Show Quality" },
        { id: "milk", name: "Milk Production" }, // Added for Cattle/Goats
        { id: "dual", name: "Dual Purpose" }
    ],

    // 4. SOURCES
    sources: [
        { id: "hatchery", name: "Commercial Hatchery" },
        { id: "home_hatched", name: "Home Hatched (Incubator)" },
        { id: "market", name: "Local Market / Santhe" },
        { id: "breeder", name: "Private Breeder" }
    ],

    // 5. STATUS
    status: [
        { id: "active", name: "Active (On Farm)" },
        { id: "quarantine", name: "Quarantine (New Arrival)" },
        { id: "sold", name: "Sold Out" },
        { id: "consumed", name: "Consumed / Culled" },
        { id: "mortality", name: "Died (Mortality)" }
    ]
};

populateLiveStockType();
function populateLiveStockType(){
    let str = '<option selected>Open this select menu</option>';
    livestockDropdownData['types'].forEach(function(type){
        str+= `<option value=${type.id}>${type.name}</option>`;
    });
    document.getElementById('livestock-type').innerHTML = str;
}

function populateBreed(){
    let stockType = document.getElementById('livestock-type').value;
    let str = '<option selected>Open this select menu</option>';
    livestockDropdownData['breeds'][stockType].forEach(function(breed){
        str+= `<option value=${breed.id}>${breed.name}</option>`;
    });
    document.getElementById('livestock-breed').innerHTML = str;
}

populatePurpose();

function populatePurpose(){
    let str = '<option selected>Open this select menu</option>';
    livestockDropdownData['purposes'].forEach(function(purpose){
        str+= `<option value=${purpose.id}>${purpose.name}</option>`;
    });
    document.getElementById('primary-purpose').innerHTML = str;
}

populateSources();

function populateSources(){
    let str = '<option selected>Open this select menu</option>';
    livestockDropdownData['sources'].forEach(function(source){
        str+= `<option value=${source.id}>${source.name}</option>`;
    });
    document.getElementById('source').innerHTML = str;
}


function calculateCurrentAge(){
    let purchaseDate = new Date(document.getElementById("purchase-date").value);
    let currentTimeStamp = new Date();
    document.getElementById("livestock-age").value = Math.floor((currentTimeStamp - purchaseDate)/(1000*60*60*24*7));
}

async function saveLiveStockLog(){
    let requestBody = {
        userID: JSON.parse(localStorage.getItem("farmer"))['id'],
        blockName: document.getElementById('block-name').value,
        livestockType: document.getElementById('livestock-type').value,
        livestockBreed: document.getElementById('livestock-breed').value,
        initialCount: document.getElementById('initial-count').value,
        purchaseDate: document.getElementById('purchase-date').value,
        livestockBreed: document.getElementById('livestock-breed').value,
        primaryPurpose: document.getElementById('primary-purpose').value,
        source: document.getElementById('source').value,
        notes: document.getElementById('notes').value
    };
    let requestBodyStr = JSON.stringify(requestBody);
    console.log(requestBody);
    try{
        let response = await fetch("http://localhost:4000/livestockLog",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:requestBodyStr
        });
        let parsedresponse = await response.json();
        location.reload();
    }catch(error){
        console.log(error);
    }
}