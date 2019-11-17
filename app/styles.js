//GLOBAL STYLESHEET

import { StyleSheet } from 'react-native';

export const COLORS = {
    green1: '#ccf6c2',
    green3: '#7eea6c',
    green5: '#00dd00', //Main Theme colour
    green7: '#00b700',
    green9: '#007f00',
    grey1: '#f8f9fa', //Background behind cards
    grey3: '#d5dde5', 
    grey5: '#aebecd',
    grey7: '#6e7a8a', //Subheadings
    grey9: '#202833', //Important headings
    white: '#ffffff', //Cards 
    yellow: '#ffc927', //Warning
    red: '#B71C1C' //Errors
}

export const CONTAINERS = {
    main: {
        padding: '5%',
        backgroundColor: COLORS.grey1
    }
}

export const FONTS = {
    banner: {
        fontSize: 36, 
        color: COLORS.white, 
        fontWeight: 'bold', 
        paddingBottom: 10
    }, 
    h1: {
        fontSize: 32, 
        color: COLORS.grey9, 
        fontWeight: 'bold', 
        paddingBottom: 15
    }, 
    h2: {
        fontSize: 24, 
        color: COLORS.grey7, 
        fontWeight: 'bold'
    }, 
    h3: {
        fontSize: 20, 
        color: COLORS.grey9, 
        fontWeight: 'bold'
    }, 
    h4: {
        fontSize: 18, 
        color: COLORS.grey7, 
        fontWeight: 'bold'
    }
}


