
import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    Alert,KeyboardAvoidingView
} from "react-native";
import Snackbar from 'react-native-snackbar';
import Spinner from "react-native-loading-spinner-overlay";
import PropTypes from 'prop-types';
import Form from "react-native-form";
import DateTimePickerTester from "../../utils/DatePicker";
import {Radio , Button} from 'native-base';
import CrossIcon from 'react-native-vector-icons/Entypo';
import SuccesIcon from 'react-native-vector-icons/Feather';
import { SegmentedControls } from 'react-native-radio-buttons'


// your brand's theme primary color
const brandColor = "royalblue";
const inputColor = "grey";
const styles = StyleSheet.create({
    countryPicker: {
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        margin:30,
        flex: 4,
        flexDirection: "column"
    },
    header: {
        textAlign: "left",
        fontSize: 20,
        color: "#4A4A4A",
        fontWeight:'bold',
        marginBottom:10,
    },
    form: {
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: inputColor,

    },
    button: {
        marginTop: 20,
        backgroundColor: brandColor,

    },
    buttonText: {
        color: "#fff",
        fontFamily: "normal",
        fontSize: 16,
        fontWeight: "bold"
    },
    disclaimerText: {
        marginTop: 30,
        fontSize: 12,
        color: "grey"
    },
    parentTextInput:{
        flexDirection: "row",
        justifyContent: "space-between" ,
        alignItems:'center',
        borderBottomWidth:1,
        borderStyle:'solid',
        borderBottomColor:inputColor,
    },
    datePicker:{
        paddingTop:15,paddingBottom:15,
        borderBottomWidth:1,
        borderStyle:'solid',
        borderBottomColor:inputColor,
    },
    segment:{
        marginTop:20,
    },
    iconSuccess:{
        color:'lightgreen',
    },
    iconError:{
        color:'indianred',
    }

});

class Login extends Component {


    // componentDidUpdate(){
    //     const { navigate } = this.props.navigation;
    //     this.props.authenticated && navigate("profile");
    // }

    constructor(props) {
        super(props);
        this.errorArray = [];
        this.state = {
            gender:null,
            spinner: false,
            date: null,
            nameValidation:null,
            addressValidation : false,
            pinValidation:false,
            mobileValidation : false,
            guardiannameValidation : false,
            fullName : null,
            address : null,
            address2 : null,
            pin : null,
            mobile : null,
            guardianfullName : null,
            ageValidation:false,
            age : null
        };
        this._datePick = this._datePick.bind(this);
    }


