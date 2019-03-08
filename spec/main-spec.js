const printInventory = require('../main/main');

describe('pos', function () {
    var inputs;

    beforeEach(function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3(元)，小计：15(元)\n' +
            '名称：荔枝，数量：2斤，单价：15(元)，小计：30(元)\n' +
            '名称：方便面，数量：3袋，单价：4.5(元)，小计：13.5(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：2瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：58.5(元)\n' +
            '节省：10.5(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });

    xit('should get correct orderInfo', function () {
        result = printInventory(inputs);

        var expectText = [{id:'ITEM000001',count:5},{id:'ITEM000003',count:2},{id:'ITEM000005',count:3}];

        expect(result).toEqual(expectText);
    });

    xit('should get correct orderInfo', function () {
        result = printInventory(inputs);

        var expectText = [
            {id:'ITEM000001',count:5, name:'雪碧', unit:'瓶', price:3.00},
            {id:'ITEM000003',count:2, name:'荔枝', unit:'斤', price:15.00},
            {id:'ITEM000005',count:3, name:'方便面', unit:'袋', price:4.50}
        ];

        expect(result).toEqual(expectText);
    });

    xit('should get correct orderInfo', function () {
        result = printInventory(inputs);

        var expectText = [
            {name:'雪碧', count:2, unit:'瓶', },
            {name:'方便面', count:1, unit:'袋', }
        ];

        expect(result).toEqual(expectText);
    });
});
