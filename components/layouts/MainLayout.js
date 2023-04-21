import { StatusBar } from "expo-status-bar";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useData } from "../DataContext";
import { styles } from "../../styles";
import { Button, IconButton } from "react-native-paper";
import homeImage from "../../assets/homeImage.jpg";

export const MainLayout = ({ children, navigation }) => {
  const { quizSet, results, inProgress, setInProgress } = useData();
  // const [navigation, setNavigation] = 
  const onPress = ()=>{
    if (inProgress) {
      alert(inProgress);
      setInProgress(null);
    };
    navigation.navigate('Home')
  }
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.scrollView}>

        {children}

      </View>


      <View style={styles.footer}>
        <View style={[styles.footerBlock, styles.footerIcon]}>
          <IconButton style={styles.footerBtn} icon="home" size={30} onPress={onPress}/>
        </View>
        <View style={[styles.footerBlock, styles.footerProgress]}>
          {quizSet && <Text style={[styles.contrastText, styles.mediumText]}>Done {results.length}/{quizSet.quiz_ids.length}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};
