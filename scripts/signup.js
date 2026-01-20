const cropCategories = [
  "Fruit Plantation",
  "Field Crop", 
  "Vegetable",
  "Timber/Forest",
  "Spices"
];
const cropList = [
  // --- FRUITS & PLANTATIONS (Orchards) ---
  { id: 101, name: "Balaji Lemon", category: "Fruit Plantation", type: "Perennial" },
  { id: 102, name: "Punasa Mango", category: "Fruit Plantation", type: "Perennial" },
  { id: 103, name: "Banganapalli Mango", category: "Fruit Plantation", type: "Perennial" },
  { id: 104, name: "Sweet Lime (Mosambi)", category: "Fruit Plantation", type: "Perennial" },
  { id: 105, name: "Guava (Allahabad Safeda)", category: "Fruit Plantation", type: "Perennial" },
  { id: 106, name: "Taiwan Pink Guava", category: "Fruit Plantation", type: "Perennial" },
  { id: 107, name: "Papaya (Red Lady)", category: "Fruit Plantation", type: "Seasonal" },
  { id: 108, name: "Pomegranate (Bhagwa)", category: "Fruit Plantation", type: "Perennial" },
  { id: 109, name: "Sapota (Cricket Ball)", category: "Fruit Plantation", type: "Perennial" },
  { id: 110, name: "Coconut (East Coast Tall)", category: "Fruit Plantation", type: "Perennial" },
  { id: 111, name: "Banana (Grand Naine)", category: "Fruit Plantation", type: "Seasonal" },
  { id: 112, name: "Watermelon", category: "Fruit Plantation", type: "Seasonal" },

  // --- FIELD CROPS (Agriculture) ---
  { id: 201, name: "Paddy (RNR 15048)", category: "Field Crop", type: "Kharif/Rabi" },
  { id: 202, name: "Paddy (BPT 5204)", category: "Field Crop", type: "Kharif/Rabi" },
  { id: 203, name: "Cotton (Bt Cotton)", category: "Field Crop", type: "Kharif" },
  { id: 204, name: "Red Gram (Kandulu)", category: "Field Crop", type: "Kharif" },
  { id: 205, name: "Maize (Corn)", category: "Field Crop", type: "Kharif/Rabi" },
  { id: 206, name: "Groundnut", category: "Field Crop", type: "Kharif/Rabi" },
  { id: 207, name: "Bengal Gram (Senagalu)", category: "Field Crop", type: "Rabi" },
  { id: 208, name: "Black Gram (Minumulu)", category: "Field Crop", type: "Rabi" },
  { id: 209, name: "Jowar (Sorghum)", category: "Field Crop", type: "Kharif/Rabi" },
  { id: 210, name: "Sesame (Nuvvulu)", category: "Field Crop", type: "Seasonal" },

  // --- VEGETABLES (Horticulture) ---
  { id: 301, name: "Tomato (Hybrid)", category: "Vegetable", type: "Seasonal" },
  { id: 302, name: "Green Chilli (Guntur)", category: "Vegetable", type: "Seasonal" },
  { id: 303, name: "Brinjal (Eggplant)", category: "Vegetable", type: "Seasonal" },
  { id: 304, name: "Ladies Finger (Okra)", category: "Vegetable", type: "Seasonal" },
  { id: 305, name: "Ridge Gourd (Beerakaya)", category: "Vegetable", type: "Creeper" },
  { id: 306, name: "Bitter Gourd (Kakarakaya)", category: "Vegetable", type: "Creeper" },
  { id: 307, name: "Bottle Gourd (Sorakaya)", category: "Vegetable", type: "Creeper" },
  { id: 308, name: "Onion", category: "Vegetable", type: "Seasonal" },
  { id: 309, name: "Leafy Veg (Spinach/Palak)", category: "Vegetable", type: "Short Term" },
  { id: 310, name: "Leafy Veg (Amaranthus/Thotakura)", category: "Vegetable", type: "Short Term" },

  // --- TIMBER & FOREST PLANTS (Long Term) ---
  { id: 401, name: "Red Sandalwood", category: "Timber/Forest", type: "Long Term" },
  { id: 402, name: "Teak Wood (Sagwan)", category: "Timber/Forest", type: "Long Term" },
  { id: 403, name: "Malabar Neem (Vepa)", category: "Timber/Forest", type: "Long Term" },
  { id: 404, name: "Sandalwood (White)", category: "Timber/Forest", type: "Long Term" },
  
  // --- SPICES ---
  { id: 501, name: "Turmeric", category: "Spices", type: "Seasonal" },
  { id: 502, name: "Ginger", category: "Spices", type: "Seasonal" },
  { id: 503, name: "Garlic", category: "Spices", type: "Seasonal" }
];

let str='<option selected>Select Crop</option>';
for(let i=0;i<cropCategories.length;i++){
    str += `<option>${cropCategories[i]}</option>`;
}
let mainCrop = document.getElementById("mainCrop");
mainCrop.innerHTML = str;

mainCrop.addEventListener("change",function(){
    document.getElementById("specificCrop").classList.remove("hidden");
    let str1='<option selected>Select Crop</option>';
    cropList.forEach(function(crop){
        if(crop.category == mainCrop.value){
            str1 += `<option>${crop.name}</option>`;
        }
    });
    document.getElementById("specificCropSelect").innerHTML = str1;
});

document.getElementById("signup").addEventListener("click",async function(){
    let requestBody = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        farmSize: document.getElementById("farmSize").value,
        mainCrop: document.getElementById("mainCrop").value,
        specificCrop: document.getElementById("specificCropSelect").value,
        password: document.getElementById("password").value
    };

    let requestBodyStr = JSON.stringify(requestBody);

    let response = await fetch("http://localhost:4000/farmers",{
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: requestBodyStr
    })

    let parsedResponse = await response.json();
    console.log(parsedResponse);
    window.location.href = "./farmer-login.html"
});