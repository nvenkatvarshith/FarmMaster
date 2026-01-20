let farmers = [];
async function getAllFarmers() {
    try{
        let response = await fetch("http://localhost:4000/farmers",{
            method:"GET"
        })

        farmers = await response.json();
        console.log(farmers);
    }catch(error){
        console.log(error);
    }
}

getAllFarmers();

document.getElementById("login").addEventListener("click",function(){
    let farmeremail = document.getElementById("farmerEmail").value;
    let farmerPassword = document.getElementById("farmerPassword").value;
    let loginsuccess = false;
    farmers.forEach(function(farmer){
        if(farmeremail === farmer.email){
            if(farmerPassword === farmer.password){
                console.log("Login successful");
                window.location.href = "./../index.html";
            } 
            else{
                window.alert("wrong password");
            }
            loginsuccess = true;
        }
    });
    if(loginsuccess == false){
        window.alert("Wrong email or password");
    }
});