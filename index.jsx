
var data = [
    {
        "page": 6,
        "master": "A-index",
        "note": "章頭",
        "caption": "",
        "photo1": "",
        "photo2": "",
        "title": "タイトル",
        "subtitle": "サブタイトル",
        "lead": "リード文"
    },
    {
        "page": 7,
        "master": "A-photo",
        "note": "ページ",
        "caption": "ページキャプtション",
        "photo1": "写真.psd",
        "photo2": "",
        "title": "",
        "subtitle": "",
        "lead": ""
    }
];

var myDocument = app.activeDocument;

var start = 240;
var end = 265;

for (var i = start; i < end; i++) {

    var page = myDocument.pages.add(LocationOptions.AFTER, myDocument.pages[i]);

    var dataObj = data[i];
    var master = dataObj["master"];
    var path = "/path/to/img/";

    var side;
    var pos;
    if (page.side == PageSideOptions.RIGHT_HAND) {
        side = "R";
        pos = 1;
    } else if (page.side == PageSideOptions.LEFT_HAND) {
        side = "L";
        pos = 0;
    }

    // master適用とoverride
    if (master != "none") {
        page.appliedMaster = myDocument.masterSpreads.item(master);
        var masterPage = page.appliedMaster.pages.item(pos);
        var masterPageItems = masterPage.allPageItems;

        for (var j = 0; j < masterPageItems.length; j++) {
            var item = masterPageItems[j];
            var v = item.isValid;
            if (item.isValid) {
                item.override(page);
            }
        }
    }

    // photoPageでcaption適用
    if (master != "none" && master != "A-index") {
        var tf = page.textFrames.itemByName("caption");
        tf.contents = dataObj["caption"];
    }

    // 単一
    if (master == "A-photo" || master == "B-photo" || master == "D-photo" || master == "E-photo") {
        var rect = page.rectangles.itemByName("photo1");
        var photoPath1 = path + dataObj["photo1"];
        rect.place(photoPath1);
        rect.fit(FitOptions.FILL_PROPORTIONALLY);
    }

    // 複数
    if (master == "C-photo") {
        var rect1 = page.rectangles.itemByName("photo1");
        var photoPath1 = path + dataObj["photo1"];
        rect1.place(photoPath1);
        rect1.fit(FitOptions.FILL_PROPORTIONALLY);

        var rect2 = page.rectangles.itemByName("photo2");
        var photoPath2 = path + dataObj["photo2"];
        rect2.place(photoPath2);
        rect2.fit(FitOptions.FILL_PROPORTIONALLY);
    }

    if (master == "F-photo" || master == "G-photo") {
        var rect = page.rectangles.itemByName("photo" + side + "1");
        var photoPath1 = path + dataObj["photo1"];
        rect.place(photoPath1);
        rect.fit(FitOptions.FILL_PROPORTIONALLY);
    }

    if (master == "A-index") {
        var title = page.textFrames.itemByName("title");
        title.contents = dataObj["title"];

        var subtitle = page.textFrames.itemByName("subtitle");
        subtitle.contents = dataObj["subtitle"];

        var lead = page.textFrames.itemByName("lead");
        lead.contents = dataObj["lead"];
    }

}
