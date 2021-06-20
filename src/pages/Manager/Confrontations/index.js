import React, { useState, useEffect, useContext } from 'react'
import FlatList from 'flatlist-react'
import { useParams, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Grid, makeStyles, Tabs, Tab, Typography, Box, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ReplyIcon from '@material-ui/icons/Reply'

import api_confrontation from '../../../services/api_confrontation'
import api_qualifiers from '../../../services/api_qualifiers'
import { AuthContext } from '../../../contexts/AuthContext'

import Matches from './Matches'
import GroupStage from './GroupStage'
import RoundOf16 from './RoundOf16'
import Quarterfinals from './Quarterfinals'
import Finals from './Finals'


const NavTabs = () => {

    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams()

    const { user } = useContext(AuthContext)
    const [value, setValue] = useState(0)

    const [groups, setGroups] = useState([])
    const [roundOf16, setRoundOf16] = useState([])
    const [quarterfinals, setQuarterfinals] = useState([])
    const [semifinals, setSemifinals] = useState([])
    const [finals, setFinals] = useState([])

    const handleChange = (event, newValue) => setValue(newValue)

    const loadGroups = async () => {
        const response = await api_confrontation.getGroupsByChampionshipId(id)
        setGroups(response.data)
    }

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
        loadGroups()
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
                <LinkTab label="Confrontos" {...a11yProps(0)} />
                <LinkTab label="Fase de Grupo" {...a11yProps(1)} />
                <LinkTab label="Oitavas de Final" {...a11yProps(2)} />
                <LinkTab label="Quartas de Final" {...a11yProps(3)} />
                <LinkTab label="Semifina/Final" {...a11yProps(4)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <Matches id={id} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <GroupStage data={groups} />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <RoundOf16 data={roundOf16} />
            </TabPanel>

            <TabPanel value={value} index={3}>
                <Quarterfinals data={quarterfinals} />
            </TabPanel>

            <TabPanel value={value} index={4}>
                <Finals semi={semifinals} final={finals}/>
            </TabPanel>
        </div>
    );
}

export default NavTabs

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10
    },
    button: {
        margin: theme.spacing(1),
    },
    buttonBack: {
        margin: theme.spacing(1),
        backgroundColor: '#458CB8',

        '&:hover': {
            background: '#33617D'
        },
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
                    <Typography>{children}</Typography>
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
