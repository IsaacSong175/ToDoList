$(function () {
    load();
    $('#title').on("keydown", function (event) {
        if (event.keyCode === 13) {
            var local = getData();
            local.push({ title: $(this).val(), done: false });
            saveData(local);
            load();
        }
    });

    $("ol").on("click", "a", function () {
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveData(data);
        load();
    });

    $("ul,ol").on("click", "input", function () {
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
    });

    function getData() {
        var data = localStorage.getItem("todolist");
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    function load() {
        var data = getData();
        $("ol").empty();
        $("ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        $.each(data, function (indexInArray, valueOfElement) {
            if (valueOfElement.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + valueOfElement.title +
                    "</p><a href='javscript:;' id=" + indexInArray + " ></a ></li > ");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + valueOfElement.title +
                    "</p><a href='javscript:;' id=" + indexInArray + " ></a ></li > ");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }


})