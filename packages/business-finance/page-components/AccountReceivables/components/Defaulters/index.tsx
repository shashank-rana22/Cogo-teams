import { TabPanel, Tabs } from '@cogoport/components';
import { useEffect, useState } from 'react';

import List from '../../../commons/List';
import useGetDefaulters from '../../hooks/useGetDefaulters';

import { invoiceListConfig } from './config/listConfig';
import DefaultersFilters from './DefaultersFilters';
import listFunctions from './ListFunctions';
import styles from './styles.module.css';

interface GlobalInterface {
	page?:number,
	type?:string,
	migrated?:boolean | string,
	pageIndex?:number,
	pageLimit?:number,
	invoiceStatus?: string,
	status?: string,
	services?: string[],
	invoiceDate?: { startDate?: Date, endDate?: Date },
	dueDate?: { startDate?: Date, endDate?: Date },
	currency?: string,
	zone?:string,
}

interface Props {
	entityCode?:number | string
}

function Defaulters({ entityCode }:Props) {
	const [globalFilters, setGlobalFilters] = useState<GlobalInterface>({
		pageIndex : 1,
		pageLimit : 10,
	});
	const [isClear, setIsClear] = useState(true);
	const [activeTab, setActiveTab] = useState('overall');
	const [sort, setSort] = useState({});
	const {
		invoiceData,
		invoiceListLoading,
		refetch,
		sendReport,
	} = useGetDefaulters({ globalFilters, activeTab, sort, entityCode });

	useEffect(() => {
		const {
			migrated, invoiceStatus, status, services, invoiceDate, dueDate, currency,
		} = globalFilters || {};

		const isFilterApplied = String(migrated)?.length > 0
		|| invoiceStatus?.length > 0 || status.length > 0 || services?.length > 0
		|| String(invoiceDate?.startDate)?.length > 0
		|| String(invoiceDate?.endDate)?.length > 0
		|| String(dueDate?.startDate)?.length > 0
		|| String(dueDate?.endDate)?.length > 0 || currency?.length > 0;

		if (isFilterApplied) {
			setIsClear(false);
		} else {
			setIsClear(true);
		}
	}, [globalFilters, isClear]);

	const clearFilters = () => {
		setGlobalFilters({
			page      : 1,
			type      : 'overall',
			pageLimit : 10,
		});

		setIsClear(true);
	};

	const functions = listFunctions({ refetch });

	return (
		<div>
			<DefaultersFilters
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}
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
						<TabPanel
							name="overall"
							title="Overall"
							badge={invoiceData?.totalRecords}
						/>
					</Tabs>

				</div>

				<div className={styles.toggle_right}>
					<div>
						<div
							className={styles.send_report}
							onClick={() => { sendReport(); }}
							role="presentation"
						>
							Send Report
						</div>
					</div>

				</div>
			</div>

			{activeTab === 'overall' && (
				<List
					config={invoiceListConfig()}
					itemData={invoiceData}
					loading={invoiceListLoading}
					functions={functions}
					sort={sort}
					setSort={setSort}
					page={globalFilters.pageIndex || 1}
					pageSize={globalFilters.pageLimit || 10}
					handlePageChange={(pageValue:number) => {
						setGlobalFilters((p) => ({ ...p, pageIndex: pageValue }));
					}}
					showPagination
				/>
			)}

		</div>
	);
}

export default Defaulters;
