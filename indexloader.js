/**
 * Created by ra16 on 12/09/2016.
 */
window.onload = function(){
    document.getElementById('submit').onclick = function () {
        var name = document.getElementById("folderInput").value;
        chrome.storage.sync.get({"folders": []}, function (val) {
            var f = val.folders;

            f.push(name);

            chrome.storage.sync.set({"folders": f}, function () {
                chrome.storage.sync.get('folders', function (val) {
                    console.log(val.folders);
                });
            })
        });
    }

    document.getElementById('clear').onclick = function(){
        chrome.storage.sync.clear(function(){
            alert("cleared");
        });
    }

    var folderSelect = document.getElementById('folderSelect');

    chrome.storage.sync.get('folders', function (val) {
        for(var i = 0; i < val.folders.length ; i++){
            var op = document.createElement('option');
            op.value = val.folders[i];
            op.innerHTML = val.folders[i];
            folderSelect.appendChild(op);
        }
    });


}