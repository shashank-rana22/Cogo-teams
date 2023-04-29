import {
	IcMFolder, IcMImage, IcMText,
	IcMVideoCall, IcMMarginApprovals, IcMCard, IcMOverflowLine,
} from '@cogoport/icons-react';

const contents = [
	{
		type : 'text',
		icon : <IcMText width={24} height={24} />,
		// name : 'text',
	},
	{
		type : 'image',
		icon : <IcMImage width={24} height={24} />,
		// name : 'image',

	},
	{
		type : 'button',
		icon : <IcMFolder width={24} height={24} />,
		// name : 'button',
	},
	{
		type : 'video',
		icon : <IcMVideoCall width={24} height={24} />,
		// name : 'video',
	},
	{
		type : 'html',
		icon : <img
			alt=""
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/html.svg"
			width="24px"
			height="24px"
			style={{ fill: '#FEDE00' }}
		/>,
		// icon : <IcMText width={24} height={24}  />,
		// name: 'html',
	},
	{
		type : 'form',
		icon : <IcMMarginApprovals width={24} height={24} />,
		// name : 'form',

	},
	{
		type : 'carousel',
		icon : <IcMCard width={24} height={24} />,
		// name : 'carousel',
	},
	{
		type : 'divider',
		icon : <IcMOverflowLine width={24} height={24}> </IcMOverflowLine>,
		// name : 'Divider',
	},

];

export default contents;
