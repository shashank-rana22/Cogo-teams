import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRef, useState } from 'react';

import useUpdateJobAuditStatus from '../../../../hook/useUpdateJobAuditStatus';
import getApproveJobAuditBttnCondition from '../../../utils/getApproveJobAuditButtonCondition';
import QuotationCards from '../QuotationCards';

import styles from './styles.module.css';

function Header() {
	const { query: { active_tab = '', job_id = '' }, push = () => {} } = useRouter();

	const [quotationsData, setQuotationsData] = useState({
		prePostCheckoutData : {},
		oprClosedData       : {},
		financialClosedData : {},
	});

	const getPrePostShipmentQuoteRef = useRef(null);

	const {
		updateJobAuditStatus,
		loading,
	} = useUpdateJobAuditStatus({ getPrePostShipmentQuote: getPrePostShipmentQuoteRef.current });

	const { bttnDisableCondition } = getApproveJobAuditBttnCondition({ quotationsData });

	const handleClick = () => {
		if (active_tab === 'financial_close') {
			push(
				'/business-finance/coe-finance/financial_close',
			);
		} else {
			push(
				'/business-finance/coe-finance/operational_close',
			);
		}
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<Button themeType="secondary" size="md" onClick={handleClick}>Go Back</Button>

				<div className={styles.actions}>
					<div>
						<Button
							size="md"
							themeType="secondary"
							disabled={loading}
							onClick={() => updateJobAuditStatus({ jobId: job_id, status: 'PARTIALLY_AUDITED' })}
						>
							Save Changes

						</Button>
					</div>
					<div className={styles.header_button}>
						<Button
							size="md"
							themeType="primary"
							disabled={!bttnDisableCondition || loading}
							onClick={() => updateJobAuditStatus({ jobId: job_id, status: 'AUDITED' })}
						>
							Approve
						</Button>
					</div>
				</div>
			</div>

			<QuotationCards
				getPrePostShipmentQuoteRef={getPrePostShipmentQuoteRef}
				setQuotationsData={setQuotationsData}
			/>

		</div>
	);
}

export default Header;
