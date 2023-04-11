import { ResponsiveChoropleth } from '@cogoport/charts/geo';

import useGetCoordinates from '../hooks/useGetCoordinates';

function Map({ data = {}, unknownColor = 'white', lowerlimit = 0, upperlimit = 100000000 }) {
	const { responseData = {} } = useGetCoordinates();

	const newData = [];
	(responseData.list || []).forEach((obj) => {
		const { id = '', type = '', name = '', coordinates = [], geometry_type = '' } = obj;
		const parsed_coordinates = JSON.parse(coordinates) || {};
		newData.push({
			type,
			properties : { name },
			geometry   : {
				type        : geometry_type,
				coordinates : parsed_coordinates,
			},
			id,
		});
	});
	return (
		<ResponsiveChoropleth
			features={newData}
			data={data}
			margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
			colors="nivo"
			domain={[lowerlimit, upperlimit]}
			unknownColor={unknownColor}
			label="properties.name"
			valueFormat=".2s"
			projectionTranslation={[0.5, 0.5]}
			projectionRotation={[0, 0, 0]}
			enableGraticule
			graticuleLineColor="#dddddd"
			borderWidth={0.5}
			borderColor="#152538"
			defs={[
				{
					id         : 'dots',
					type       : 'patternDots',
					background : 'inherit',
					color      : '#38bcb2',
					size       : 4,
					padding    : 1,
					stagger    : true,
				},
				{
					id         : 'lines',
					type       : 'patternLines',
					background : 'inherit',
					color      : '#eed312',
					rotation   : -45,
					lineWidth  : 6,
					spacing    : 10,
				},
				{
					id     : 'gradient',
					type   : 'linearGradient',
					colors : [
						{
							offset : 0,
							color  : '#000',
						},
						{
							offset : 100,
							color  : 'inherit',
						},
					],
				},
			]}
			fill={[
				{
					match: {
						id: 'CA',
					},
					id: 'dots',
				},
				{
					match: {
						id: 'CN',
					},
					id: 'lines',
				},
				{
					match: {
						id: 'AQ',
					},
					id: 'gradient',
				},
			]}
			legends={[
				{
					anchor        : 'bottom-left',
					direction     : 'column',
					justify       : true,
					translateX    : 20,
					translateY    : -100,
					itemsSpacing  : 0,
					itemWidth     : 94,
					itemHeight    : 18,
					itemDirection : 'left-to-right',
					itemTextColor : '#444444',
					itemOpacity   : 0.85,
					symbolSize    : 18,
					effects       : [
						{
							on    : 'hover',
							style : {
								itemTextColor : '#000000',
								itemOpacity   : 1,
							},
						},
					],
				},
			]}
		/>
	);
}
export default Map;
