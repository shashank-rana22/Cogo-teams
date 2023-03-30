import { Button } from '@cogoport/components';
import { MultiselectController, InputController } from '@cogoport/forms';

import useUpdateContainerDetails from '../../../../../../hooks/useUpdateContainerDetails';

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

	const {
		loading,
		apiTrigger,
	} = useUpdateContainerDetails({
		setMappingModal,
		refetch,
	});

	const onSubmit = (values) => {
		const payload = formatPayload({ values, containerDetails });
		apiTrigger(payload);
	};

	return (
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

			<div className={styles.button_div}>
				<Button
					onClick={() => {
						setMappingModal(false);
					}}
					size="md"
					style={{ marginRight: 10 }}
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
					size="md"
				>
					Update Details
				</Button>
			</div>
		</div>
	);
}

export default BlContainersMapping;
