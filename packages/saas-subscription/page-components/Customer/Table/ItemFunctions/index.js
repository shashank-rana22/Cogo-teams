import { IcMEdit } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

const itemFunction = ({ setEditModal }) => ({
	renderId: (item) => (
		<span>{item?.organization?.serial_id}</span>
	),

	renderCompanyName: (item) => (
		<span>{item?.organization?.business_name}</span>
	),

	renderPlan: (item) => (
		<span>{item?.active_subscription?.plan?.display_name}</span>
	),
	renderEndDate: (item) => (
		<span>{format(item?.active_subscription?.end_date, 'dd-MM-yyyy')}</span>
	),
	renderStatus: (item) => (
		<span>{item?.active_subscription?.status}</span>
	),
	renderEdit: (item) => (
		<span>
			<IcMEdit
				style={{ cursor: 'pointer' }}
				onClick={() => setEditModal(() => ({ info: item, open: true }))}
			/>

		</span>
	),
});
export default itemFunction;
