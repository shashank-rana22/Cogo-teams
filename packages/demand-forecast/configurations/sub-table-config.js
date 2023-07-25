const getSubTableConfig = () => {
	const config = {
		week: [{
			date       : '20 Jul - 31 Jul',
			containers : '50 TEUs',
		}, {
			date       : 'Aug Week 1',
			containers : '50 TEUs',
		}, {
			date       : 'Aug Week 2',
			containers : '50 TEUs',
		}, {
			date       : 'Aug Week 3',
			containers : '50 TEUs',
		}, {
			date       : 'Aug Week 4',
			containers : '50 TEUs',
		}],
		persona: [{
			organization_type : 'Mid Size',
			containers        : '50 TEUs',
		},
		{
			organization_type : 'Channel Partner',
			containers        : '50 TEUs',
		}, {
			organization_type : 'Long Tail',
			containers        : '50 TEUs',
		}, {
			organization_type : 'Enterprise',
			containers        : '50 TEUs',
		}, {
			organization_type : 'Other',
			containers        : '50 TEUs',
		}],
		container_type: [
			{
				container_type : 'Standard Dry',
				containers     : '50 TEUs',
			},
			{
				container_type : 'Reefer',
				containers     : '50 TEUs',
			}, {
				container_type : 'Open Top',
				containers     : '50 TEUs',
			}, {
				container_type : 'Flat Rack',
				containers     : '50 TEUs',
			}, {
				container_type : 'ISO Tank',
				containers     : '50 TEUs',
			},
			{
				container_type : 'Open Side',
				containers     : '50 TEUs',
			},
		],
		container_size: [
			{
				container_type : '20 ft',
				containers     : '50 TEUs',
			},
			{
				container_type : '40 ft',
				containers     : '50 TEUs',
			}, {
				container_type : '40 ft HC',
				containers     : '50 TEUs',
			}, {
				container_type : '45 ft HC',
				containers     : '50 TEUs',
			},
		],
	};

	return config;
};

export default getSubTableConfig;
