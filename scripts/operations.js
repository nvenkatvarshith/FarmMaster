let plantations = [];
const activityMasterList = {
    // 1. PLANTATION & CROPS (For Mango, Lemon, Paddy, etc.)
    plantation: [
        { id: "p1", name: "Land Preparation", type: "Soil" }, // Ploughing, Rotovator
        { id: "p2", name: "Sowing / Planting", type: "Planting" },
        { id: "p3", name: "Fertilizer Application (Soil)", type: "Nutrition" }, // NPK, DAP
        { id: "p4", name: "Foliar Spray (Nutrients)", type: "Nutrition" }, // Spraying on leaves
        { id: "p5", name: "Pesticide Spraying", type: "Protection" }, // For bugs
        { id: "p6", name: "Fungicide Application", type: "Protection" }, // For diseases
        { id: "p7", name: "Irrigation / Watering", type: "Water" },
        { id: "p8", name: "Manual Weeding", type: "Maintenance" },
        { id: "p9", name: "Pruning / Cutting", type: "Maintenance" }, // Important for Mango/Lemon
        { id: "p10", name: "Harvesting / Picking", type: "Harvest" }
    ],

    // 2. LIVESTOCK & POULTRY (For Aseel, Shamo, Layers)
    livestock: [
        { id: "l1", name: "Feeding", type: "Routine" },
        { id: "l2", name: "Vaccination", type: "Health" }, // Lasota, Gumboro
        { id: "l3", name: "Deworming", type: "Health" },
        { id: "l4", name: "Vitamin/Supplement Dosing", type: "Health" }, // Vimeral, etc.
        { id: "l5", name: "Litter Raking / Cleaning", type: "Hygiene" },
        { id: "l6", name: "Egg Collection", type: "Production" },
        { id: "l7", name: "Body Weight Check", type: "Monitoring" },
        { id: "l8", name: "Mortality (Death Record)", type: "Loss" },
        { id: "l9", name: "Bird Sale / Culling", type: "Sales" }
    ],

    // 3. INFRASTRUCTURE & GENERAL (For Fencing, Motors)
    general: [
        { id: "g1", name: "Motor/Pump Repair", type: "Repair" },
        { id: "g2", name: "Pipeline Maintenance", type: "Repair" },
        { id: "g3", name: "Fencing Work", type: "Construction" },
        { id: "g4", name: "Tractor Rental/Usage", type: "Machinery" },
        { id: "g5", name: "Pit Digging", type: "Labour" }
    ]
};

const applicationMethods = {

    // 1. PLANTATION (For Fertilizers & Pesticides)
    plantation: [
        { id: "m1", name: "Foliar Spray", desc: "Sprayed on leaves (Pump)" },
        { id: "m2", name: "Soil Drenching", desc: "Poured at root zone" },
        { id: "m3", name: "Fertigation (Drip)", desc: "Sent through Drip system" },
        { id: "m4", name: "Soil Application (Ring)", desc: "Dug around plant and covered" },
        { id: "m5", name: "Broadcasting", desc: "Scattered by hand (Paddy/Urea)" },
        { id: "m6", name: "Stem Injection", desc: "Injected into trunk (Trees)" }
    ],

    // 2. LIVESTOCK (For Medicines & Vaccines)
    livestock: [
        { id: "v1", name: "Drinking Water", desc: "Mixed in water tank" },
        { id: "v2", name: "Feed Mix", desc: "Mixed with dry feed" },
        { id: "v3", name: "Eye/Nasal Drop", desc: "Direct drop (Vaccines)" },
        { id: "v4", name: "Injection (Sub-Cutaneous)", desc: "Under skin (Neck)" },
        { id: "v5", name: "Injection (Intra-Muscular)", desc: "Deep muscle (Breast/Thigh)" },
        { id: "v6", name: "Spray (External)", desc: "For lice/mites or cooling" }
    ]
};

populatePlantation();

async function populatePlantation(){
    try{
        let response = await fetch("http://localhost:4000/plantations",{
            method:"GET"
        });
        plantations = await response.json();
        console.log(plantations);
        populatePlantationDetails();
        populateActivityType();
        populateApplicationMethod();
    }catch(error){

    }
}

function populatePlantationDetails(){
    let str='<option selected>Open this select menu</option>';
    let plantationLogSelect = document.getElementById('log-plantation');
    let labourLogSelect = document.getElementById('log-plantation-labour');
    plantations.forEach(function(plant){
        str += `<option>${plant.crop_name}</option>`;
    });
    plantationLogSelect.innerHTML = str;
    labourLogSelect.innerHTML = str;
}

