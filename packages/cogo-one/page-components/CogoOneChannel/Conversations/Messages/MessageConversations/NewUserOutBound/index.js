import { Button } from '@cogoport/components';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

import styles from './styles.module.css';

function NewUserOutBound({ setModalType = () => {}, activeTab = {} }) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);

	const dispatch = useDispatch();

	const { data } = activeTab || {};
	const {
		countryCode = '',
		user_name = '',
		whatsapp_number_eformat,
		user_id,
		organization_id,
		mobile_no,
		lead_organization_id = '',
		lead_user_id = '',
	} = data || {};

	const isAddFeedBackButton = lead_organization_id && lead_user_id && !user_id;

	const onTemplateClick = () => {
		setModalType({
			type : 'new_user_outbound',
			data : {
				number       : whatsapp_number_eformat,
				country_code : countryCode,
			},
			userName: user_name,
		});
	};

	const handleVoiceCall = () => {
		if (!mobile_no) {
			return;
		}

		dispatch(
			setProfileState({
				is_in_voice_call          : true,
				voice_call_recipient_data : {
					startTime           : new Date(),
					orgId               : organization_id,
					userId              : user_id,
					mobile_number       : whatsapp_number_eformat,
					mobile_country_code : countryCode,
					userName            : user_name,
					isUnkownUser        : !user_id,
				},
			}),
		);
	};

	const handleRoute = () => {
		window.open(`/${partnerId}/lead-organization/${lead_organization_id}`, '_blank');
	};

	const ACTIONS_MAPPING = [
		{ name: 'voice_call', onClick: handleVoiceCall, label: 'call', show: true },
		{ name: 'whatsapp_message', onClick: onTemplateClick, label: 'Message on WhatsApp', show: true },
		{ name: 'add_feedback', onClick: handleRoute, label: 'Add Feedback', show: isAddFeedBackButton },
	];

	return (
		<div className={styles.container}>
			<div className={styles.suggested_actions}>
				Suggested Actions
			</div>
			<div className={styles.pills_styled}>
				{ACTIONS_MAPPING.map((eachAction) => {
					const { name, onClick, label, show } = eachAction || {};

					if (!show) {
						return null;
					}

					return (
						<Button
							key={name}
							size="md"
							themeType="secondary"
							disabled={!mobile_no}
							className={styles.each_pill}
							onClick={onClick}
						>
							{label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
export default NewUserOutBound;
