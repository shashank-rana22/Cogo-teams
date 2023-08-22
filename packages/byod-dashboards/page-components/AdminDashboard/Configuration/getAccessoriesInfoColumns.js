import { ButtonIcon } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useUpdateDeviceDetails from '../../../hooks/useUpdateDeviceDetails';

const SOURCE = 'AddonDetails';

const getAccessoriesInfoColumns = ({
	setShowAccessories,
	id,
	addon_details,
	getEmployeeReimbursementGroup = () => {},
}) => {
	const {	 updateDeviceDetails } = useUpdateDeviceDetails(
		{ id, SOURCE, setShowAccessories, getEmployeeReimbursementGroup },
	);

	const handleDelete = ({ item }) => {
		const filteredData = addon_details.filter((d) => d.addon_type !== item.addon_type
				|| d.max_reimbursement_amount !== item.max_reimbursement_amount
				|| d.reimbursement_percentage !== item.reimbursement_percentage);

		updateDeviceDetails({ addon_details: filteredData });
	};

	return ([
		{
			Header   : 'Name',
			accessor : (item) => (
				<div>{startCase(item?.addon_type) || '-'}</div>
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
						size="md"
						onClick={() => {
							handleDelete({ item });
						}}
						icon={<IcMDelete />}
						themeType="primary"
					/>

				</div>
			),
		},

	]);
};

export default getAccessoriesInfoColumns;
