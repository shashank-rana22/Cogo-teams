import { startCase } from '@cogoport/utils';

import UserAvatar from '../../../../common/UserAvatar';
import { PLATFORM_MAPPING } from '../../../../constants';
import hideDetails from '../../../../utils/hideDetails';

import styles from './styles.module.css';

function HeaderName({ formattedData = {} }) {
	const {
		user_name = '',
		business_name = '',
		mobile_no = '',
		channel_type,
		user_type,
		search_user_name = '',
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
		<div className={styles.flex}>
			<UserAvatar type={channel_type} />
			<div>
				<div className={styles.name}>
					{startCase(user_name) || 'User'}
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
