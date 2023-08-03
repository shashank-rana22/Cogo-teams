import { IcMCallnotconnected } from '@cogoport/icons-react';

import styles from './styles.module.css';

export const CALL_END_STATUS = {
	not_connected : 'Call not Connected',
	missed        : 'Customer missed the call',
	answered      : 'Call completed',
};
export const CALL_MAPPING = {
	answered: <img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/phone_in_talk.png"
		alt="answered"
		className={styles.icon_styles_attendee}
	/>,
	not_connected: <IcMCallnotconnected fill="#EE3425" className={styles.icon_styles_attendee} />,
};
