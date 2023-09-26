import { Button, cl, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useApproveConcor from '../../../apisModal/useApproveConcor';
import STATUS_MAPPING from '../../../Constants/status_mapping';

import styles from './styles.module.css';

function Details({
	row = {},
	setDetailsModal = () => {},
	refetch = () => {},
}) {
	const { t } = useTranslation(['incidentManagement']);
	const [remarks, setRemarks] = useState('');
	const { status = '', id = '', data = {} } = row || {};

	const { concorPdaApprovalRequest } = data || {};

	const {
		sid = '', totalBuyPrice = '', placeOfDestination = '', placeOfSupply = '',
		isTaxApplicable = true, documentDate = '', dueDate = '', beneficiaryName = '',
	} = concorPdaApprovalRequest || {};

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
					<div className={styles.text}>
						{beneficiaryName || '-'}

					</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Requested By</div>
					<div className={styles.text}>{row?.createdBy?.name || '-'}</div>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.heading}>

				PDA Approval
			</div>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Shipment Id</div>
					<div className={styles.text}>
						#
						{sid || '-'}

					</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Total Buy Price</div>
					<div className={styles.text}>
						{totalBuyPrice || '-'}
					</div>
				</div>
			</div>
			<div className={styles.heading}>

				Invoice Details
			</div>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Destination</div>
					<div className={styles.text}>{placeOfDestination || '-'}</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Supply</div>
					<div className={styles.text}>{placeOfSupply || '-'}</div>
				</div>
				<div className={styles.small}>
					<div className={styles.title}>Tax Applicable</div>
					<div className={styles.text}>{isTaxApplicable ? 'Yes' : 'No'}</div>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Document Date</div>
					<div className={styles.text}>{documentDate || '-'}</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Due Date</div>
					<div className={styles.text}>{dueDate || '-'}</div>
				</div>
			</div>

			{ status === 'REQUESTED' ? (
				<div>
					<div className={cl`${styles.label} 
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
			) : null }

		</div>
	);
}

export default Details;
