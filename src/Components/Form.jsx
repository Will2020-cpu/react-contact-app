import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import {connect} from 'react-redux'
import {useForm} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';



const useStyles = makeStyles((theme) => ({
    paper: {
        width: 300,
        padding: theme.spacing(3),
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    form: {
        margin: '0 auto'
    },
    campos: {
        margin: '5px',
    },
    guardar: {
        width: '100%'
    },
    title: {
        textAlign: 'center'
    }
}))


const Form = ({contactos,agregarContacto}) => {
    const {register,handleSubmit} = useForm();
    const onSubmit = data =>{
        const contacto = {
            id:uuidv4(),
            nombre:data.nombre,
            numero:data.numero
        }
        agregarContacto(contacto)
    }
    const classes = useStyles();
    return (
        <Fragment>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>Guardar</Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <div className={classes.campos}>
                        <input ref={register} type="text" placeholder="Nombre" name="nombre" />
                    </div>
                    <div className={classes.campos}>
                        <input ref={register} type="number" placeholder="Numero" name="numero" />
                    </div>
                    <div className={classes.campos}>
                        <Button className={classes.guardar} color="primary" variant="contained" type="submit">Guardar</Button>
                    </div>
                </form>
            </Paper>
        </Fragment>
    )
}

const mapStateToProps = state =>({
    contactos:state.contactos
})

const mapDispatchToProps = dispatch =>({
    agregarContacto(contacto){
        dispatch({
            type:"AGREGAR_CONTACTO",
            contacto
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Form)
