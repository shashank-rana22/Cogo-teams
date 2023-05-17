import { Legend } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

const statusColor = {
	active: '#ABCD62',

};

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
	renderEndDate: (item) => {
		const data = item?.active_subscription?.end_date;
		return (
			<span>
				{data ? format(data, 'dd-MM-yyy') : '--' }
			</span>
		);
	},
	renderStatus: (item) => {
		const status = item?.active_subscription?.status;
		const modifiedStatus = startCase(status);
		const itm = [{ label: modifiedStatus, color: statusColor?.[status], key: modifiedStatus }];
		return (
			<Legend hasBackground={false} direction="horizontal" items={itm} size="md" />
		);
	},
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
