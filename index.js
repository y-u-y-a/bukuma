
// ブックマークの取得
chrome.bookmarks.getTree(function(bookmarks){

  var parent   = bookmarks[0];
  parent.title = "folder";
  createBranch(parent);

  // var encode = JSON.stringify(parent, null, 4);
  // console.log(encode);

  //////////////////////////////////////////////////////////////////////////////
  // フォルダの取得(ul作成)〜中身の繰り返し
  //////////////////////////////////////////////////////////////////////////////
  // フォルダ(配列)のキーを使って子要素の表示
  function createBranch(dirKey){
    // フォルダ名の取得
    var parentName = dirKey.title;
    // フォルダの繰り返し
    for(var i in dirKey.children){
      var childName = dirKey.children[i].title;
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
  //////////////////////////////////////////////////////////////////////////////
  // ブックマークの作成
  //////////////////////////////////////////////////////////////////////////////
  function createBookmarks(parentName, childName, url){
    var domain  = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);
    // chromeのURLなどはdomainを取得できてない
    if(domain != null || domain != undefined){
      domain = domain[1];
      var fabicon = "https://www.google.com/s2/favicons?domain=" + domain;
    }
    else{
      var fabicon = "";
    }
    // DOMの生成
    liTag(parentName, childName);
    imgTag(childName, fabicon);
    aTag(childName, url);
  }

  //////////////////////////////////////////////////////////////////////////////
  // 要素の作成
  //////////////////////////////////////////////////////////////////////////////
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
