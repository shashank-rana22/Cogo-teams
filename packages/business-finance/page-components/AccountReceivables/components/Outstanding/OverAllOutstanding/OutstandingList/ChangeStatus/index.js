import { Button, Modal, RadioGroup } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import useUpdateAccountTagging from '../../../../../hooks/useUpdateAccountTagging';

import styles from './styles.module.css';

const accountStatusOption = [
	{ label: 'Credit Controller', value: 'credit_controller' },
	{ label: 'Collection Agency', value: 'collection_agency' },
	{ label: 'Field Collection', value: 'field_collection' },
	{ label: 'Legal', value: 'legal' },
	{ label: 'Other', value: 'others_probable_legal' },
];

function ChangeStatus({
	item = {}, currentStatus = '', refetch = () => {},
	setCurrentStatus = () => {}, changeStatus = false, setChangeStatus = () => {},
}) {
	const { loading = false, apiTrigger = () => {} } = useUpdateAccountTagging({ item });

	const { control, formState: { errors = {} }, handleSubmit } = useForm();

	const onSubmit = (formValues) => {
		apiTrigger({ formValues, currentStatus, refetch, setChangeStatus });
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
					className={styles.radio_grp}
					options={filtredOptions}
					value={currentStatus}
					onChange={(val) => setCurrentStatus(val)}
				/>

				<div className={styles.select}>
					<p className={styles.label}>Select Person to Tag:</p>

					<AsyncSelectController
						name="tagged_person"
						asyncKey="partner_users_ids"
						valueKey="user_id"
						control={control}
						placeholder="Select..."
						initialCall={false}
						rules={{
							required: {
								value   : currentStatus !== 'others_probable_legal',
								message : 'Tag a Person',
							},
						}}
						isClearable
						size="sm"
					/>

					{errors?.tagged_person ? (
						<div className={styles.errors}>{errors.tagged_person?.message}</div>
					) : null}
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button themeType="secondary" onClick={() => setChangeStatus(false)}>Cancel</Button>

				<Button
					className={styles.submit_btn}
					disabled={loading}
					loading={loading}
					onClick={handleSubmit(onSubmit)}
				>
					Submit

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangeStatus;
