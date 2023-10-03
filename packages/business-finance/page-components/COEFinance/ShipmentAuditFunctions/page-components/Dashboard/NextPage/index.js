import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetClosedTasks from '../../../../hook/useGetClosedTasks';
import useGetPrePostShipmentQuotation from '../../../../hook/useGetPrePostShipmentQuotation';

import GenerateColumn from './GenerateColumn';
import Headings from './Headings';
import styles from './styles.module.css';

const ZEROTH_INDEX = 0;
const FIRST_INDEX = 1;
const SECOND_INDEX = 2;
const THIRD_INDEX = 3;
const FOURTH_INDEX = 4;
const FIFTH_INDEX = 5;

function NextPage({ initialArray = [], activeTab = '12' }) {
	const { query = {} } = useRouter();
	const [accordionStates, setAccordionStates] = useState(initialArray);

	const {
		data: taskData = {},
		loading: taskDataLoading = true,
	} = useGetClosedTasks({ job_id: query?.job_id, activeTab });
	const {
		data: quoteData = {},
		loading: quoteLoading = true,
	} = useGetPrePostShipmentQuotation({ job_id: query?.job_id });

	const toggleAccordion = (rowIndex, index) => {
		const newAccordionStates = [...accordionStates];
		newAccordionStates[rowIndex][index] = !newAccordionStates[rowIndex][index];
		setAccordionStates(newAccordionStates);
	};

	return (
		<div className={styles.row}>
			<div className={styles.column}>
				<div className={styles.accordion}>
					<div className={styles.header}>
						<Headings heaadingText="Sell Quotation" />
					</div>
					<GenerateColumn
						columnIndex={ZEROTH_INDEX}
						accordionStates={accordionStates}
						data={quoteData?.SELL}
						loading={quoteLoading}
						toggleAccordion={toggleAccordion}
					/>
				</div>

				<div className={styles.accordion}>
					<div className={styles.header}>
						<Headings heaadingText="Operationally Closed Sell" />
					</div>
					<GenerateColumn
						columnIndex={FIRST_INDEX}
						accordionStates={accordionStates}
						data={taskData?.SELL}
						loading={taskDataLoading}
						toggleAccordion={toggleAccordion}
					/>
				</div>
				{activeTab === 'financial_close' ? (
					<div className={styles.accordion}>
						<div className={styles.header}>
							<Headings heaadingText="Financially Closed Sell" />
						</div>
						<GenerateColumn
							columnIndex={FOURTH_INDEX}
							accordionStates={accordionStates}
							data={taskData?.SELL}
							loading={taskDataLoading}
							toggleAccordion={toggleAccordion}
						/>
					</div>
				) : null }
			</div>
			<div className={styles.column}>
				<div className={styles.accordion}>
					<div className={styles.header}>
						<Headings heaadingText="Buy Quotation" />
					</div>
					<GenerateColumn
						columnIndex={SECOND_INDEX}
						accordionStates={accordionStates}
						data={quoteData?.BUY}
						loading={quoteLoading}
						toggleAccordion={toggleAccordion}
					/>
				</div>
				<div className={styles.accordion}>
					<div className={styles.header}>
						<Headings heaadingText="Operationally Closed Buy" />
					</div>
					<GenerateColumn
						columnIndex={THIRD_INDEX}
						accordionStates={accordionStates}
						data={taskData?.BUY}
						loading={taskDataLoading}
						toggleAccordion={toggleAccordion}
					/>
				</div>
				{activeTab === 'financial_close' ? (
					<div className={styles.accordion}>
						<div className={styles.header}>
							<Headings heaadingText="Financially Closed Buy" />
						</div>
						<GenerateColumn
							columnIndex={FIFTH_INDEX}
							accordionStates={accordionStates}
							data={taskData?.BUY}
							loading={taskDataLoading}
							toggleAccordion={toggleAccordion}
						/>
					</div>
				) : null }

			</div>
		</div>
	);
}

export default NextPage;
