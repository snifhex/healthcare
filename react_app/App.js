import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import {contractAddress, abi} from './data.js';
import logo from './loader.gif';


class App extends Component {
  componentWillMount(){
    this.blockchain()
  }


async blockchain() {  
  const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
  const network = await web3.eth.net.getNetworkType()
  const account = await web3.eth.getAccounts()
  this.setState({account});

  var _customerId = prompt('Enter Customer Id');
  var _email = prompt('Enter your email');
  var customerId;

if (_customerId.length>=4){
  customerId = _customerId[3];
}
else{
  customerId=0;
  console.log('Wrong Id');
  alert('Wrong Id');
}


  var HealthcareContract = new web3.eth.Contract(abi, contractAddress);
  // console.log(HealthcareContract.methods);

  const patientCount = await HealthcareContract.methods.getPatientCount().call()
  this.setState({patientCount})


    
  const patientData = await HealthcareContract.methods.getPatient(parseInt(customerId)).call();
  console.log(patientData);

  const name = patientData[0];
  const email = patientData[1];
  const heartRate = patientData[2];
  const bodyTemperature = patientData[3];

  if (_email === email){
    this.setState({name});
    this.setState({email});
    this.setState({heartRate});
    this.setState({bodyTemperature});
    console.log(patientData);
  }
  else{
    console.log('Credentials Doesn\'t match');
    alert('Credentials Doesn\'t match')
  }

  

  // document.querySelector('.account').innerHTML=account;
  // document.querySelector('.dataName').innerHTML = name;
  // document.querySelector('.dataEmail').innerHTML = email;
  // document.querySelector('.dataHeartRate').innerHTML = heart;
  // document.querySelector('.databodyTemperature').innerHTML = bodytemp;

}


constructor(props) {
  super (props)
  this.state = {
    account: '',
    name: 'NaN',
    email: 'null@null.com',
    heartRate: 'NULL',
    bodyTemperature: 'NULL',
    patientCount: 0

  }
}


  render() {
    // console.log(web3.version);
    return (
      <div className="">

{/*       
      <p>patient count : {this.state.patientCount}</p>
      <h1 className = 'account'></h1>
      <h1 className = 'dataName'>{this.state.name}</h1>
      <h1 className = 'dataEmail'>{this.state.email}</h1>
      <h1 className = 'dataHeartRate'>{this.state.heartRate}</h1>
      <h1 className = 'databodyTemperature'>{this.state.bodyTemperature}</h1> */}







      {/* // Header part of the webpage. */}
    <div className = "head">
        <div className= "leftNav">
                <div className = "logoImg">
                        <center><img src = {logo}></img></center>
                </div>

                <center><div className = "logo"><b>Healthcare BlockChain</b></div></center>

        </div>

        <div className = "rightNav">

                <div className="dropdown">
                        <button className="dropbtn">ethereumAddress<i className="fa fa-caret-down"></i></button>
                        <div className="dropdown-content">
                        {this.state.account}
                        </div>
                </div>
            
        </div>

    </div>


    {/* //This is the container where the data of the user will be showed  */}


    <div className="container">

        <div className = "userData">
{/* 
                <div className = 'box left'>
                        Hello! {this.state.name}
                </div> */}

            <div className = 'box left'>
            Hello!  {this.state.name}
            </div>

            <div className = 'box right'>
            {this.state.email}
            </div>

            <div className = 'box left'>
            Your heart rate is {this.state.heartRate}
            </div>

            <div className = 'box right'>
            Your temperature is {this.state.bodyTemperature}
            </div>

        </div>
        <center>
        <div className = 'msg'>
            This is your data stored in our private blockchain.
        </div>
        </center>
    </div>










      </div>

    );
  
    }
  
  }

export default App;
