import { StatusBar } from "expo-status-bar";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useData } from "../DataContext";
import { styles } from "../../styles";
import { Button, IconButton } from "react-native-paper";
import homeImage from "../../assets/homeImage.jpg";

export const MainLayout = ({ children }) => {
  const { quizSet, results } = useData();
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.scrollView}>
      <ImageBackground  style={{height: '100%'}} source={homeImage} >
        {children}
        </ImageBackground>
      </View>


      <View style={styles.footer}>
        <View style={[styles.footerBlock, styles.footerIcon]}>
          <IconButton style={styles.footerBtn} icon="home" size={30} />
        </View>
        <View style={[styles.footerBlock, styles.footerProgress]}>
          {quizSet && <Text style={[styles.contrastText, styles.mediumText]}>Done {results.length}/{quizSet.quiz_ids.length}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};
