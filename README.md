
// // chromeアプリの取得
// chrome.management.getAll(function(apps) {
//   console.log(apps);
// });



  // フォルダの繰り返し(ブックマークバー, その他のブックマーク) ===============================================
  // for(var i in parent.children){
  //   var parentName = "●" + parent.children[i].title;

  //   // ①フォルダの作成(ul要素作成)
  //   if(parent.children[i].url == undefined){
  //     ulTag(parentElement, parentName);

  //     // フォルダの繰り返し(２つ目="公式、API、就職.....") =====================================
  //     createBranch(parent.children[i]);

  //     // for(var j in parent.children[i].children){
  //     //   var childName = "●" + parent.children[i].children[j].title;
  //     //   var url       = parent.children[i].children[j].url;

  //     //   // ②フォルダの作成(ul要素作成)
  //     //   if(url == undefined){
  //     //     ulTag(parentName, childName);

  //     //     // フォルダの取得(３つ目="JavaScript"<フロント)========================
  //     //     // createBranch(parent.children[i].children[j]);

  //     //     // for(var k in parent.children[i].children[j].children){
  //     //     //   var oldChildName = "●" + parent.children[i].children[j].children[k].title;
  //     //     //   var url          = parent.children[i].children[j].children[k].url;
  //     //     //   // ③フォルダの場合(ul要素作成)
  //     //     //   if(url == undefined){
  //     //     //     ulTag(childName, oldChildName);
  //     //     //   }
  //     //     //   // ③ブックマークの作成
  //     //     //   else{
  //     //     //     createBookmarks(childName, oldChildName, url);
  //     //     //   }
  //     //     // }
  //     //   }
  //     //   // ②ブックマークの作成
  //     //   else{
  //     //     createBookmarks(parentName, childName, url);
  //     //   }
  //     // }
  //   }
  //   // ①ブックマークの作成
  //   else{
  //   }
  // }
