import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';

import Navbar from './Navbar';
import TabPanel from './TabPanel';
import Section from './Section';


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'theme.palette.background.paper',
    top: 0
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goto = (newValue) => {
    setValue(newValue);
  };


   const tabs = typeof props.survey.sections !== 'undefined' &&  props.survey.sections !== null ? 
      props.survey.sections.map((section, i) => {
        if(section === null){
          return null;
        }    
        return (
            <Tab 
              label={typeof section.title !== 'undefined' ? section.title: ""} 
              {...a11yProps(i)} 
              key={'Section '+i} 
            />
        )
    }) : []; 

    const tabs1 = [ <Tab label="Home"  key="Home" /> , ...tabs,  <Tab label="Thanks"  key="Thanks" /> ]

    const hometabpanel = <TabPanel value={value} index={0}><div className="surveyform">
                         { typeof props.survey.logo !== 'undefined' && props.survey.logo !== null ? 
                            <img src={props.survey.logo} alt="survey logo" />
                          : null}
                          { typeof props.survey.title !== 'undefined'  && props.survey.title !== null  ? 
                            <h2>{props.survey.title}</h2>
                          : null}
                           
                          </div>
                          { typeof props.survey.instructions !== 'undefined' && props.survey.instructions !== null? 
                            <div>
                                <TextField id="instructions" fullWidth={true} margin="normal" disabled
                                  multiline value={props.survey.instructions} variant="filled" /></div>
                          : null}
                          </TabPanel>

const thankstabpanel = (<TabPanel value={value} index={tabs1.length - 1}>
                        <div className="surveyform">
                          { typeof props.survey.conclusion !== 'undefined'  && props.survey.conclusion !== null  ? 
                            <h2>{props.survey.conclusion}</h2>
                          : null}
                        </div></TabPanel>)

const tabpanels = typeof props.survey.sections !== 'undefined' &&  props.survey.sections !== null ? 
                    props.survey.sections.map((section, i) => {
                      if(section === null){
                        return null;
                      }

                      return (
                          <Section 
                            questions={section.questions} 
                            key={'Section '+i} 
                            value={value}
                            index={i+1}
                            store={props.store} 
                            answers={props.answers}
                            questionLookup={props.questionLookup}
                            sectionId={i}
                          />
                      )
                    }) : []; 

    const viewerStyle = props.editor ? "viewer" : "viewer1";

  return (
    <div >
      <div className={viewerStyle} > 
        <div className={classes.root}>
          <AppBar position="sticky" color="default" >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
            {tabs1}
          </Tabs>
          </AppBar>
          {hometabpanel}
          {tabpanels}
          {thankstabpanel}
        </div>
      </div>
      <Navbar current={value} total={tabs1.length} goto={goto} editor={props.editor} submit={props.submit} />
    </div>
  );
}