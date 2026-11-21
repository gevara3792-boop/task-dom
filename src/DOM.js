/**
 * Вставляет на страницу указанный тег с указанным содержимым указанное число раз.
 *
 * @param {string} tag - имя тега (например, 'p', 'div')
 * @param {string} content - текстовое содержимое
 * @param {number} count - количество вставок
 */
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const element = document.createElement(tag);
        element.textContent = content;
        document.body.appendChild(element);
    }
}

/**
 * Создает дерево вложенных тегов DIV.
 *
 * @param {number} childrenCount - количество дочерних элементов в каждом узле
 * @param {number} level - общая глубина дерева
 * @param {number} currentLevel - текущий уровень вложенности (для рекурсии, по умолчанию 1)
 * @returns {HTMLElement} корневой элемент дерева
 */
export function generateTree(childrenCount, level, currentLevel = 1) {
    // Создаем текущий узел div и задаем ему класс
    const div = document.createElement('div');
    div.className = `item_${currentLevel}`;

    // Если мы еще не достигли максимальной глубины, создаем потомков
    if (currentLevel < level) {
        for (let i = 0; i < childrenCount; i++) {
            // Рекурсивно вызываем функцию для следующего уровня
            const childNode = generateTree(
                childrenCount,
                level,
                currentLevel + 1,
            );
            div.appendChild(childNode);
        }
    }

    return div;
}

/**
 * Создает дерево (3 уровня, 2 элемента в каждом),
 * заменяет все узлы второго уровня на теги SECTION
 * и возвращает результат.
 *
 * @returns {HTMLElement} корневой элемент дерева
 */
export function replaceNodes() {
    // 1. Создаем дерево с вложенностью 3 и числом элементов в узле 2
    const root = generateTree(2, 3);

    // 2. Находим все элементы второго уровня (класс item_2)
    // Используем querySelectorAll. Так как root еще не в документе,
    // querySelectorAll найдет всех потомков внутри этого дерева.
    const itemsToReplace = root.querySelectorAll('.item_2');

    // 3. Заменяем каждый найденный div на section
    itemsToReplace.forEach((divNode) => {
        // Создаем новый тег SECTION
        const section = document.createElement('section');

        // Копируем класс
        section.className = divNode.className;

        // Переносим всех детей из старого div в новый section
        // (важно сохранить вложенность item_3)
        while (divNode.firstChild) {
            section.appendChild(divNode.firstChild);
        }

        // Заменяем старый div на новый section в дереве
        divNode.parentNode.replaceChild(section, divNode);
    });

    return root;
}
