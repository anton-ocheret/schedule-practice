import { boot } from 'quasar/wrappers';
import * as constants from 'src/constants';

export default boot(({ app }) => {
  app.config.globalProperties.$constants = constants;
});
