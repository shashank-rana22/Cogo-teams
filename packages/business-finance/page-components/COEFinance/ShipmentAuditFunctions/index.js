import { Datepicker, Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import styles from './styles.module.css';

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

	return (
		<main className={styles.main_container}>
			<div className={styles.container}>
				<div style={{ margin: '1rem' }} className={styles.date_picker}>
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
			<div style={{ marginRight: '10px' }} className={styles.search}>
				<Input
					size="md"
					placeholder="Search"
					suffix={<IcMSearchlight />}
					onChange={(val) => setSearch(val)}
				/>
			</div>
			{/* <div className={styles.tabs_container}>
				<Button onClick={handleClick}>Go to Next Page</Button>
			</div> */}

		</main>
	);
}

export default ShipmentAuditFunction;
