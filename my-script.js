
var folderSelect = document.createElement('select');
folderSelect.id = "folderSelect";
var element = document.evaluate( '//*[@id="inside"]/div[1]/div[2]/div[3]/div[12]/div/div[1]' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

chrome.storage.sync.get('folders', function (val) {
    for(var i = 0; i < val.folders.length ; i++){
        var op = document.createElement('option');
        op.value = val.folders[i].name;
        op.innerHTML = val.folders[i].name;
        folderSelect.appendChild(op);
    }
});

folderSelect.onchange = function(){
    var foldername = folderSelect.options[folderSelect.selectedIndex].text;
    var image = window.location.pathname.split("/")[2];
    console.log(image);
    chrome.storage.sync.get({"folders": []}, function (val) {
        var f = val.folders;
        for(var i = 0; i < f.length; i++){
            console.log(f[i].name + " " + foldername);
            if(f[i].name == foldername){
                console.log(f[i].img.length);
                f[i].img[f[i].img.length] = image;
                break;
            }
        }

        chrome.storage.sync.set({"folders": f}, function () {
            chrome.storage.sync.get('folders', function (val) {
                console.log(val.folders);
            });
        });
    });
}

element.appendChild(folderSelect);