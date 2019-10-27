
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
chrome.bookmarks.getTree(function(bookmarks){
  var parent   = bookmarks[0].children[0]
  // titleは空なので自分で指定する、id属性と一致させる
  parent.title = "folder"
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
        // dirNameToBtn(dirName)
        // ディレクトリの中身を展開したい(引数のchildrenのキーを使って関数の繰り返し)
        createBranch(child) // 再帰関数
      }
      // ブックマークの場合
      else{
        li.setAttribute("id", childName)
        createBookmarks(li, childName, url)
      }
    })
  }

  //////////////////////////////////////////////////////////////////////////////
  // ディレクトリ名をボタン化する
  //////////////////////////////////////////////////////////////////////////////
  function dirNameToBtn(dirName) {
    // ディレクトリ名を持つ要素だけを抽出
    // クリックイベントを付与
    // クリックされたら子要素を表示する(切り替え)
    var target = document.getElementsByClassName(dirName)
    console.log(target)
    // 直下の子要素を取得→クラス名の転換
    // targetChildren.forEach(function(child){
    //   child.onClick() = function(){
    //     console.log(targetChildren)
    //   }
    // })
    // イベントの記述
    // dir.addEventListener("click", function (){
    //   // liの数だけループでclass名を追加していく
    //   for(var i in targetChildren){
    //     if(targetChildren[i].className == "hidden"){
    //       targetChildren[i].className = "visible"
    //     }
    //     else if(targetChildren[i].className == "visible"){
    //       targetChildren[i].className = "hidden"
    //     }
    //   }
    // }, false)
  }

  //////////////////////////////////////////////////////////////////////////////
  // ブックマークの作成
  //////////////////////////////////////////////////////////////////////////////

  function createBookmarks(parentTag, bookName, url) {
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
    imgTagToAppend(parentTag, fabicon)
    aTagToAppend(parentTag, bookName, url)
  }

  //////////////////////////////////////////////////////////////////////////////
  // タグを生成してappendする関数
  //////////////////////////////////////////////////////////////////////////////

  function ulTagToAppend(parentTag, dirName){
    var ul = document.createElement("ul")
    ul.textContent = dirName
    ul.setAttribute("id", dirName)
    parentTag.append(ul)
  }

  function aTagToAppend(parentTag, bookName, url){
    var a  = document.createElement("a")
    a.href = url
    a.textContent = bookName
    a.setAttribute("target", "_blank") // 新しいタブで開かせる
    parentTag.appendChild(a)
  }

  // fabiconの画像の表示
  function imgTagToAppend(parentTag, fabicon){
    var img = document.createElement("img")
    img.src = fabicon
    parentTag.appendChild(img)
  }
})
