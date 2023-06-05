import { MultiSelect, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import sopConditionOptions from '../helpers/sop_condition_options';

import styles from './styles.module.css';

function SopFilters({
	setFilters = () => {},
	setShowFilters = () => {},
	trade_partners_details,
	primary_service,
}) {
	const [filterValue, setFilterValue] = useState([]);

	const conditions = sopConditionOptions(
		primary_service,
		trade_partners_details,
	);
	conditions.push({ label: 'For This Shipment', value: 'for_this_shipment' });

	const { reset } = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.select_container}>
				<MultiSelect
					size="sm"
					placeholder="Showing All"
					value={filterValue}
					options={conditions || []}
					onChange={setFilterValue}
				/>
			</div>

			<div className={styles.actions_row}>
				<Button
					className="secondary sm"
					style={{ border: 'none' }}
					onClick={() => {
						reset();
						setShowFilters(false);
					}}
				>
					Clear Filters
				</Button>

				<Button
					className="primary sm"
					style={{ marginLeft: '4px' }}
					onClick={() => {
						setFilters(filterValue || []);
						setShowFilters(false);
					}}
				>
					Done
				</Button>
			</div>
		</div>
	);
}
export default SopFilters;
