import { Button } from '@cogoport/components';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

import styles from './styles.module.css';

function SuggestedActions({ hasVoiceCallAccess = true }) {
	const dispatch = useDispatch();

	const actions = ['Call', 'Send SMS', 'Message on WhatsApp'];

	const USER = {
		user_id             : 'b5yw8dbw6u86twujsnbws7y',
		mobile_country_code : '+91',
		mobile_number       : '9553716082',
		name                : 'testing',
		organization_id     : 'bhe567tehb e66778y c',
	};

	const {
		user_id = '', mobile_country_code = '', mobile_number = '', name = '',
		organization_id = '',
	} = USER || {};

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
		<>
			<div className={styles.suggested_actions}>Suggested Actions :</div>
			<div className={styles.actions}>
				{(actions || []).map((item) => (
					<Button
						onClick={handleCall}
						className={styles.actions_button}
						key={item}
						size="md"
						themeType="secondary"
					>
						{item}

					</Button>
				))}
			</div>
		</>

	);
}

export default SuggestedActions;
