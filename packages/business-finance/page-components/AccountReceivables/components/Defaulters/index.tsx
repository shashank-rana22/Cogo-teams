import { Button, TabPanel, Tabs, Toggle } from '@cogoport/components';
import { useEffect, useState } from 'react';

import useGetDefaulters from '../../hooks/useGetDefaulters';

import DefaultersFilters from './DefaultersFilters';
import styles from './styles.module.css';

function Defaulters() {
	const [globalFilters, setGlobalFilters] = useState({
		pageIndex : 1,
		pageLimit : 10,
	});
	const [isClear, setIsClear] = useState(true);
	const [isCustomerView, setIsCustomerView] = useState(false);
	const [activeTab, setActiveTab] = useState('overall');

	// const { user_role_ids = [] } = partner || {};

	// const disable = !(list?.length > 0);
	const {
		invoiceData,
		customerData,
		refetch,
	} = useGetDefaulters({ isCustomerView, globalFilters, isClear });

	useEffect(() => {
		const {
			migrated, cogoEntity, invoiceStatus, status, services, invoiceDate, dueDate, currency,
		} = globalFilters || {};

		if (migrated || cogoEntity || invoiceStatus || status || services || invoiceDate?.startDate
			|| invoiceDate?.endDate || dueDate?.startDate || dueDate?.endDate || currency) {
			setIsClear(false);
		} else {
			setIsClear(true);
		}
	}, [globalFilters]);

	const clearFilters = () => {
		setGlobalFilters({
			page      : 1,
			type      : 'overall',
			pageLimit : 10,
		});
	};

	return (
		<div>
			<DefaultersFilters
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}
				isCustomerView={isCustomerView}
				isClear={isClear}
				clearFilters={clearFilters}
			/>

			<div className={styles.toggle_header}>
				<div>
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						<TabPanel name="overall" title="Overall" badge={3}>
							<div>This is local search</div>
						</TabPanel>
					</Tabs>

				</div>

				<div className={styles.toggle_right}>
					{!isCustomerView && (
						<div>
							<Button
								themeType="secondary"
								style={{
									marginLeft: '12px',
								}}
								onClick={() => {}}
							>
								Send Report
							</Button>

						</div>
					)}
					<Toggle
						name="toggle"
						size="md"
						disabled={false}
						onLabel="Customer"
						offLabel="Invoice"
						onChange={() => setIsCustomerView(!isCustomerView)}
					/>

				</div>
			</div>
		</div>
	);
}

export default Defaulters;
