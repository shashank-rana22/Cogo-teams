import { Datepicker, Button, Input, Table, Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import getJobColumns from './page-components/ConfigurationTab/getJobColumns';
import styles from './styles.module.css';

const list = [
	{
		sid  : '1234567890',
		sell : {
			estimated   : 'INR 2,00,00,000',
			operational : 'INR 2,00,00,000',
			financial   : 'INR 2,00,00,000',
		},
		buy: {
			estimated   : 'INR 2,00,00,000',
			operational : 'INR 2,00,00,000',
			financial   : 'INR 2,00,00,000',
		},
		profitability: {
			estimated   : 'INR 2,00,00,000',
			operational : 'INR 2,00,00,000',
			financial   : 'INR 2,00,00,000',
		},
	},
];

function ShipmentAuditFunction() {
	const { push } = useRouter();
	const [date, setDate] = useState('');
	const [search, setSearch] = useState('');
	const handleClick = () => {
		push(
			'/business-finance/coe-finance/next-page',
			'/business-finance/coe-finance/next-page',
		);
	};
	const columns = getJobColumns({ handleClick });

	return (
		<>
			<main className={styles.main_container}>
				<div className={styles.container}>
					<div style={{ margin: '1rem 1rem 1rem 0' }} className={styles.date_picker}>
						<Datepicker
							placeholder="Enter Date"
							showTimeSelect
							dateFormat="MM/dd/yyyy"
							name="date"
							onChange={setDate}
							value={date}
						/>
					</div>
					<div>
						<Button> Filters</Button>
					</div>
				</div>
				<div className={styles.search}>
					<Input
						size="md"
						placeholder="Search"
						value={search}
						suffix={<IcMSearchlight />}
						onChange={(val) => setSearch(val)}
					/>
				</div>
				{/* <div className={styles.tabs_container}>
				<Button onClick={handleClick}>Go to Next Page</Button>
			</div> */}

			</main>
			<div className={styles.list_container}>
				<Table columns={columns} data={list} className={styles.tablestyle} />
				<Pagination
					className={styles.pagination}
			// currentPage={data?.pageNo}
			// totalItems={data?.totalRecords}
			// pageSize={PAGE_SIZE}
			// onPageChange={onPageChange}
					currentPage="1"
					totalItems="1"
					pageSize="10"
				/>
			</div>
		</>
	);
}

export default ShipmentAuditFunction;
