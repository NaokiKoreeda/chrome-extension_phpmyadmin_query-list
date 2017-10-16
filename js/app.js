$(function() {

    /*
     * 1000msごとに実行。
     * URLをチェックして、SQLボックスが表示されている場合のみイベントをセットする。
     */
    setInterval(setListener, 1000);

    function setListener() {
        var url = location.href;
        if (url.indexOf('tbl_sql.php') !== -1
            || url.indexOf('db_sql.php') !== -1
        ) {
            // SQLタブを選択したときにイベントを登録（繰り返し登録を防ぐため先に削除する）
            $(document).off("click", "#button_submit_query");
            $(document).on('click', '#button_submit_query', function () {

                // preタグの2つ目に入力されたSQLクエリが入っている
                var sqlTextHtmlElArr = $('#sqlquerycontainer pre');
                if (url.indexOf('db_sql.php') !== -1) {
                    // db_sql画面では以下のセレクタから辿る
                    sqlTextHtmlElArr = $('#sqlquerycontainerfull pre');
                }
                if (sqlTextHtmlElArr.length < 2) {
                    return;
                }
                // textではなくHTMLタグ付きのエレメントで保持されている
                var sqlTextWithTag = sqlTextHtmlElArr[1].outerHTML;
                // タグを除去してSQLクエリにする
                var sqlText = sqlTextWithTag.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');

                console.log(sqlText);
        
                // ローカルストレージに登録する
                chrome.storage.local.get(['queryList'], function (items) {
                    console.log(items);
                    var sqlList = [];
                    if (Object.keys(items).length > 0) {
                        sqlList = items.queryList;

                        // 同じクエリがあったら過去のを除去
                        var posOverlap = $.inArray(sqlText, sqlList);
                        if (posOverlap !== -1) {
                            sqlList.splice(posOverlap, 1);
                        }
                        // リストが３０超えたら一番古いクエリを除去
                        if (sqlList.length > 30) {
                            sqlList.splice(30, 1);
                        }
                    }
                    // リストの最初に追加
                    sqlList.unshift(sqlText);
        
                    chrome.storage.local.set({"queryList": sqlList}, function () {
                        console.log('saved storage.');
                    });
                });
            });

            // ローカルストレージを削除する（コメントアウト外して指定URLにアクセス）
            // chrome.storage.local.remove('queryList');
        }
    }
});