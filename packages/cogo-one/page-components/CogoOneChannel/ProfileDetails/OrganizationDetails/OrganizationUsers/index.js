import { cl } from '@cogoport/components';
import { IcMCall } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

import styles from './styles.module.css';

function OrganizationUsers({
	user = {},
	hasVoiceCallAccess,
}) {
	const dispatch = useDispatch();
	const { user_id, email, mobile_country_code, mobile_number, name, organization_id } = user || {};

	const handleCall = () => {
		if (mobile_number && hasVoiceCallAccess) {
			dispatch(
				setProfileState({
					is_in_voice_call          : true,
					voice_call_recipient_data : {
						startTime    : new Date(),
						orgId        : organization_id,
						userId       : user_id,
						mobile_number,
						mobile_country_code,
						userName     : name,
						isUnkownUser : !user_id,
					},
				}),
			);
		}
	};

	return (

		<div className={styles.container}>
			<div className={styles.dialer_icon_div} role="presentation" onClick={handleCall}>
				<IcMCall
					className={cl`${styles.call_icon} ${
						(!hasVoiceCallAccess)
							? styles.disable_call_icon : ''}`}
				/>
			</div>

			<div className={styles.content}>
				<div className={styles.agent_type}>Name : </div>
				<div className={styles.name}>{name || 'NA'}</div>
			</div>
			<div className={styles.content}>
				<div className={styles.type}>Email : </div>
				<div className={styles.name}>{email || '-'}</div>
			</div>
			<div className={styles.content}>
				<div className={styles.type}>Mobile No : </div>
				<div className={styles.name}>
					{mobile_country_code}
					{mobile_number || '-'}
				</div>
			</div>
		</div>

	);
}

export default OrganizationUsers;
