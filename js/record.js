$(function () {
    var rows = document.getElementsByClassName("User")[1].childNodes[1].childNodes;
    var data = {}, category, credit = 0, re = /－？★/,
        record = {
            A: 0,
            B: 0,
            C: 0,
            D: 0,
            P: 0,
            F: 0,
            G: 0
        }
    for (var i = 1, l = rows.length; i < l; i++) {
        var cells = rows[i].childNodes;
        if (cells.length == 2) {
            category = cells[0].innerText.substring(12);
            data[category] = {}
            data[category]["credit"] = parseInt(cells[1].innerText.substring(5));
            credit += data[category]["credit"];
        } else if (cells.length == 8) {
            var course = cells[0].innerText.substring(1);
            data[category][course] = {};
            data[category][course]["teacher"] = cells[1].innerText;
            if (!cells[2].innerText.match(re)) {
                data[category][course]["record"] = String.fromCharCode(cells[2].innerText.charCodeAt(0) - 0xFEE0);
                record[data[category][course]["record"]]++;
            }
            data[category][course]["credit"] = parseInt(cells[3].innerText);
            data[category][course]["year"] = parseInt(cells[5].innerText);
            data[category][course]["term"] = cells[6].innerText;
            data[category][course]["grade"] = parseInt(cells[7].innerText);
        }
    }
    $("tr:first").after("<tr><td>取得単位:" + credit + "<br /><br />成績（科目数）<br />A:" + record["A"] + "  B:" + record["B"] + "  C:" + record["C"] + "  D:" + record["D"] + "  P:" + record["P"] + "  F:" + record["F"] + "  G:" + record["G"]+"</td></tr>");
});