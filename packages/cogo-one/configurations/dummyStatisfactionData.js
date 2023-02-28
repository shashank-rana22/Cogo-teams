import { happyIcon, neutralIcon, angryIcon } from '../page-components/CogoOneDashboard/constants';

export const satisfactionData = [
	{
		key   : 'happy_customers',
		label : 'Happy Customers',
		icon  : <img src={happyIcon} alt="Happy" />,
	}, {
		key   : 'neutral_customers',
		label : 'Neutral Customers',
		icon  : <img src={neutralIcon} alt="Happy" />,

	}, {
		key   : 'sad_customers',
		label : 'Sad Customers',
		icon  : <img src={angryIcon} alt="Happy" />,

	},
];
