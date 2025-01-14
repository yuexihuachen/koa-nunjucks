import nunjucks from 'nunjucks';

class KoaNunjucks {
    protected env;
    constructor(params) {
        
        this.initialization()
    }

    initialization() {
        this.env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));
    }

    render() {

    }
}

const koaNunjucks = () => {
    return async (cxt, next) => {
        const koaNunjucksInstance = new KoaNunjucks({});
        cxt.render = koaNunjucksInstance.render.bind(koaNunjucks)
        await next()
    }
}

export default koaNunjucks;