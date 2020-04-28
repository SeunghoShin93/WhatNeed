import React from "react";
import Grid from '@material-ui/core/Grid';
import CanvasJSReact from '../../../lib/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartList2 extends React.Component {
    render() {
        const options = {
			animationEnabled: true,
			theme: "light1",
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",		
				startAngle: -90,
				dataPoints: [
					{ y: 20, label: "아이스 아메리카노" },
					{ y: 24, label: "쉬폰 케잌" },
					{ y: 20, label: "카페모카" },
					{ y: 14, label: "마끼야또" },
					{ y: 12, label: "모닝빵" },
					{ y: 10, label: "죽빵" }	
				]
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
