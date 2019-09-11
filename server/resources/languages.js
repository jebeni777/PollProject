module.exports = (entity) => {
    const languages = entity.table;

    return {
        index: async function (ctx, next) {
            await next;
            let result = await languages.getAll();
            ctx.body = result;
        },
        show: async function (ctx, next) {
            await next;
            let result = await languages.get(ctx.params.language);

            if (!result) {
                ctx.status = 404;
                ctx.body = 'Not Found';
            } else {
                ctx.body = result;
            }
        },
        create: async function (ctx, next) {
            await next;
            if (!ctx.request.body || !ctx.request.body.name) ctx.throw(400, '.name required');
            let language = (({ name, count }) => ({ name, count }))(ctx.request.body);
            await languages.create(language);
            ctx.status = 201;
            ctx.body = 'added!';
        }

        /**
         *
         * DELETE a cat
         *
         * destroy: async function(next) {
         *   //implement me!
         * }
         */

        /**
     *
     * UPDATE a cat
     *
     * update = async function(next) {
     *   //implement me!
     * }
     */
    }
}

module.exports.permissions = {
    default: [] //open permissions
}
