import nunjucks from 'nunjucks';

type Opts = {
    watch: boolean;
    noCache: boolean;
}

class KoaNunjucks {
    protected env;
    protected searchPaths;
    protected opts;
    protected _ctx;
    constructor(searchPaths, opt, ctx) {
        this.searchPaths = searchPaths;
        this.opts = opt;
        this._ctx = ctx;
        this.initialization()
    }

    initialization() {
        this.env = new nunjucks.Environment(new nunjucks.FileSystemLoader(this.searchPaths));
    }

    async render(name, scope) {
        this._ctx.body = await new Promise((resolve, reject) => {
            this.env.render(name, scope, function(err, res) {
                if (err) {
                    reject(err)
                }
                resolve(res)
            });
        })
    }
}

const koaNunjucks = (searchPaths: string, opt: Opts) => {
    return async (ctx, next) => {
        const koaNunjucksInstance = new KoaNunjucks(searchPaths, opt, ctx);
        ctx.render = koaNunjucksInstance.render.bind(koaNunjucksInstance)
        await next()
    }
}

export {
    koaNunjucks
};