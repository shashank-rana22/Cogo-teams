import { Button, Modal } from '@cogoport/components';
import { IcMInvoiceApprovals, IcMRefresh } from '@cogoport/icons-react';

import hideDetails from '../../../../helpers/hideDetails';

import styles from './styles.module.css';
import useSendCreditTnc from './useSendCreditTnc';

function CreditApprovalCard({
	detail,
	loading: getCheckoutLoading,
	getCheckout,
}) {
	const { email, name, showModal, onClose, onSubmit, loading } = useSendCreditTnc({ detail });

	const {
		importer_exporter_poc = {},
	} = detail || {};

	const {
		mobile_number = '',
		mobile_country_code = '',
		email:poc_email,
		name:poc_name,
	} = importer_exporter_poc;

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.approval_icon}>
					{' '}
					<IcMInvoiceApprovals width={24} height={24} fill="#2c3e50" />
				</div>

				<div>
					<div className={styles.heading}>Credit Approval pending!</div>

					<div
						role="presentation"
						className={styles.refresh_text}
						onClick={() => getCheckout()}
					>
						<div>Refresh </div>
						<div
							className={`${styles.refresh_icon} ${
								getCheckoutLoading ? styles.animate : ''
							}`}
						>
							<IcMRefresh
								style={{
									transform: 'scaleX(-1)',
								}}
							/>
						</div>
					</div>

					<div className={styles.credit_approval_container}>
						<div className={styles.text_container}>
							<div>
								Before you avail deferred payment, you need to accept the TnC on
								our agreement for credit approval, Please accept to proceed.
							</div>

							<div style={{ fontSize: 12, fontStyle: 'italic', marginTop: '4px' }}>
								If you have already accepted the TnC for credit approval, Kindly
								Refresh the page.
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.flex_column}>
				<div className={styles.button_container}>
					<Button onClick={onSubmit} disabled={loading}>
						{loading ? 'Sending...' : 'Send Email'}
					</Button>
				</div>

				<div className={styles.contact_details}>
					<div className={styles.user_name}>{poc_name}</div>
					<div className={styles.sub_text}>
						{hideDetails(poc_email, 'mail')}
						{mobile_number
							? (mobile_country_code || '')
								- hideDetails(mobile_number, 'number') || ''
							: ''}
					</div>
				</div>
			</div>

			<Modal
				show={showModal}
				onClose={onClose}
				onOuterClick={onClose}
			>
				<Modal.Header title="Email Sent" />

				<Modal.Body>
					<div style={{ paddingBottom: 4, color: '#1167B1' }}>
						An email has been sent to
						<span style={{ fontWeight: 500 }}>
							{' '}
							{email}
							{' '}
							(
							{name}
							)
							{' '}
						</span>
						for accepting the Tnc for deferred payments.
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default CreditApprovalCard;
