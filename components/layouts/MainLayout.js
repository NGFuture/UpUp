import { StatusBar } from "expo-status-bar";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useData } from "../DataContext";
import { styles } from "../../styles";
import { Button, IconButton, Dialog, Portal, Text } from "react-native-paper";
import { useState } from "react";
import DialogModal from "./DialogModal";

export const MainLayout = ({ children, navigation }) => {
  const { quizSet, results, inProgress, setInProgress } = useData();

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const onPress = () => {
    if (inProgress) {
      showDialog();
    } else {
      navigation.navigate("Home");
    };
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
      <DialogModal
        visible={visible}
        hideDialog={hideDialog}
        description={inProgress}
        confirm={() => {
          setInProgress(null);
          hideDialog();
          navigation.navigate('Home')
        }}
      />
    </SafeAreaView>
  );
};
