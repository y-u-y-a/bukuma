
  // var encode = JSON.stringify(parent, null, 4)
  // console.log(encode)

///////////////////////////////////////////////////////////
// parent[1] : {
//   children : [],
//   title    : "その他のブックマーク"
// }
// parent[0] : {
//   children : [ブックマークバーの情報が配列で入っている],
//   title    : "folder"
// }
// parent.children[0] : {
//   children : [],
//   title    : "リファレンス"
// }
///////////////////////////////////////////////////////////

// ブックマークの取得
chrome.bookmarks.getTree(function(bookmarks){
  var parent   = bookmarks[0].children[0]
  // titleは空なので自分で指定する、id属性と一致させる
  parent.title = "folder"
  console.log(parent)
  createBranch(parent)

  //////////////////////////////////////////////////////////////////////////////
  // ツリーの作成(キーを利用する"children"と"title")
  //////////////////////////////////////////////////////////////////////////////
  function createBranch(directoryKey){
    // ディレクトリ名の取得
    var dirName = directoryKey.title
    // "children"の展開
    directoryKey.children.forEach(function(child){
      var childName = child.title
      var url       = child.url
      // まずはliタグを生成する
      var li = document.createElement("li")
      li.setAttribute("class", dirName)
      document.getElementById(dirName).appendChild(li)

      // ここから子要素の展開 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
      // ディレクトリの場合
      if(url === undefined){
        ulTagToAppend(li, childName)
        dirNameToBtn(dirName)
        // ディレクトリの中身を展開したい(引数のchildrenのキーを使って関数の繰り返し)
        // createBranch(child) // 再帰関数
      }
      // ブックマークの場合
      else{
        li.setAttribute("id", childName)
        createBookmarks(li, childName, url)
      }
    })
  }

  //////////////////////////////////////////////////////////////////////////////
  // ブックマークの作成
  //////////////////////////////////////////////////////////////////////////////

  function createBookmarks(liTag, bookName, url) {
    // fabicon取得のためドメインを抽出
    var domain = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
    // fabiconがあれば取得(chromeのURLなどはdomainを取得できてない)
    if (domain != null || domain != undefined) {
      domain = domain[1]
      var fabicon = "https://www.google.com/s2/favicons?domain=" + domain
    }
    else {
      var fabicon = ""
    }
    // ブックマークの生成
    imgTagToAppend(liTag, fabicon)
    aTagToAppend(liTag, bookName, url)
  }

  //////////////////////////////////////////////////////////////////////////////
  // タグを生成してappendする関数
  //////////////////////////////////////////////////////////////////////////////

  function ulTagToAppend(li, dirName){
    var ul = document.createElement("ul")
    ul.textContent = dirName
    ul.setAttribute("id", dirName)
    li.append(ul)
  }

  function aTagToAppend(li, bookName, url){
    var a  = document.createElement("a")
    a.href = url
    a.textContent = bookName
    a.setAttribute("target", "_blank") // 新しいタブで開かせる
    li.appendChild(a)
  }

  // fabiconの画像の表示
  function imgTagToAppend(liTag, fabicon){
    var img = document.createElement("img")
    img.src = fabicon
    liTag.appendChild(img)
  }


  //////////////////////////////////////////////////////////////////////////////
  // ディレクトリ名をボタン化する
  //////////////////////////////////////////////////////////////////////////////
  function dirNameToBtn(dirName){
    var dir = document.getElementById(dirName)
    dir.setAttribute("class", "btn")
    // 子要素取得→liタグのみ抽出
    var targetChildren = dir.getElementsByTagName("li")
    // イベントの記述
    dir.addEventListener("click", function (){
      // liの数だけループでclass名を追加していく
      for(var i in targetChildren){
        if(targetChildren[i].className == "hidden"){
          targetChildren[i].className = "visible"
        }
        else if(targetChildren[i].className == "visible"){
          targetChildren[i].className = "hidden"
        }
      }
    }, false)
  }
})
