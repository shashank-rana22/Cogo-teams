import { Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import PreviewModal from './PreviewModal';
import styles from './styles.module.css';

function EmailClicked({ serviceData = {}, name = '', formattedData = {} }) {
	const { email = '', user_name = '' } = formattedData;
	const { content = {} } = serviceData || {};
	const { subject = '', body } = content;
	const [previewModal, setPreviewModal] = useState(false);

	return (
		<>
			<div className={styles.title}>{startCase(name)}</div>
			<div className={styles.message}>
				Following is a preview of the mail -
			</div>
			<div className={styles.banner}>
				<div className={styles.user_name}>
					{user_name}
				</div>
				<div className={styles.sender_email}>
					To:
					{' '}
					{email}
				</div>

				<div className={styles.subject_name}>
					Re:
					{' '}
					{subject}
				</div>

				<div className={styles.subject_content}>
					I want to get rates for Nhava Sheva to Jebel Ali.
					Can I get them asap?
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
