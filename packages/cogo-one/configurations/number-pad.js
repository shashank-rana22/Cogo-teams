import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

const mobileNumberPads = [
	{
		key   : 1,
		label : '1',
	},
	{
		key        : 2,
		label      : '2',
		lowerlabel : 'ABC',
	},
	{
		key        : 3,
		label      : '3',
		lowerlabel : 'DEF',
	},
	{
		key        : 4,
		label      : '4',
		lowerlabel : 'GHI',
	},
	{
		key        : 5,
		label      : '5',
		lowerlabel : 'JKL',
	},
	{
		key        : 6,
		label      : '6',
		lowerlabel : 'MNO',
	},
	{
		key        : 7,
		label      : '7',
		lowerlabel : 'PQRS',
	},
	{
		key        : 8,
		label      : '8',
		lowerlabel : 'TUV',
	},
	{
		key        : 9,
		label      : '9',
		lowerlabel : 'WXYZ',
	},
	{
		key   : 10,
		label : '',
	},
	{
		key   : 11,
		label : '0',
	},
	{
		key   : 12,
		label : '',
		icon  : (
			<Image
				src={GLOBAL_CONSTANTS.image_url.backSpaceIcon}
				alt="delete"
				height={25}
				width={25}
			/>
		),
	},
];

export default mobileNumberPads;
