
// ブックマークの取得
chrome.bookmarks.getTree(function(bookmarks){

  var parent   = bookmarks[0].children[0];
  parent.title = "folder";
  createBranch(parent);

  // var encode = JSON.stringify(parent, null, 4);
  // console.log(encode);

  //////////////////////////////////////////////////////////////////////////////
  // フォルダの取得(ul作成)〜中身の繰り返し
  //////////////////////////////////////////////////////////////////////////////
  function createBranch(dirKey){
    // フォルダ名の取得
    var parentName = dirKey.title;
    // フォルダ内の繰り返し
    for(var i in dirKey.children){
      var childName = dirKey.children[i].title;
      var url       = dirKey.children[i].url;
      // フォルダの場合(ul要素の作成)
      if(url == undefined){
        ulTag(parentName, childName);
        createBtn(childName);
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
  // 要素の作成(全て親要素配下にappendするように記述してある)
  //////////////////////////////////////////////////////////////////////////////
  function ulTag(parentName, childName){
    var ul = document.createElement("ul");
    ul.setAttribute("id", childName);
    document.getElementById(parentName).append(ul);

    return ul;
  }

  function liTag(parentName, childName){
    var li = document.createElement("li");
    li.setAttribute("id", childName);
    li.setAttribute("class", "hidden");
    // li.setAttribute("class", parentName);
    document.getElementById(parentName).appendChild(li);

    return li;
  }

  function aTag(myName, url){
    var a  = document.createElement("a");
    a.href = url;
    a.setAttribute("target", "_blank"); // 新しいタブで開かせる
    a.setAttribute("id", myName + "-link");
    document.getElementById(myName).appendChild(a);

    return a;
  }

  // fabiconの画像の表示
  function imgTag(myName, fabicon){
    var img = document.createElement("img");
    img.src = fabicon;
    document.getElementById(myName + "-link").appendChild(img);

    return img;
  }

  // (入れる場所, テキスト文&class名)
  function spanTag(parentName, childName){
    var span = document.createElement("span");
    span.setAttribute("class", childName);
    span.textContent = childName;
    document.getElementById(parentName).appendChild(span); // 挿入

    return span;
  }

  //////////////////////////////////////////////////////////////////////////////
  // ブックマークの作成
  //////////////////////////////////////////////////////////////////////////////
  function createBookmarks(parentName, childName, url){
    // fabicon取得のためドメインを抽出
    var domain  = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);
    // fabiconがあれば取得(chromeのURLなどはdomainを取得できてない)
    if(domain != null || domain != undefined){
      domain = domain[1];
      var fabicon = "https://www.google.com/s2/favicons?domain=" + domain;
    }
    else{
      var fabicon = "";
    }
    // DOMの生成(appendする要素名, 自分の名前)
    liTag(parentName, childName);
    aTag(childName, url);
    imgTag(childName, fabicon);
    spanTag(childName + "-link", childName);
  }

  //////////////////////////////////////////////////////////////////////////////
  // ブックマークの表示
  //////////////////////////////////////////////////////////////////////////////

  function createBtn(parentName){
    // spanタグの生成
    var btn = spanTag(parentName, "ー" + parentName);
    btn.setAttribute("class", "btn");
    // 子要素取得→liタグのみ抽出
    var targetChildren = document.getElementById(parentName).getElementsByTagName("li");
    // イベントの記述
    btn.addEventListener("click", function (){
      // liの数だけループでclass名を追加していく
      for(var i in targetChildren){
        console.log(targetChildren[i].className);
        if(targetChildren[i].className == "hidden"){
          targetChildren[i].className = "visible";
        }
        else if(targetChildren[i].className == "visible"){
          targetChildren[i].className = "hidden";
        }
      }
    }, false);
  }
});
