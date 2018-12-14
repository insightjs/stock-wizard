import React from 'react';
import ReactDOM from 'react-dom';
import Dumbledore from '../assets/wizard.png';
import { VictoryChart, VictoryAxis, 
  VictoryZoomContainer, VictoryLine, VictoryBrushContainer, 
  VictoryTheme } from 'victory';


  
let today = new Date();
let thirtydayslater = new Date();
thirtydayslater.setDate(thirtydayslater.getDate() + 30);
  


let result = [];
let stockData =[];

class PredictionChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomDomain: { x: [new Date(), thirtydayslater] }
    };
  }
  
  componentDidUpdate() {
    stockData = this.props.stockData['stockData'].split('')
    stockData.shift();
    stockData.pop();
    stockData = stockData.join('').split(', ')
    
    result = [];

    for (let i=1; i<stockData.length; i++) {
      let currdate = new Date();
      currdate.setDate(currdate.getDate() + i);
      result.push({
        a: currdate,
        b: Math.floor(Number(stockData[i]))
      })
    }
    
  }
  
  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }
  
  render() {

    if (stockData.length===0) {
      return (
        <img src = {Dumbledore} />
      )
    } else {
      return (
        <div id='PredictionChart'>
          <VictoryChart width={600} height={470} scale={{ x: "time" }}
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
              <VictoryLine
                style={{
                  data: { stroke: "teal" }
                }}
                data={result}
                x="a"
                y="b"
              />
  
            </VictoryChart>

            <p>  </p>
            <VictoryChart
              padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
              width={600} height={100} scale={{ x: "time" }}
              containerComponent={
                <VictoryBrushContainer
                  brushDimension="x"
                  brushDomain={this.state.zoomDomain}
                  onBrushDomainChange={this.handleZoom.bind(this)}
                  brushStyle={{fill: "teal", opacity: 0.2}}
                />
              }
            >
              <VictoryAxis
                tickFormat={(x) => new Date(x).getFullYear()}
              />
              <VictoryLine
                style={{
                  data: { stroke: "teal" }
                }}
                data={result}
                x="key"
                y="b"
              />
            </VictoryChart>
        </div>
      );
    }
  

  }
}
export default PredictionChart;