console.log('Start');

process.nextTick(() => {
    console.log('Inside nextTick');
});
setImmediate(()=>{
    console.log('setImmediate');
});
console.log('End');
