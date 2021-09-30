import makePagePrivate from "../../components/privatePage"
import logger from "../../utils/logger"
import ROUTES from '../../static/routes';

const log = logger(ROUTES.wordPage.logging,"WordPage")

const WordPage = () => {
  
  return(
    <div>
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  )
};

export default makePagePrivate(WordPage,"wordPage")