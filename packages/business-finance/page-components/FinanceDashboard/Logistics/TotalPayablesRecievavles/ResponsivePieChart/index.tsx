import { ResponsivePie } from '@cogoport/charts/pie/index';

function ResponsivePieChart({ pieData }) {
	return (
		<ResponsivePie
			data={pieData}
			margin={{ top: 20, right: 80, bottom: 20, left: 0 }}
			startAngle={-180}
			endAngle={336}
			innerRadius={0}
			sortByValue
			colors={['#88CAD1', '#CFEAED']}
			enableArcLabels={false}
			activeOuterRadiusOffset={19}
			activeInnerRadiusOffset={13}
			enableArcLinkLabels={false}
			motionConfig={{
				mass      : 1,
				tension   : 500,
				friction  : 500,
				clamp     : true,
				precision : 0.01,
				velocity  : 0,
			}}
			transitionMode="middleAngle"

		/>
	);
}
export default ResponsivePieChart;
