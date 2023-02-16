import { IcCWhatsapp, IcCFacebook, IcCInstagram } from '@cogoport/icons-react';

export const SOURCE_ICON_MAPPING = {
	whatsapp  : <IcCWhatsapp width={20} height={20} />,
	facebook  : <IcCFacebook width={20} height={20} />,
	instagram : <IcCInstagram width={20} height={20} />,
	email     : <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/email.svg"
		alt=""
		width="16px"
		height="16px"
	/>,
	chatbot: <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/platformchat.svg"
		alt=""
		width="16px"
		height="16px"
	/>,

};

export const TAGS_COLORS = ['#FEF3E9', '#F3FAFA'];

export const ASSIGNE_COLORS = {
	disabled : { background: '#BDBDBD', shadowColor: '#E0E0E0', color: '#ffffff' },
	active   : { background: '#C4DC91', shadowColor: '#DDEBC0', color: '#221F20' },
};

export const VOICE_ICON_MAPPING = {
	missed        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/misscall.svg',
	not_connected : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/disconnected.svg',
	outgoing      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/outgoingcall.svg',
	incoming      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/incomingcall.svg',
};

export const USER_ACTIVITY_MAPPING = {
	platform      : 'Platform Activity',
	communication : 'Communication Activity',
	transactional : 'Transactional Activity',
};

export const emptyChat = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-chat.jpg';
