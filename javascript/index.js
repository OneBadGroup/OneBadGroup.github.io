var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1Kn8IWWkYaGBOdH4aspl4AbHWNMqQQVp0wnQ_nDmqFxg/edit#gid=0';

var table = $("#data-table").sheetrock({
    url: mySpreadsheet,
    query: "select B,C,F,N,S order by C desc",
    target: document.getElementById("data-table")
})

table.on('sheetrock:loaded', function () {
    $(this).DataTable({
        columns: [
        {
            "title":"Image",
            "render": function (data, type, row, meta) {
            return '<img src="' + data + '" width="200" height="200">';
            }
        },
        {"title":"Item Number"},
        {"title":"Asking Price"},
        {"title":"Item Name"},
        {
            "title":"Additional Info", 
            "render": function (data, type, row, meta) {
            return '<a href="' + data + '">Link</a>';
            }
        },
        
        ],
        "pageLength": 10,
        responsive: true
    });
});

table.on('page.dt', function() {
    $('html, body').animate({
      scrollTop: $(".dataTables_wrapper").offset().top
    }, 'fast');
  });
