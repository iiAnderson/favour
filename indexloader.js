/**
 * Created by ra16 on 12/09/2016.
 */
window.onload = function(){
    document.getElementById('submit').onclick = function () {
        var foldername = document.getElementById("folderInput").value;
        var obj = {};
        obj.name = foldername;
        obj.img = [];
        chrome.storage.sync.get({"folders": []}, function (val) {
            var f = val.folders;

            f.push(obj);

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
            op.value = val.folders[i].name;
            op.innerHTML = val.folders[i].name;
            folderSelect.appendChild(op);
        }
    });


    folderSelect.onchange = function (){
        var foldername = folderSelect.options[folderSelect.selectedIndex].text;
        chrome.storage.sync.get('folders', function(val){
            for(var i = 0; i < val.folders.length ; i++){
                var fldr = val.folders[i].img;
                for(var j = 0; j < fldr.length; j++){
                    var image = fldr[j];
                    var label = document.createElement('label');
                    label.innerHTML = fldr + " > " + image;
                    document.getElementById('imgdiv').appendChild(label);
                }
            }
        });
    }


}