import { Button, Modal, RadioGroup } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';

import { taggedState } from '../../../../../constants/index';
import useUpdateAccountTagging from '../../../../../hooks/useUpdateAccountTagging';

import styles from './styles.module.css';

function ChangeStatus({
	item = {}, currentStatus = '', refetch = () => {},
	setCurrentStatus = () => {}, changeStatus = false, setChangeStatus = () => {},
}) {
	const { loading = false, apiTrigger = () => {} } = useUpdateAccountTagging({ item });

	const { control, formState: { errors = {} }, handleSubmit } = useForm();

	const onSubmit = (formValues) => {
		apiTrigger({ formValues, currentStatus, refetch, setChangeStatus });
	};

	return (
		<Modal show={changeStatus} onClose={() => setChangeStatus(false)}>
			<Modal.Header title="Change Current Account Status" />

			<Modal.Body>
				<RadioGroup
					className={styles.radio_grp}
					options={taggedState}
					value={item?.taggedState}
					onChange={(val) => setCurrentStatus(val)}
				/>

				<div className={styles.select}>
					<p className={styles.label}>Select Sub-Category Tagging:</p>

					<AsyncSelectController
						name="tagged_person"
						asyncKey="partner_users"
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
