import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles, Tabs, Tab, Typography, Box } from '@material-ui/core'

import api_qualifiers from '../../../../../services/api_qualifiers'

import GroupStage from '../Scores/GroupStage'
import RoundOf16 from './RoundOf16'
import Quarterfinals from './Quarterfinals'
import Finals from './Finals'

const Scores = () => {

    const classes = useStyles()
    const { id } = useParams()
    const [value, setValue] = useState(0)

    const [roundOf16, setRoundOf16] = useState([])
    const [quarterfinals, setQuarterfinals] = useState([])
    const [semifinals, setSemifinals] = useState([])
    const [finals, setFinals] = useState([])

    const handleChange = (event, newValue) => setValue(newValue)

    const loadRoundOf16 = async () => {
        const response = await api_qualifiers.getRoundOf16(id)
        setRoundOf16(response.data)
    }

    const loadQuarterfinals = async () => {
        const response = await api_qualifiers.getAllQuarterfinals(id)
        setQuarterfinals(response.data)
    }

    const loadSemifinals = async () => {
        const response = await api_qualifiers.getAllSemis(id)
        setSemifinals(response.data)
    }

    const loadFinals = async () => {
        const response = await api_qualifiers.getAllFinals(id)
        setFinals(response.data)
    }

    useEffect(() => {
        loadRoundOf16()
        loadQuarterfinals()
        loadSemifinals()
        loadFinals()
    }, [])

    return (
        <div className={classes.root}>
            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
            >
                <LinkTab label="Fase de Grupo" {...a11yProps(0)} />
                <LinkTab label="Oitavas de Final" {...a11yProps(1)} />
                <LinkTab label="Quartas de Final" {...a11yProps(2)} />
                <LinkTab label="Semifina/Final" {...a11yProps(3)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <GroupStage id={id} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <RoundOf16 id={id} />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <Quarterfinals id={id} />
            </TabPanel>

            <TabPanel value={value} index={3}>
                <Finals id={id} />
            </TabPanel>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10
    },
}))

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

const LinkTab = (props) => {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

export default Scores

