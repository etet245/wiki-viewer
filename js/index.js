$(document).ready(function() {
  
  function clearResults() {
    $("#search-results").html("");
  }
  
  // Process search query
  $("form").submit(function(event) {
    var urlquery = encodeURI($("input").val());
    var resultsList;
    
    clearResults();
    $("#search-results").text("Loading...");
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&meta=&srsearch=" + urlquery+"&callback=?", function(data) {
        resultsList = data;
    }).done(function() {
      
      // display search results
      clearResults();
      resultsList.query.search.forEach(function(el) {
        var urlTitle = el.title.replace(/\s/g,"_");
        $("#search-results").append("<a href='https://en.wikipedia.org/wiki/"+urlTitle+"' target='_blank'><div class='section result'><h4><strong>" + el.title + "</strong></h4><p>"+el.snippet+"</p></div></a>");
      });
      
    });

    event.preventDefault();
  });
});