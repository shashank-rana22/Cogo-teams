import { Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { useState } from 'react';

import { getEventTitle } from '../../../../utils/getEventTitle';

import PreviewModal from './PreviewModal';
import styles from './styles.module.css';

const EVENT_INFORMATION_MAPPING = {
	'System: Communication: Email Sent': {
		title       : 'Customer Has Been Sent An Email',
		information : `Please keep an eye out and see if the mail 
		is opened or clicked in the near future. You may have to follow up 
		with them then. The following is a preview of the mail - `,
	},
	'System: Communication: Email Opened': {
		title       : 'Customer Has Opened A Cogoport Email',
		information : `Please reach out to the customer if this is not their first time 
		reading that mail asking if they have any doubts about 
		Cogoport or shipments. The following is a preview of the mail - `,
	},
	'System: Communication: Email Clicked': {
		title       : 'Customer Has Clicked A Cogoport Email',
		information : `Please reach out to the customer letting them know that 
		you will assist them with any doubts that they might have. 
		The following is a preview of the mail - `,
	},
};

function EmailClicked({ serviceData = {}, name = '', formattedData = {}, eventName = '' }) {
	const [previewModal, setPreviewModal] = useState(false);

	const { email = '', user_name = '', lead_user_details = {} } = formattedData;
	const { content = {} } = serviceData || {};
	const { subject = '', body } = content;
	const eventTitle = getEventTitle({ name });

	return (
		<>
			{(Object.keys(EVENT_INFORMATION_MAPPING)).includes(eventName) ? (
				<>
					<div className={styles.title}>{EVENT_INFORMATION_MAPPING[eventName]?.title}</div>
					<div className={styles.message}>
						{EVENT_INFORMATION_MAPPING[eventName]?.information}
					</div>
				</>
			) : (
				<>
					<div className={styles.title}>{eventTitle}</div>
					<div className={styles.message}>
						Following is a preview of the mail -
					</div>
				</>
			)}
			<div className={styles.banner}>
				<div className={styles.user_name}>
					{user_name || lead_user_details?.name}
				</div>
				<div className={styles.sender_email}>
					To:
					{' '}
					{email || lead_user_details?.email}
				</div>

				<div className={styles.subject_name}>
					Re:
					{' '}
					{subject}
				</div>

				<Button size="md" themeType="secondary" onClick={() => setPreviewModal(true)}>
					<IcMEyeopen className={styles.eye_icon} />
					Preview
				</Button>
			</div>

			<PreviewModal
				previewModal={previewModal}
				subject={subject}
				setPreviewModal={setPreviewModal}
				body={body}
				name={name}
			/>
		</>
	);
}

export default EmailClicked;
