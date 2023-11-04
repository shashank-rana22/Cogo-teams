import { Button, Modal, RadioGroup } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import useUpdateAccountTagging from '../../../../../hooks/useUpdateAccountTagging';

import styles from './styles.module.css';

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

	const { control, watch } = useForm();
	const { tagged_person = '' } = watch();

	const onSubmit = () => {
		apiTrigger({ currentStatus, refetch, setChangeStatus, tagged_person });
	};

	return (
		<Modal show={changeStatus} onClose={() => setChangeStatus(false)}>
			<Modal.Header title="Change Current Account Status" />

			<Modal.Body>
				<RadioGroup
					options={filtredOptions}
					value={currentStatus}
					onChange={(val) => setCurrentStatus(val)}
				/>

				<div className={styles.select}>
					<strong>Select Person to Tag</strong>

					<AsyncSelectController
						name="tagged_person"
						asyncKey="partner_users_ids"
						placeholder="Type to search..."
						control={control}
						params={{
							filters: {
								status: 'active',
							},
						}}
						size="sm"
						isClearable
						rules={{ required: true }}
					/>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={onSubmit}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangeStatus;
