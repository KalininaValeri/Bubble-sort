function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray() {
    var array = [];

    for (i = 0; i < 10; ++i) {
        array[i] = getRandomInt(0, 100);
    }

    return array;
}

function getInputValue() {
    var value = $('#input-src').val();
    var array = [];

    value = value.replace(/ /g, '');
    array = value.split(',');

    for (var i = 0; i < array.length; i++) {
        array[i] = Number(array[i]);
    }
    console.log(array);

    return array;
}

function createTable() {
    var array = getInputValue();
    var $tr = $('#table-item');

    for (var i = 0; i < array.length; i++) {
        $tr.append('<td>' + array[i] + '</td>')
    }


}

$(function () {
    $('#button-generate').click(function () {
        var array = getRandomArray();
        $('#input-src').val(array.join(', '));
    });
});