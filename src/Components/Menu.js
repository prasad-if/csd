import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SyncIcon from '@material-ui/icons/Sync';
import TranslateIcon from '@material-ui/icons/Translate';
import {LocaleConfig} from "./Config";
import { signOut } from '../store/Actions/SignOutAction'
import { connect } from 'react-redux';
import { SyncAllSurveys, SyncAllConfFiles, SaveLocale } from './Util'

const useStyles = makeStyles(theme => ({
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
  },
  list: {
    width: 250,
  },
  selected: {
    color: 'red'
  }
}));

function Menu(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    user: {},
    userlang: "_en"
  });

  const changeLang = (lang) => {
    console.log(props)
    setState({...state, user: props.user, userlang: lang});
    SaveLocale(props.user, lang)
  }

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div className={classes.list} role="presentation">
      <List>
        {LocaleConfig.languages.map((item, index) =>(
          <ListItem button key={item.id} style={props.lang === item.id ? {color:'red'}: null} onClick={() => changeLang(item.id)}>
            <ListItemIcon><TranslateIcon /></ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
      <ListItem button key='Sync1' onClick={() => SyncAllSurveys(props.username)}>
        <ListItemIcon><SyncIcon /></ListItemIcon>
        <ListItemText primary='Sync Surveys' />
      </ListItem>

      <ListItem button key='Sync2' onClick={() => SyncAllConfFiles()}>
        <ListItemIcon><SyncIcon /></ListItemIcon>
        <ListItemText primary='Sync Questionnaires' />
      </ListItem>

      <ListItem button key='exit' onClick={props.signOut}>
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>

      <MenuIcon color="secondary" onClick={toggleDrawer('right', true)}/>

      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
          signOut: () => dispatch(signOut())
      }
}

const mapStateToProps = state => {
  return {
    user: state.signIn.user,
    userlang: state.signIn.userlang
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);
