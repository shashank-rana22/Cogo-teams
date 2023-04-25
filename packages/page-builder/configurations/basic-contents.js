import { IcMFolder, IcMImage, IcMText, IcMVideoCall, IcAFormsAndCertificates } from '@cogoport/icons-react';

const contents = [
	{
		type : 'text',
		icon : <IcMText width={28} height={28} fill="#FEDE00" />,
		name : 'text',

	},
	{
		type : 'image',
		icon : <IcMImage width={28} height={28} fill="#FEDE00" />,
		name : 'image',

	},
	{
		type : 'button',
		icon : <IcMFolder width={28} height={28} fill="#FEDE00" />,
		name : 'button',
	},
	{
		type : 'video',
		icon : <IcMVideoCall width={28} height={28} fill="#FEDE00" />,
		name : 'video',

	},
	{
		type : 'html',
		icon : <img
			alt=""
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/html.svg"
			width="28px"
			height="28px"
			style={{ fill: '#FEDE00' }}
		/>,
		// icon : <IcMText width={28} height={28} fill="#FEDE00" />,
		name: 'html',
	},
	{
		type : 'form',
		icon : <IcAFormsAndCertificates width={28} height={28} fill="#FEDE00" />,
		name : 'form',

	},
];

export default contents;
