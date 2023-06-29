import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';

import useRaiseTicketControls from '../../../../configurations/raise-ticket-controls';

import styles from './styles.module.css';

function CategoryType(props) {
	const { searchParams, setSearchParams, isAdmin } = props;
	const raiseTicketControl = useRaiseTicketControls({ searchParams });

	return (
		<div className={styles.category_container}>
			{isAdmin && (
				<AsyncSelect
					name="user_id"
					asyncKey="partner_users"
					valueKey="user_id"
					initialCall
					value={searchParams.agent}
					placeholder="Select agent"
					isClearable
					onChange={(val) => setSearchParams((prev) => ({
						...prev,
						agent: val,
					}))}
				/>
			)}
			<AsyncSelect
				name="ticket_type"
				onChange={(val) => setSearchParams((prev) => ({
					...prev,
					category: val,
				}))}
				asyncKey="default_types"
				value={raiseTicketControl.loading ? '' : searchParams.category}
				placeholder="Ticket type"
				service="tickets"
				isClearable
				initialCall
			/>
		</div>
	);
}

export default CategoryType;
