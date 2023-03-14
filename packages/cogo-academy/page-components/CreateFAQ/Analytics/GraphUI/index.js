/* eslint-disable indent */
import { ResponsiveLine } from '@cogoport/charts/line';
import { ResponsiveSunburst } from '@cogoport/charts/sunburst';

function GraphUI() {
	const data = [

  {
    id    : 'Search',
    color : 'hsl(112, 70%, 50%)',
    data  : [
      {
        x : 'Jan',
        y : 15,
      },
      {
        x : 'Feb',
        y : 56,
      },
      {
        x : 'Mar',
        y : 264,
      },
      {
        x : 'Apr',
        y : 15,
      },
      {
        x : 'May',
        y : 154,
      },
      {
        x : 'Jun',
        y : 264,
      },
      {
        x : 'Jul',
        y : 27,
      },
      {
        x : 'Aug',
        y : 8,
      },
      {
        x : 'Sep',
        y : 182,
      },
      {
        x : 'Oct',
        y : 79,
      },
      {
        x : 'Nov',
        y : 254,
      },
      {
        x : 'Dec',
        y : 140,
      },
    ],
  },
  {
    id    : 'Answer Available',
    color : 'hsl(71, 70%, 50%)',
    data  : [
        {
            x : 'Jan',
            y : 15,
          },
          {
            x : 'Feb',
            y : 56,
          },
          {
            x : 'Mar',
            y : 264,
          },
          {
            x : 'Apr',
            y : 15,
          },
          {
            x : 'May',
            y : 154,
          },
          {
            x : 'Jun',
            y : 264,
          },
          {
            x : 'Jul',
            y : 27,
          },
          {
            x : 'Aug',
            y : 8,
          },
          {
            x : 'Sep',
            y : 182,
          },
          {
            x : 'Oct',
            y : 79,
          },
          {
            x : 'Nov',
            y : 254,
          },
          {
            x : 'Dec',
            y : 140,
          },
    ],
  },
  {
    id    : 'Answer Requested',
    color : 'hsl(24, 70%, 50%)',
    data  : [
        {
            x : 'Jan',
            y : 15,
          },
          {
            x : 'Feb',
            y : 56,
          },
          {
            x : 'Mar',
            y : 264,
          },
          {
            x : 'Apr',
            y : 15,
          },
          {
            x : 'May',
            y : 154,
          },
          {
            x : 'Jun',
            y : 264,
          },
          {
            x : 'Jul',
            y : 27,
          },
          {
            x : 'Aug',
            y : 8,
          },
          {
            x : 'Sep',
            y : 182,
          },
          {
            x : 'Oct',
            y : 79,
          },
          {
            x : 'Nov',
            y : 254,
          },
          {
            x : 'Dec',
            y : 140,
          },
    ],
  },
];
	const colors = ['#BDBDBD', '#ABCD62', '#DDEBC0'];
	return (
		<div style={{ height: '400px', width: '1300px', backgroundColor: '#FFF', display: 'flex' }}>

			<ResponsiveLine
				data={data}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{ type: 'point' }}
				yScale={{
            type    : 'linear',
            min     : 'auto',
            max     : 'auto',
            stacked : true,
            reverse : false,
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
            orient         : 'bottom',
            tickSize       : 5,
            tickPadding    : 5,
            tickRotation   : 0,
            legend         : 'transportation',
            legendOffset   : 36,
            legendPosition : 'middle',
				}}
				axisLeft={{
            orient         : 'left',
            tickSize       : 5,
            tickPadding    : 5,
            tickRotation   : 0,
            legend         : 'count',
            legendOffset   : -40,
            legendPosition : 'middle',
				}}
				pointSize={10}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-14}
				useMesh
				legends={[
            {
                anchor            : 'bottom-right',
                direction         : 'column',
                justify           : false,
                translateX        : 100,
                translateY        : 0,
                itemsSpacing      : 0,
                itemDirection     : 'left-to-right',
                itemWidth         : 80,
                itemHeight        : 20,
                itemOpacity       : 0.75,
                symbolSize        : 12,
                symbolShape       : 'circle',
                symbolBorderColor : 'rgba(0, 0, 0, .5)',
                effects           : [
                    {
                        on    : 'hover',
                        style : {
                            itemBackground : 'rgba(0, 0, 0, .03)',
                            itemOpacity    : 1,
                        },
                    },
                ],
            },
				]}
			/>
			<ResponsiveSunburst
				data={data}
				margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
				id="name"
				value="loc"
				cornerRadius={2}
				borderColor={{ theme: 'background' }}
				colors={{ scheme: 'nivo' }}
				childColor={{
            from      : 'color',
            modifiers : [
                [
                    'brighter',
                    0.1,
                ],
            ],
				}}
				enableArcLabels
				arcLabelsSkipAngle={10}
				arcLabelsTextColor={{
            from      : 'color',
            modifiers : [
                [
                    'darker',
                    1.4,
                ],
            ],
				}}
			/>

		</div>
	);
}

export default GraphUI;
