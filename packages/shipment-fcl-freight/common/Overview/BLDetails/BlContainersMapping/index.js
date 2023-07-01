import { Button, Modal } from '@cogoport/components';
import { MultiselectController, InputController } from '@cogoport/forms';

import useUpdateShipmentContainerDetails from '../../../../hooks/useUpdateShipmentContainerDetails';

import styles from './styles.module.css';
import formatPayload from './utils/formatPayload';
import getFields from './utils/useGetFields';

function BlContainersMapping({
	data,
	setMappingModal = () => { },
	refetch = () => {},
	containerDetails,
}) {
	const {
		errors, control, register,
		mutatedFields, handleSubmit,
	} = getFields({ data, containerDetails });

	const afterContainerUpdate = () => {
		setMappingModal(false);
		refetch();
	};

	const {
		loading,
		apiTrigger,
	} = useUpdateShipmentContainerDetails({
		refetch        : afterContainerUpdate,
		successMessage : 'Container Mappings Updated Successfully!',
	});

	const onSubmit = (values) => {
		const payload = formatPayload({ values, containerDetails });
		apiTrigger(payload);
	};

	const closeModal = () => setMappingModal(false);

	return (
		<Modal
			show
			onClose={closeModal}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
			className={styles.custom_modal}
		>
			<Modal.Header title="BL Container Mapping" />
			<Modal.Body>
				<div className={styles.content}>
					{mutatedFields.map((field, index) => (
						<div key={field.id}>
							<div className={styles.field_array}>
								<div className={styles.input_container}>
									<label htmlFor="bl_number">BL Number</label>
									<InputController
										name="bl_number"
										control={control}
										{...register(`bl_mappings.${index}.bl_number`)}
										size="sm"
										disabled
									/>
								</div>
								<div className={styles.input_container}>
									<label htmlFor="container_number">Container Number</label>
									<MultiselectController
										name="container_number"
										control={control}
										{...register(`bl_mappings.${index}.container_number`)}
										size="sm"
										options={field.options}
										rules={{ required: { value: true, message: 'This field is required' } }}
									/>
									{errors?.bl_mappings?.[index]?.container_number?.message
							&& <span>This field is required</span>}
								</div>
							</div>

						</div>
					))}

				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={closeModal}
					size="md"
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
					size="md"
				>
					Update
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default BlContainersMapping;
