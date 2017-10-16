$(function() {

    // ローカルストレージからクエリ一覧を取得
    chrome.storage.local.get(['queryList'], function (items) {

        console.log(items);

        var queryList = '';
        if (Object.keys(items).length > 0) {
            queryList = items.queryList;
        } else {
            queryList = ['Saved query is nothing.']
        }

        var li = '';
        for (var i = 0; i < queryList.length; i++) {
            li += '<li>' + queryList[i] + '</li>';
        }
        // popupに表示
        document.getElementById("sqlList").innerHTML= li;
    });
});