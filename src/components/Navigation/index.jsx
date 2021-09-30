import ROUTES from '../../static/routes';
import { Link, useLocation } from 'react-router-dom';

import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';

import {useState} from 'react';
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

import theme from '../../styles/theme'
import testperms from '../../utils/pathPermissions'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

const Nav = () => {
  const classes = useStyles()
  const [openSidbar,setOpenSidebar] = useState(false)
  const location = useLocation().pathname.split("/")
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)

  const toggleDrawer = (o) => (event) =>{
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenSidebar(o)
  }

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          onClick = {toggleDrawer(true)}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          size="large">
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
         {location[1].charAt(0).toUpperCase()+location[1].slice(1)}
        </Typography>
        {isEmpty(auth) && (<IconButton color="inherit" to = "/Login" component = {Link} size="large">
          <Icon>login</Icon>
        </IconButton>)}
        {!isEmpty(auth) && (<IconButton
          color="inherit"
          to = {ROUTES.profile.route}
          component = {Link}
          size="large">
          <Icon>account_circle</Icon>
        </IconButton>)}
      </Toolbar>
      <Drawer
        anchor="left"
        open={openSidbar}
        onClose={toggleDrawer(false)}
      >
        <List>
          {
            Object.entries(ROUTES).map(r => ( 
            testperms(r[1],isLoaded(auth),isEmpty(auth),profile,auth,true)  && 
              <ListItem onClick = {toggleDrawer(false,r[0])} key={r[1].route} button to={r[1].route} component={Link}>
                <ListItemText primary = {r[0]}/>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Nav