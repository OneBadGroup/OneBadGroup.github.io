var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1Kn8IWWkYaGBOdH4aspl4AbHWNMqQQVp0wnQ_nDmqFxg/edit#gid=738902544';

function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

function findFirstDescendant(parent, tagname) {
    parent = document.getElementById(parent);
    var descendants = parent.getElementsByTagName(tagname);
    if ( descendants.length )
        return descendants[0];
    return null;
}

var table = $("#data-table").sheetrock({
    url: mySpreadsheet,
    query: "select A,C,D,G,O,U order by C desc",
    target: document.getElementById("data-table")
})

table.on('sheetrock:loaded', function () {
    $(this).DataTable({
        select: "single",
        columns: [
        {
            "title":"Image",
            "render": function (data, type, row, meta) {
                // Split the data into an array using semicolon as the delimiter
                var urls = data.split(';');
                var url1 = urls[0].trim(); // Image URL
                var url2 = urls[1].trim(); // Item URL
        
                // Create clickable image link 
                var imageLink = '<a href="' + url2 + '" target="_blank"><img src="' + url1 + '" width="200" height="200"></a>';
        
                // Return the HTML for the clickable image
                return imageLink;
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
                if(data == "" || data == null || data == undefined || data.includes("NAME"))
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
    if(detectMobile()) {
        tbl.classList.add('cards');
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
