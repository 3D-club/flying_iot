function getData() {
  url = "https://9t0ax6l8x2.execute-api.ap-south-1.amazonaws.com/Dev";

  fetch(url)
    .then((response) => {
      console.log("inside first then");
      return response.text();
    })
    .then((data) => {
      console.log("inside second then");
      console.log(data);
    });
}

console.log("before calling getData");
getData();
console.log("after calling getData");
