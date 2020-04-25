/**
 * singleQuote -> Aplica as apas simples.
 *
 * trailingComma -> No final dos objetos seja inserido a vírgula.
 *
 * arrowParens -> Não insere os parenteses nos parametros de uma arrow function,
 * quando temos apenas um parâmetro
 *
 * Para o ESLint ignorar esse arquivo, e não tentar tratá-lo. Vou criar um
 * .eslintignore.
 */

module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'avoid',
};
