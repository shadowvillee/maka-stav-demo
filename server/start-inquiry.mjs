// Separate server deployment; GitHub Pages and the current static Site do not run this file.
import {createServer} from 'node:http';
import {Readable} from 'node:stream';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {buildCatalog} from '../poptavka/catalog.mjs';
import {createInquiryHandler,createMailRelay} from './inquiry-handler.mjs';
const context={window:{}};
vm.runInNewContext(await readFile(new URL('../content-data.js',import.meta.url),'utf8'),context);
const allowedOrigins=(process.env.INQUIRY_ALLOWED_ORIGINS||'').split(',').map(s=>s.trim()).filter(Boolean);
if(!allowedOrigins.length)throw Error('Set INQUIRY_ALLOWED_ORIGINS to the exact public frontend origin(s).');
const handle=createInquiryHandler({catalog:buildCatalog(context.window.MAKA_CONTENT),allowedOrigins,deliver:createMailRelay({url:process.env.MAIL_RELAY_URL,token:process.env.MAIL_RELAY_TOKEN})});
createServer(async(req,res)=>{try{
 if(req.url!=='/api/inquiry'){res.writeHead(404);res.end();return;}
 const headers=new Headers();for(const [name,value] of Object.entries(req.headers))if(value)headers.set(name,Array.isArray(value)?value.join(','):value);
 const request=new Request('http://inquiry.internal/api/inquiry',{method:req.method,headers,...(['GET','HEAD'].includes(req.method)?{}:{body:Readable.toWeb(req),duplex:'half'})});
 const reply=await handle(request,req.socket.remoteAddress);res.writeHead(reply.status,Object.fromEntries(reply.headers));res.end(Buffer.from(await reply.arrayBuffer()));
 }catch{res.writeHead(500,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end('{"ok":false,"error":"INTERNAL_ERROR"}');}
}).listen(Number(process.env.INQUIRY_PORT||8787),process.env.INQUIRY_HOST||'127.0.0.1',()=>console.log('Inquiry endpoint started. Delivery depends on private relay configuration.'));
