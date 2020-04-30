import React from "react";
import Grid from '@material-ui/core/Grid';
import CanvasJSReact from '../../../lib/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartList2 extends React.Component {
    render() {
		const {favoriteInfo} = this.props;

		const favordata = [];
		console.log("favoriteInfo in chart : ", favoriteInfo);
		for(var i=0; i<favoriteInfo.length; i++){
			favordata.push({"y": favoriteInfo[i].count, "label" : favoriteInfo[i].name})
		}

		console.log("favordata : ", favordata);

        const options = {
			animationEnabled: true,
			theme: "light1",
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",		
				startAngle: -90,
				dataPoints: favordata,
			}]
		}
        return(
            <div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		    </div>
        );
    }
}

export default ChartList2;
