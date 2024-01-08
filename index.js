chrome.storage.local.get({bookmarks: []}, function (data) {
    var bookmarks = data.bookmarks;
    $("#bookmarksList").empty(); 
    bookmarks.forEach(function (bookmark) {
        var newName = bookmark.name;
        var newLink =  bookmark.link;
        $("ul").append("<li><a href='" + newLink + "'>" + newName + "</a><button class='removeButton'><i class='fa fa-trash-o'></i></button></li>");
    });
});

$("#newBookmark").click(function() {
    $("#newBookmark").hide();
    $(".visible").show();
});

$("#saveBookmark").click(function() {
    var newName = $("#nameInput").val().trim();
    var newLink = $("#linkInput").val().trim();
    chrome.storage.local.get({bookmarks: []}, function (data) {
        var bookmarks = data.bookmarks;
        bookmarks.push({name:newName, link:newLink});
        chrome.storage.local.set({ bookmarks: bookmarks}, function() {
            chrome.storage.local.get('bookmarks', function(data) {
                console.log(data.bookmarks)
            })
        });
    });
    $("ul").append("<li><a href='"+newLink+"'>"+newName+"</a><button class='removeButton'><i class='fa fa-trash-o'></i></button></li>")
    $("#nameInput").val('');
    $("#linkInput").val('');
    $(".visible").hide();
    $("#newBookmark").show();
});

$("ul").on("click", ".removeButton", function() {
    var index = $(this).parent().index();
    chrome.storage.local.get({bookmarks: []}, function(data) {
        var bookmarks = data.bookmarks;
        bookmarks.splice(index, 1);
        chrome.storage.local.set({ bookmarks: bookmarks}, function() {
            chrome.storage.local.get('bookmarks', function(data) {
                console.log(data.bookmarks)
            })
        });
    })
    $(this).parent().remove();
})

$(document).on("click", "ul a", function () {
    chrome.tabs.create({ url: $(this).attr("href")});
});
