import { cl } from '@cogoport/components';
import { IcMPdf } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../common/EmptyState';
import documentStatus from '../DocumentStatus';

import styles from './styles.module.css';

function ListData({ list = [], orgId = '', setShowModal = () => {} }) {
	const handleOpenFile = (val) => {
		// eslint-disable-next-line no-undef
		window.open(val, '_blank');
	};

	const handleClick = () => {
		setShowModal(true);
	};

	const checkStatus = (status, state) => {
		let finalStatus = '';
		if (status === 'verified' && state === 'document_uploaded') {
			finalStatus = 'submitted';
		} else if (status === 'unverified') {
			finalStatus = 'not_submitted';
		} else {
			finalStatus = status;
		}
		return finalStatus;
	};

	return (
		<div>
			{isEmpty(list) ? (
				<div className={styles.empty}>
					<EmptyState type="documents" />
				</div>
			) : (
				<div className={styles.list_container}>
					{ (list || []).map((item) => {
						const {
							created_at = '',
							document_type = '',
							document_url = '',
							state = '',
							file_name = '',
							verification_status = '',

						} = item || {};

						return (
							<>
								<div className={styles.activity_date}>
									<div className={styles.dot} />
									<div className={styles.durations}>
										{format(created_at, 'hh:mm a,')}
										{format(created_at, ' MMM dd')}
									</div>
								</div>
								<div className={styles.main_card}>
									<div className={cl`${styles.card} 
									${document_type === 'undefined' ? styles.wrong : ''}`}
									>
										<div className={styles.header}>
											{documentStatus(checkStatus(verification_status, state))}

											<div className={cl`${styles.document_type} 
												${document_type === 'undefined'
												? styles.wrong_document_type
												: ''}`}
											>

												{document_type === 'undefined' ? 'Wrong document' : 'KYC document'}
											</div>
										</div>

										<div className={styles.content}>
											Document sent by customer
										</div>
										<div
											role="presentation"
											className={styles.document}
											onClick={() => handleOpenFile(document_url)}
										>
											<IcMPdf
												width={18}
												height={18}
												fill={document_type === 'gst' ? '#C4DC91' : '#88CAD1'}
											/>
											<div className={styles.document_name}>
												{startCase(file_name)}
											</div>
										</div>

										{!isEmpty(orgId) && (
											<div>
												{isEmpty(state) || state === 'document_rejected' ? (
													<div
														role="presentation"
														className={styles.manually}
														onClick={handleClick}
													>
														Upload Manually
													</div>
												) : (
													<div
														className={styles.upload}
													>
														Upload
													</div>
												)}
											</div>
										)}
									</div>
								</div>
							</>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default ListData;
