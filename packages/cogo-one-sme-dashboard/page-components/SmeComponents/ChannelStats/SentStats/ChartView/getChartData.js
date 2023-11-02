const getChartData = ({ channelType = '' }) => {
	const clickRate = (Math.random() * 100)?.toFixed(2);
	const openRate = (Math.random() * 100)?.toFixed(2);

	return {
		chartData: [
			{
				id   : 'Click Rate',
				data : [
					{
						x     : 'clicked',
						y     : Number(clickRate),
						color : channelType === 'whatsapp' ? '#ABCD62' : '#88CAD1',
					},
					{
						x     : 'no response',
						y     : 100 - clickRate,
						color : '#d9d9d9',
					},
				],
			},
			{
				id   : 'Open Rate',
				data : [
					{
						x     : 'open',
						y     : Number(openRate),
						color : channelType === 'whatsapp' ? '#888FD1' : '#F68B21',
					},
					{
						x     : 'not touched',
						y     : 100 - openRate,
						color : '#d9d9d9',
					},
				],
			},
		],
		legends: [
			{
				name   : 'open_rate',
				label  : 'Open Rate',
				value  : +openRate,
				change : (Math.random() * 100 * ([+1, -1][((Math.random()) * 10).toFixed(0) % 2])).toFixed(1),
				color  : channelType === 'whatsapp' ? '#888FD1' : '#F68B21',
			},
			{
				name   : 'click_rate',
				label  : 'Click Rate',
				value  : clickRate,
				change : (Math.random() * 100 * ([+1, -1][((Math.random()) * 10).toFixed(0) % 2])).toFixed(1),
				color  : channelType === 'whatsapp' ? '#ABCD62' : '#88CAD1',
			},
		],
	};
};

export default getChartData;
