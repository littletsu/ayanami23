import { readdirSync } from 'fs';

const readjsdir = (path) => readdirSync(path).filter(f => f.split('.').pop() === 'js');

export default readjsdir;