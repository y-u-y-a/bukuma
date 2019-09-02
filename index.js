// // chromeアプリの取得
// chrome.management.getAll(function(apps) {
//   console.log(apps);
// });

// ブックマークの取得
chrome.bookmarks.getTree(function(bookmarks){

  // バーのフォルダを取得
  var barFolders = bookmarks[0].children[0].children;
  // その他のブックマーク
  var others      = bookmarks[0].children[1];


  for(var i in barFolders){
    console.log("●：" + barFolders[i].title); // フォルダ名の取得
    for(var j in barFolders[i].children){
      console.log(barFolders[i].children[j].title + "\n" + barFolders[i].children[j].url); // 中身の取得
    }
  }
  console.log(others.title);

  // var encode = JSON.stringify(barFolders, null, 4);
  // console.log(encode);

});

