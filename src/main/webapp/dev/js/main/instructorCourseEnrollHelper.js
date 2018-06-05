/**
 * Retrieves updated column header order and generates a header string.
 *
 * Example: Changes this array ['Section', 'Team', 'Name', 'Email', 'Comments']
 * into a string = "Section|Team|Name|Email|Comments\n"
 *
 * @param handsontableColHeader
 * @returns {string} updated header string
 */
function getUpdatedHeaderString(handsontableColHeader) {
    const colHeaders = handsontableColHeader.join('|');
    return colHeaders.concat('\n');
}

/**
 * Retrieves user data rows rows in the spreadsheet interface and transforms it into a string.
 *
 * Null value from cell is changed to empty string after .join(). Filters empty rows in the process.
 *
 * Example:
 * 2 by 5 spreadsheetData (before)
 * ['TestSection1', 'Team1', 'null', 'test1@xample.com', 'test1comments']
 * ['TestSection2', null, 'TestName2', 'test2@example.com', null]
 *
 * 2 by 5 spreadsheetData (after)
 * "TestSection1|Team1||test1@xample.com|test1comments\n
 *  TestSection2||TestName2|test2@example.com|\n"
 *
 * @param spreadsheetData
 * @returns {string} user data rows
 */
function getUserDataRows(spreadsheetData) {
    // needs to check for '' as an initial empty row with null values will be converted to e.g. "||||" after .map
    return spreadsheetData.filter(row => (!row.every(cell => cell === null || cell === '')))
            .map(row => row.join('|'))
            .join('\n');
}

/**
 * Pushes data from spreadsheetDataRows into an array.
 * Facilitates the function loadData for the Handsontable instance.
 *
 * @param spreadsheetDataRows
 * @returns {Array} updated data
 */
function getUpdatedData(spreadsheetDataRows) {
    return spreadsheetDataRows.map(row => row.split('|'));
}

/**
 * Transforms the first uppercase letter of a string into a lowercase letter.
 * @param string
 * @returns {string} Handsontable column header in all lowercase letters
 */
function unCapitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 * Prepares students data to be filled in the spreadsheet interface. These data is stored in an array.
 * Facilitates the function loadData for the Handsontable instance.
 * @param studentsData
 * @param handsontableColHeader
 * @returns {Array} required student data
 */
function getExistingStudentsData(studentsData, handsontableColHeader) {
    const studentsDataList = [];
    studentsData.forEach((student) => {
        const tempStudentsData = [];
        handsontableColHeader.forEach((header) => {
            tempStudentsData.push(student[unCapitalizeFirstLetter(header)]);
        });
        studentsDataList.push(tempStudentsData);
    });
    return studentsDataList;
}

export {
    getUpdatedHeaderString,
    getUserDataRows,
    getUpdatedData,
    getExistingStudentsData,
};
