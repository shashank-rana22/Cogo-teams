import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRef, useState } from 'react';

import useUpdateJobAuditStatus from '../../../hook/useUpdateJobAuditStatus';

import QuotationCards from './QuotationCards';
import styles from './styles.module.css';

function Dashboard() {
	const { query: { active_tab = '', job_id = '' }, push = () => {} } = useRouter();

	const [quotationsData, setQuotationsData] = useState({
		prePostCheckoutData : {},
		oprClosedData       : {},
		financialClosedData : {},
	});

	const getPrePostShipmentQuoteRef = useRef(null);
	const auditStatus = window.sessionStorage.getItem('audit_status');

	const {
		updateJobAuditStatus,
		loading,
	} = useUpdateJobAuditStatus({ getPrePostShipmentQuote: getPrePostShipmentQuoteRef.current, active_tab });

	const handleClick = () => {
		window.sessionStorage.removeItem('currency');
		window.sessionStorage.removeItem('audit_status');

		if (active_tab === 'financial_close') {
			push(
				'/business-finance/audit-function/financial_close',
			);
		} else {
			push(
				'/business-finance/audit-function/operational_close',
			);
		}
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<Button themeType="secondary" size="md" onClick={handleClick}>Go Back</Button>

				<div className={styles.actions}>
					<div>
						{auditStatus !== 'audited' && (
							<Button
								size="md"
								themeType="secondary"
								disabled={loading}
								onClick={() => updateJobAuditStatus({ jobId: job_id, status: 'PARTIALLY_AUDITED' })}
							>
								Save Changes
							</Button>
						)}
					</div>
					<div className={styles.header_button}>
						<Button
							size="md"
							themeType="primary"
							disabled={loading}
							onClick={() => updateJobAuditStatus({ jobId: job_id, status: 'AUDITED' })}
						>
							Approve
						</Button>
					</div>
				</div>
			</div>

			<QuotationCards
				getPrePostShipmentQuoteRef={getPrePostShipmentQuoteRef}
				quotationsData={quotationsData}
				setQuotationsData={setQuotationsData}
			/>

		</div>
	);
}

export default Dashboard;
