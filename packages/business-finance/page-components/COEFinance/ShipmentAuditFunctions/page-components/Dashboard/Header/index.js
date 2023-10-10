import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRef, useState } from 'react';

import useUpdateJobAuditStatus from '../../../../hook/useUpdateJobAuditStatus';
import getApproveJobAuditBttnCondition from '../../../utils/getApproveJobAuditButtonCondition';
import Body from '../Body';

import styles from './styles.module.css';

function Header({ jobId = '' }) {
	const { query: { active_tab = '' }, push = () => {} } = useRouter();
	const [quotationsData, setQuotationsData] = useState({
		prePostCheckoutData : {},
		oprClosedData       : {},
		financialClosedData : {},
	});

	const getPrePostShipmentQuoteRef = useRef(null);

	const {
		apiTrigger,
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
							onClick={() => apiTrigger({ jobId, status: 'PARTIALLY_AUDITED' })}
						>
							Save Changes

						</Button>
					</div>
					<div className={styles.header_button}>
						<Button
							size="md"
							themeType="primary"
							disabled={!bttnDisableCondition || loading}
							onClick={() => apiTrigger({ jobId, status: 'AUDITED' })}
						>
							Approve
						</Button>
					</div>
				</div>
			</div>

			<Body
				getPrePostShipmentQuoteRef={getPrePostShipmentQuoteRef}
				setQuotationsData={setQuotationsData}
			/>

			{/* <div className={styles.custom_accordion}>
				<div className={styles.accord_title}>
					<div className={styles.status_card}>
						<div className={styles.title}>
							{startCase('Documents')}
						</div>
					</div>

					{true ? (
						<IcMArrowRotateUp
							className={styles.cursor}
						/>
					)
						: (
							<IcMArrowRotateDown
								className={styles.cursor}
							/>
						)}
				</div>
			</div> */}
		</div>
	);
}

export default Header;
