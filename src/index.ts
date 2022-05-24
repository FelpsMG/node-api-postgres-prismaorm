import {port} from './configs/config';
import app from './app';

try {
  app.listen(port);
  console.log('Express server has started.');
} catch {
  error => {
    console.log(error);
  };
}
