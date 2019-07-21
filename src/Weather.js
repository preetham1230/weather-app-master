import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import cities from './cities.json';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import {Table} from 'reactstrap';

class Weather extends React.Component{

    state ={
        showdata : 10,
        cityName:'',
        countryName:'',
        startIndex: 0,
        endIndex: 7
    }
   
    constructor(props){
        super(props);
        console.log("test");
        this.temp = 0;
        //this.weatherData = {"coord":{"lon":-75.5,"lat":43},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":303.91,"pressure":1010,"humidity":62,"temp_min":302.04,"temp_max":305.93},"visibility":16093,"wind":{"speed":2.6,"deg":250},"clouds":{"all":90},"dt":1563647798,"sys":{"type":1,"id":5681,"message":0.0094,"country":"US","sunrise":1563615632,"sunset":1563669346},"timezone":-14400,"id":5128638,"name":"New York","cod":200} ;
        this.flag = false;
        this.forecastdata= {};
        this.tempID = 524901; 
        this.citiesList = cities.cities;    
        
    }
    componentWillMount(){
        console.log("This");
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

    
    forecastHandler=(f)=>{
        //this.showdata = true;

        //this.setState({showdata : true})

        console.log("show dat",f.target.value);
        

        this.setState({showdata: 40});
    }

    closeHandler=(g)=>{
        this.setState({showdata:10});
    }

    
    pageHandler=(a ,b)=>{
        console.log("a",a,b);
        this.setState({
            startIndex: a,
            endIndex: b
        })
    }

    render(){
        if((this.temp != this.props.count)){
            this.temp = this.props.count;
            this.flag = false;
            //this.cityHandler();
        }
        let cityName = this.citiesList.filter(x => x.id == this.props.count)
        //this.setState({showdata: 20});
        console.log("rendering",this.showdata);
            return(
                <Container>
                    <Row>
                <div style={{padding:'0px 0px 30px 0px ', border: '1px solid', width:'400px'}}>
                    <div style={{background : 'grey' }}> City: {this.props.weathdata.name}, Country: {this.props.weathdata.sys.country}</div>
                    <div>MAIN: {this.props.weathdata.weather.map(x=><span>{x.main},</span>)}</div>
                    <div>DESC: {this.props.weathdata.weather.map(x=><span>{x.description},</span>)}</div>
                    <div>TEMP: {this.props.weathdata.main.temp} </div>
                    <div>SPEED: {this.props.weathdata.wind.speed} </div>
                    <span>
                        <Button color="secondary" value="true" onClick={this.forecastHandler}>5 day Forecast</Button>
                        </span>
                </div>
                
                </Row>

                
                {(this.state.showdata == 40) ?  
                <div>
                    <div>
                        <button class="btn btn-primary" style={{float:"right"}} onClick={this.closeHandler}> Close</button>
                    </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Index</th>
                        <th> Date</th> 
                        <th> Temp</th> 
                        <th> Min Temp</th> 
                        <th> Max Temp</th> 
                        <th> Wind</th> 
                        <th> description</th> 
                    </tr>
                    </thead>
                    
                        {this.props.forecast.list.map((y,index)=>
                       
                            <tr>
                                <td>{index}</td>
                                <td>{y.dt_txt}</td>
                                <td>{y.main.temp}</td>
                                <td>{y.main.temp_min}</td>
                                <td>{y.main.temp_max}</td>
                                <td>{y.wind.speed}</td>
                                <td>{y.weather.map(z=>z.description)}</td>

                            </tr>
                           
                            )}
                        
                    
                </Table>
                <span style={{float:"right"}}>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                </span>
                </div>
                
                : null}
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