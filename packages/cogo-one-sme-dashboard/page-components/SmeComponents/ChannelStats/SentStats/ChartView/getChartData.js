import calcChange from '../../../../../helpers/calcChange';

const DATA_KEYS = {
	emails: {
		system: {
			click : 'total_clicked_system_mails',
			open  : 'total_open_system_mails',
			total : 'total_system_mails',
		},
		agent: {
			click : 'total_clicked_agent_mails',
			open  : 'total_open_agent_mails',
			total : 'total_agent_mails',

		},
		marketing: {
			click : 'total_clicked_marketing_mails',
			open  : 'total_open_marketing_mails',
			total : 'total_marketing_mails',
		},
	},
};

const getChartData = ({
	channelType = '',
	currentData = [],
	previousData = [],
	msgType = '',
}) => {
	const clickKey = DATA_KEYS?.[channelType]?.[msgType]?.click;
	const openKey = DATA_KEYS?.[channelType]?.[msgType]?.open;
	const totalKey = DATA_KEYS?.[channelType]?.[msgType]?.total;

	const totalValue = currentData?.[totalKey] || 0;

	const clickRate = totalValue === 0 ? 0
		: (((currentData?.[clickKey] || 0) / totalValue) * 100)?.toFixed(2) || 0;

	const openRate = totalValue === 0 ? 0
		: (((currentData?.[openKey] || 0) / totalValue) * 100)?.toFixed(2) || 0;

	const prevTotalValue = currentData?.[totalKey] || 0;

	const prevClickRate = prevTotalValue === 0 ? 0
		: (((previousData?.[clickKey] || 0) / prevTotalValue) * 100)?.toFixed(2) || 0;

	const prevOpenRate = prevTotalValue === 0 ? 0
		: (((previousData?.[openKey] || 0) / prevTotalValue) * 100)?.toFixed(2) || 0;

	if (channelType === 'emails' && msgType === 'agent') {
		const repliedRate = totalValue === 0 ? 0
			: (((currentData?.total_agent_replied_mails || 0) / totalValue) * 100)?.toFixed(2) || 0;
		const prevRepliedRate = totalValue === 0 ? 0
			: (((previousData?.total_agent_replied_mails || 0) / totalValue) * 100)?.toFixed(2) || 0;

		return {
			chartData: [
				{
					id   : 'Replied Mails',
					data : [
						{
							x     : 'replied',
							y     : Number(repliedRate),
							color : channelType === 'whatsapp' ? '#888FD1' : '#F68B21',
						},
						{
							x     : 'no response',
							y     : 100 - repliedRate,
							color : '#d9d9d9',
						},
					],
				}],
			legends: [
				{
					name   : 'replied_rate',
					label  : 'Replied Rate',
					value  : +repliedRate,
					change : calcChange({ currVal: repliedRate, prevVal: prevRepliedRate }),
					color  : channelType === 'whatsapp' ? '#888FD1' : '#F68B21',
				}],
		};
	}

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
				change : calcChange({ currVal: openRate, prevVal: prevOpenRate }),
				color  : channelType === 'whatsapp' ? '#888FD1' : '#F68B21',
			},
			{
				name   : 'click_rate',
				label  : 'Click Rate',
				value  : clickRate,
				change : calcChange({ currVal: clickRate, prevVal: prevClickRate }),
				color  : channelType === 'whatsapp' ? '#ABCD62' : '#88CAD1',
			},
		],
	};
};

export default getChartData;
