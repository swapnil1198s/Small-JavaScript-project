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
                txt = key + ":" + value ;
                var tag = document.createElement("p");
                var text = document.createTextNode(txt);
                tag.appendChild(text);
                var element = document.getElementById("result");
                element.appendChild(tag);
                checkStatus(value);
                
            }
        }
    }
}



function checkStatus(para){
    fetch(para)
    .then(res => {
        if(res.status != 200){
            var tag = document.createElement("p");
            var text = document.createTextNode("The following fetched url did not have a 200 status code");
            tag.appendChild(text);
            var element = document.getElementById("result2");
            element.appendChild(tag);
            var hd = document.createElement("h4");
            var htxt = document.createTextNode(para);
            hd.appendChild(htxt);
            var element2 = document.getElementById("result2");
            element2.appendChild(hd);
        }
        else{
            var hd = document.createElement("h3");
            var htxt = document.createTextNode(para);
            hd.appendChild(htxt);
            var element2 = document.getElementById("result2");
            element2.appendChild(hd);
            return res.json();
        }
        
    })
    .then((out) => {
        displayContent(out);
    })
    .catch(err => { throw err });
}

function displayContent(data){
    var txt = "";
    for(obj in data){
        if((data[obj] != null)){
            if(data[obj].id != undefined){
                txt = "id: " + data[obj].id;
                var tag = document.createElement("p");
                var text = document.createTextNode(txt);
                tag.appendChild(text);
                var element = document.getElementById("result2");
                element.appendChild(tag);
            }
            
        }
        
    }
}