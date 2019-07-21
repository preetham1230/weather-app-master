import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import cities from './cities.json';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import {Table} from 'reactstrap';


class Weather extends React.Component{

state={
    showdata : false
}

    constructor(props){
        super(props);
        console.log("test");
        this.temp = 0;
        //this.weatherData = {"coord":{"lon":-75.5,"lat":43},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":303.91,"pressure":1010,"humidity":62,"temp_min":302.04,"temp_max":305.93},"visibility":16093,"wind":{"speed":2.6,"deg":250},"clouds":{"all":90},"dt":1563647798,"sys":{"type":1,"id":5681,"message":0.0094,"country":"US","sunrise":1563615632,"sunset":1563669346},"timezone":-14400,"id":5128638,"name":"New York","cod":200} ;
        this.flag = false;
        this.forecastdata= {};
        this.tempID = 524901;
        this.showdata = false;
    }

    cityHandler =(e)=> {
        console.log("api call");
        this.tempID = this.props.count;
        axios.get('http://api.openweathermap.org/data/2.5/weather?id='+this.props.count+'&appid=a30f79a44d74a7b2c4c8f414d958a23e')
          .then(res => {
              this.weatherData = res.data;
            console.log("Weather data", this.weatherData);
            this.flag = true;
      });
    }

    timeLimit = () => {
        setTimeout(() => {
            return <div>test</div>
         }, 2000)
    }

    /*shouldComponentUpdate() {
        console.log("apis call");
        axios.get('http://api.openweathermap.org/data/2.5/weather?id='+this.props.count+'&appid=a30f79a44d74a7b2c4c8f414d958a23e')
          .then(res => {
              this.weatherData = res.data;
            console.log("Weather data", this.weatherData);
            this.flag = true;  
          })
    }*/
    forecastHandler=(f)=>{
        //this.showdata = true;

        this.setState({showdata : true})
        console.log(this.state.showdata);
    }

    render(){
        if((this.temp != this.props.count)){
            this.temp = this.props.count;
            this.flag = false;
            //this.cityHandler();
        }
        
        //this.showdata = false;
            return(
                <Container>
                    <Row>
                <div style={{padding:'30px', border: '1px solid', width:'400px'}}>
                    
                    <div>{this.props.weathdata.weather.map(x=><span>{x.main},</span>)}</div>
                    <div>{this.props.weathdata.weather.map(x=><span>{x.description},</span>)}</div>
                    <div> {this.props.weathdata.main.temp} </div>
                    <div>{this.props.weathdata.wind.speed} </div>
                    <span>
                        <Button color="secondary" onClick={this.forecastHandler}>5 day Forecast</Button>
                        </span>
                </div>
                
                </Row>

                
                <div className={this.props.weathdata.wind.speed ? 'show' : 'hidden'}>>
                <Table>
                    <thead>
                    <tr>
                        <th> Date</th> 
                        <th> Temp</th> 
                        <th> Min Temp</th> 
                        <th> Max Temp</th> 
                        <th> Wind</th> 
                        <th> description</th> 
                    </tr>
                    </thead>
                    
                        {this.props.forecast.list.map(y=>
                            <tr>
                                <td>{y.dt_txt}</td>
                                <td>{y.main.temp}</td>
                                <td>{y.main.temp_min}</td>
                                <td>{y.main.temp_max}</td>
                                <td>{y.wind.speed}</td>
                                <td>{y.weather.map(z=>z.description)}</td>

                            </tr>
                            )}
                        
                    
                </Table>
                </div>
                </Container>
                
            );  
        
             
        
    }

}

const mapstateToProps = state =>({

    count: state.count, 
    weathdata: state.weData,
    forecast: state.forecastData
  })
  
  export default connect(mapstateToProps) (Weather);