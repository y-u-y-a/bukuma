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


  // １つ目のフォルダーごとに繰り返し
  for(var i in barFolders){

    var folderName = barFolders[i].title;
    // フォルダ名の表示
    // showFolderName(folderName);
    // console.log("●：" + folderName); // フォルダ名の取得

    for(var j in barFolders[i].children){

      var bookName = barFolders[i].children[j].title;
      var url      = barFolders[i].children[j].url;

      // フォルダの場合(undefinedだから)
      if(url != undefined){
        var domain   = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]; // エスケープ(\を直前に使用する)
      }

      var fabicon  = "https://www.google.com/s2/favicons?domain=" + domain;

      // DOMの生成
      liTag(bookName);
      imgTag(bookName, fabicon);
      aTag(bookName, url);

      // console.log(bookName + "\n" + url); // 中身の取得
      // console.log(fabicon);
    }
  }
  // console.log(others.title);


  //////////////////////////////////////////////////////////////////////////////
  // ここから関数
  //////////////////////////////////////////////////////////////////////////////

  function showFolderName(folderName){
    var div = document.getElementById("folder");
    div.textContent = folderName;
  }

  function liTag(bookName){
    var li = document.createElement("li");
    li.setAttribute("id", bookName);
    document.getElementById("bookLists").appendChild(li);
  }

  // fabiconの画像の表示
  function imgTag(bookName, fabicon){
    var img = document.createElement("img");
    img.src = fabicon;
    document.getElementById(bookName).appendChild(img);
  }

  function aTag(bookName, url){
    var a  = document.createElement("a");
    a.href = url;
    a.textContent = bookName;
    document.getElementById(bookName).appendChild(a);
  }


});
