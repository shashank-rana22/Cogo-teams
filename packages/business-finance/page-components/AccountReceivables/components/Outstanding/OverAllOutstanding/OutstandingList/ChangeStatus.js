import { RadioGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

function ChangeStatus({ item = {}, currentstatus = '', setCurrentStatus = () => {} }) {
	setCurrentStatus(item?.taggedState);

	const accountStatusOption = [
		{ label: 'Credit Controller', value: 'credit_controller' },
		{ label: 'Collection Agency', value: 'collection_agency' },
		{ label: 'Pre Legal', value: 'pre_legal' },
		{ label: 'Legal', value: 'legal' },
		{ label: 'Never', value: 'never' },
	];

	let filtredOptions = [];

	if (isEmpty(item?.taggedState)) {
		filtredOptions = accountStatusOption.filter(
			(ele) => ele.value !== 'credit_controller',
		);
	} else {
		filtredOptions = accountStatusOption.filter(
			(ele) => ele.value !== item?.taggedState,
		);
	}

	return (
		<RadioGroup
			options={filtredOptions}
			value={currentstatus}
			onChange={setCurrentStatus}
		/>
	);
}

export default ChangeStatus;
