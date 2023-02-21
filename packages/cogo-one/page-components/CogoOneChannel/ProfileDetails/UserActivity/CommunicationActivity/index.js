/* eslint-disable max-len */
import { Button, Modal, Avatar } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { SOURCE_ICON_MAPPING } from '../../../../../constants';

// import HTMLPreview from './HtmlPreview';
import styles from './styles.module.css';

function CommunicationActivity({ communication = {} }) {
	const [showDetails, setShowDetails] = useState();
	const [showModal, setShowModal] = useState(false);
	// const [title, setTitle] = useState('');
	const { list = [] } = communication;

	const handleContent = (val) => {
		setShowDetails(val);
		setShowModal(true);
	};

	// function CreateReactComponent() {
	// 	const preview = showDetails
	// 		?.replaceAll(/<p>\s+(<[/]p>)/g, '<br>')
	// 		?.replaceAll(/<p>(<[/]p>)/g, '<br>')
	// 		?.replaceAll('<p', '<div')
	// 		?.replaceAll('<p>', '<div>')
	// 		?.replaceAll('</p>', '&nbsp;</div>')
	// 		?.replaceAll('</span>', '&nbsp;</span>');

	// 	return <div dangerouslySetInnerHTML={{ __html: preview }} />;
	// }

	return (
		<>
			<div className={styles.container}>
				{(list || []).map((item) => {
					const { type = '', created_at = '', sender = '', content = {} } = item || {};
					const { body = '' } = content || {};
					return (
						<>
							<div className={styles.activity_date}>
								<div className={styles.dot} />
								<div className={styles.durations}>
									{format(created_at, 'HH:mm a dd MMM')}
								</div>
							</div>
							<div className={styles.main_card}>
								<div className={styles.card}>
									<div style={{ display: 'flex', justifyContent: 'space-between' }}>
										<div className={styles.activity_type}>Communication</div>
										<div
											role="presentation"
											onClick={() => handleContent(body)}
											style={{ fontSize: '12px', textDecoration: 'underline', color: '#034AFD', cursor: 'pointer' }}
										>
											View more
										</div>
									</div>
									<div className={styles.message_details}>
										<div className={styles.title}>
											Sent message on
											{' '}
											{startCase(type)}
										</div>
										<div className={styles.icon_type}>
											{SOURCE_ICON_MAPPING[type]}
										</div>
									</div>
									<div className={styles.user_details}>
										<div className={styles.user_message}>
											You have a message On
											{' '}
											{format(created_at, 'dd MMM YYYY')}
											{' '}
											from
											{' '}
											{sender}
										</div>
										<div className={styles.user_avatar}>
											<Avatar
												src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/userAvatar.svg"
												alt="img"
												disabled={false}
												size="35px"
											/>
										</div>
									</div>
								</div>
							</div>
						</>
					);
				})}
			</div>
			{showModal && (
				<Modal
					show={showModal}
					placement="top"
					size="sm"
					closeOnOuterClick
					onClose={() => setShowModal(false)}
				>
					<Modal.Footer title="" />
					<Modal.Body>
						{showDetails}
						{/* <HTMLPreview html={showDetails} /> */}
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => setShowModal(false)} size="md" themeType="tertiary">close</Button>
					</Modal.Footer>
				</Modal>

			)}
		</>
	);
}

export default CommunicationActivity;
