import { IcMFolder, IcMImage, IcMEdit, IcMVideoCall, IcMFdangerousCargoType, IcMCard } from '@cogoport/icons-react';

const contents = [
	{
		type : 'text',
		icon : <IcMEdit />,
		name : 'text',

	},
	{
		type : 'image',
		icon : <IcMImage />,
		name : 'image',

	},
	{
		type : 'button',
		icon : <IcMFolder />,
		name : 'button',
	},
	{
		type : 'video',
		icon : <IcMVideoCall />,
		name : 'video',

	},
	{
		type : 'html',
		icon : <img alt="" src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/html.svg" height="20px" />,
		name : 'html',
	},
	{
		type : 'form',
		icon : <IcMFdangerousCargoType />,
		name : 'form',

	},
	{
		type : 'carousel',
		icon : <IcMCard />,
		name : 'carousel',
	},

];

export default contents;
