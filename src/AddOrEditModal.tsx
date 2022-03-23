import { Button, createStyles, makeStyles, Modal, Switch, TextField, Theme, } from '@material-ui/core'
import React, { useState } from 'react'
import { Options, Form } from './hooks/useTodos'
import Select from 'react-select';

interface Props {
    open: boolean
    handleClose: () => void
    setOpen: (isOpen: boolean) => void,
    userList: Array<Options>
}

function rand() {
    return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            height: 200,
            backgroundColor: '#ffffff',
            border: '2px solid #000',
            boxShadow: '5px',
            padding: theme.spacing(2),
            outline: 0,
        },
    })
)


function AddOrEditModal({ userList, setOpen, open, handleClose }: Props) {
    const classes = useStyles()
    const [selectDefaultValue, setSelectDefaultValue] = useState<Options>({ label: '', value: 0 })
    const [modalStyle] = useState(getModalStyle)

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
        >
            <div style={modalStyle} className={classes.paper}>
                <div className='modal-main'>
                    <div className='one'>
                        <p>Project Name</p>
                        <TextField />
                    </div>
                    <div className='two'>
                        <div className='two-left'>
                            <p>User </p>
                            <Select defaultValue={selectDefaultValue}  options={userList} />
                        </div>
                        <div className='two-right'>
                            <p>Completed</p>
                            <Switch  />
                        </div>
                    </div>
                </div>
                <div className='modal-btn'>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            setOpen(false)
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default AddOrEditModal
