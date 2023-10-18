const ADOPTION_CONTROLS = [
	{
		label       : 'KYC verification',
		name        : 'kyc_verification',
		subLabel    : 'Reliance PVT LTD',
		accountType : 'CP',
		requestedBy : 'Akash Agarwal (Agent)',
		agentRole   : 'Operations',
		hasDocument : true,
		kycVerify   : true,
	},
	{
		label           : 'Trade party verification',
		name            : 'trade_party_verification',
		subLabel        : 'Reliance PVT LTD',
		accountType     : 'SME',
		requestedBy     : 'Open Sea International',
		tradeType       : 'Paying Party',
		hasDocument     : true,
		tradeTypeVerify : true,
	},
	{
		label       : 'Demo Request',
		name        : 'demo_request',
		subLabel    : 'Reliance PVT LTD',
		accountType : 'Enterprise',
		source      : 'Website',
		requestedBy : 'Ashish Thakkar (Agent)',
		schedule_at : true,
		demo        : true,
	},
	{
		label            : 'Account Allocation Req',
		name             : 'account_allocation_req',
		subLabel         : 'Asian Paints',
		requestedBy      : 'Kiran Agarwal',
		currentAgent     : 'Vinay Kulkarni',
		last_transaction : true,
		hasDocument      : true,
		accountAllocate  : true,
	},
];

export default ADOPTION_CONTROLS;
