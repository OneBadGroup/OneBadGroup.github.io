var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1Kn8IWWkYaGBOdH4aspl4AbHWNMqQQVp0wnQ_nDmqFxg/edit#gid=0';

// Load all hitters and format with DataTables.
$('#raw-table').sheetrock({
    url: mySpreadsheet,
    query: "select B,C,F,N,S order by C asc",
  }).on('sheetrock:loaded', function () {
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
        "pageLength": 25,
    });
  });
