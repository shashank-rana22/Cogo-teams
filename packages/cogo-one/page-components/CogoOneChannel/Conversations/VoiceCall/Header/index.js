import { IcMArrowLeft, IcMHome } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import UserAvatar from '../../../../../common/UserAvatar';
import hideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

function Header({
	activeVoiceCard = {},
	isMobile = false,
	setActiveTab = () => {},
}) {
	const { user_data, user_number = '' } = activeVoiceCard || {};
	const name = user_data?.name || '';

	const BackButton = isMobile ? IcMArrowLeft : IcMHome;

	return (
		<div className={styles.container}>
			<BackButton
				className={styles.back_button}
				onClick={() => setActiveTab(
					(prev) => ({
						...prev,
						data: {},
					}),
				)}
			/>
			<div className={styles.flex}>
				<UserAvatar />
				<div>
					<div className={styles.name}>{startCase(name || 'unkown_user')}</div>
					<div className={styles.phone_number}>
						{hideDetails({
							data : user_number,
							type : 'number',
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
