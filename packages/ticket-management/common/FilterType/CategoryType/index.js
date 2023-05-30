import { Select } from '@cogoport/components';

import useRaiseTicketControls from '../../../configurations/raise-ticket-controls';

import styles from './styles.module.css';

function CategoryType(props) {
	const { searchParams, setSearchParams } = props;
	const raiseTicketControl = useRaiseTicketControls();
	const ticketControlOption = raiseTicketControl?.options.map(
		(item) => ({ value: item.TicketType, label: item.TicketType }),
	);

	return (
		<div className={styles.category_container}>
			<Select
				size="sm"
				onChange={(val) => setSearchParams((prev) => ({
					...prev,
					category: val,
				}))}
				value={raiseTicketControl.loading ? '' : searchParams.category}
				options={ticketControlOption || []}
				placeholder="Ticket type"
				isClearable

			/>
		</div>
	);
}

export default CategoryType;
