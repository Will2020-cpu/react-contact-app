import React, { Fragment,useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import {useForm} from 'react-hook-form';


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

const FormEdit = ({updateContact,currentContact,setEdit}) => {
    const {register, handleSubmit} = useForm();
    const classes = useStyles();
    const [contacto,setContacto] = useState(currentContact);
    useEffect(
        () => {
          setContacto(currentContact)
        },
        [ currentContact]
      )
    const handleInputOnchange = (event) =>{
        const {name,value} = event.target
        setContacto({...contacto,[name]:value})
    }
    
    const onSubmit = data =>{
        
        setEdit(false);
        const contact = {
            id:contacto.id,
            nombre:data.nombre,
            numero:data.numero,
        } 
        updateContact(contact)
    }
    return (
        <Fragment>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>Editar</Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <div className={classes.campos}>
                        <input type="text" ref={register} placeholder="Nombre" name="nombre" value={contacto.nombre} onChange={handleInputOnchange}/>
                    </div>
                    <div className={classes.campos}>
                        <input type="number"ref={register} placeholder="Numero" name="numero" value={contacto.numero} onChange={handleInputOnchange}/>
                    </div>
                    <div className={classes.campos}>
                        <Button className={classes.guardar} color="primary" variant="contained" type="submit">Guardar</Button>
                    </div>
                </form>
            </Paper>
        </Fragment>
    )
}


const mapDispatchToProps = dispatch =>({
    updateContact(contacto){
        dispatch({
            type:"ACTUALIZAR_CONTACTO",
            contacto
        })
    }
})


export default connect(null,mapDispatchToProps)(FormEdit)
