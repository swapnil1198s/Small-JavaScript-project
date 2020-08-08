//loads the top level object
function loadObject(url){
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

//filters for keys with the desired url
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
                value = value + "?page=1&per_page=1000";
                checkStatus(value);
                
            }
        }
    }
}

//filters the urls with the 200 status code
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

//prints out the ids for the filtered pages
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

//count the number of objects retrieved from repus_url
var count = 0;
var actual_obj_count = 41;
function numOfObj(data){
    console.log("Cecking if the returned number of objectd from 'repos_url' is correct...");
    var num = 0;
    for(obj in data){
        if((data[obj] != null)){
            num = num +1;
            
        }
        
    }
    count = num;
    if(count == 41){
        console.log("The retrieved number of objects is correct!");
    }
    else{
        console.log("The retrieved number of objects is not correct!");
    }
}

//fetches data for checking the dates in getTimesOfChange()
var updated;
var created;
function getObjDate(url){
    fetch(url)
    .then(res => {
        if(res.status != 200){
            console.log("The response was not as desired: " + res.status);
        }
        return res.json(); 
    })
    .then((out) => {
        getTimesOfChange(out);
    })
    .catch(err => { throw err });
}

//fetches data for numOfObjects()
function getObjCount(url){
    fetch(url)
    .then(res => {
        if(res.status != 200){
            console.log("The response was not as desired: " + res.status);
        }
        return res.json(); 
    })
    .then((out) => {
        numOfObj(out);
    })
    .catch(err => { throw err });
}



//check if updated date is later than created
function getTimesOfChange(data){
    updated = data['updated_at'];
    created = data['created_at'];
    actual_obj_count = data['public_repos'];
    console.log("Checking if the dates are correct:");
    if(updated>created){
        console.log("Dates are correct!");
    }
    else{
        console.log("Dates are not correct!");
    }
}

//tests for verification
function testCount(){
    getObjCount('https://api.github.com/orgs/BoomTownROI/repos?page=1&per_page=1000');
}
function testDate(){  
    getObjDate('https://api.github.com/orgs/BoomTownROI');
}
