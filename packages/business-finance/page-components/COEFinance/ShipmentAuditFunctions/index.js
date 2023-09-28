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

// const list = [
// 	{
// 		sid  : '1234567890',
// 		sell : {
// 			estimated   : 101.919,
// 			operational : 20000000000,
// 			financial   : 20000000000,
// 		},
// 		buy: {
// 			estimated   : 20000,
// 			operational : 20000,
// 			financial   : 20000,
// 		},
// 		profitability: {
// 			estimated   : 2000000000,
// 			operational : 2000000000,
// 			financial   : 2000000000,
// 		},
// 	},
// 	{
// 		sid  : '1234567891',
// 		sell : {
// 			estimated   : 20000000,
// 			operational : 20000000,
// 			financial   : 20000000,
// 		},
// 		buy: {
// 			estimated   : 20000000000,
// 			operational : 20000000000,
// 			financial   : 20000000000,
// 		},
// 		profitability: {
// 			estimated   : 200,
// 			operational : 200,
// 			financial   : 200,
// 		},
// 	},
// ];

function ShipmentAuditFunction({ activeTab }) {
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
	// console.log(data, 'list');
	console.log(filters, 'tab');

	const onPageChange = (val) => {
		setPaginationFilters((prev) => ({ ...prev, page: val }));
	};
	const handleClick = () => {
		push(
			'/business-finance/coe-finance/next-page',
			'/business-finance/coe-finance/next-page',
		);
	};
	const handleFinancialTabClick = () => {
		push(
			'/business-finance/coe-finance/finance-close-next-page',
			'/business-finance/coe-finance/finance-close-next-page',
		);
	};

	const rest = { onClickOutside: () => setShow(false) };
	const columns = getJobColumns({ handleClick });
	const columns2 = getFinancialCloseColumns({ handleFinancialTabClick });
	// console.log(filters);
	// console.log(search);

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
