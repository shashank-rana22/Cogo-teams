import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import useGetPrePostShipmentQuotation from '../../../../hook/useGetPrePostShipmentQuotation';
import useUpdateJobAuditStatus from '../../../../hook/useUpdateJobAuditStatus';
import FinanceClosedCardsSet from '../QuotationCards/FinanceClosedCardsSet';
import OperationClosedCardsSet from '../QuotationCards/OperationClosedCardsSet';
import PrePostCheckoutCards from '../QuotationCards/PrePostCheckoutCards';

import styles from './styles.module.css';

function Header({ jobId = '' }) {
	const { query: { active_tab = '', job_id = '' }, push = () => {} } = useRouter();
	const {
		data: quoteData = {},
		loading: quoteLoading = true,
	} = useGetPrePostShipmentQuotation({ jobId });

	const [accordionState, setAccordionState] = useState({});
	useEffect(() => {
		const INITIAL_STATE = {};
		Object.keys(quoteData).forEach((category) => {
			Object.keys(quoteData[category]).forEach((subCategory, index) => {
				INITIAL_STATE[`${category}_${subCategory}`] = (index === GLOBAL_CONSTANTS.zeroth_index);
			});
		});
		setAccordionState(INITIAL_STATE);
	}, [quoteData]);

	const toggleAccordion = (key) => {
		setAccordionState((prev) => ({ ...prev, [key]: !prev[key] }));
	};
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

	const { apiTrigger, loading } = useUpdateJobAuditStatus();

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
							onClick={() => apiTrigger({ jobId, status: 'AUDITED' })}
						>
							Approve

						</Button>
					</div>
				</div>
			</div>
			<div className={styles.all_task_container}>
				<div className={styles.task_specific_container}>
					<PrePostCheckoutCards
						data={quoteData?.SELL}
						loading={quoteLoading}
						type="SELL Quotation"
						accordionState={accordionState}
						toggleAccordion={toggleAccordion}
						setAccordionState={setAccordionState}
						category="SELL"
					/>
					<PrePostCheckoutCards
						data={quoteData?.BUY}
						loading={quoteLoading}
						type="BUY Quotation"
						accordionState={accordionState}
						toggleAccordion={toggleAccordion}
						setAccordionState={setAccordionState}
						category="BUY"
					/>
				</div>

				<OperationClosedCardsSet job_id={job_id} />

				{active_tab === 'financial_close' && (
					<FinanceClosedCardsSet job_id={job_id} />
				)}
			</div>
		</div>
	);
}

export default Header;
