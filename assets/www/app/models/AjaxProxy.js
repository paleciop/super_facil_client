$.ajax({
  url: "http://ec2-107-20-65-252.compute-1.amazonaws.com/main/product",
  success: function(data){
  console.log("success");
    console.log(data);
  }
});