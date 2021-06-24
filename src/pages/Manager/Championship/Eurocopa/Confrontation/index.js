import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles, Tabs, Tab, Typography, Box } from '@material-ui/core'

import Matches from './Matches'

const Confrontation = () => {

    const classes = useStyles()
    const { id } = useParams()

    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => setValue(newValue)

    return (
        <div className={classes.root}>
            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
            >
                <LinkTab label="Confrontos" {...a11yProps(0)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <Matches id={id} />
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

export default Confrontation

