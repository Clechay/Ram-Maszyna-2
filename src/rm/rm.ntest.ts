import {RM} from './rm';
import { Memmory } from './memmory';
import { Firmware } from './firmware';

let rm = new RM(undefined,undefined,undefined);

it('rm', () => {
    rm = new RM(undefined,undefined,undefined);
    // console.log(rm.state_.mem.getAll());
    // console.log(rm.state_.mem.getAll()[24]);
    rm.firmware.parse("TEST\nHALT");
    console.log(rm.firmware.commands)
    rm.execute();
    // console.log(rm.state_.mem.getAll());
    // console.log(rm.state_.mem.getAll()[24]);
});