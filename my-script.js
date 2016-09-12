
var folderSelect = document.createElement('select');
var element = document.evaluate( '//*[@id="inside"]/div[1]/div[2]/div[3]/div[2]/div/div[1]' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

chrome.storage.sync.get('folders', function (val) {
    for(var i = 0; i < val.folders.length ; i++){
        var op = document.createElement('option');
        op.value = val.folders[i];
        op.innerHTML = val.folders[i];
        folderSelect.appendChild(op);
    }
});

element.appendChild(folderSelect);