import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput,
  TouchableOpacity, ActivityIndicator, FlatList,Image } from 'react-native';

export default function App() {

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setmobile] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const response = await fetch('http://retailsapi.us-east-2.elasticbeanstalk.com/api/feedapp/getfeed',
      {
        method: 'GET'
      });

    const data = await response.json();
    setFeedData(data.products);
    setIsLoading(false);
  }
  const changeViewState = () => {
    const isVisible = isFormVisible;
    if (isVisible) {
      setIsFormVisible(false);
    } else {
      setIsFormVisible(true);
    }
  }


  const addNewProduct = async() => {
    
    const publisherUser = { 
      name: name,
      id: id, 
      email: email, 
      mobile:mobile };
     
    const response = await  fetch('http://retailsapi.us-east-2.elasticbeanstalk.com/api/feedapp/addfeed',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
       
        body: JSON.stringify({
          productName: productName,
          productPrice: productPrice,
          productImage: productImage,
          publisher: publisherUser,
          
        })
      });
      const isVisible = isFormVisible;
       if (isVisible) {
         setIsFormVisible(false);
       } else {
          setIsFormVisible(true);
       }
      const data = await response.json();
      console.log(data);
    
  }


  return (
    <View style={styles.container}>

      {
        isFormVisible ?
          (
            <View style={styles.mainView}>
              
              <View style={{width:"100%",height:"10%",alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontSize:20,color:"#0000FF",margin:15}}>ADD PRODUCT</Text>

              </View>

              <TextInput placeholder="ProductName" style={{width:'100%', height:40,margin:15,backgroundColor:'#ebebeb'}} value={productName} onChangeText={text => setProductName(text)}  />
              <TextInput placeholder="ProductPrice" style={{width:'100%', height:40,margin:15, backgroundColor:'#ebebeb'}} keyboardType='name-phone-pad' value={productPrice} onChangeText={text => setProductPrice(text)}  />
              <TextInput placeholder="ProductImage"style={{width:'100%', height:40,margin:15, backgroundColor:'#ebebeb'}} value={productImage} onChangeText={text => setProductImage(text)}  />
              <TextInput placeholder="name" style={{width:'100%', height:40,margin:15, backgroundColor:'#ebebeb'}} value={name} onChangeText={text => setName(text)}  />
              <TextInput placeholder="id" style={{width:'100%', height:40,margin:15, backgroundColor:'#ebebeb'}}keyboardType='name-phone-pad' value={id} onChangeText={text => setId(text)}  />
              <TextInput keyboardType='email-address' placeholder="email" style={{width:'100%', height:40,margin:15, backgroundColor:'#ebebeb'}} value={email} onChangeText={text => setEmail(text)}  />
              <TextInput placeholder="mobile"style={{width:'100%', height:40,margin:15, backgroundColor:'#ebebeb'}}keyboardType='phone-pad' value={mobile} onChangeText={text => setmobile(text)}  />

              <TouchableOpacity style={styles.addpro}  onPress={addNewProduct}><Text style={styles.btnText}>ADD</Text></TouchableOpacity>
              

            </View>
          )
          :
          (
            <View style={styles.mainView2}>
              {
                isLoading ?
                  (
                    <ActivityIndicator size='large' color='#99cc00' />
                  ) :
                  (
                    <View style={{width:'100%'}}>
                      {
                        feedData.length > 0 ?
                          (
                            <FlatList
                              data={feedData}
                              keyExtractor={item => item._id}
                              renderItem={itemData =>
                              <View > 
                                <View  style={{ marginTop:10,height:150,width:'100%',flexDirection:'row',borderRadius:15, backgroundColor:''}}>

                                  <View style={styles.row_container}>
                                      <View style={styles.image_container}>
                                         <Image style={styles.image} source={{ uri:itemData.item.productImage}} />
                                      </View>
                                      <View style={styles.content_container}>
                                           <Text style={styles.title}>{itemData.item.productName}</Text>
                                           <Text style={styles.content}>{itemData.item.name}Let your attitude have the edge in your Nike Air Max Plus, a Tuned Air experience that offers premium stability and unbelievable cushioning. Featuring the OG's wavy design lines, TPU accents and airy mesh on the upper, it celebrates defiant style.</Text>
                                      </View>
                                     <View style={styles.price_container}>
                                        <Text style={styles.title}>${itemData.item.productPrice}</Text>
                                      </View>
                                    </View>


                                </View>
                              </View>
                              }
                            />
                          ) :
                          (
                            <Text>No Data</Text>
                          )
                      }
                    </View>
                  )
              }
            </View>
          )
      }

      <View style={styles.menuView}>
        <TouchableOpacity onPress={changeViewState} style={styles.feedBtn}><Text style={styles.btnText}>Feed</Text></TouchableOpacity>
        <TouchableOpacity onPress={changeViewState} style={styles.addButton}><Text style={styles.btnText}>Add New</Text></TouchableOpacity>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  feedBtn: { width: '50%', backgroundColor: '#761954', alignItems: 'center', justifyContent: 'center' },
  addpro: { width: '20%', backgroundColor: '#1E90FF', alignItems: 'center',margin:40,justifyContent:"center" },
  addButton: { width: '50%', backgroundColor: '#e1c13b', alignItems: 'center', justifyContent: 'center' },
  mainView: { height: '100%', width:'100%', alignItems: 'center', justifyContent: 'center', flex:1,backgroundColor:"#00CED1" },
  mainView2: { height: '100%', width:'100%', alignItems: 'center', justifyContent: 'center', flex:1,backgroundColor:"#fff" },
  btnText: { color: '#ffffff', fontSize: 20 },
  menuView: { height: '10%', flexDirection: 'row', justifyContent: 'space-between' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: "100%", height: 130,backgroundColor:"#FF7F50"},
  row_container: {
    borderRadius: 4,
    width: "100%",
    marginTop: 12,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor:"#A9A9A9"
    
  },
  image_container: { width: "30%" },
  price_container: {
    width: "20%",
    height:"100%",
    backgroundColor: "#FF7F50",
    alignItems: "center",
    justifyContent: "center",
    
  },
  content_container: {
    width: "50%",
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor:"#A9A9A9",
    fontSize:50
  },
  title: { fontSize: 16,color:"#0000ff" },
  content: { fontSize: 8 },
});
