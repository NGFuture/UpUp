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
});

