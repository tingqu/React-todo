//It is required to import react in the ract components
//but in this case we don't need to 
// import React from 'react'

//impt to import the prop type
import PropTypes from 'prop-types'

import Button from './Button'

import {useLocation} from 'react-router-dom'

const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()

    return (
        <header className = 'header'>
            <h1 >
                {title}
            </h1>
            {location.pathname === "/"&& (<Button color={showAdd? 'red': 'green'} text = {showAdd? 'Close' : 'Add'} onClick = {onAdd}/>)}
        </header>
    )
}


//Second way to add the text, if there is no value passed in
Header.defaultProps = {
    title: "Task Tracker",
}

//It just used to catch the error  by constraining the value'type
Header.propTypes = { 
    title: PropTypes.string.isRequired,
}


export default Header

