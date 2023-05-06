/* eslint-disable max-len */
import { Modal, Avatar } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

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

	const onCloseModal = () => {
		setShowDetails();
		setTitle('');
		setShowModal(false);
	};

	return (
		<div className={styles.container}>
			{(list || []).map((item) => {
				const { type = '', created_at = '', sender = '', content = {}, template_id = '' } = item || {};
				const { body = '', subject = '' } = content || {};

				return (
					<>
						{!type && (
							<VoiceTimeLine item={item} />
						) }
						{template_id && (['email', 'whatsapp', 'telegram'].includes(type)) && (
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
											{subject && (
												<div className={styles.title}>
													{startCase(subject)}
												</div>
											)}
											<div role="presentation" className={styles.icon_type} onClick={() => handleContent(body, subject)}>
												{SOURCE_ICON_MAPPING[type]}
											</div>
										</div>
										<div className={styles.message_details}>
											<div className={styles.user_details}>
												{subject && (
													<div className={styles.user_message}>
														You have a message On
														<span>
															{format(created_at, 'dd MMM YYYY')}
															{sender && (
																<div>
																	from
																	<span>{sender}</span>
																</div>
															)}
														</span>
													</div>
												)}
												{subject === '' && (
													<HTMLPreview html={body} type="whatsapp" />
												)}
											</div>
										</div>
										<div className={styles.user_avatar}>
											<Avatar
												src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/userAvatar.svg"
												alt="agent-image"
												disabled={false}
												size="30px"
											/>
										</div>
									</div>
								</div>
							</>
						)}
					</>
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
						<HTMLPreview html={showDetails} type="email" />
					</Modal.Body>
				</Modal>

			)}
		</div>
	);
}

export default CommunicationActivity;
