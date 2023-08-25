import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

const MOBILE_NUMBER_KEYS = [
	{
		key   : 'one',
		label : '1',
	},
	{
		key        : 'two',
		label      : '2',
		lowerlabel : 'ABC',
	},
	{
		key        : 'three',
		label      : '3',
		lowerlabel : 'DEF',
	},
	{
		key        : 'four',
		label      : '4',
		lowerlabel : 'GHI',
	},
	{
		key        : 'five',
		label      : '5',
		lowerlabel : 'JKL',
	},
	{
		key        : 'six',
		label      : '6',
		lowerlabel : 'MNO',
	},
	{
		key        : 'seven',
		label      : '7',
		lowerlabel : 'PQRS',
	},
	{
		key        : 'eight',
		label      : '8',
		lowerlabel : 'TUV',
	},
	{
		key        : 'nine',
		label      : '9',
		lowerlabel : 'WXYZ',
	},
	{
		key   : 'dummy_button',
		label : '',
	},
	{
		key   : 'zero',
		label : '0',
	},
	{
		key   : 'delete_icon',
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

export default MOBILE_NUMBER_KEYS;
