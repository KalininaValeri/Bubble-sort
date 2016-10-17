/**
 * Возвращает случайное целое число
 * @param min - числовой, минимальная граница
 * @param max - числовой, максимальная граница
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
 * @returns {Array} массив ищ чисел
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
 * Обращается к функции getInputValue и результат записывает в переменную array
 * Добавляет текст в тег h4
 * для каждого эелемента массива array добавляет узел td со значением элемента массива
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
 * Устанавливает setInterval на функцию callBack, и сразу очищает интервал
 * @param callBack {function} функция, для которой нужен интервал
 * @param speed {number}
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

    /**
     * Функция запускает сортировку ячеек таблицы
     */
    function startFirstStep() {
        var i = 0;

        --lenghtArray; //при каждом повторении функции startFirstStep длина массива уменьшается на 1,
                        // для того, что бы не сравнивать числа, которые уже были добавлениы в конец таблицы

        /*
        проверяет когда выводить результат
         */
        if (lenghtArray == 0){
            outputResult();
        }

        /**
         * Выполняет попарное сравнение и перемещение элементов в таблице
         * проверяет первое условие, если кол-во сравнений меньше, чем длина массива, то берем два элемета и присваем класс warning
         * проверяет второе уловие если текущий элемент больше предыдущего, то присвоють класс danger и поменять эелементы местами
         * если первое условие не выполняется, то запускает функцию newIteration, т.е переходит на следующий этап
         * попарного сравнения элементов
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
         * i = 0 и с каждым шагом увеличивает значение на 1
         * если кол-во попарных сравнений элементов меньше, чем длина массива, то запускается функцмя sort с задержкой 400млс
         * иначе последнему элементу присвается класс success и проверяется условие, что длина массива больше нуля
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

        sort(); // запускается фукция sort
    }

    startFirstStep(); // запускается фукция startFirstStep
}

$(function () {
    /**
     * Слушатель на кнопку "генерировать"
     */
    $('#button-generate').click(function () {
        var array = getRandomArray();
        $('#input-src').val(array.join(', '));
    });

    /**
     * Обработчик формы (submit)
     */
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