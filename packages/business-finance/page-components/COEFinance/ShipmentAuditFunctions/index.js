import {
	Button, Input, Table, Pagination, Popover, Toggle, cl,
} from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetJobList from '../hook/useGetJobList';
import { isFilterApplied } from '../utils/isFilteredApplied';

import EmptyState from './commons/EmptyState';
import Content from './commons/FiltersContent';
import getFinancialCloseColumns from './configurations/getFinancialCloseColumns';
import getJobColumns from './configurations/getJobColumns';
import styles from './styles.module.css';

const TABS = [
	{ key: 'to_be_audited', label: 'To be Audited' },
	{ key: 'partially_audited', label: 'Partially Audited' },
	{ key: 'audited', label: 'Audited' },
];

function ShipmentAuditFunction({
	activeTab = '',
	entityCode = '',
}) {
	const { push = () => {} } = useRouter();

	const [subActiveTab, setSubActiveTab] = useState('to_be_audited');
	const [tradeTab, setTradeTab] = useState('');
	const [tax, setTax] = useState('Pre');
	const [filters, setFilters] = useState({
		Service               : undefined,
		Entity                : undefined,
		walletUsed            : undefined,
		operationalClosedDate : undefined,
		financialClosedDate   : undefined,
		creationDate          : undefined,
		tradeType             : undefined,
		exclude               : ['cancelled_shipments', 'zero_expense'],
	});

	const [paginationFilters, setPaginationFilters] = useState({
		page      : 1,
		pageLimit : 10,
	});
	const [receivables, setReceivables] = useState('Service');
	const [show, setShow] = useState(false);
	const [search, setSearch] = useState('');

	const {
		data = {},
		loading = false,
		refetch = () => {},
	} =	 useGetJobList({ filters, paginationFilters, search, activeTab, subActiveTab, entityCode });
	const { list = [] } = data || {};

	const handlePrePostChange = () => {
		setTax((prev) => ((prev === 'Pre') ? 'Post' : 'Pre'));
	};

	const onPageChange = (val) => {
		setPaginationFilters((prev) => ({ ...prev, page: val }));
	};

	const handleClick = ({
		jobId = '', jobNumber = '', currency = '',
	}) => {
		push(
			`/business-finance/audit-function/${activeTab}/audit?job_id=${jobId}&job_number=${jobNumber}`,
		);
		window.sessionStorage.setItem('currency', currency);
		window.sessionStorage.setItem('audit_status', subActiveTab);
	};

	const operationColumns = getJobColumns({ handleClick, tax, subActiveTab });
	const financeColumns = getFinancialCloseColumns({ handleClick, tax, subActiveTab });

	useEffect(() => {
		setPaginationFilters((prev) => ({ ...prev, page: 1 }));
		setTradeTab('');
		setFilters({
			Service               : undefined,
			Entity                : undefined,
			walletUsed            : undefined,
			operationalClosedDate : undefined,
			creationDate          : undefined,
			tradeType             : undefined,
			exclude               : ['cancelled_shipments', 'zero_expense'],
		});
	}, [activeTab]);
	return (
		<>
			<main className={styles.main_container}>
				<div className={styles.container}>
					<div className={styles.flex}>
						{TABS.map((tab) => (
							<div
								key={tab.key}
								onClick={() => {
									setSubActiveTab(tab.key);
								}}
								role="presentation"
							>
								<div className={cl` ${styles.sub_container} ${tab.key === subActiveTab
									? styles.sub_container_after_click : styles.sub_container_before_click}`}
								>
									{tab.label}
								</div>

							</div>
						))}
					</div>
				</div>

				<div className={styles.search}>
					<Toggle
						name="prePostToggle"
						size="md"
						onLabel="Post"
						offLabel="Pre"
						checked={tax === 'Post'}
						onChange={handlePrePostChange}
					/>
					<Input
						size="md"
						placeholder="Search"
						value={search}
						suffix={<IcMSearchlight height="16" width="16" />}
						onChange={(val) => setSearch(val)}
					/>
					<Popover
						visible={show}
						placement="bottom"
						onClickOutside={() => setShow(false)}
						render={(
							<Content
								activeTab={activeTab}
								filters={filters}
								setFilters={setFilters}
								receivables={receivables}
								setReceivables={setReceivables}
								setShow={setShow}
								refetch={refetch}
								tradeTab={tradeTab}
								setTradeTab={setTradeTab}
							/>
						)}
						className={styles.pop_over_style}
					>
						<div className={styles.button_container}>
							<Button
								themeType="primary"
								size="md"
								onClick={() => {
									setShow(!show);
								}}
							>
								{!isFilterApplied(filters) ? <div className={styles.filter_dot} /> : null}
								<IcMFilter />
								Filters
							</Button>
						</div>
					</Popover>
				</div>

			</main>
			<div className={styles.list_container}>

				{isEmpty(list) ? (
					<div>
						<div className={styles.empty_container}>
							<EmptyState height={315} width={482} text="Please Select Filters" />
						</div>
						<div style={{ height: '80px' }} />
					</div>
				)
					: (
						<Table
							columns={activeTab === 'operational_close' ? operationColumns : financeColumns}
							data={list}
							className={styles.tablestyle}
							loading={loading}
						/>
					)}

				{!isEmpty(list)
					? (
						<Pagination
							className={styles.pagination}
							currentPage={data?.pageNo}
							totalItems={data?.totalRecords}
							pageSize={data?.pageSize}
							onPageChange={onPageChange}
						/>
					) : null}
			</div>
		</>
	);
}

export default ShipmentAuditFunction;
