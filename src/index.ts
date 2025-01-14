import nunjucks from 'nunjucks';

type Opts = {
    watch: boolean;
    noCache: boolean;
}

type KoaParams = {
    searchPaths: string;
    opt: Opts
}

class KoaNunjucks {
    protected env;
    protected searchPaths = ;
    protected opts;
    constructor(params: KoaParams) {
        this.searchPaths = params.searchPaths;
        this.opts = params.opt;
        this.initialization()
    }

    initialization() {
        this.env = new nunjucks.Environment(new nunjucks.FileSystemLoader(this.searchPaths));
    }

    render() {

    }
}

const koaNunjucks = (searchPaths: string, opt: Opts) => {
    return async (cxt, next) => {
        const koaNunjucksInstance = new KoaNunjucks({
            searchPaths,
            opt
        });
        cxt.render = koaNunjucksInstance.render.bind(koaNunjucks)
        await next()
    }
}

export default koaNunjucks;