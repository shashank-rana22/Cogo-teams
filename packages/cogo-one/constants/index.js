import { IcCWhatsapp, IcCFacebook, IcMBookingManagement } from '@cogoport/icons-react';

export const SOURCE_ICON_MAPPING = {
	whatsapp : <IcCWhatsapp width={22} height={22} />,
	email    : <IcMBookingManagement width={22} height={22} />,
	facebook : <IcCFacebook width={22} height={22} />,
};

export const TAGS_COLORS = ['#FEF3E9', '#F3FAFA'];

export const ASSIGNE_COLORS = {
	disabled : { background: '#BDBDBD', shadowColor: '#E0E0E0', color: '#ffffff' },
	active   : { background: '#C4DC91', shadowColor: '#DDEBC0', color: '#221F20' },
};

export const VOICE_ICON_MAPPING = {
	missed       : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/misscall.svg',
	disconnected : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/disconnected.svg',
	outgoing     : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/outgoingcall.svg',
	incomming    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/incomingcall.svg',
};
