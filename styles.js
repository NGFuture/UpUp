import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header2: {
        backgroundColor: 'grey',
        height: 20,
    },
    layoutContainer: {
        minHeight: '100%',
        backgroundColor: 'orange'
    },
    //mainlayout
    footer: {
        flexDirection: "row",
    },
    footerIcon: {
        backgroundColor: '#D9D9D9',
        padding: 0,
    },
    footerBtn: {
        margin: 0,
    },
    footerProgress: {
        flex: 1,
        backgroundColor: '#5E5555',
        alignItems: "center",
        justifyContent: "center",

    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        flex: 1,
        marginHorizontal: 0,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },
    //header
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
    },
    logo: {
        height: 50,
        width: 130,
    },
    headerIcon: {
        width: 60,
    },

    //common styles
    contrastText: {
        color: "#FFFFFF"
    },
    mediumText: {
        fontSize: 18,
    },

    text: {
        fontSize: 42,
    },
    /* Home page */
    homeButtonContainer: {
        flex: 1,
        // justifyContent: top,
        alignItems: 'center',
    },
    homeButton: {
        display: "flex",
        width: 220,
        height: 100,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        padding: 0,
    },

    //Test page
    testTitle: {
        paddingLeft: 15,
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 3,
        color: "#70B6E4",
        // margin: 20,
    }
});

