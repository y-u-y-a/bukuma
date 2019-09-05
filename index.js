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






  // フォルダの取得(ブックマークバー) ===============================================
  for(var i in parent.children){

    var parentName = "●" + parent.children[i].title;

    // ①フォルダの場合(開封)
    if(parent.children[i].url == undefined){
      ulTag(parentName);

      // フォルダの取得(２つ目="公式、API"とか) =====================================
      for(var j in parent.children[i].children){

        var childName = parent.children[i].children[j].title;
        var url       = parent.children[i].children[j].url;

        // ②フォルダの場合(開封)
        if(url == undefined){
          var childName = "●" + childName;
          ulTag(childName);

          // フォルダの取得(３つ目="JavaScript"<フロントとか)========================
          for(var k in parent.children[i].children[j].children){

            var oldChildName = parent.children[i].children[j].children[k].title;
            var url          = parent.children[i].children[j].children[k].url;

            // ③フォルダの場合(開封)
            if(url == undefined){
              var oldChildName = "●" + oldChildName;
              ulTag(oldChildName);
            }
            // ③ブックマークの場合
            if(url != undefined){
              createBookmarks(childName, oldChildName, url);
            }
          }
        }
        // ②ブックマークの場合
        if(url != undefined){
          createBookmarks(parentName, childName, url);
        }
      }
    }
    // ①ブックマークの場合
    if(parent.children[i].url != undefined){
    }
  }

  var encode = JSON.stringify(parent.children[0].url, null, 4);
  console.log(encode);

  //////////////////////////////////////////////////////////////////////////////
  // ここから関数
  //////////////////////////////////////////////////////////////////////////////

  // function getAllBookMarks(child){
  //   for(var k in child.children){

  //     var oldChildName = child.children[k].title;
  //     var url          = child.children[k].url;

  //     // ③フォルダの場合(開封)
  //     if(url == undefined){
  //       var oldChildName = "●" + oldChildName;
  //       ulTag(oldChildName);
  //     }
  //     // ③ブックマークの場合
  //     if(url != undefined){
  //       createBookmarks(childName, oldChildName, url);
  //     }
  //   }
  // }

  function createBookmarks(parentName, childName, url){
    var domain  = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);
    var fabicon = "https://www.google.com/s2/favicons?domain=" + domain;
    // DOMの生成
    liTag(parentName, childName);
    imgTag(childName, fabicon);
    aTag(childName, url);
  }

  // // 子要素urlの取得・表示(parentは配列のキー)
  // function createBookmarks(parent){
  //   for(var j in parent){
  //     var bookName = parent[j].title;
  //     var url       = parent[j].url;
  //     // ブックマークの場合
  //     if(url != undefined){
  //     // var domain    = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];
  //     // var fabicon   = "https://www.google.com/s2/favicons?domain=" + domain;
  //     }
  //     // フォルダの場合
  //     else{
  //     }
  //     // DOMの生成
  //     liTag(bookName);
  //     // imgTag(bookName, fabicon);
  //     aTag(bookName, url);
  //   }
  // }

  function ulTag(parentName){
    var ul = document.createElement("ul");
    ul.setAttribute("id", parentName);
    ul.textContent = parentName;
    document.getElementById("folder").append(ul);
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
