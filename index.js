// // chromeアプリの取得
// chrome.management.getAll(function(apps) {
//   console.log(apps);
// });

// ブックマークの取得
chrome.bookmarks.getTree(function(bookmarks){


  var parent = bookmarks[0];

  // // 子要素の数だけ繰り返す
  // for(var i in parent.children){
  //   // parentがフォルダの場合(フォルダの表示と子要素を取得しparentを更新)
  //   if(parent.children[i].url == undefined){
  //     // フォルダを取得・表示 /////////////////////////////////
  //     if(parent.children[i].url == undefined){
  //       var parentName = "●" + parent.children[i].title;
  //       ulTag(parentName);
  //     }
  //     // parent = parent.children[i];
  //   }
  //   // parentがURLの場合
  //   if(parent.children[i].url != undefined){
  //     // 中身の表示 /////////////////////////////////////////
  //     createBookmarks(parent.children);
  //   }
  //   console.log(parent.children[i].url);
  // }





  var TreeName = "folder";
  // フォルダの繰り返し(ブックマークバー, その他のブックマーク) ===============================================
  for(var i in parent.children){
    var parentName = "●" + parent.children[i].title;

    // ①フォルダの作成(ul要素作成)
    if(parent.children[i].url == undefined){
      ulTag(TreeName, parentName);

      // フォルダの繰り返し(２つ目="公式、API、就職.....") =====================================
      // createBranch(parent.children[i]);
      for(var j in parent.children[i].children){
        var childName = "●" + parent.children[i].children[j].title;
        var url       = parent.children[i].children[j].url;

        // ②フォルダの作成(ul要素作成)
        if(url == undefined){
          ulTag(parentName, childName);

          // フォルダの取得(３つ目="JavaScript"<フロント)========================
          createBranch(parent.children[i].children[j]);
          // for(var k in parent.children[i].children[j].children){
          //   var oldChildName = "●" + parent.children[i].children[j].children[k].title;
          //   var url          = parent.children[i].children[j].children[k].url;
          //   // ③フォルダの場合(ul要素作成)
          //   if(url == undefined){
          //     ulTag(childName, oldChildName);
          //   }
          //   // ③ブックマークの作成
          //   else{
          //     createBookmarks(childName, oldChildName, url);
          //   }
          // }
        }
        // ②ブックマークの作成
        else{
          createBookmarks(parentName, childName, url);
        }
      }
    }
    // ①ブックマークの作成
    else{
    }
  }

  var encode = JSON.stringify(parent.children[0].url, null, 4);
  console.log(encode);

  //////////////////////////////////////////////////////////////////////////////
  // ここから関数
  //////////////////////////////////////////////////////////////////////////////

  // フォルダ(配列)を使って子要素の表示
  function createBranch(dirKey){
    // フォルダの名前の取得
    var parentName = "●" + dirKey.title;
    // フォルダの繰り返し
    for(var i in dirKey.children){
      var childName = "●" + dirKey.children[i].title;
      var url       = dirKey.children[i].url;
      // フォルダの場合(ul要素の作成)
      if(url == undefined){
        ulTag(parentName, childName);
        // フォルダの中身を展開したい(引数のchildrenのキーを使って関数の繰り返し)
        createBranch(dirKey.children[i]); // 再帰関数？
      }
      // ブックマークの作成
      else{
        createBookmarks(parentName, childName, url);
      }
    }
  }

  // ブックマークの作成
  function createBookmarks(parentName, childName, url){
    var domain  = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);
    var fabicon = "https://www.google.com/s2/favicons?domain=" + domain;
    // DOMの生成
    liTag(parentName, childName);
    imgTag(childName, fabicon);
    aTag(childName, url);
  }

  function ulTag(parentName, childName){
    var ul = document.createElement("ul");
    ul.setAttribute("id", childName);
    ul.textContent = childName;
    document.getElementById(parentName).append(ul);
  }

  function liTag(parentName, childName){
    var li = document.createElement("li");
    li.setAttribute("id", childName);
    document.getElementById(parentName).appendChild(li);
  }

  // fabiconの画像の表示
  function imgTag(childName, fabicon){
    var img = document.createElement("img");
    img.src = fabicon;
    document.getElementById(childName).appendChild(img);
  }

  function aTag(childName, url){
    var a  = document.createElement("a");
    a.href = url;
    a.textContent = childName;
    document.getElementById(childName).appendChild(a);
  }

});
