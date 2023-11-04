import { Button, Modal, RadioGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useUpdateAccountTagging from '../../../../../hooks/useUpdateAccountTagging';

const accountStatusOption = [
	{ label: 'Credit Controller', value: 'credit_controller' },
	{ label: 'Collection Agency', value: 'collection_agency' },
	{ label: 'Pre Legal', value: 'pre_legal' },
	{ label: 'Legal', value: 'legal' },
	{ label: 'Never', value: 'never' },
];

function ChangeStatus({
	item = {}, currentStatus = '', refetch = () => {},
	setCurrentStatus = () => {}, changeStatus = false, setChangeStatus = () => {},
}) {
	const { apiTrigger = () => {} } = useUpdateAccountTagging({ item });

	const onSubmit = () => {
		apiTrigger({ currentStatus, refetch, setChangeStatus });
	};

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
		<Modal show={changeStatus} onClose={() => setChangeStatus(false)}>
			<Modal.Header title="Change Current Account Status" />

			<Modal.Body>
				<RadioGroup
					options={filtredOptions}
					value={currentStatus}
					onChange={(val) => setCurrentStatus(val)}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={onSubmit}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangeStatus;
