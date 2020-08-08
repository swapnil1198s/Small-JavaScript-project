function loadObject(){
    let url = 'https://api.github.com/orgs/boomtownroi';

    fetch(url)
    .then(res => {
        if(res.status != 200){
            console.log("The response was not as desired: " + res.status);
        }
        return res.json(); 
    })
    .then((out) => {
        
        filterObject(out);
    })
    .catch(err => { throw err });
}

function printObject(ObjData){
    txt = "";
    for(key in ObjData){
        var value = ObjData[key];
        txt += key + " : " + value + "<br>";
    }
    document.getElementById("result").innerHTML = txt;
}

function filterObject(ObjData){
    var txt = "";
    for(key in ObjData){
        var value = ObjData[key];
        if(typeof value === 'string'){
            if(value.search("api.github.com/orgs/BoomTownROI") != -1){
                txt += key + " : " + value + "<br>";
                
            }
        }
    }
    document.getElementById("result").innerHTML = txt;
    loadFilteredObj(txt);
}

function loadFilteredObj(txt){
    let url = 'https://api.github.com/orgs/boomtownroi';

    fetch(url)
    .then(res => {
        if(res.status != 200){
            console.log("The response was not as desired: " + res.status);
        }
        return res.json(); 
    })
    .then((out) => {
        
        filterObject(out);
    })
    .catch(err => { throw err });
}