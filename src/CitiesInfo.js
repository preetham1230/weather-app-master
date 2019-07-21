import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import cities from './cities.json';
import {connect} from 'react-redux';

class CitiesInfo extends React.Component{
 
  state = {
  }
  constructor(props)
  {    
    super(props);
    this.citiesList= [];
    console.log("cities",cities);
    this.citiesList = cities.cities;
    this.weatherData = {} ;
    this.cityId = 0
    this.forecastdata={};
    this.tempid= 0;
  }

  componentDidMount() {
    
    console.log("citieslist",this.citiesList)
  }

changeHandler=(e)=>{
  console.log("value",e.target.value);
  this.cityId = e.target.value;
  console.log("apis call");
                      
            axios.get('http://api.openweathermap.org/data/2.5/forecast?id='+e.target.value+'&appid=a30f79a44d74a7b2c4c8f414d958a23e')
            .then(rep => {
                this.forecastdata = rep.data;
              console.log("Forecast data", this.forecastdata);
              
              //this.flag = true;
          });    
            this.tempid= e.target.value;
            setTimeout(()=>{
              axios.get('http://api.openweathermap.org/data/2.5/weather?id='+this.tempid+'&appid=a30f79a44d74a7b2c4c8f414d958a23e')
              .then(res => {
                  this.weatherData = res.data;
                console.log("Weather data", this.weatherData);
                this.props.dispatch({ type: "CITYSELECTED", payload: this.cityId, payData:this.weatherData, forecastData:this.forecastdata});
              });
            },500);

           
        /* axios.get('http://api.openweathermap.org/data/2.5/weather?id='+e.target.value+'&appid=a30f79a44d74a7b2c4c8f414d958a23e')
          .then(res => {
              this.weatherData = res.data;
            console.log("Weather data", this.weatherData);
            this.props.dispatch({ type: "CITYSELECTED", payload: this.cityId, payData:this.weatherData, forecastData:this.forecastdata});
         */
          /*setTimeout(()=>{
            this.props.dispatch({ type: "CITYSELECTED", payload: this.cityId, payData:this.weatherData});
          },2000);*/
          
      }
  
  render()
  {
    

    return(
      <div>
        <div>
          <select onChange={this.changeHandler}>
            
            {this.citiesList.map(post => (
                                <option value={post.id} key={post.id} align="start">                                
                                        {post.name} ,
                                        {post.country}                                
                                </option>
                            ))
            }
          
          </select>
      </div>
        
      
    </div>
    );
  }
}

const mapstateToProps = state =>({

  count: state.count
})

export default connect(mapstateToProps) (CitiesInfo);