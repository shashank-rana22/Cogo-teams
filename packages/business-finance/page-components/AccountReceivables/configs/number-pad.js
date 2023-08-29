import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const mobileNumberPads = [
	{
		label: '1',
	},
	{
		label      : '2',
		lowerlabel : 'ABC',
	},
	{
		label      : '3',
		lowerlabel : 'DEF',
	},
	{
		label      : '4',
		lowerlabel : 'GHI',
	},
	{
		label      : '5',
		lowerlabel : 'JKL',
	},
	{
		label      : '6',
		lowerlabel : 'MNO',
	},
	{
		label      : '7',
		lowerlabel : 'PQRS',
	},
	{
		label      : '8',
		lowerlabel : 'TUV',
	},
	{
		label      : '9',
		lowerlabel : 'WXYZ',
	},
	{
		label: '',
	},
	{ label: '0' },
	{
		label : '',
		icon  : (
			<img
				src={GLOBAL_CONSTANTS.image_url.backSpaceIcon}
				alt="delete"
			/>
		),
	},
];
export default mobileNumberPads;
