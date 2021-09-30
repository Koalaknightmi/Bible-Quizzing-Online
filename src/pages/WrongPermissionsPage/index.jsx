import logger from "../../utils/logger"
import ROUTES from '../../static/routes';

const log = logger(ROUTES.wrongPermissionsPage.logging,"WrongPermissionsPage")

const WrongPermissionsPage = () => (
  <div>
    <h1>Sorry You Do Not Have Permission To Enter This Page</h1>
  </div>
);

export default WrongPermissionsPage