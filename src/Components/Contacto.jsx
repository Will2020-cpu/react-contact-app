import React, { Fragment, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Form from './Form';
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FormEdit from './FormEdit';


const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        margin: 'auto',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    listitem: {
        transition: '4s',
        padding: '2px 5px',
        '&:hover': {
            '& $buttons': {
                display: 'block',
            }
        }
    },
    buttons: {
        display: 'none',
        transition: 'ease 5s',
        padding: 0,
        margin: '0'
    },
    p:{
        margin:0,
    },
    span:{
        fontSize:'0.8rem',
    }


}));

function ResponsiveDrawer({ eliminarContacto, contactos }, props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [edit, setEdit] = useState(false);
    const initialFormState = { id: null, nombre: '', numero: '' }
    const [currentContact, setCurrentContact] = React.useState(initialFormState);

  
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleClick = (contacto) => {
        setCurrentContact({ id: contacto.id, nombre: contacto.nombre, numero: contacto.numero })
        setEdit(true);
    }
    const drawer = (

        <div>
            <Divider />
            <List>
                {
                  
                    Object.keys(contactos).length > 0 ? (
                        contactos.map((item) => (
                            <ListItem className={classes.listitem} key={item.id}>
                                <ListItemIcon><Avatar>{item.nombre[0]}</Avatar></ListItemIcon>
                                <ListItemText primary={
                                    <Fragment>
                                        <div className={classes.item}>
                                            <div>
                                                <p className={classes.p}>{item.nombre}</p>
                                                <span className={classes.span}>{item.numero}</span>
                                                
                                            </div>
                                            <div className={classes.buttons}>
                                                <IconButton onClick={() => handleClick(item)}><EditIcon className={classes.icon} /></IconButton>
                                                <IconButton onClick={() => eliminarContacto(item)}><DeleteIcon className={classes.icon} /></IconButton>
                                            </div>
                                        </div>
                                    </Fragment>
                                }
                                />
                            </ListItem>
                        ))
                    ) : (
                            <h4>sin contactos</h4>
                        )
                }
            </List>
        </div>
    )
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Contactos
          </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">

                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {
                    edit ? <FormEdit setEdit={setEdit} currentContact={currentContact} /> : <Form />
                }

            </main>
        </div>
    );
}
const mapStateToProps = state => ({
    contactos: state.contactos
})


ResponsiveDrawer.propTypes = {

    window: PropTypes.func,
};


const mapDispatchToProps = dispatch => ({
    eliminarContacto(contacto) {
        dispatch({
            type: "ELIMINAR_CONTACTO",
            contacto
        })
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);
