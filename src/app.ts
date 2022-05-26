import express from 'express';
import bodyParser from 'body-parser';
import {Request, Response} from 'express'; //With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.
import {Routes} from './routes';
import morgan from 'morgan'; //HTTP request logger middleware for node.js
import {validationResult} from 'express-validator'; //request validation
import swaggerUi from 'swagger-ui-express';

function handleError(err, _req, res) {
  res.status(err.statusCode || 500).send(err.message);
}

const app = express();

app.use('/dev/api-docs/files', express.static('public'));
app.use(
  '/dev/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/dev/api-docs/files/swagger.json',
    },
  })
);

app.use(morgan('combined'));
app.use(bodyParser.json());

Routes.forEach(route => {
  (app as any)[route.method](
    route.route,
    ...route.validation,
    async (req: Request, res: Response, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }

        const result = await new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        res.json(result);
      } catch (err) {
        next(err);
      }
    }
  );
});

app.use(handleError);

export default app;
