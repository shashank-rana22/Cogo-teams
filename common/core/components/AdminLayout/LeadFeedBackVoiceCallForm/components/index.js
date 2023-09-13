import { Modal, Tabs, TabPanel } from '@cogoport/components';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState, useEffect } from 'react';

import LeadOrgFeedback from './LeadOrgFeedback';
import LogCallActivity from './LogCallActivity';
import styles from './styles.module.css';

const TAB_PANEL_MAPPING = [
	{
		name      : 'lead_org_feedback',
		title     : 'Organization Information',
		component : LeadOrgFeedback,
	},
	{
		name      : 'log_call_activity',
		title     : 'Log Call Activity',
		component : LogCallActivity,
	},
];

function LeadFeedBackVoiceCallForm() {
	const {
		leadFeedBackFormType = '',
		leadFeedbackFormData = {},
		partnerId = '',
		loggedInAgentId = '',
	} = useSelector(({ profile }) => ({
		leadFeedBackFormType : profile?.lead_feedback_form_type,
		leadFeedbackFormData : profile?.lead_feedback_form_data,
		loggedInAgentId      : profile?.user?.id,
		partnerId            : profile?.partner?.id,
	}));

	const dispatch = useDispatch();

	const [activeTab, setActiveTab] = useState(leadFeedBackFormType);

	const onCloseForm = ({ isSubmitSucessFull = false } = {}) => {
		dispatch(
			setProfileState({
				lead_feedback_form_data: {
					refetch_list: isSubmitSucessFull,
				},
				lead_feedback_form_type: '',
			}),
		);
	};

	const {
		lead_organization_id = '',
		lead_user_id = '',
		source = '',
		callRecordId = '',
		...restData
	} = leadFeedbackFormData || {};

	useEffect(() => {
		setActiveTab(leadFeedBackFormType);
	}, [leadFeedBackFormType]);

	if (!leadFeedBackFormType) {
		return null;
	}

	return (
		<Modal
			show
			placement="top"
			size="lg"
			scroll={false}
			className={styles.styled_modal}
		>
			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
				className={styles.tabs_container}
			>
				{
					TAB_PANEL_MAPPING.map((eachTab) => {
						const { name, title, component:Comp } = eachTab;

						if (!Comp) {
							return null;
						}

						return (
							<TabPanel name={name} title={title} key={name}>
								<Comp
									key={name}
									leadOrgId={lead_organization_id}
									onCloseForm={onCloseForm}
									partnerId={partnerId}
									loggedInAgentId={loggedInAgentId}
									leadUserId={lead_user_id}
									restData={restData}
									source={source}
									callRecordId={callRecordId}
								/>
							</TabPanel>
						);
					})
				}
			</Tabs>
		</Modal>
	);
}
export default LeadFeedBackVoiceCallForm;
