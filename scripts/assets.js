let plantations = [];
async function getPlantations(){
    try{
        let response = await fetch('http://localhost:4000/plantations',{
            method:"GET"
        });
        plantations = await response.json();
        populatePlantationCards();
    }catch(error){

    }
}

getPlantations();

function populatePlantationCards(){
    let str='';
    plantations.forEach(function(plant){
        str += `
        <div class="col-lg-4 col-sm-12">
            <div class="card" style="width: 23rem;">
                    <div class="p-2 pb-0">
                        <h3 class="card-title plantation-title">${plant.crop_name}</h3>
                        <img src="./../assets/images/1.png" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <ul class="tree-description fw-semibold">
                            <li>🌱 Tree Count: <span id="tree-count">${plant.tree_count}</span></li>
                            <li>🎂 Age: <span id="tree-age">${getTreeAge(plant.date_planted)}</span></li>
                            <li>📐 Spacing: <span id="tree-spacing">${plant.tree_spacing}x${plant.tree_spacing} ft </span></li>
                            <li>💧 Irrigation: <span id="tree-irrigation">${plant.irrigation}</span></li>
                        </ul>
                    </div>
                    <div class="last-activity">
                        <p class="pt-2 ps-3 mb-2 fw-bold">Last Activity: </p>
                    </div>
             </div>
        </div>
        `;
    });
    document.getElementById("plant-details").innerHTML = str;
}

const currentTimeStamp = new Date();
function getTreeAge(datePlanted){
    let year = currentTimeStamp.getFullYear() - new Date(datePlanted).getFullYear();
    return year >0 ? year : currentTimeStamp.getMonth() - new Date(datePlanted).getMonth()
}