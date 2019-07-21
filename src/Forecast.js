import React from 'react';
import {connect} from 'react-redux';

class Forecast extends React.Component{
    render(){
        return(
            <div>
            {this.props.forecastdata}
             </div>
        );

    }
}

const mapstateToProps = state =>({

    count: state.count, 
    weathdata: state.weData,
    forecastdata: state.forecastData
  })
  
  export default connect(mapstateToProps) (Forecast);