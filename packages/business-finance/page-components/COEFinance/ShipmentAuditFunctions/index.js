import { Datepicker, Button, Input, Table, Pagination, Popover } from '@cogoport/components';
// import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetDocumentList from '../hook/useGetDocumentList';

import Content from './commons/FiltersContent';
import getFinancialCloseColumns from './configurations/getFinancialCloseColumns';
import getJobColumns from './configurations/getJobColumns';
import styles from './styles.module.css';

function ShipmentAuditFunction({ activeTab = '' }) {
	const { push } = useRouter();
	const [date, setDate] = useState('');
	const [tradeTab, setTradeTab] = useState('');
	const [filters, setFilters] = useState({
		Service               : null,
		Entity                : null,
		walletUsed            : null,
		operationalClosedDate : null,
		creationDate          : null,
		tradeType             : '',
	});
	const [paginationFilters, setPaginationFilters] = useState({
		page      : 1,
		pageLimit : 10,
	});
	const [receivables, setReceivables] = useState('Service');
	const [show, setShow] = useState(false);
	const [search, setSearch] = useState('');

	const { data, loading, refetch } = useGetDocumentList({ paginationFilters, search, activeTab });
	const { list = [] } = data || {};

	const onPageChange = (val) => {
		setPaginationFilters((prev) => ({ ...prev, page: val }));
	};
	const handleClick = (jobId) => {
		push(
			`/business-finance/coe-finance/next-page?job_id=${jobId}`,
		);
	};
	// const handleFinancialTabClick = (jobId) => {
	// 	push(
	// 		'/business-finance/coe-finance/finance-close-next-page',
	// 		'/business-finance/coe-finance/finance-close-next-page',
	// 	);
	// };

	// const handleClick = (jobId) => {
	// 	push({
	// 		pathname : '/business-finance/coe-finance/next-page',
	// 		query    : { jobId },
	// 	});
	// };

	const handleFinancialTabClick = (jobId) => {
		push({
			pathname : '/business-finance/coe-finance/finance-close-next-page',
			query    : { jobId },
		});
	};

	const rest = { onClickOutside: () => setShow(false) };
	const columns = getJobColumns({ handleClick });
	const columns2 = getFinancialCloseColumns({ handleFinancialTabClick });

	useEffect(() => {
		setPaginationFilters((prev) => ({ ...prev, page: 1 }));
		setTradeTab('');
		setFilters({
			Service               : null,
			Entity                : null,
			walletUsed            : null,
			operationalClosedDate : null,
			creationDate          : null,
			tradeType             : '',
		});
	}, [activeTab]);
	return (
		<>
			<main className={styles.main_container}>
				<div className={styles.container}>
					<div style={{ margin: '1rem 1rem 1rem 0' }} className={styles.date_picker}>
						<Datepicker
							placeholder="Date"
							dateFormat="MM/dd/yyyy"
							name="date"
							onChange={setDate}
							value={date}
						/>
					</div>
					<div>
						<Popover
							visible={show}
							placement="bottom"
							render={(
								<Content
									filters={filters}
									setFilters={setFilters}
									receivables={receivables}
									setReceivables={setReceivables}
									show={show}
									setShow={setShow}
									refetch={refetch}
									tradeTab={tradeTab}
									setTradeTab={setTradeTab}
								/>
							)}
							className={styles.pop_over_style}
							{...rest}
						>
							<Button
								themeType="primary"
								size="md"
								onClick={() => {
									setShow(!show);
								}}
							>
								Filters
							</Button>
						</Popover>
					</div>
				</div>
				<div className={styles.search}>
					<Input
						size="md"
						placeholder="Search"
						value={search}
						suffix={<IcMSearchlight height="16" width="16" />}
						onChange={(val) => setSearch(val)}
					/>
				</div>
				{/* <div className={styles.tabs_container}>
					<Button onClick={handleClick}>Go to Next Page</Button>
				</div> */}

			</main>
			<div className={styles.list_container}>
				{
				activeTab === 'operational_close'
					? (<Table columns={columns} data={list} className={styles.tablestyle} loading={loading} />)
					: (<Table columns={columns2} data={list} className={styles.tablestyle} loading={loading} />)
		}

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
