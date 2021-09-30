import logger from "../../utils/logger"
import ROUTES from '../../static/routes';

const log = logger(ROUTES.emptyPage.logging,"EmptyPage")

const EmptyPage = () => (
  <div>
    <h1>Sorry This Page Does Not Exist :(</h1>
  </div>
);

export default EmptyPage