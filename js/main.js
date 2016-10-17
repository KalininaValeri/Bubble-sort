/**
 * Возвращает случайное целое число
 * @param min {number} минимальная граница
 * @param max {number} максимальная граница
 * @returns {*} - числовой
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Возвращает массив случайных целых чисел из 10 элементов
 * @returns {Array}
 */
function getRandomArray() {
    var array = [];

    for (i = 0; i < 10; ++i) {
        array[i] = getRandomInt(0, 100);
    }

    return array;
}

/**
 * Возвращает массив, который сформирован из элементов, записанных в input
 * @returns {Array} массив из чисел
 */
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

/**
 * Создание таблицы
 */
function createTable() {
    var array = getInputValue();
    var $tr = $('#table-item');

    $tr.find('td').remove();

    $('h4').text('Сортировка чисел');

    for (var i = 0; i < array.length; i++) {
        $tr.append('<td>' + array[i] + '</td>')
    }
}

/**
 * Устанавливает задержку на выполнение функции, и очищает интервал
 * @param callBack {function} функция, для которой нужен интервал
 * @param speed {number} время, размер интервала в миллисекундах
 */
function timeoutWrapper(callBack, speed) {
    var interval = setInterval(function () {
        callBack();
        clearInterval(interval);
    }, speed || 500);
}

/**
 * Вывод результата сортировки
 * формирует массив из значений ячеек таблицы, выводит в тег output
 */
function outputResult() {
    var arrayResult = [];
    var $arrayTd = $('#table-sort').find('td');

    $('#output').removeClass('invisible');

    $arrayTd.each(function (index, element) {
        arrayResult.push($(element).text());
    });

    $('output').text(arrayResult.join(', '));
}

function sortTable() {
    createTable();

    var $arrayTd = $('#table-sort').find('td');
    var lenghtArray = $arrayTd.length;

    /**
     * Функция запускает сортировку ячеек таблицы
     */
    function startFirstStep() {
        var i = 0;

        --lenghtArray; //длина массива уменьшается на 1, не сравниваем числа, которые уже были отсортированы

        /*
         проверяет когда выводить результат
         */
        if (lenghtArray == 0) {
            outputResult();
        }

        /**
         * Выполняет попарное сравнение и перемещение элементов в таблице
         */
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

        /***
         * новый шаг для сравнения элементов
         */
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
    $('#help').click(function () {
        $('.help-block').toggleClass('active');
    });

    $('#button-generate').click(function () {
        var array = getRandomArray();
        $('#input-src').val(array.join(', '));
    });

    $('#sorted-form').submit(function (e) {
        var $wrapperInput = $('.has-feedback');
        var input = $('#input-src').val();
        var re = /^-?\d+(,{1}(\s+)?(-?){1}\d+(\s+)?)+$/;

        e.preventDefault();

        $wrapperInput.removeClass('has-error has-success');

        if (!re.test(input)) {
            $wrapperInput.addClass('has-error');
            return;
        }

        $wrapperInput.addClass('has-success');
        sortTable();
    });
});