import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import AccessoriesModal from './AccessoriesModal';

const getAccessoriesInfoColumns = ({
	setReimbusableValue,
	reimbusableValue,
	setMaxAmount,
	maxAmount,
	accessoriesValue,
	setAccessoriesValue,
	setShowModal,
	showModal,
	setShowAccessories,
	showAccessories,
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
						setShowAccessories(true);
						setMaxAmount(item?.max_amount);
						setReimbusableValue(item?.reimbursement_percentage);
						setAccessoriesValue(item?.name);
					}}
				>
					Edit
				</Button>
				{showModal === item?.name && showAccessories && (
					<AccessoriesModal
						setShowAccessories={setShowAccessories}
						showAccessories={showAccessories}
						setReimbusableValue={setReimbusableValue}
						reimbusableValue={reimbusableValue}
						setMaxAmount={setMaxAmount}
						maxAmount={maxAmount}
						accessoriesValue={accessoriesValue}
						setAccessoriesValue={setAccessoriesValue}
						source="Edit Accessories"
						showModal={showModal}
						setShowModal={setShowModal}
					/>

				)}

			</div>
		),
	},

];

export default getAccessoriesInfoColumns;
