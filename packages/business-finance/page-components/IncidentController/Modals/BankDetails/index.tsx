import { Textarea, Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function BankDetails({
	bankData,
	bankId,
	organization,
	refetch,
	isEditable = true,
}) {
	const [showBankModal, setShowBankModal] = useState(false);
	const [remark, setRemark] = useState('');
	return (
		<div>
			<div>
				<Button
					style={{ height: '30px', fontSize: '12px', width: '70px', fontWeight: '600' }}
					themeType="secondary"
					onClick={() => {
						setShowBankModal(true);
					}}
				>
					View
				</Button>
			</div>
			{showBankModal && (
				<Modal
					size="md"
					show={showBankModal}
					onClose={() => {
						setShowBankModal(false);
					}}
				>
					<Modal.Header title="Bank Account - Add/Edit" />
					<Modal.Body>
						<div className={styles.flex}>
							<div className={styles.org_name}>Organization Name - </div>
							<div className={styles.name}>
								{/* {tdsTradePartyName ? (
									<div>{organization?.tradePartyName || toTitleCase(organization?.businessName)}</div>
								) : (
									<div>{toTitleCase(organization?.businessName)}</div>
								)} */}
							</div>
						</div>
						<div className={styles.flex}>
							{/* {getRatePercentageData.map((itemData) => (
								<div className={styles.rates_data}>
									<div className={styles.rates}>
										{itemData?.value}
										%
									</div>
									<div className={styles.label}>{itemData?.label}</div>
								</div>
							))} */}
						</div>
						<div className={styles.flex}>
							{/* {getAllValidData.map((item) => (
								<div className={styles.value_data}>
									<div className={styles.label_value}>
										{item?.label}
									</div>
									<div className={styles.date_value}>
										{(item?.id === '1' || item?.id === '2')
                                    	? item?.value
                                    	: startCase(item?.value)}

									</div>
								</div>
							))} */}
						</div>
						<div className={styles.document_flex}>
							<div className={styles.document}>Document -</div>
							{/* {documentUrls?.map((url:any) => (url !== '' ? (
								<a href={url} target="_blank" rel="noreferrer">
									document.pdf
								</a>
							) : (
								<div> No document available</div>
							)))} */}
						</div>
						<div className={styles.remarks}>Remarks*</div>
						<Textarea
							name="remark"
							size="md"
							placeholder="Remarks Here ..."
							onChange={(value: string) => setRemark(value)}
							style={{ width: '700', height: '100px', marginBottom: '12px' }}
						/>

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									disabled={!(remark.length) || loading}
									onClick={() => {
										onReject();
									}}
								>
									Reject
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={!(remark.length) || loading}
									onClick={() => {
										onApprove();
									}}
								>
									Approve
								</Button>
							</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}
export default BankDetails;
