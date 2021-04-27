const fi = new Field();
const ui = new UI();

let start = 0;

const select = document.getElementsByTagName("select")[0];
const field = document.getElementsByTagName("table")[0];

addEventListeners();
function addEventListeners() {

    select.addEventListener("change", changeSelect);
    document.addEventListener("DOMContentLoaded", loadField);
    document.addEventListener("click", clickField);
    field.addEventListener("contextmenu", rightClickField);

}




function changeSelect() {

    //set localstorage
    localStorage.setItem("selectedIndex",select.selectedIndex);


    mode();

};


function mode() { 
    start = 0;

    const selectOption = select.children[select.selectedIndex];
    select.className = selectOption.className;

    if (selectOption.value === "0") {
        ui.createTable(10, 25, "td-easy", 10);
        // fi.createFieldArray(10, 25, 10);
        // ui.showAllField(fi.getField());
    }

    else if (selectOption.value === "1") {
        ui.createTable(20, 25, "td-medium", 30);
        // fi.createFieldArray(20, 25, 60);
        // ui.showAllField(fi.getField());
    }

    else if (selectOption.value === "2") {
        ui.createTable(25, 30, "td-hard", 100);
        // fi.createFieldArray(25, 30, 100);
        // ui.showAllField(fi.getField());
    }

}



function loadField() {
    const localSelect=localStorage.getItem("selectedIndex");

    //if localSelect is not null
    if(localSelect)
    select.selectedIndex=localSelect;

    mode();
}


function clickField(e) {

    if (e.target.tagName === "TD") {
        //flag control bayrak varsa basilmasin
        const flagControl = e.target.firstChild.id == "flag";
        const [i, j] = getIndex(e.target);




        if (!flagControl) {

            if (start == 0) {
                start = 1;
                if (select.value === "0")
                    fi.createFieldArray(10, 25, 10, i, j);
                else if (select.value === "1")
                    fi.createFieldArray(20, 25, 30, i, j);
                else if (select.value === "2")
                    fi.createFieldArray(25, 30, 100, i, j);
            }



            ui.showSquare(fi.getField(), e.target, i, j);
        }





    }

}


function getIndex(target) {
    const index = target.id.split("_");


    return index;
}




function rightClickField(e) {
    if (e.target.tagName === "TD") {

        ui.addFlagToUI(e.target);

    }
    else if (e.target.id === "flag") {
        ui.removeFlagFromUI(e.target);
    }


    console.log();
    e.preventDefault();
}





