import { Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { useState } from 'react';

import PreviewModal from './PreviewModal';
import styles from './styles.module.css';

function EmailClicked() {
	const [previewModal, setPreviewModal] = useState(false);

	return (
		<>
			<div className={styles.title}>Clicked Email</div>
			<div className={styles.message}>
				Following is a preview of the mail -
			</div>
			<div className={styles.banner}>
				<div className={styles.user_name}>
					Rahul George
				</div>
				<div className={styles.sender_email}>
					To: aveera.juss2cogoport.com
				</div>

				<div className={styles.subject_name}>
					Re: Subject line here
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

			<PreviewModal previewModal={previewModal} setPreviewModal={setPreviewModal} />
		</>
	);
}

export default EmailClicked;
