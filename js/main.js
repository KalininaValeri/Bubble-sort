function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray() {
    var array = [];

    for (i = 0; i < 9; ++i) {
        array[i] = getRandomInt(0, 100);
    }

    return array;
}

$(function () {
    $('#button-generate').click(function () {
        var array = getRandomArray();
        $('#input-src').val(array.join(', '));
    });
});