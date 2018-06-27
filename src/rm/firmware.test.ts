import { Firmware, Command, DataTokenType, DataToken } from './firmware';

let validCmds = [
    'asa: AS 1333',
    'asa: AS ^1424',
    'asa: AS =1343',
    'asa: AS .ser',
    'asa: AS',
    'AS 1333',
    'AS ^1424',
    'AS =1343',
    'AS .ser',
    'AS'
];
let validCmdsInfo = [
    {arg: ['1333'], id: ['AS'], label: ['asa'], raw: 'asa: AS 1333'},
    {arg: ['^1424'], id: ['AS'], label: ['asa'], raw: 'asa: AS ^1424'},
    {arg: ['=1343'], id: ['AS'], label: ['asa'], raw: 'asa: AS =1343'},
    {arg: ['.ser'], id: ['AS'], label: ['asa'], raw: 'asa: AS .ser'},
    {arg: null, id: ['AS'], label: ['asa'], raw: 'asa: AS'},
    {arg: ['1333'], id: ['AS'], label: null, raw: 'AS 1333'},
    {arg: ['^1424'], id: ['AS'], label: null, raw: 'AS ^1424'},
    {arg: ['=1343'], id: ['AS'], label: null, raw: 'AS =1343'},
    {arg: ['.ser'], id: ['AS'], label: null, raw: 'AS .ser'},
    {arg: null, id: ['AS'], label: null, raw: 'AS'},
];
it('regex cmd validity', () => {
    validCmds.forEach((e) => {
        expect(Command.checks.valid.test(e)).toBe(true);
    });
});
it('regex extraction', () => {
    validCmdsInfo.forEach((e) => {
        expect(e.raw.match(Command.checks.label)).toEqual(e.label);
        expect(e.raw.match(Command.checks.argument)).toEqual(e.arg);
        expect(e.raw.match(Command.checks.id)).toEqual(e.id);
    });
});
it('regex arg type', () => {
    expect(DataToken.checks.ADDRESS_TO_NUMBER.test('1333')).toBe(true);
    expect(DataToken.checks.ADDRESS_TO_NUMBER.test('=1333')).toBe(false);
    expect(DataToken.checks.ADDRESS_TO_NUMBER.test('^1333')).toBe(false);
    expect(DataToken.checks.ADDRESS_TO_NUMBER.test('.ser')).toBe(false);

    expect(DataToken.checks.ADDRESS_TO_ADDRESS.test('1333')).toBe(false);
    expect(DataToken.checks.ADDRESS_TO_ADDRESS.test('=1333')).toBe(false);
    expect(DataToken.checks.ADDRESS_TO_ADDRESS.test('^1333')).toBe(true);
    expect(DataToken.checks.ADDRESS_TO_ADDRESS.test('.ser')).toBe(false);

    expect(DataToken.checks.NUMBER.test('1333')).toBe(false);
    expect(DataToken.checks.NUMBER.test('=1333')).toBe(true);
    expect(DataToken.checks.NUMBER.test('^1333')).toBe(false);
    expect(DataToken.checks.NUMBER.test('.ser')).toBe(false);

    expect(DataToken.checks.LABEL.test('1333')).toBe(false);
    expect(DataToken.checks.LABEL.test('=1333')).toBe(false);
    expect(DataToken.checks.LABEL.test('^1333')).toBe(false);
    expect(DataToken.checks.LABEL.test('.ser')).toBe(true);
});

let someCode = 'TEST\n// some happy comment\nHALT';
let someCodeNoHalt = 'TEST\n// some happy comment';

it('text from firmware', () => {
    let fw = new Firmware(someCode);
    expect(someCode).toEqual(fw.text());
});
it('auto HALT addition', () => {
    let fw = new Firmware(someCodeNoHalt);
    expect(someCodeNoHalt + '\nHALT').toEqual(fw.text());
});