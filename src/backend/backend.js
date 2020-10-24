const { ipcMain } = require('electron');
const sys = require('node-os-utils');
const sis  = require('systeminformation');

ipcMain.on('cpu-info', async (event,data) => {
    let cpu = await sis.cpu().then(data => data);
    event.reply('cpu-reply',  cpu)
});

ipcMain.on('cpu-percentage', async (event,data) => {
    let cpuCurrentSpeed = await sys.cpu.usage().then(res => res);
    event.reply('cpu-percentage-reply',  cpuCurrentSpeed);
});

ipcMain.on('mem-info', async (event,data) => {
    let mem = await sys.mem.info().then(data => data);
    event.reply('mem-reply',  mem);
});

ipcMain.on('mem-percentage', async (event,data) => {
    let memLayout = await sis.memLayout().then(data => data);
    event.reply('mem-percentage-reply',  memLayout);
});

ipcMain.on('graphics-info', async (event,data) => {
    let graphics = await sis.graphics().then(data => data);
    event.reply('graphics-reply',  graphics);
});

ipcMain.on('disk-info', async (event,data) => {
    let diskLayout = await sis.diskLayout().then(data => data);
    let disk = await sis.fsSize().then(data => data);
    event.reply('disk-reply',  {disk: disk, diskLayout: diskLayout});
});

ipcMain.on('export-machine', async (event,data) => {
    let dados = [];
    let cpu = await sis.cpu().then(data => data);
    let mem = await sys.mem.info().then(data => data);
    let memLayout = await sis.memLayout().then(data => data);
    let graphics = await sis.graphics().then(data => data);
    let diskLayout = await sis.diskLayout().then(data => data);
    let disk = await sis.fsSize().then(data => data);
    dados.push({cpu:cpu,mem:mem,memLayout:memLayout,graphics:graphics,disk:disk,diskLayout:diskLayout});
    event.reply('export-reply', dados);
})