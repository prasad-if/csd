import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVert from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SyncIcon from '@material-ui/icons/Sync';
import TranslateIcon from '@material-ui/icons/Translate';
import { useIndexedDB } from 'react-indexed-db';
import { API } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function Menu() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  function SyncOne(survey){

    API.post('api', '/survey/1', {body: survey})
    .then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error.response)
    });

  }

  function SyncAll() {
    console.log('sync all invoked....')
    const { getAll } = useIndexedDB('surveys');
    getAll().then( surveysFromDB => {
          surveysFromDB.forEach((eachSurveyFromDB) => {
            SyncOne(eachSurveyFromDB);
          });
        }
      );
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
        {['English', 'Hindi', 'Telugu', 'Kannada'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><TranslateIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Sync All', 'Logout'].map((text, index) => (
          <ListItem button key={text} onClick={SyncAll}>
            <ListItemIcon>{index % 2 === 0 ? <SyncIcon /> : <ExitToAppIcon  />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>

      <MoreVert color="secondary" onClick={toggleDrawer('right', true)}/>

      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}
