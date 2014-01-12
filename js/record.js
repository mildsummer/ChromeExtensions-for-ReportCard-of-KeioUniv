$(function () {
    var rows = document.getElementsByClassName("User")[1].childNodes[1].childNodes;
    var data = {}, //各科目のデータ（使っていない）
        category, credit = 0, re = /－？★/,
        record = {A: 0, B: 0, C: 0, D: 0, P: 0, F: 0, G: 0};
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
    $("tr:first").after("<tr><td><table><tbody><tr><td colspan='5'>取得単位</td><td colspan='2'>" + credit
                        + "</td></tr><tr><td colspan='7'>成績（科目数）</td></tr><tr><td>A</td><td>B</td><td>C</td><td>D</td><td>P</td><td>F</td><td>G</td></tr><tr><td>"
                        + record["A"] + "</td><td>"
                        + record["B"] + "</td><td>"
                        + record["C"] + "</td><td>"
                        + record["D"] + "</td><td>"
                        + record["P"] + "</td><td>"
                        + record["F"] + "</td><td>"
                        + record["G"] +"</td></tr></tbody></table></td></tr>");
});