function populateActivityType(){
    let str='<option selected>Open this select menu</option>';
    let activityLogSelect = document.getElementById('log-activity');
    let labourLogSelect = document.getElementById('log-activity-labour');
    activityMasterList['plantation'].forEach(function(activity){
        str += `<option>${activity.name}</option>`;
    });
    activityLogSelect.innerHTML = str;
    labourLogSelect.innerHTML = str;
}

function populateApplicationMethod(){
    let str='<option selected>Open this select menu</option>';
    let applicationLogSelect = document.getElementById('log-application');
    applicationMethods['plantation'].forEach(function(activity){
        str += `<option>${activity.name}</option>`;
    });
    applicationLogSelect.innerHTML = str;
}

async function saveCropLog(){
    let requestBody = {
        userID: JSON.parse(localStorage.getItem("farmer"))['id'],
        date: document.getElementById('log-date').value,
        plantation: document.getElementById('log-plantation').value,
        activity: document.getElementById('log-activity').value,
        chemical: document.getElementById('log-chemical').value,
        chemicalQuantity: document.getElementById('log-chemical-quantity').value,
        unit: document.getElementById('log-unit').value,
        application: document.getElementById('log-application').value,
        notes: document.getElementById('log-notes').value
    };
    let requestBodyStr = JSON.stringify(requestBody);
    console.log(requestBody);
    try{
        let response = await fetch("http://localhost:4000/cropLog",{
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

let totalLabour = 0;

function calculateTotal(){
    let maleCount = document.getElementById("male-count").value;
    let femaleCount = document.getElementById("female-count").value;
    let maleLabourPrice = document.getElementById("male-price").value;
    let femaleLabourPrice = document.getElementById("female-price").value;

    totalLabour = maleCount * maleLabourPrice + femaleCount * femaleLabourPrice;
    document.getElementById("log-amount-labour").innerHTML = '₹ '+totalLabour;

}

async function saveLabourLog(){
    let requestBody = {
        userID: JSON.parse(localStorage.getItem("farmer"))['id'],
        date: document.getElementById('log-date-labour').value,
        plantation: document.getElementById('log-plantation-labour').value,
        activity: document.getElementById('log-activity-labour').value,
        maleCount: document.getElementById('male-count').value,
        maleLabourPrice: document.getElementById('male-price').value,
        femaleCount: document.getElementById('female-count').value,
        femaleLabourPrice: document.getElementById('female-price').value,
        totalCharge: totalLabour,
        amountPaid: document.getElementById('log-amount-paid').value,
    };
    let requestBodyStr = JSON.stringify(requestBody);
    console.log(requestBody);
    try{
        let response = await fetch("http://localhost:4000/labourLog",{
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

let cropLogs = [];
getCropLogs();

async function getCropLogs(){
    try{
        let response = await fetch("http://localhost:4000/cropLog",{
            method: "GET"
        });
        cropLogs = await response.json();
        updateRecentLogs();
    }catch(error){
        console.log(error);
    }
}

function updateRecentLogs(){
    cropLogs.sort();
    document.getElementById("irrigation-last").innerHTML = `${cropLogs[cropLogs.length-1].plantation} - ${cropLogs[cropLogs.length-1].activity}: ${cropLogs[cropLogs.length-1].notes} `;
    document.getElementById("irrigation-last-date").innerHTML = cropLogs[cropLogs.length-1].date;
}


let labourLogs = [];
getLabourLogs();

async function getLabourLogs(){
    try{
        let response = await fetch("http://localhost:4000/labourLog",{
            method: "GET"
        });
        labourLogs = await response.json();
        updateRecentLogsLabour();
    }catch(error){
        console.log(error);
    }
}

function updateRecentLogsLabour(){
    labourLogs.sort();
    document.getElementById("labour-last").innerHTML = `${labourLogs[labourLogs.length-1].plantation} - ${labourLogs[labourLogs.length-1].activity}: <br>
                                                            Amount Paid: ${labourLogs[labourLogs.length-1].amountPaid} <br>
                                                            Pending: ${labourLogs[labourLogs.length-1].totalCharge - labourLogs[labourLogs.length-1].amountPaid}  `;
    document.getElementById("labour-last-date").innerHTML = labourLogs[labourLogs.length-1].date;
}
