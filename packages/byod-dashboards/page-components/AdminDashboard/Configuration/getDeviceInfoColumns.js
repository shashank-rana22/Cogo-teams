import { ButtonIcon } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useUpdateDeviceDetails from '../../../hooks/useUpdateDeviceDetails';

const SOURCE = 'DeviceDetails';

const getDeviceInfoColumns = ({
	setShowDevice,
	id,
	device_details,
	getEmployeeReimbursementGroup = () => {},
}) => {
	const {	 updateDeviceDetails } = useUpdateDeviceDetails(
		{ id, SOURCE, setShowDevice, getEmployeeReimbursementGroup },
	);

	const handleDelete = ({ item }) => {
		const filteredData = device_details.filter((d) => d.device_type !== item.device_type
				|| d.max_reimbursement_amount !== item.max_reimbursement_amount
				|| d.reimbursement_percentage !== item.reimbursement_percentage);

		updateDeviceDetails({ device_details: filteredData });
	};

	return ([
		{
			Header   : 'Name',
			accessor : (item) => (
				<div>{startCase(item?.device_type) || '-'}</div>
			),
		},

		{
			Header   : '% Reimbursable',
			accessor : (item) => (
				<div>{startCase(item?.reimbursement_percentage) || '-'}</div>
			),
		},

		{
			Header   : 'Max Amount',
			accessor : (item) => (
				<div>{startCase(item?.max_reimbursement_amount) || '-'}</div>
			),
		},

		{
			Header   : 'Actions',
			accessor : (item) => (
				<div>
					<ButtonIcon
						onClick={() => {
							handleDelete({ item });
						}}
						size="md"
						icon={<IcMDelete />}
						themeType="primary"
					/>
				</div>
			),
		},
	]);
};

export default getDeviceInfoColumns;
