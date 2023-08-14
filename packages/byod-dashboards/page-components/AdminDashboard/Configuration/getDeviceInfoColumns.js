import { Button, ButtonIcon } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import DeviceModal from './DeviceModal';

const getDeviceInfoColumns = ({
	setReimbusableValue,
	reimbusableValue,
	setMaxAmount,
	maxAmount,
	deviceValue,
	setDeviceValue,
	setShowModal,
	showModal,
	setShowDevice,
	showDevice,
}) => [
	{
		Header   : 'Name',
		accessor : (item) => (
			<div>{startCase(item?.name) || '-'}</div>
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
			<div>{startCase(item?.max_amount) || '-'}</div>
		),
	},

	{
		id       : 'edit',
		Header   : '',
		accessor : (item) => (
			<div>
				<Button
					themeType="secondary"
					onClick={() => {
						setShowModal(item?.name);
						setShowDevice(true);
						setMaxAmount(item?.max_amount);
						setReimbusableValue(item?.reimbursement_percentage);
						setDeviceValue(item?.name);
					}}
				>
					Edit
				</Button>
				{showModal === item?.name && showDevice && (
					<DeviceModal
						setShowDevice={setShowDevice}
						showDevice={showDevice}
						setReimbusableValue={setReimbusableValue}
						reimbusableValue={reimbusableValue}
						setMaxAmount={setMaxAmount}
						maxAmount={maxAmount}
						deviceValue={deviceValue}
						setDeviceValue={setDeviceValue}
						source="Edit Devices"
						showModal={showModal}
						setShowModal={setShowModal}
					/>

				)}

			</div>
		),
	},
	{
		id       : 'delete',
		Header   : '',
		accessor : (item) => (
			<ButtonIcon size="md" icon={<IcMDelete />} themeType="primary" />
		),
	},

];

export default getDeviceInfoColumns;
