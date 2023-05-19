import { StatusBar } from "expo-status-bar";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useData } from "../DataContext";
import { styles } from "../../styles";
import { Button, IconButton, Dialog, Portal, Text } from "react-native-paper";
import { useState } from "react";
import DialogModal from "./DialogModal";

export const MainLayout = ({ children, navigation }) => {
  const { quizSet, results, alertInfo, closeAlert } = useData();

  const onPress = () => {
      navigation.navigate("Home");
  }
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.scrollView}>
        {children}
      </View>

      <View style={styles.footer}>
        <View style={[styles.footerBlock, styles.footerIcon]}>
          <IconButton style={styles.footerBtn} icon="home" size={30} onPress={onPress} />
        </View>
        <View style={[styles.footerBlock, styles.footerProgress]}>
          {quizSet && <Text style={[styles.contrastText, styles.mediumText]}>Done {results.length}/{quizSet.quiz_ids.length}</Text>}
        </View>
      </View>
      <DialogModal visible={alertInfo.open} hideDialog={closeAlert} description={alertInfo.message} confirm={alertInfo.callback} showCancelButton={alertInfo.showCancelButton} />
    </SafeAreaView>
  );
};
