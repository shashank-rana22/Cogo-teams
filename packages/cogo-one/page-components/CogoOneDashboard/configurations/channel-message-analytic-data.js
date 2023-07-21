import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCWhatsapp, IcCFacebook } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

export const CHANNEL_STATS = [
	{
		key         : 'whatsapp',
		icon        : <IcCWhatsapp width="20px" height="20px" />,
		channel     : 'Whats App',
		static_data : 'customer',
	},
	{
		key         : 'facebook',
		icon        : <IcCFacebook width="20px" height="20px" />,
		channel     : 'Facebook',
		static_data : 'customer',
	},
	{
		key         : 'mail',
		icon        : <Image src={GLOBAL_CONSTANTS.image_url.email_svg} alt="mail" width={16} height={16} />,
		channel     : 'Mail',
		static_data : 'customer',
	},
	{
		key  : 'platform_chat',
		icon : <Image
			src={GLOBAL_CONSTANTS.image_url.platform_chat_svg}
			alt="platform"
			width={16}
			height={16}
		/>,
		channel     : 'Platform Chat',
		static_data : 'customer',
	},

];
