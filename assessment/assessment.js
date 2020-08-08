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
    var para = "{ ";
    var txt = "";
    for(key in ObjData){
        var value = ObjData[key];
        if(typeof value === 'string'){
            if(value.search("api.github.com/orgs/BoomTownROI") != -1){
                txt += key + ":" + value + " <br>";
                para += "\"" + key + "\"" + ":" + "\"" + value + "\"" + ",";
            }
        }
    }
    para = para.slice(0, -1);
    para += "}";
    document.getElementById("result").innerHTML = txt;
    loadFilteredObj(para);
}

function loadFilteredObj(para){
    var obj = JSON.parse(para);
    var txt = "";
    for(key in obj){
        var value = obj[key];   
        var pageStatus = checkStatus(value);
        console.log(pageStatus);
        txt += " <br> " + value + " <br> ";
    }
    document.getElementById("result2").innerHTML = txt;
}


function checkStatus(para){
    fetch(para)
    .then(res => {
        if(res.status != 200){
            console.log("This was not the desired status code");
        }
        return res.json();
    })
    .then((out) => {
        displayContent(out);
    })
    .catch(err => { throw err });
}

function displayContent(data){
    var txt = "";
    for(obj in data){
        txt += "id: " + data[obj].id + "<br>";
    }
    document.getElementById("result3").innerHTML = txt;
}