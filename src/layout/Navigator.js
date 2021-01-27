import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import Link from '@material-ui/core/Link';


const categories = [
  {
    categoryId: 'AcademyBoard',
    categoryDescription: 'Academy Board',
    subCategoryList: [
      {

        subCategoryId: 'WBBSE',
        subCategory:'WBBSE',
        subCategoryDescription: 'West Bengal Board of Secondary Education',
        active:true
      },
      {
        subCategoryId: 'CBSE',
        subCategory:'CBSE',
        subCategoryDescription: 'Central Board of Secondary Education',
      },
      {
        subCategoryId: 'ICSE',
        subCategory:'ICSE',
        subCategoryDescription: 'Indian Certificate of Secondary Education',
      },
    ],
  },
  {
    categoryId: 'Olympiad',
    categoryDescription: 'Olympiad',
    subCategoryList: [
      {
        subCategoryId: 'Olympiad_Mathmatics',
        subCategory:'Mathmatics',
        subCategoryDescription: 'Olympiad - Mathmatics',
      },
      {
        subCategoryId: 'Olympiad_Science',
        subCategory:'Science',
        subCategoryDescription: 'Olympiad - Science',
      },
      {
        subCategoryId: 'Olympiad_Computer',
        subCategory:'Computer',
        subCategoryDescription: 'Olympiad - Computer',
      },
    ],
  }
];

const styles = (theme) => ({
  categoryHeader: {
    backgroundColor: '#232f3e',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    backgroundColor: '#232f3e',
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
      backgroundColor: '#232f3e',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {

    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;
  const [activeLink, setActiveLink] = React.useState("WBBSE");
  const setLeftNavigation = (parentId, childId) => {
  for(var header in categories) {
       if(categories[header].categoryId === parentId){
         for(var child in categories[header].subCategoryList) {
           if (categories[header].subCategoryList[child].subCategoryId === childId){
             categories[header].subCategoryList[child].active = true;
             setActiveLink(childId);
             props.setNavigation(childId,parentId,categories[header].subCategoryList[child].subCategoryDescription);
           }else {
             categories[header].subCategoryList[child].active = false;
           }
       }
    }
  }
}
  return (
    <>
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Academy
        </ListItem>
        {categories.map(({ categoryId, categoryDescription,subCategoryList }) => (
          <React.Fragment key={categoryId}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {categoryDescription}
              </ListItemText>
            </ListItem>
            {subCategoryList.map(({ subCategoryId,subCategory,active }) => (
              <ListItem
                key={subCategoryId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                <Link color="inherit"
                    onClick={() => {
                      setLeftNavigation(categoryId,subCategoryId);
                }}>
                {subCategory}</Link>
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
    </>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
