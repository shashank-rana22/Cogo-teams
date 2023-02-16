import React from 'react'
import {ResponsivePie} from '@cogoport/charts/pie'
import { PieChartData } from '../../../../configurations/total-communications-data'



const CommunicationPieChart = () => {
    const colors= ['#BDBDBD', '#ABCD62','#DDEBC0'];
  return (
    <ResponsivePie
    data={PieChartData||[]}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    valueFormat=" >-"
    innerRadius={0.7}
    padAngle={2}
    cornerRadius={2}
    activeInnerRadiusOffset={5}
    colors={colors}
    enableArcLinkLabels={false}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={colors}
    enableArcLabels={false}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
        from: colors,
        modifiers: [
            [
                'darker',
                2
            ]
        ]
    }}
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
   
    legends={[]}
/>
  )
}

export default CommunicationPieChart