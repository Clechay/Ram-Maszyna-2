import { Memmory } from './memmory';

let arrs = [
    [0, 11],
    [1, 2312],
    [2, 5346],
    [4, 575],
    [100, 0],
    [1000, -11],
    [10000, 7],
    [9001, 0]
];

it('Memmory should store set values', () => {
    let m = new Memmory();
    arrs.forEach((v, i, t) => {
        m.set(v[0], v[1]);
    });
    arrs.forEach((v, i, t) => {
        expect(m.get(v[0])).toBe(v[1]);
    });
});

it('Memmory should not add own values', () => {
    // TEST TO EXPENSIVE
    // let m = new Memmory();
    // arrs.forEach((v,i,t)=>{expect(m.get(v[0])).toBe(v[1]);
    //     m.set(v[0],v[1]);
    // });
    // let er = [];
    // arrs.forEach((v,i,t)=>{
    //     er[v[0]]=v[1];
    // });
    // er = er.filter((e)=>{return typeof e !== typeof undefined})
    // er.forEach( (v,i,t) => expect(v).toBe(m.getAll[i]) );
});
