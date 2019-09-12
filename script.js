var tab = document.getElementById("table"); //Captures the table with id = table
var search_input = document.getElementById('search_input'); //Captures the HTML input element with id = search_input
var search_button = document.getElementById('search_button'); //Captures the HTML button element with id = search_button
var search_input_min = document.getElementById('search_input_min'); // search input for screen smaller than 720 px


loadData().then(function (response){
    json_data = JSON.parse(response); //parse the JSON array to JSON object
    let list = json_data;
    manipulateTable(list); // manipulates the table with data

/* Performs search after clicking the search button on Header search field.(only displayed in larger than 720px screen) */
    search_button.addEventListener('click', function(){
        let key = search_input.value;
        if(key.length > 0)
        {
            let new_list = []
            for(let i = 0; i < list.length; i++)
            {
                if(list[i]['DateTime'].includes(key))
                {
                    new_list.push(list[i]);
                }
            }
            clearTable();
            manipulateTable(new_list);
            }        
    });    
/* End of search */

/* Performs filtering while typing on search input.(only displayed in larger than 720px screen) */
    search_input.onkeyup = function(){
        for(let i = 0; i < list.length; i++)
        {
            if(list[i]['DateTime'].includes(search_input.value))
            {
                searchResult(list, i);
            }
        }
    }
/* End of filtering */

/* Performs filtering while typing on search input.(only displayed in smaller than 720px screen) */
    search_input_min.onkeyup = function(){
        for(let i = 0; i < list.length; i++)
        {
            if(list[i]['DateTime'].includes(search_input_min.value))
            {
                searchResult(list, i);
            }
        }
    }
/* End of filtering */


});

function loadData(){
    return new Promise(function(resolve, reject){
        xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://psdtechsolution.com/biofloc/api.php', true);
        xhr.onload = function(){
            if(this.status === 200){
                resolve(xhr.responseText);
            }
            else{
                reject(Error(xhr.statusText))
            }
        }
        xhr.send();
    });
}


//Table Manipulation
function manipulateTable(list){
    for(let i = 0; i<list.length; i++)
    {
        var new_row = tab.insertRow(1);
        var cel_0 = new_row.insertCell(0);
        var cel_1 = new_row.insertCell(1);
        var cel_2 = new_row.insertCell(2);
        var cel_3 = new_row.insertCell(3);
        var cel_4 = new_row.insertCell(4);
        
        cel_0.innerHTML = list[i]["DateTime"];
        cel_1.innerHTML = list[i]["FlocNo"]; 
        cel_2.innerHTML = list[i]["TemperatureC"];
        cel_3.innerHTML = list[i]["TemperatureF"]; 
        cel_4.innerHTML = list[i]["PH"];
        
    }
}

//Needed When live filtering
function searchResult(list, index)
{
    clearTable();
    var new_row = tab.insertRow(1);
    var cel_0 = new_row.insertCell(0);
    var cel_1 = new_row.insertCell(1);
    var cel_2 = new_row.insertCell(2);
    var cel_3 = new_row.insertCell(3);
    var cel_4 = new_row.insertCell(4);
    
    cel_0.innerHTML = list[index]["DateTime"];
    cel_1.innerHTML = list[index]["FlocNo"]; 
    cel_2.innerHTML = list[index]["TemperatureC"];
    cel_3.innerHTML = list[index]["TemperatureF"]; 
    cel_4.innerHTML = list[index]["PH"];
}

function clearTable(){
    console.log($('#tbodyid').empty());
    $('#tbodyid').append('<tr></tr>'); //Important. Needed this line otherwise new data will be added in table header(th)
}

