import { Textarea, Modal, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function TdsDeviationModal({
	itemData, setRemarks, onSave, onRaiseAgain,
	setSelectedFile,
	selectedFile,
	name,
}) {
	const [showTdsModal, setShowTdsModal] = useState(false);
	const { status, data, userIncidentStatus, userNotes, updatedBy, updatedAt, remark:rejectedRemark } = itemData || {};
	const { name:updatedByName } = updatedBy || {};
	const { tdsRequest } = data || {};
	const { fileName, finalUrl } = selectedFile || {};
	const {
		currentTdsRate, currentTdsStyle, requestedTdsRate, requestedTdsStyle,
		validFrom, validTo, remark, documentUrls,
	} = tdsRequest || {};
	return (
		<div>
			<Button size="md" themeType="secondary" onClick={() => { setShowTdsModal(true); }}>
				{status === 'REJECTED' && userIncidentStatus === 'PENDING_ACTION'
					&& name === 'Raise Again' ? 'Raised Again' : 'View'}

			</Button>
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
										Approved By :
										{updatedByName}
										{' '}
										At :
										{ updatedAt}
										{' '}
										{}
									</div>
								</div>
								<div className={status === 'APPROVED' ? styles.hr : styles.rejected_hr} />
								<div className={status === 'APPROVED' ? styles.remarks : styles.rejected_remarks}>
									<div>
										Remarks :
									</div>
									<div>
										{rejectedRemark}
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
							onChange={(values) => setRemarks(values)}
							defaultValue={userNotes}

						/>
					</div>
					<div className={styles.rate_conatiner}>
						{status === 'REJECTED' && userIncidentStatus === 'PENDING_ACTION'
					&& name === 'Raise Again'
					&& (
						<FileUploader
							value={finalUrl}
							docName={fileName}
							fileName={fileName}
							onChange={setSelectedFile}
							showProgress
							draggable
							multiple
							fileLink={finalUrl}
							multipleUploadDesc="Upload Invoice"
						/>
					)}
					</div>

				</Modal.Body>
				<Modal.Footer>
					{status === 'REJECTED' && userIncidentStatus === 'PENDING_ACTION' && name === 'Raise Again'
						? (
							<Button
								onClick={() => {
									onRaiseAgain();
									setShowTdsModal(false);
								}}
							>
								Raised Again
							</Button>
						)
						:					(
							<Button onClick={() => {
								setShowTdsModal(false);
								onSave();
							}}
							>
								Save

							</Button>
						)}
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default TdsDeviationModal;
