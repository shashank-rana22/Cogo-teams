import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetClosedTasks from '../../../../hook/useGetClosedTasks';
import useGetPrePostShipmentQuotation from '../../../../hook/useGetPrePostShipmentQuotation';
import FinanceClosedCardsSet from '../QuotationCards/FinanceClosedCardsSet';
import OperationalClosedCards from '../QuotationCards/OperationalClosedCards';
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
	const {
		data: taskData = {},
		// loading: taskDataLoading = true,
	} = useGetClosedTasks({ job_id, activeTab: 'operational_close' });

	const [operationCardOpen, setOperationCardOpen] = useState({});

	useEffect(() => {
		if (!isEmpty(Object.keys(taskData))) {
			const INITIAL_STATE = {};
			Object.keys(taskData).forEach((category) => {
				taskData?.[category]?.forEach((subCategory) => {
					INITIAL_STATE[`${category}_${subCategory?.id}`] = false;
				});
			});
			setOperationCardOpen(INITIAL_STATE);
		}
	}, [taskData]);

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<Button themeType="secondary" size="md" onClick={handleClick}>Go Back</Button>

				<div className={styles.actions}>
					<div>
						<Button size="md" themeType="secondary">Save Changes</Button>
					</div>
					<div className={styles.header_button}>
						<Button size="md" themeType="primary">Approve</Button>
					</div>
				</div>
			</div>
			<div className={styles.pre_post_container}>
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
			<div className={styles.all_task_container}>
				<div className={styles.task_specific_container}>
					<OperationalClosedCards
						jobId={jobId}
						data={taskData?.SELL}
						type="sell"
						operationCardOpen={operationCardOpen}
						setOperationCardOpen={setOperationCardOpen}
					/>

					<OperationalClosedCards
						jobId={jobId}
						data={taskData?.BUY}
						type="buy"
						operationCardOpen={operationCardOpen}
						setOperationCardOpen={setOperationCardOpen}
					/>

				</div>
				{active_tab === 'financial_close' && (
					<FinanceClosedCardsSet job_id={job_id} />
				)}
			</div>
		</div>
	);
}

export default Header;
