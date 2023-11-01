const DUMMY_DATA = [
	{
		agent_name   : 'Ajay Malhotra',
		location     : 'Mumbai',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Vinod Mohan',
	},
	{
		agent_name   : 'Bipin Biswas',
		location     : 'Gurgaon',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Vinod Mohan',
	},
	{
		agent_name   : 'Vinod Mohan',
		location     : 'Mumbai',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Ajay Malhotra',
	},
	{
		agent_name   : 'Mohan Das',
		location     : 'Gurgaon',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Vinod Mohan',
	},
	{
		agent_name   : 'Vinod Mohan',
		location     : 'Mumbai',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Shalini Naidu',
	},
	{
		agent_name   : 'Bipin Biswas',
		location     : 'Gurgaon',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Shalini Naidu',
	},
	{
		agent_name   : 'Vinod Mohan',
		location     : 'Mumbai',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Vinod Mohan',
	},
	{
		agent_name   : 'Bipin Biswas',
		location     : 'Gurgaon',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Vinod Mohan',
	},
	{
		agent_name   : 'Vinod Mohan',
		location     : 'Mumbai',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Shalini Naidu',
	},
	{
		agent_name   : 'Mohan Das',
		location     : 'Gurgaon',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Vinod Mohan',
	},
	{
		agent_name   : 'Vinod Mohan',
		location     : 'Mumbai',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Ajay Malhotra',
	},
	{
		agent_name   : 'Mohan Das',
		location     : 'Gurgaon',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Vinod Mohan',
	},
	{
		agent_name   : 'Shalini Naidu',
		location     : 'Mumbai',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Vinod Mohan',
	},
	{
		agent_name   : 'Bipin Biswas',
		location     : 'Gurgaon',
		agent_role   : 'KAM',
		agent_tenure : `${(Math.random() * 10).toFixed(0)} Years`,
		manager_name : 'Vinod Mohan',
	},
];

const getDummyData = () => {
	const randomInts = [
		Math.floor(Math.random() * 13),
		Math.floor(Math.random() * 13),
		Math.floor(Math.random() * 13),
		Math.floor(Math.random() * 13),
		Math.floor(Math.random() * 13),
	];

	return randomInts.map((itm) => DUMMY_DATA?.[itm]);
};
export default getDummyData;