    _getSubmitAction = () => {

        const { mobile,guardianfullName} = this.state;
        if( mobile && guardianfullName){

            const {navigate} = this.props.navigation;
            const {img_url} = this.props.navigation.state.params;
            fetch("https://faceapi.bharatchain.org/create-missing/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    phoneNumber: mobile,
                    imageUrl: img_url,
                    childName:'Unknown',
                    guardianName:guardianfullName,
                    age : 0
                })
            })
                .then( (response) => {
                    this.setState({spinner: false});
                    navigate('response')
                    //do something awesome that makes the world a better place
                });

        }else{
            Snackbar.show({
                title: 'Please fill all the details',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'indianred',
            });
        }

    };

    _getDataInState =() =>{
        const { navigate } = this.props.navigation;
       const Data  = {...this.refs.form.getValues()};


       const userData = {
           fullName : Data.fullName,
            address : Data.address,
           address2 : Data.address2,
           pinCode : Data.pinCode ,
           dob : this.state.date ,
           gender : this.state.gender,

       }
       this.props.setUserLoginDataInState(userData);
    }


    _renderFooter = () => {
        return (
            <View>
                <Text style={styles.disclaimerText}>

                </Text>
            </View>
        );
    };

    _onChangeName = (name) =>{
            let reg = /^[A-Za-z\s]+$/;
            if(reg.test(name) == true){
                this.setState({nameValidation:true , fullName : name});
            }else{
                this.setState({nameValidation:false});
            }
    }
    _onChangeAddress = (address)=>{
        let reg = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        if(reg.test(address)){

            this.setState({addressValidation:true ,  address: address});
        }else{
            this.setState({addressValidation:false ,});
        }
    }
    _onChangeAddress2 = (address)=>{
        let reg = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        if(reg.test(address)){

            this.setState({address2: address});
        }
    }

    _onChangePIN = (PIN)=>{
        let reg = /^[0-9]{6}$/;
        if(reg.test(PIN)){
            this.setState({pinValidation: true ,  pin: PIN});
        }else{
            this.setState({pinValidation: false});
        }
    }

    _onChangeMobile = (mobile)=>{
        let reg = /^[0-9]{10}$/;
        if(reg.test(mobile)){
            this.setState({mobileValidation: true ,  mobile: mobile});
        }else{
            this.setState({mobileValidation: false});
        }
    }
    _onChangeGuardianName = (name)=>{
        let reg = /^[A-Za-z\s]+$/;
        if(reg.test(name) === true){
            this.setState({gaurdiannameValidation:true , guardianfullName : name});
        }else{
            this.setState({gaurdiannameValidation:false});
        }
    }

    _onChangeAge = (age) =>{
        let reg = /^[0-9]{6}$/;
        if(reg.test(age)){
            this.setState({ageValidation: true ,  age: age});
        }else{
            this.setState({ageValidation: false});
        }
    }

    _datePick(dateVal) {
        this.setState({ date: dateVal });
    }
    setSelectedOption = (selectedOption, selectedIndex)=>{
        this.setState({gender : selectedOption.value});
    };

    segmentOptions = [
        {
            label: 'Male',
            value: 'male',
        },
        {
            label: 'Female',
            value: 'female',
        },
    ];

    render() {
        let buttonText = "Proceed";
        let textStyle = {};

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView>
                <Form ref={"form"} style={styles.form}>

                    {/*{!this.state.nameValidation? <Text style={{color:'red'}}>Please Enter a Valid Name</Text>
                        :<Text style={{color:'green'}}>This is Valid</Text>}*/}

                    <View
                        style={styles.parentTextInput}
                    >
                        <TextInput
                            ref={"gaurdianfullName"}
                            name={"gaurdianfullName"}
                            type={"TextInput"}
                            underlineColorAndroid={"transparent"}
                            autoCapitalize={"words"}
                            autoCorrect={false}
                            onChangeText={(name) =>this._onChangeGuardianName(name)}
                            placeholder={"Founder Full Name"}
                            keyboardType={"default"}
                            style={[styles.textInput, textStyle]}
                            returnKeyType="next"
                            placeholderTextColor={inputColor}
                            selectionColor={brandColor}
                            maxLength={50} //StaticFile
                            onSubmitEditing={()=>this.refs.form.refs.address.focus()}
                        />

                        {this.state.gaurdiannameValidation ? <SuccesIcon name={'check'} size={20} style={styles.iconSuccess}/>
                            : <CrossIcon name ={'cross'} size={20} style={styles.iconError}/>}
                    </View>

                    <View
                        style={styles.parentTextInput}
                    >
                        <TextInput
                            ref={"mobile"}
                            name={"mobile"}
                            type={"TextInput"}
                            underlineColorAndroid={"transparent"}
                            autoCorrect={false}
                            onChangeText={(mobile)=>this._onChangeMobile(mobile)}
                            placeholder={"Mobile"}
                            keyboardType={"numeric"}
                            style={[styles.textInput, textStyle, { flex: 1 }]}
                            returnKeyType="next"
                            placeholderTextColor={inputColor}
                            selectionColor={brandColor}
                            maxLength={10} //StaticFile
                            minLength={10}
                        />
                        {this.state.mobileValidation ? <SuccesIcon name={'check'} size={20} style={styles.iconSuccess}/>
                            : <CrossIcon name ={'cross'} size={20} style={styles.iconError}/>}
                    </View>
                    <View
                        style={styles.parentTextInput}
                    >
                        <TextInput
                            ref={"address"}
                            name={"address"}
                            type={"TextInput"}
                            underlineColorAndroid={"transparent"}
                            autoCorrect={false}
                            onChangeText={(address)=>this._onChangeAddress(address)}
                            placeholder={"Place of Finding"}
                            keyboardType={"default"}
                            style={[styles.textInput, textStyle, { flex: 1 }]}
                            returnKeyType="next"
                            placeholderTextColor={inputColor}
                            selectionColor={brandColor}
                            //StaticFile
                        />
                        {this.state.addressValidation ? <SuccesIcon name={'check'} size={20} style={styles.iconSuccess}/>
                            : <CrossIcon name ={'cross'} size={20} style={styles.iconError}/>}
                    </View>
                    <View>
                        <View style={styles.segment}>
                            <SegmentedControls
                                ref = "gender"
                                options={this.segmentOptions}
                                onSelection={ this.setSelectedOption.bind(this) }
                                selectedOption={this.state.gender}
                                optionStyle={{padding:0}}
                                extractText={ (option) => option.label }
                                testOptionEqual={(selectedValue, option) => selectedValue === option.value}
                            />
                        </View>
                    </View>


                    <Button full
                        style={styles.button}
                        onPress={this._getSubmitAction}
                    >
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </Button>

                    {this._renderFooter()}
                </Form>
                </KeyboardAvoidingView>
                <Spinner
                    visible={this.state.spinner}
                    textContent={"One moment..."}
                    textStyle={{ color: "#fff" }}
                />
            </View>
        );
    }
}
export default Login;