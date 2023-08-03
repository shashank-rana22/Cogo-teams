import { startCase } from '@cogoport/utils';

import { PLATFORM_MAPPING } from '../../constants';
import hideDetails from '../../utils/hideDetails';
import UserAvatar from '../UserAvatar';

import styles from './styles.module.css';

function HeaderName({ formattedData = {} }) {
	const {
		user_name = '',
		business_name = '',
		mobile_no = '',
		channel_type,
		user_type,
		search_user_name = '',
		last_message_document = {},
		lead_user_details = {},
	} = formattedData || {};

	const getLowerLabel = () => {
		if (user_name?.includes('anonymous')) {
			return PLATFORM_MAPPING[user_type] || '';
		}
		return mobile_no
			? `+${hideDetails({ data: mobile_no, type: 'number' })}`
			: business_name;
	};

	return (
		<div className={styles.align_channel_type}>
			<UserAvatar type={channel_type} event={last_message_document?.source} />
			<div className={styles.parent}>
				<div className={styles.name}>
					{startCase(user_name) || startCase(lead_user_details?.name) || 'User'}
					{channel_type === 'whatsapp' && (
						<span className={styles.span_whatsapp_name}>
							(
							{startCase(search_user_name) || 'User'}
							)
						</span>
					)}
				</div>
				<div className={styles.phone_number}>
					{getLowerLabel()}
				</div>
			</div>
		</div>
	);
}
export default HeaderName;
