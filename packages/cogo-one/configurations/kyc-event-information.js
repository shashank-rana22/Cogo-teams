const kycEventInformation = ({ eventPlatform }) => {
	const eventInformation = {
		'System: KYC: Requested': {
			title       : `Customer Has Requested for KYC Verification on ${eventPlatform} Platform`,
			information : 'Please keep an eye out in the event that the customer\'s KYC is verified or rejected.',
		},
		'System: KYC: Verified': {
			title       : `Customer Is Now KYC Verified on ${eventPlatform} Platform`,
			information : `You should send them a message encouraging them to perform a 
                shipment if they are likely to do so.`,
		},
		'System: KYC: Rejected': {
			title       : `Customer's KYC Verification Request Has Been Rejected on ${eventPlatform} Platform`,
			information : `Please contact them to understand their issue and help them 
                to get it verified the next time.`,
		},
		'System: KYC: Pending Verification': {
			title       : `Customer KYC Verification Is Still Pending After 3 Days on ${eventPlatform} Platform`,
			information : 'Please check why this might be happening and intimate the customer if there are any issues.',
		},
	};

	return eventInformation;
};

export default kycEventInformation;
