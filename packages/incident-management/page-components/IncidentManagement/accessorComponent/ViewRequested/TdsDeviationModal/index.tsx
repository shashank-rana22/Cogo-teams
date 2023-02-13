import { Textarea, Modal, Button } from '@cogoport/components';
import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function TdsDeviationModal({ itemData }) {
	const [showTdsModal, setShowTdsModal] = useState(false);
	const { status, data } = itemData || {};
	const { tdsRequest } = data || {};
	const {
		currentTdsRate, currentTdsStyle, requestedTdsRate, requestedTdsStyle,
		validFrom, validTo, remark, documentUrls,
	} = tdsRequest || {};
	return (
		<div>
			<Button size="md" themeType="secondary" onClick={() => { setShowTdsModal(true); }}>View</Button>
			<Modal size="lg" show={showTdsModal} onClose={() => { setShowTdsModal(false); }}>
				<Modal.Header title="Tds Deviation" />
				<Modal.Body>
					{status === 'APPROVED' || status === 'REJECTED'
						? (
							<div className={status === 'APPROVED' ? styles.approved_container
								: styles.rejected_container}
							>
								<div className={status === 'APPROVED' ? styles.aprroved : styles.rejected}>
									<div>
										{status === 'APPROVED'
											? (
												<>
													<IcCFtick height={20} width={20} className={styles.icon} />
													Approved
												</>
											)
											: (
												<>
													<IcCFcrossInCircle
														height={20}
														width={20}
														className={styles.icon}
													/>
													Rejected
												</>
											)}
									</div>
									<div>
										Approved By : jaiprkash kushwaha at 11:24 on 12 feb 2023
									</div>
								</div>
								<div className={status === 'APPROVED' ? styles.hr : styles.rejected_hr} />
								<div className={status === 'APPROVED' ? styles.remarks : styles.rejected_remarks}>
									<div>
										Remarks :
									</div>
									<div>
										Remarks here if any...
									</div>
								</div>
							</div>
						)
						: null}
					<div className={styles.name_container}>
						<div className={styles.label}>
							Organizaion Name -
						</div>
						<div className={styles.value}>
							{itemData?.data?.organization?.businessName}
						</div>
					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.current}>
							<div className={styles.rate_value}>
								{currentTdsRate}
								%
							</div>
							<div className={styles.rate_label}>
								Current Rate
							</div>

						</div>
						<div className={styles.requested}>
							<div className={styles.rate_value}>
								{requestedTdsRate}
								%
							</div>
							<div className={styles.rate_label}>
								Requested Rate
							</div>

						</div>
					</div>

					<div className={styles.rate_conatiner}>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								Valid From -
							</div>
							<div className={styles.label}>
								{validFrom}
							</div>
						</div>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								Valid Till -
							</div>
							<div className={styles.label}>
								{validTo}
							</div>
						</div>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								Current Tds style -
							</div>
							<div className={styles.label}>
								{currentTdsStyle}
							</div>
						</div>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								New TDS style Requested -
							</div>
							<div className={styles.label}>
								{requestedTdsStyle}
							</div>
						</div>
					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Remark -
						</div>
						<div className={styles.value}>
							{remark}
						</div>
					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Document -
						</div>
						<div className={styles.value}>
							{documentUrls?.map((url:string) => (url !== '' ? (
								<div className={styles.link}>
									<a href={url} target="_blank" rel="noreferrer">
										document.pdf
									</a>
								</div>
							) : (
								<span>No document available</span>
							)))}
						</div>
					</div>
					<div className={styles.remarks_style}>
						Notes (only visible to self)
						<Textarea
							name="remarks"
							className={styles.text_area}
							size="lg"
							placeholder="Enter here..."
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => { setShowTdsModal(false); }}>OK</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default TdsDeviationModal;
