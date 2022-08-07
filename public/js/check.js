
    const nameInp = document.getElementById('nameInp');
    const roomname = document.getElementById('roomInp');
    const nameerror = document.getElementById('nameerror');
    const roomerror = document.getElementById('roomerror');
function checker(event) {

    if (nameInp.value == "") {
        event.preventDefault();
        nameerror.style.display = "block";
        nameerror.style.visibility = "visible";
        nameerror.innerText = "Name can't be left empty."
    }
    if(nameInp.value!="") {
        nameerror.style.display = "none";
        nameerror.style.visibility = "hidden";
        nameerror.innerText = "Name can't be left empty."
        
    }
    if (roomname.value == "") {
        event.preventDefault();
        roomerror.style.display = "block";
        roomerror.style.visibility = "visible";
        roomerror.innerText = "Room can't be left empty."
    }
    if (roomname.value != "") {
        roomerror.style.display = "none";
    }
}