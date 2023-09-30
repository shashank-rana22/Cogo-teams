import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEmail, IcMCall, IcMLocation } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

export const profileBasicDetailsMapping = ({ partner = {} }) => {
	const { email = '', mobile_number = '', office_location, partner: partnerData = {} } = partner || {};
	const { business_name = '' } = partnerData || {};
	const { display_name = '' } = office_location || {};

	return [
		{
			icon: <Image
				src={GLOBAL_CONSTANTS.image_url.organization}
				alt="organization"
				width={20}
				height={20}
				style={{ marginRight: '16px' }}
			/>,
			title        : 'Company',
			subTitle     : business_name,
			subTextColor : '#4F4F4F',
		},
		{
			icon         : <IcMEmail width={20} height={20} style={{ marginRight: '16px' }} />,
			title        : 'Email',
			subTitle     : email,
			subTextColor : '#F68B21',

		},
		{
			icon         : <IcMCall width={20} height={20} style={{ marginRight: '16px' }} />,
			title        : 'Phone Number',
			subTitle     : mobile_number,
			subTextColor : '#F68B21',
		},
		{
			icon         : <IcMLocation width={20} height={20} style={{ marginRight: '16px' }} />,
			title        : 'Location',
			subTitle     : display_name,
			subTextColor : '#4F4F4F',
		},
	];
};
