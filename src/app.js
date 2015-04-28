import koa from 'koa';
import fs from 'fs';
import Q from 'q';
import views from 'co-views';

const render = views(__dirname + '/views', { ext: 'ejs' });

let app = koa();

function myAsync(ala, done) {
    console.log(arguments);
    done(null, []);
}

app.use(function *(next){
    let articlesContent = yield Q.ninvoke(fs, 'readFile', __dirname + '/data/articles.json');
    let articles = JSON.parse(articlesContent);
    
    this.body = yield render('index', { articles: articles });
});

export function start(port=3000) {
    app.listen(port);
}
