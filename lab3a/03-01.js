const http=require('http');
global.state='norm';
global.oldState='norm';

http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.end('<html><body><h1>' + state + '</h1></body></html>');
}).listen(5000, () => console.log('Server running at localhost:5000'));

const stdin = process.openStdin();
stdin.addListener('data',(cmd)=>
{
   let arg=cmd.toString().trim();

    if (arg === 'norm' || arg === 'test' || arg === 'stop' || arg === 'idle')
    {
        oldState=state;
        state=arg;
        process.stdout.write(oldState + ' ---> ' + state + '\n');
    }
    else if (cmd.toString().trim()==='exit')
        process.exit(0);
    else
        process.stdout.write('Enter one of the commands: norm, stop, test, idle or exit\n');
});