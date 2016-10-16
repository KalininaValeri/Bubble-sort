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

    return array;
}

function createTable() {
    var array = getInputValue();
    var $tr = $('#table-item');

    $tr.find('td').remove();

    $('h4').text('Сортировка чисел');

    for (var i = 0; i < array.length; i++) {
        $tr.append('<td>' + array[i] + '</td>')
    }
}

function timeoutWrapper(callBack, speed) {
    var interval = setInterval(function () {
        callBack();
        clearInterval(interval);
    }, speed || 500);
}

function checkElements(item1, item2) {
   
}

function sortTable() {
    //todo сжечь огнем
    // $('#input-src').val('88, 13, 87, 18, 54, 48, 7, 47, 65, 59');
    createTable();

    var $arrayTd = $('#table-sort').find('td');
    var lenghtArray = $arrayTd.length;

    function startFirstStep() {
        var i = 0;

        --lenghtArray;

        function sort() {
            $arrayTd.removeClass('danger warning');

            if (i < lenghtArray) {
                var $item1 = $($arrayTd[i]);
                var $item2 = $($arrayTd[i + 1]);
                var value1 = Number($item1.text());
                var value2 = Number($item2.text());

                $item1.addClass('warning');
                $item2.addClass('warning');


                if (value1 > value2) {
                    timeoutWrapper(function () {
                        $item1.removeClass('warning');
                        $item1.addClass('danger');
                        $item2.removeClass('warning');
                        $item2.addClass('danger');

                        $item1.text(value2);
                        $item2.text(value1);

                        newIteration();
                    }, 400);

                    return;
                }
            }

            newIteration();
        }
        
        function newIteration() {
            if (i < lenghtArray) {
                i++;
                timeoutWrapper(sort, 400);
            } else {
                $($arrayTd[lenghtArray]).addClass('success');
                if (lenghtArray > 0) timeoutWrapper(startFirstStep, 400);
            }
        }

        sort();
    }

    startFirstStep();
}

$(function () {
    $('#button-generate').click(function () {
        var array = getRandomArray();
        $('#input-src').val(array.join(', '));
    });

    $('#sorted-form').submit(function (e) {
        e.preventDefault();
        sortTable();
    });


});