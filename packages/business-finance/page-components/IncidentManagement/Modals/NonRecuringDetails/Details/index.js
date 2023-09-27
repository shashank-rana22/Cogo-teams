import { Button, cl, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber.tsx';
import useApproveConcor from '../../../apisModal/useApproveConcor';
import STATUS_MAPPING from '../../../Constants/status_mapping';

import styles from './styles.module.css';

function Details({ row = {}, setDetailsModal = () => {}, refetch = () => {} }) {
	const { t } = useTranslation(['incidentManagement']);
	const [remarks, setRemarks] = useState('');
	const { status = '', id = '', data = {} } = row || {};
	const MAX_LENGTH = 20;

	const { overheadConfirmationRequest, organization } = data || {};

	const {
		ledgerGrandTotal = '',
		invoiceNumber = '',
		categoryName = '',
		branchName = '',
		subTotalAmount = '',
		taxTotalAmount = '',
		grandTotalAmount = '',
	} = overheadConfirmationRequest || {};

	const { useOnAction: onAction, loading = false } = useApproveConcor({
		refetch,
		setDetailsModal,
		id,
		data,
		t,
		remarks,
	});

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Company Name</div>
					<div className={styles.text}>{organization.businessName || '-'}</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Requested By</div>
					<div className={styles.text}>{row?.createdBy?.name || '-'}</div>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Invoice Number</div>
					<div className={styles.text}>{invoiceNumber || '-'}</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Category</div>
					<div className={styles.text}>{showOverflowingNumber(categoryName, MAX_LENGTH) || '-'}</div>
				</div>
				<div className={styles.small}>
					<div className={styles.title}>Branch</div>
					<div className={styles.text}>{branchName || '-'}</div>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.small}>
					<div className={styles.title}>Sub Total </div>
					<div className={styles.text}>{subTotalAmount || '-'}</div>
				</div>
				<div className={styles.small}>
					<div className={styles.title}>Tax Amount</div>
					<div className={styles.text}>{taxTotalAmount || '-'}</div>
				</div>
				<div className={styles.small}>
					<div className={styles.title}>Grand Total</div>
					<div className={styles.text}>{grandTotalAmount || '-'}</div>
				</div>
				<div className={styles.small}>
					<div className={styles.title}>Ledger Grand Total </div>
					<div className={styles.text}>{ledgerGrandTotal || '-'}</div>
				</div>
			</div>

			{status === 'REQUESTED' ? (
				<div>
					<div className={styles.remarks_div}>
						<div
							className={cl`${styles.label} 
								${styles.required_field}`}
						>
							Remarks
						</div>

						<Textarea
							className={styles.textarea}
							name="remark"
							size="md"
							placeholder="Enter Remarks Here"
							onChange={(value) => setRemarks(value)}
						/>
					</div>
					<div className={styles.button_container}>
						<Button
							size="md"
							themeType="secondary"
							disabled={isEmpty(remarks) || loading}
							loading={loading}
							onClick={() => onAction(STATUS_MAPPING.rejected)}
						>
							Reject
						</Button>

						<Button
							size="md"
							themeType="primary"
							disabled={isEmpty(remarks) || loading}
							loading={loading}
							onClick={() => { onAction(STATUS_MAPPING.approved); }}
						>
							Approve
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Details;
