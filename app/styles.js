//GLOBAL STYLESHEET

export const COLORS = {
    green1: '#c9f0c0',
    green3: '#79da69', //Inactive tab icon
    green5: '#11C90E', //Main Theme colour
    green7: '#00a400',
    green9: '#006d00',
    grey1: '#f8f9fa', //Background behind cards
    grey3: '#d5dde5', 
    grey5: '#aebecd',
    grey7: '#6e7a8a', //Subheadings
    grey9: '#202833', //Important headings and shadows
    white: '#ffffff',  
    blue: '#0099ff', //water event finished = false 
    yellow: '#ffc927', //Warning
    red: '#B71C1C' //Errors
}

export const COMPONENTS = {
    banner: {
        height: 150,
        backgroundColor: COLORS.white, 
        padding: 5
    },
    calendarToggleButton: {
        backgroundColor: COLORS.green5,
        fontWeight: 'bold',
        right: 0,
        width: '50%'
    }, 
    dropdown: {
        backgroundColor: COLORS.grey1,
        borderRadius: 5,
        marginBottom: 10, 
        width: 250
    }, 
    datepickerButton: { //touchable highlight that opens the datepicker
        backgroundColor: COLORS.grey1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }, 
    datepicker: { //the actual datepicker
        color: COLORS.grey9,
        backgroundColor: COLORS.grey5, 
        marginBottom: 10,
        borderRadius: 5        
    }, 
    loginInput: {
        height: 40, 
        backgroundColor: COLORS.white, 
        width: '100%', 
        paddingLeft: 10,
        marginBottom: 10, 
        borderRadius: 5
    }, 
    labelsSpacing: {
        paddingBottom: 12
    }
}

export const CONTAINERS = {
    main: {
        padding: '5%',
        backgroundColor: COLORS.grey1
    }, 
    spaceBetween: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    plantType: { 
        height: 70, 
        backgroundColor: COLORS.white,
        shadowColor: COLORS.grey9, 
        marginBottom: 10,
        shadowOffset: {
            width: 1, 
            height: 1
        }, 
        borderRadius: 10
    },
    infoCard: {
        width: 160, 
        height: 160, 
        backgroundColor: COLORS.white,
        shadowColor: COLORS.grey9, 
        shadowOffset: {
            width: 1, 
            height: 1
        }, 
        borderRadius: 10
    },
    wateringCard: {
        height: 160, 
        backgroundColor: COLORS.white,
        shadowColor: COLORS.grey9, 
        shadowOffset: {
            width: 1, 
            height: 1
        }, 
        borderRadius: 10
    },
    chartCard: {
        height: 290, 
        backgroundColor: COLORS.white,
        shadowColor: COLORS.grey9, 
        shadowOffset: {
            width: 1, 
            height: 1
        }, 
        borderRadius: 10, 
        marginBottom: 20
    },
    listViewCard: {
        width: '100%',
        backgroundColor: COLORS.white,
        shadowColor: COLORS.grey9, 
        marginBottom: 10,
        padding: 10,
        shadowOffset: {
            width: 1, 
            height: 1
        }, 
        borderRadius: 10
    },
    addScheduleCard: {
        width: '100%',
        backgroundColor: COLORS.white,
        shadowColor: COLORS.grey9, 
        marginBottom: 10,
        shadowOffset: {
            width: 1, 
            height: 1
        }, 
        borderRadius: 10
    },
    calendar: {
        container: {
          backgroundColor: COLORS.white,
          paddingTop: 22,
        },
        headerStyle: {
          overflow: 'hidden',
          backgroundColor: COLORS.green5,
          position: 'fixed', 
          top: 0
        },
    }, 
    login: {
        backgroundColor: COLORS.green5,
        height: '100%',
        width: '100%',
        padding: 10,
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
}

export const FONTS = {
    banner: {
        fontSize: 36, 
        color: COLORS.grey9, 
        fontWeight: 'bold', 
        paddingBottom: 10
    }, 
    login: {
        fontSize: 40, 
        color: COLORS.grey1, 
        fontWeight: 'bold', 
        paddingBottom: 15
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
        fontWeight: 'bold', 
        paddingBottom: 10
    }
}


