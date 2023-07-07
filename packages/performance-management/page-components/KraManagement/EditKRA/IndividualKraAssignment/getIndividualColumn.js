import { InputNumber, Select } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const OPTIONS = [
	{ label: 'Yes', value: 'yes' },
	{ label: 'No', value: 'no' },
];

function getIndividualColumn({
	individualKRAValues,
	handleTargetChange,
}) {
	return [
		{
			Header   : 'EMPLOYEE',
			accessor : (item) => (
				<div>
					{startCase(item?.employee_name) || '-'}
				</div>
			),
			id: 'employee',
		},
		{
			Header   : 'KRA Name',
			accessor : (item) => (
				<div>
					{startCase(item?.kra_name) || '-'}
				</div>
			),
			id: 'kra_name',
		},
		{
			Header   : 'Enter Target Value',
			accessor : (item) => (
				<div>
					<InputNumber
						size="sm"
						min={0}
						value={individualKRAValues?.find((element) => element.employee_id
							=== item.employee_id)?.target_value}
						onChange={(e) => handleTargetChange(e, item, 'target_value')}
					/>
				</div>
			),
			id: 'target_value',
		},
		{
			Header   : 'Is value entered by you in %',
			accessor : (item) => (
				<div>
					<Select
						placeholder="is percent"
						size="sm"
						options={OPTIONS || []}
						value={individualKRAValues?.find((element) => element.employee_id
							=== item.employee_id)?.selected_value_type === 'percentage' ? 'yes' : 'no'}
						onChange={(e) => handleTargetChange(e, item, 'selected_value_type')}
					/>
				</div>

			),
			id: 'is_percent',
		},
	];
}

export default getIndividualColumn;
