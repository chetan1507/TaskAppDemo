module.exports = {
    config: {
        templatesRoot: 'scripts/scaffolds/service/templates',
        files: [
            {
                name: 'api',
                path: '/app/api/v1/',
                files: [
                    'create/route',
                    'all/route',
                    '[id]/update/route',
                    '[id]/delete/route',
                ]
            },
            {
                name: 'data-services',
                extn: '-data-service',
                path: '/data-services/',
                files: [
                    'index',
                    'types',
                ]
            },
            {
                name: 'services',
                extn: '-service',
                path: '/services/',
                files: [
                    'index',
                ]
            }
        ]
    },
};