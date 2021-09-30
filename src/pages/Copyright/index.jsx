import makePagePrivate from "../../components/privatePage"
import logger from "../../utils/logger"
import ROUTES from '../../static/routes';

//const log = logger(ROUTES.home.logging,"Copyright")

const Copyright = () => (
  <div>
    <p>Scripture quotations taken from The Holy Bible, New International Version® NIV®
      Copyright © 1973 1978 1984 2011 by Biblica, Inc. TM
      Used by permission. All rights reserved worldwide.</p>
  </div>
);

export default makePagePrivate(Copyright,"Copyright")