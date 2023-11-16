import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMArrowLeft, IcMCall, IcMHome } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { startCase } from '@cogoport/utils';

import UserAvatar from '../../../../../common/UserAvatar';
import hideDetails from '../../../../../utils/hideDetails';

import styles from './styles.module.css';

function Header({
	activeVoiceCard = {},
	isMobile = false,
	setActiveTab = () => {},
}) {
	const dispatch = useDispatch();

	const geo = getGeoConstants();

	const { user_data, user_number = '', organization_id = '' } = activeVoiceCard || {};
	const name = user_data?.name || '';

	const BackButton = isMobile ? IcMArrowLeft : IcMHome;

	const handleCall = () => {
		if (!user_number || !geo.others.navigations.cogo_one.has_voice_call_access) {
			return;
		}

		dispatch(
			setProfileState({
				is_in_voice_call          : true,
				voice_call_recipient_data : {
					startTime           : new Date(),
					orgId               : organization_id || null,
					userId              : user_data?.id || null,
					mobile_number       : user_number,
					mobile_country_code : '+91',
					userName            : user_data?.name,
					isUnkownUser        : !user_data?.id,
				},
			}),
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.main_body}>
				<BackButton
					className={styles.back_button}
					onClick={() => setActiveTab(
						(prev) => ({
							...prev,
							data: {},
						}),
					)}
				/>

				<div
					className={styles.flex}
					role="presentation"
					onClick={() => {
						if (isMobile) {
							setActiveTab(
								(prev) => ({
									...prev,
									showSidebar: true,
								}),
							);
						}
					}}
				>
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

			<IcMCall
				className={styles.call_icon}
				onClick={handleCall}
			/>
		</div>
	);
}

export default Header;
