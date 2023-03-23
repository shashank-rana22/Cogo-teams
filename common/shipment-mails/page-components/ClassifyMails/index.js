// import Layout from '@cogo/business-modules/form/Layout';
import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useClassifyMail from '../../hooks/useClassifyMail';

import styles from './styles.module.css';

function ClassifyMails({ activeMail, onClassify = () => {} }) {
	const [show, setShow] = useState(false);
	const { classifyMail, handleSubmit, fields, controls, classifyMailApi } = useClassifyMail({
		onClassify: () => {
			setShow(false);
			onClassify();
		},
	});
	return (
		<div className={styles.container}>
			<Button onClick={() => setShow(true)}>Classify</Button>
			{/* <Modal
				show={show}
				onClose={() => setShow(false)}
				className="primary lg"
				styles={{ dialog: { overflow: 'visible' } }}
			>
				<div className={styles.wrapper}>
					<Layout controls={controls} fields={fields} themeType="admin" />
					<div className={styles.row}>
						<Button
							onClick={() => setShow(false)}
							style={{ marginRight: 10 }}
							className="secondary md"
						>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit((formValues) => classifyMail({ mail_id: activeMail.id, formValues }))}
							disabled={classifyMailApi.loading}
						>
							{classifyMailApi.loading ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</div>
			</Modal> */}
		</div>
	);
}

export default ClassifyMails;
