/* eslint-disable max-len */
import { cl } from '@cogoport/components';
import { Modal, Avatar } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import MessageBody from '../../../../../common/MessageBody';
import { SOURCE_ICON_MAPPING } from '../../../../../constants';

import HTMLPreview from './HtmlPreview';
import styles from './styles.module.css';
import VoiceTimeLine from './VoiceTimeLine';

function CommunicationActivity({ communication = {} }) {
	const [showDetails, setShowDetails] = useState();
	const [showModal, setShowModal] = useState(false);
	const [title, setTitle] = useState('');
	const { list = [] } = communication;

	const handleContent = (val, sub) => {
		setShowDetails(val);
		setShowModal(true);
		setTitle(sub);
	};

	let parseData;
	if (showDetails !== undefined && title === null) {
		parseData = JSON.parse(showDetails);
	}

	const { message_type = '', text = '', media_url = '', message = '' } = parseData || {};

	const onCloseModal = () => {
		setShowDetails();
		setTitle('');
		setShowModal(false);
	};

	return (
		<div className={styles.container}>
			{(list || []).map((item) => {
				const { type = '', created_at = '', sender = '', content = {}, service = '' } = item || {};
				const { body = '', subject = '' } = content || {};
				let textData;
				if (!subject && subject !== '') {
					textData = JSON.parse(`${body}`);
				}

				return (
					!type ? <VoiceTimeLine item={item} /> : (
						<>
							<div className={styles.activity_date}>
								<div className={styles.dot} />
								<div className={styles.durations}>
									{format(created_at, 'HH:mm a dd MMM')}
								</div>
							</div>
							<div className={styles.main_card}>
								<div className={styles.card}>
									<div className={styles.activity_div}>
										<div className={styles.title}>
											Sent message on
											{' '}
											{startCase(type)}
										</div>
										<div role="presentation" className={styles.icon_type} onClick={() => handleContent(body, subject)}>
											{SOURCE_ICON_MAPPING[type]}
										</div>
									</div>
									<div className={styles.message_details}>
										<div className={cl`${type === 'push_notification' ? styles.push_div : ''} ${styles.user_details}`}>
											{subject && type === 'push_notification' && (
												<div className={styles.user_message}>
													<HTMLPreview html={body} type="push_notification" />
												</div>

											)}
											{subject && type !== 'push_notification' && (
												<div className={styles.user_message}>
													You have a message On
													{' '}
													{format(created_at, 'dd MMM YYYY')}
													{sender && (
														<div>
															from
															{' '}
															{sender}
														</div>
													)}
												</div>
											)}
											{subject === '' && (
												<div className={styles.user_message}>
													<div>{service.replaceAll('_', ' ')}</div>
												</div>
											)}
											{subject === null && (
												<div className={styles.user_message}>
													{textData?.text}
												</div>
											)}
										</div>
									</div>
									<div className={styles.user_avatar}>
										<Avatar
											src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/userAvatar.svg"
											alt="img"
											disabled={false}
											size="30px"
										/>
									</div>
								</div>
							</div>
						</>
					)
				);
			})}

			{(showModal && (title || title === '')) && (
				<Modal
					show={showModal}
					placement="top"
					size="sm"
					closeOnOuterClick
					onClose={onCloseModal}
					className={styles.styled_ui_modal_dialog}
					scroll={false}
				>
					<Modal.Header title={title || 'Message'} />
					<Modal.Body>
						{title === null ? <MessageBody message_type={message_type} response={{ message: message || text, media_url }} /> : <HTMLPreview html={showDetails} type="email" />}
					</Modal.Body>
				</Modal>

			)}
		</div>
	);
}

export default CommunicationActivity;
