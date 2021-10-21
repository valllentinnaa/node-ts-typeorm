import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Node TS API Skeleton with TypeORM',
      version: '0.0.1',
      description: 'Node TS API Skeleton with TypeORM by Coddess Ltd.',
    },
    servers: [
      {
        url: `${process.env.HOST}:${process.env.PORT}/api`,
        description: 'Server BaseURL',
      },
    ],
  },

  apis: ['swagger.yaml'],
}
