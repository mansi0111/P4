 Route 1:
      type: "POST",
      url: "/todo",
      data: todo,
      success: function (data)
        //do something with the data via front-end framework
        location.reload();

  Route 2:
      type: "DELETE",
      url: "/todo/" + item,
      success: function (data) {
        //do something with the data via front-end framework
        location.reload();
    
