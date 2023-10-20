const requestHandler=(req,res)=>{
    const url=req.url;
    if(url==='/'){
        res.setHeader('content-type','text/html')
        res.write('<h1>Hello</h1><br><br>')
        res.write('<form method="POST" action="/create-user"><input name="user" type="text"><button type="submit">Create</button></form>')
        return res.end()
    }
    if(url==='/users'){
        let li='';
        for(let i=0;i<10;i++){
            li+=`<li>User ${i+1}</li>`
        }
        res.setHeader('content-type','text/html')
        res.write(li)
        return res.end()
    }

    if(url==='/create-user' && req.method==='POST'){
        const body=[]
        req.on('data',(chunk)=>{
            body.push(chunk)
        })

        return req.on('end',()=>{
            const parsed=Buffer.concat(body).toString()
            console.log(parsed)
            res.statusCode=302
            res.setHeader('location','/')
            return res.end()
        })
    }    
}

exports.handler=requestHandler;