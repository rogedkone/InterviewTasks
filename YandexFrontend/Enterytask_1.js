"use strict";

let input_text = ` // Тестовый инпут
= head
= Our country in the dangerous!
In my best shop you can buy anything
In my best shop ((https://ya.ru link)) you can buy anything
In our best shops ((https://ya.ru huelink)) and in the ((https://our.ru twolink)) newer forget this
* item
* item
* item
Check Final Paragraph
`;
// Сначала делим страницу, построчно. Для прохождения циклом.
function converterTextToHtml(str) { // Конвертирует текст в html код
    let last_item = "None"
    let page_array = converterMultilineToArray(str); //Конвертируем полученный многострочный текст в построчный массив
    let result = []
    //alert(page_array, last_item, result)
    for (let i = 0; i < page_array.length; i++) { //сканируем полученный текст
        if (page_array[i] == "") { // если получили пустую строку, пропускаем чтение.
            last_item = "None"
            continue
        } else if (page_array[i].indexOf("= ") == 0) { // Если строка начинается с объявления заголовка, применяем функцию коверта
            result += converterTextToHead(page_array[i]) // Возвращает заголовок и прибавляет его у итогу
            last_item = "Head"
        } else if (page_array[i][0].match(/[a-zA-Z]/)) { // Проверяет, является ли первый символ строки текстом.
            result += converterTextToParagraph(page_array[i]) // Конвертирует текст в параграф
            last_item = "Paragraph"
        } else if (page_array[i].indexOf("* ") == 0 && last_item != "List") {
            result += converterTextToList(page_array[i])
            last_item = "List"
        } else if (page_array[i].indexOf("* ") == 0 && last_item == "List") {
            result = result.slice(0, -5)
            result += converterTextToList(page_array[i], last_item)
            last_item = "List"
        }
    }
    return result;
};

function converterMultilineToArray(str) { // Превращаем страницу в строки.
    return str.split("\n");
};

function converterTextToHead(str) { // Конвертируем = Head в заголовок.
    return "<h1>" + str.slice(2) + "</h1>";
};

function converterTextToParagraph(str) { // Конвертируем любой текст в параграф/ы
    if (str.indexOf("((") == -1) {
        return "<p>" + str + "</p>";
    } else {
        let result = ""
        str = str.split(" ")
        for (let i = 0; i < str.length; i++) { // Работает с ссылками и параграфами
            if (str[i].indexOf("((") == -1 && str[i].indexOf("))") == -1) {
                result += str[i] + " "
            } else {
                result += converterLinkToHtml(str[i]) // Конвертируем ссылки в хтмл теги
            }
        }
        return "<p>" + result + "</p>"
    }

};

function converterLinkToHtml(str) { // Конвертируем ссылки в хтмл теги
    if (str.indexOf("((") != -1) {
        return '<a href="' + str.slice(2) + '">'
    } else if (str.indexOf("))") != -1) {
        return str.slice(0, -2) + "</a>"
    }
};

function converterTextToList(str, last_item="None") { // Конвертируем * item в списки
    if (last_item != "List") {
        return "<ul><li>" + str.slice(2) + "</li></ul>"
    } else if (last_item == "List") {
        return "<li>" + str.slice(2) + "</li></ul>"
    }
};

alert(converterTextToHtml(input_text)); // вывод
