import { startCase } from '@cogoport/utils';

import InputEmployeeManualTarget from './InputEmployeeManualTarget';

const getColumns = ({
	data,
	selectCycle,
	employeeKraDetails,
}) => {
	const columns = [

		{
			Header   : 'KRA NAME',
			accessor : (item) => (
				<div>
					{startCase(item?.kra_name) || startCase(item?.name) || '-'}
				</div>
			),

		},

		{
			Header   : 'WEIGHTAGE',
			accessor : (item) => (
				<div>
					{(item?.weightage) || '-'}
				</div>
			),
		},
		{
			Header   : 'RATING',
			accessor : (item) => (
				<div>
					{(item?.rating) || '-'}
				</div>
			),
		},
		{
			Header   : 'KRA ACHIEVED',
			accessor : (item) => (
				<div>
					{item?.rating_manual ? (
						<InputEmployeeManualTarget
							item={item}
							data={data}
							selectCycle={selectCycle}
							employeeKraDetails={employeeKraDetails}
						/>
					)
						: item.achieved_rating}
				</div>
			),
		},

	];

	return columns;
};

export default getColumns;
