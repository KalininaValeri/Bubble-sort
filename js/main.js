/**
 * Название функции, описание
 * @param min - тип данных
 * @param max - тип данных
 * @returns {*} - тип данных
 */
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

function outputResult() {
    var arrayResult = [];
    var $arrayTd = $('#table-sort').find('td');

    $('#output').removeClass('invisible');

    $arrayTd.each (function(index, element) {
        arrayResult.push($(element).text());
        console.log(arrayResult);
    });

    $('output').text(arrayResult.join(', '));
}

function sortTable() {
    createTable();

    var $arrayTd = $('#table-sort').find('td');
    var lenghtArray = $arrayTd.length;

    function startFirstStep() {
        var i = 0;

        --lenghtArray;
        if (lenghtArray == 0){
            outputResult();
        }

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
        var $error = $('.error-empty');
        e.preventDefault();

        if ( $('#input-src').val() === ''){
            $error.addClass('active');
            return;
        }

        $error.removeClass('active');
        sortTable();
    });


});