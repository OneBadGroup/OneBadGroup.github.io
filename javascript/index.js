var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1Kn8IWWkYaGBOdH4aspl4AbHWNMqQQVp0wnQ_nDmqFxg/edit#gid=738902544';

function findFirstDescendant(parent, tagname) {
    parent = document.getElementById(parent);
    var descendants = parent.getElementsByTagName(tagname);
    if ( descendants.length )
        return descendants[0];
    return null;
}

var table = $("#data-table").sheetrock({
    url: mySpreadsheet,
    query: "select B,C,D,G,O,T order by C desc",
    target: document.getElementById("data-table")
})

table.on('sheetrock:loaded', function () {
    $(this).DataTable({
        select: "single",
        columns: [
        {
            "title":"Image",
            "render": function (data, type, row, meta) {
                return '<img src="' + data + '" width="200" height="200">';
            }
        },
        {
            "title":"Item Number",
            "render": function (data, type, row, meta) {
                return "Item # " + data;
            }
        },
        {
            "title":"Quantity Available",
            "render": function (data, type, row, meta) {
                if(data == "" || data == null || data == undefined)
                    data = 1;
                if(data < 2)
                    return '<p style="color:red;"><b>' + data + " Remaining</b></p>";
                else
                    return '<p style="color:black;">' + data + " Remaining</p>";
            }
        },
        {
            "title":"Asking Price",
            "render": function (data, type, row, meta) {
                return '<b>' + data + '</b>'
            }
        },
        {"title":"Item Description"},
        {
            "title":"Additional Info", 
            "render": function (data, type, row, meta) {
                return '<a href="' + data + '">More Info</a>';
            }
        },
        ],
        pageLength: 10,
        responsive: true
    });
    var tbl = document.getElementById("data-table");
    console.log(document.documentElement);
    if ("ontouchstart" in document.documentElement) {
        tbl.toggleClass('cards');
        tbl.style.width = "40%";
        document.getElementById("data-table_wrapper").style.width = "100%";
        var header = findFirstDescendant("data-table", "thead");
        header.title = "hidden";
    }
    else {
        tbl.style.width = "98%";
        document.getElementById("data-table_wrapper").style.width = "100%";
    }
});

table.on('page.dt', function() {
    $('html, body').animate({
      scrollTop: $(".dataTables_wrapper").offset().top
    }, 'fast');
  });