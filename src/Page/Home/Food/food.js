import React, { useEffect } from 'react';
import { 
  View,
  StyleSheet, 
  Text ,
  ScrollView ,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
  Image
 } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
import {rating} from '../../../Component/Star_rating/star';
import axios from 'axios';
import {Image as Imagelement} from 'react-native-elements';
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const Food = () =>  {
  const navigation = useNavigation();

  const [data,setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(()=>{
    LogBox.ignoreAllLogs();
      navigation.setOptions({
        headerRight: () => (
          <View style ={{marginLeft:10}}>
              <Icon.Button 
              name="ios-search"
              size = {25}
              color="#333"
              backgroundColor="#fff"
              onPress={()=>navigation.navigate('SearchFood')}
              />
          </View>
      ),
    })
  },[navigation])
  
  React.useEffect(()=>{
    async function getdata(){
        const url = 'http://tdtsv.ddns.net:8000/topRecent/getAllItem';
        const res = await axios.get(url)
        const resjson = await res.data;
        setData(resjson);
    }
    getdata();
  })

  const Card = ({item,index}) => {
    return(
            <TouchableOpacity 
            onPress = {() =>navigation.navigate('Detail',{item})}
            style = {{flex:1,
            flexDirection:'row',
            width:"90%",
            alignSelf:'center',
            marginTop:10,
            borderRadius:8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 5
            }}>
              <Imagelement 
              key = {index}
              source= {{uri:item.ImageUrl}}
              resizeMode ="cover"
              style = {styles.cardImage}
              PlaceholderContent = {<ActivityIndicator/>}
              />
              <View style = {{flex:1,flexDirection:'column',marginLeft:8}}>
                <TouchableOpacity 
                onPress = {() =>navigation.navigate('Detail',{item})}
                style = {{flexDirection:'row',width:"100%"}}
                > 
                  <Text style = {styles.titleCard}>
                  {item.Title}
                  </Text>
                </TouchableOpacity>
                {rating(item.Rating)}
                <Text 
                numberOfLines = {3}
                style ={{marginTop:4,width:"95%"}}>
                {item.Content}
                </Text>
              </View>
            </TouchableOpacity>
    )
  }

    return (
    <View style ={{flex:1,backgroundColor:'#FFF'}}>
    <StatusBar barStyle='dark-content'/>
    <ScrollView 
    style={styles.container}
    refreshControl = {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
        <View style ={styles.container_slider}>
          <Swiper autoplay={true} horizontal={false} height={200}>
            <View style={styles.slide}>
              <Image 
              source = {require('../../../../assets/image_1.jpg')}
              resizeMode="cover"
              style = {styles.slideImage}
              />
            </View>
            <View style={styles.slide}>
              <Image 
              source = {require('../../../../assets/image_2.jpg')}
              resizeMode="cover"
              style = {styles.slideImage}
              />
            </View>
            <View style={styles.slide}>
              <Image 
              source = {require('../../../../assets/image_3.jpg')}
              resizeMode="cover"
              style = {styles.slideImage}
              />
            </View>
          </Swiper>
        </View>
        <View style = {styles.containerToprecent}>
          <Text style = {styles.txtrecent}>Topic</Text>
        </View>
        <View style={styles.categoryContainer}>
          <TouchableOpacity 
          style={styles.categoryBtn} 
          onPress = {()=> navigation.navigate('ListFood',{title:'Restaurent Foods',stylefood:'restaurant'})}>
            <View style={styles.categoryIcon}>
              <Image 
              source ={require('../../../../assets/food.png')}
              resizeMode="cover"
              style ={styles.iconsize}
              />
            </View>
            <Text style ={styles.categoryBtnTxt}>Restaurent</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.categoryBtn,{marginLeft:20}]}
          onPress = {()=> navigation.navigate('ListFood',{title:'Classic Foods',stylefood:'classic'})}
          >
            <View style={styles.categoryIcon}>
              <Image 
              source ={require('../../../../assets/food_1.png')}
              resizeMode="cover"
              style ={styles.iconsize}
              />
            </View>
            <Text style ={styles.categoryBtnTxt}>Classic</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.categoryBtn,{marginLeft:20}]}
          onPress = {()=> navigation.navigate('ListFood',{title:'Fast Food',stylefood:'fastfood'})}
          >
            <View style={styles.categoryIcon}>
              <Image 
              source ={require('../../../../assets/fast-food-color.png')}
              resizeMode="cover"
              style ={styles.iconsize}
              />
            </View>
            <Text style ={styles.categoryBtnTxt}>F-Food</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryContainer}>
        <TouchableOpacity 
        style={styles.categoryBtn}
        onPress = {()=> navigation.navigate('ListFood',{title:'Fruits',stylefood:'fruits'})}
        >
          <View style={styles.categoryIcon}>
            <Image 
            source ={require('../../../../assets/food_2.png')}
            resizeMode="cover"
            style ={styles.iconsize}
            />
          </View>
          <Text style ={styles.categoryBtnTxt}>Fruits</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.categoryBtn,{marginLeft:20}]}
        onPress = {()=> navigation.navigate('ListFood',{title:'Drinks',stylefood:'drinks'})}
        >
          <View style={styles.categoryIcon}>
            <Image 
            source ={require('../../../../assets/soft-drink.png')}
            resizeMode="cover"
            style ={styles.iconsize}
            />
          </View>
          <Text style ={styles.categoryBtnTxt}>Drinks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.categoryBtn,{marginLeft:20}]}
        onPress = {()=> navigation.navigate('ListFood',{title:'Cakes',stylefood:'Cakes'})}
        >
          <View style={styles.categoryIcon}>
            <Image 
            source ={require('../../../../assets/food_4.png')}
            resizeMode="cover"
            style ={styles.iconsize}
            />
          </View>
          <Text style ={styles.categoryBtnTxt}>Cakes</Text>
        </TouchableOpacity>
      </View>
        <View style ={{alignSelf:'center',marginTop:15,justifyContent:'center'}}>
          <Text>
            _____________________________________
          </Text>
        </View>
        <View style = {styles.containerToprecent}>
          <Text style = {styles.txtrecent}>Top recent</Text>
        </View>
      <FlatList 
      data = {data}
      renderItem = {Card}
      keyExtractor={(i,k) => k.toString()}
      />
    </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  container_slider:{
    width:"90%",
    justifyContent:'center',
    marginTop:10,
    height:200,
    borderRadius:8,
    alignSelf:'center',
    borderWidth:0.5,
  },
  slide:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'transparent',
    borderRadius:8
  },
  slideImage:{
    width:'100%',
    height:'100%',
    borderRadius:8,
    alignSelf:'center'
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    width: '90%',
    marginTop: 15,
    marginBottom: 10,
    alignSelf:'center'
  },
  categoryBtn: {
    width:100,
    justifyContent: 'center',
  },
  categoryIcon: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  categoryBtnTxt: {
    marginTop: 7,
    color: 'black',
    alignSelf:'center',
    fontWeight:'500',
    fontSize:13,
    fontFamily:'Cochin'
  },
  iconsize:{
    width:40,
    height:40,
  },
  containerToprecent:{
    alignSelf:'center',
    width:"90%",
    marginTop:15,
  },
  txtrecent:{
    fontSize:28,
    fontWeight:'700',
    fontFamily:"Cochin"
  },
  containerCardfood:{
    justifyContent:'center',
    alignSelf:'center',
    marginTop:10,
  },
  cardImage:{
    height:115,
    width:115,
    justifyContent:'center',
    borderRadius:8
  },
  txtCard:{
    marginLeft:14,
    justifyContent:'center',
    alignSelf:'center',
  },
  titleCard:{
    fontFamily:'Cochin',
    fontSize:20,
    fontWeight:'500',
    justifyContent:'center'
  }
})

export default Food;

