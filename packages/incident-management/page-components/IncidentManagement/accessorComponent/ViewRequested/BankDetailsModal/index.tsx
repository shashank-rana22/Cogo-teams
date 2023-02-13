import { Textarea, Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function BankDatailsModal({ itemData }) {
	const [showTdsModal, setShowTdsModal] = useState(false);
	return (
		<div>
			<Button size="md" themeType="secondary" onClick={() => { setShowTdsModal(true); }}>View</Button>
			<Modal size="lg" show={showTdsModal} onClose={() => { setShowTdsModal(false); }}>
				<Modal.Header title="Bank Account Add/Edit" />
				<div className={styles.rate_conatiner}>
					<div className={styles.name_container}>
						<div className={styles.value}>
							Organizaion Name
						</div>
						<div className={styles.label}>
							{itemData?.data?.organization?.businessName}
						</div>
					</div>
					<div className={styles.name_container}>
						<div className={styles.value}>
							Organizaion Type
						</div>
						<div className={styles.type_value}>
							{startCase(itemData?.data?.organization?.tradePartyType)}
						</div>
					</div>
				</div>
				<Modal.Body>
					<div className={styles.rate_conatiner}>
						<div className={styles.bank_details}>
							<div className={styles.value}>
								Bank Holder Name
							</div>
							<div className={styles.label}>
								{itemData?.data?.bankRequest?.bankHolderName}
							</div>
						</div>

					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.bank_details}>
							<div className={styles.value}>
								Account Number
							</div>
							<div className={styles.label}>
								{itemData?.data?.bankRequest?.accountNumber}
							</div>
						</div>

					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.bank_details}>
							<div className={styles.value}>
								Bank & Branch Name
							</div>
							<div className={styles.label}>
								{itemData?.data?.bankRequest?.bankName}
							</div>
							<div className={styles.label}>
								{itemData?.data?.bankRequest?.branchName}
							</div>
						</div>

					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.bank_details}>
							<div className={styles.value}>
								IFSC Code
							</div>
							<div className={styles.label}>
								{itemData?.data?.bankRequest?.ifscCode}
							</div>
						</div>

					</div>

					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Remark -
						</div>
						<div className={styles.label}>
							{itemData?.data?.bankRequest?.remark}
						</div>
					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Document -
						</div>
						<div className={styles.value}>
							{itemData?.data?.bankRequest?.documentUrls?.map((url:string) => (url !== '' ? (
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

export default BankDatailsModal;
