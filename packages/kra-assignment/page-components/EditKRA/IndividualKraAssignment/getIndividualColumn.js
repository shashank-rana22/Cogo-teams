import { InputNumber, Select } from '@cogoport/components';
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
		const newData = valuesIndividualKRA?.map((x) => {
			if (x.kra_id === item.kra_id
			) {
				return {
					...x,
					[name]: val,
				};
			}
			return x;
		});
		if (newData?.length) { setValuesIndividualKRA(newData); }
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
						value={valuesIndividualKRA?.find((x) => x.kra_id === item.kra_id)?.targeted_value}
						onChange={(e) => handleTargetChange(e, item, 'targeted_value')}
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
						value={valuesIndividualKRA?.find((x) => x.kra_id === item.kra_id)?.is_percent}
						onChange={(e) => handleTargetChange(e, item, 'is_percent')}
					/>
				</div>

			),
			id: 'is_percent',
		},
	];
}

export default getIndividualColumn;
