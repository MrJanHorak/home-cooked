function addFields(){

  let container = document.getElementById("container");
  // container.appendChild(document.createTextNode("ingredient"));
  // Create an <input> element, set its type and name attributes
  // let input1 = document.createElement("input")
  // let input2 = document.createElement("input")
  let input3 = document.createElement("input")
  // input1.type = "number"
  // input2.type = "select"
  input3.type = "text";
  // input1.name = "amount"
  // input2.name = "measurement"
  input3.name = "ingredients";
  // container.appendChild(input1);
  // container.appendChild(input2);
  container.appendChild(input3);
  container.appendChild(document.createElement("br"));
  }
