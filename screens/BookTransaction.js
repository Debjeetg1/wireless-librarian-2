import React from 'react' ;
import {Text, View ,TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native' ;
import {BarCodeScanner} from "expo-barcode-scanner" ;
import * as Permission from "expo-permissions" ; 

class BookTransaction extends React.Component{
    constructor()
    {
        super();
        this.state={ 
            hasCameraPermissions: null,
            Scanned: false,
            ScannedData:"",
            buttonState: "Not-clicked",
            scannedBookId: '',
            scannedStudentId: ''

        }
    }
    getCameraPermission = async(id) =>{
        const {status} = await Permission.askAsync(Permission.CAMERA) 
        this.setState({
            hasCameraPermissions: status==="Granted",
            buttonState: id,
            scanned: false,
        });
    }
    handleBarcodeScanned = async({type, data}) => {
     const {buttonState} = this.state
     if(buttonState === "bookid")
     {
        this.setState({
            Scanned: true,
            scannedBookId: data,
            buttonState: "Not-clicked",

   
        })
     }  
     else if(buttonState === 'studentid')
     {
        this.setState({
            Scanned: true,
            scannedStudentId: data,
            buttonState: "Not-clicked",
   
        })
     }
     
    }
    render()
    {   
        const hasCameraPermission = this.state.hasCameraPermissions;
        const scanned = this.state.Scanned;
        const buttonState = this.state.buttonState;

        if(buttonState !== "Not-clicked" && hasCameraPermission)
        {
          return(
              <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}/>
          )
        }
        else if(buttonState === "Not-clicked")
        {
            return(
            <View style={style.container}>
                <View>
                    <Text style={style.header}>Wireless-Librarian</Text>
                    <Image style={{width: 200, height:200, alignItems: 'center'}} 
                    source={require('../assets/booklogo.jpg')}/>
                </View>
                <View style={style.inputView}>
                    <TextInput style={style.inputBox} placeholder=" BOOK-ID" value={this.state.scannedBookId}/>

                    <TouchableOpacity style={style.scanButton} onPress={() => {this.getCameraPermission('bookid')}}>
                        <Text style={style.buttonText}>Scan</Text>
                    </TouchableOpacity>   
                </View>

                <View style={style.inputView}>
                    <TextInput style={style.inputBox} placeholder=" STUDENT-ID" value={this.state.scannedStudentId} />

                    <TouchableOpacity style={style.scanButton}  onPress={() => {this.getCameraPermission('studentid')}}>
                        <Text style={style.buttonText}>Scan</Text>
                    </TouchableOpacity>             
                </View>

                <View>
                    <Text>Issue or return{hasCameraPermission === true ? this.state.ScannedData:"request camera permission"}</Text>
                    <TouchableOpacity  onPress={this.getCameraPermission}>
                        <Text style={style.buttonText}>Scan QR Code</Text>
                        
                    </TouchableOpacity>

                </View>
            </View>
              )
        }
       
    }
        
    
}
const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    header:{
        fontSize: 30,
        textAlign: 'center',
    }
  });


export default BookTransaction;

