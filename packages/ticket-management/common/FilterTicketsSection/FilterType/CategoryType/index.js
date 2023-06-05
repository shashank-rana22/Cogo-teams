import { Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsPartnerUsers } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import useRaiseTicketControls from '../../../../configurations/raise-ticket-controls';

import styles from './styles.module.css';

function CategoryType(props) {
	const { searchParams, setSearchParams, isAdmin } = props;
	const raiseTicketControl = useRaiseTicketControls();
	const ticketControlOption = raiseTicketControl?.options.map(
		(item) => ({ value: item.TicketType, label: item.TicketType }),
	);

	const serviceProviderOptions = useGetAsyncOptions(
		merge(asyncFieldsPartnerUsers(), {
			params: {
				filters: { account_type: 'service_provider', kyc_status: 'verified' },
			},
		}),
	);

	return (
		<div className={styles.category_container}>
			{isAdmin && (
				<Select
					size="sm"
					{...serviceProviderOptions}
					value={searchParams.agent}
					placeholder="Select agent"
					isClearable
					onChange={(val) => setSearchParams((prev) => ({
						...prev,
						agent: val,
					}))}
				/>
			)}
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
