import { Button, cl, Textarea } from '@cogoport/components';
import { useState } from 'react';

import getDetails from './details';
import useSubscriptionApproval from './hooks/useSubscriptionApproval';
import StyledTable from './StyledtTable';
import styles from './styles.module.css';

const VIEWED_STATUS = ['APPROVED', 'REJECTED'];

function PaymentApproval({
	refetch = () => { },
	row = {},
	setDetailsModal = () => { },
}) {
	const [apiData, setApiData] = useState([...(row?.data?.saasUtrUploadRequest?.utr_details || [])]);
	const [remarks, setRemerks] = useState('');

	const incidentStatus = row?.status || '';

	let isDisabled = false;
	let allFieldsNotMarked = false;
	apiData?.forEach((element) => {
		if (element?.status !== 'APPROVED') {
			isDisabled = true;
		}
		if (!VIEWED_STATUS.includes(element?.status)) {
			allFieldsNotMarked = true;
		}
	});

	const { onAction, loading } = useSubscriptionApproval({
		remarks,
		apiData,
		refetch,
		setDetailsModal,
		saasUtrUploadRequest : row?.data?.saasUtrUploadRequest,
		orgData              : row?.data?.organization,
		id                   : row?.id,
	});

	const details = getDetails({ saasUtrUploadRequest: row?.data?.saasUtrUploadRequest });

	return (
		<div>
			<div className={cl`${styles.flex} ${styles.marigntop}`}>
				{details?.map((detail) => (
					<div key={detail.title} className={styles.header}>
						<div>
							{detail?.title || ''}
						</div>
						<div className={styles.span}>{detail?.value || ''}</div>
					</div>
				))}
			</div>
			<div className={styles.list_container}>
				<StyledTable
					apiData={apiData}
					setApiData={setApiData}
					incidentStatus={incidentStatus}
				/>
				<div className={styles.text_area}>
					<div className={styles.span}>Remarks</div>
					<Textarea
						name="remarks"
						size="md"
						placeholder="Enter Remarks Here..."
						onChange={setRemerks}
						value={remarks}
						style={{ height: '80px' }}
						disabled={incidentStatus !== 'REQUESTED'}
					/>
				</div>
			</div>
			{incidentStatus === 'REQUESTED' ? (
				<div className={styles.button_container}>
					<Button
						size="md"
						themeType="secondary"
						disabled={allFieldsNotMarked || loading}
						loading={loading}
						onClick={() => onAction({ status: 'REJECTED' })}
					>
						Reject
					</Button>
					<Button
						size="md"
						themeType="primary"
						disabled={isDisabled || loading || allFieldsNotMarked}
						loading={loading}
						onClick={() => onAction({ status: 'APPROVED' })}
					>
						Approve
					</Button>
				</div>
			) : null}
		</div>
	);
}
export default PaymentApproval;
