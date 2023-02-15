import { IcCWhatsapp, IcCFacebook, IcCInstagram } from '@cogoport/icons-react';

export const SOURCE_ICON_MAPPING = {
	whatsapp  : <IcCWhatsapp width={22} height={22} />,
	facebook  : <IcCFacebook width={22} height={22} />,
	instagram : <IcCInstagram width={22} height={22} />,
	email     : <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/email.svg"
		alt=""
		width="18px"
		height="18px"
	/>,
	chatbot: <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/platformchat.svg"
		alt=""
		width="18px"
		height="18px"
	/>,

};

export const TAGS_COLORS = ['#FEF3E9', '#F3FAFA'];

export const ASSIGNE_COLORS = {
	disabled : { background: '#BDBDBD', shadowColor: '#E0E0E0', color: '#ffffff' },
	active   : { background: '#C4DC91', shadowColor: '#DDEBC0', color: '#221F20' },
};

export const VOICE_ICON_MAPPING = {
	missed       : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/misscall.svg',
	not_answered : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/disconnected.svg',
	outgoing     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/outgoingcall.svg',
	incoming     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/incomingcall.svg',
};
