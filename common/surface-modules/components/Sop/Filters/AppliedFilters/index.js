import sopConditionOptions from '../../helpers/sop_condition_options';

import Cross from './cross';
import styles from './styles.module.css';

function ShowCurrentFilters({
	filters = {},
	setFilters = () => {},
	trade_partners_details,
	primary_service = {},
}) {
	const conditions = sopConditionOptions(
		primary_service,
		trade_partners_details,
	);
	conditions.push({ label: 'For This Shipment', value: 'for_this_shipment' });

	const getLabel = (filter) => {
		const filterLabel = conditions.find((obj) => obj.value === filter);
		return filterLabel?.label;
	};

	const handleRemoveFilter = (filter) => {
		const newFilters = [];
		filters.forEach((element) => {
			if (element !== filter) {
				newFilters.push(element);
			}
		});

		if (newFilters.length) {
			setFilters([...newFilters]);
		} else {
			setFilters([]);
		}
	};

	return (
		<div className={styles.container}>
			{filters?.map((filter) => (
				<div className={styles.row} key={filter}>
					<div className={styles.filter_text}>{getLabel(filter)}</div>
					<div
						role="button"
						tabIndex={0}
						className={styles.remove_filter_button}
						id={filter}
						onClick={() => handleRemoveFilter(filter)}
					>
						<Cross />
					</div>
				</div>
			))}
		</div>
	);
}
export default ShowCurrentFilters;
