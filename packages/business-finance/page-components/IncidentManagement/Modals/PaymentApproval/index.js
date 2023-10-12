import { Button, cl } from '@cogoport/components';
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
		apiData,
		refetch,
		setDetailsModal,
		saasUtrUploadRequest : row?.data?.saasUtrUploadRequest,
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
				/>
			</div>
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
		</div>
	);
}
export default PaymentApproval;
