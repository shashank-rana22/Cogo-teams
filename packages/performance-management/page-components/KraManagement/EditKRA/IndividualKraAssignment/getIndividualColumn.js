import { InputNumber, Select, Input } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const OPTIONS = [
	{ label: 'Yes', value: 'yes' },
	{ label: 'No', value: 'no' },
];

function getIndividualColumn({
	valuesIndividualKRA,
	setValuesIndividualKRA,
}) {
	const handleTargetChange = (val, item, name) => {
		const newData = valuesIndividualKRA?.map((element) => {
			if (element.employee_id === item.employee_id) {
				if (name === 'target_value') {
					return {
						...element,
						[name]: val,
					};
				}
				return {
					...element,
					[name]: val === 'yes' ? 'percentage' : 'flat',
				};
			}
			return element;
		});

		if (newData?.length) {
			setValuesIndividualKRA(newData);
		}
	};

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
						value={valuesIndividualKRA?.find((element) => element.employee_id
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
						value={valuesIndividualKRA?.find((element) => element.employee_id
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
