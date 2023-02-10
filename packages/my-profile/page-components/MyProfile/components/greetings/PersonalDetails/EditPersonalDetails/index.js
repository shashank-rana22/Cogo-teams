import { Button } from '@cogoport/components';
import { useForm, InputController } from '@cogoport/forms';

// import controls from './controls';
import styles from './styles.module.css';
import useEditPersonalDetails from './useEditPersonalDetails';

function EditPersonalDetails({
	setShowModal = () => {},
	refetch = () => {},
	detailsData = {},
	partner_user_id = '',
}) {
	const {
		// fields = {},
		// handleSubmit = () => {},
		onCreate = () => {},
		loading = false,
	} = useEditPersonalDetails({
		refetch,
		detailsData,
		setShowModal,
		partner_user_id,
	});

	const { handleSubmit, formState: { errors }, control } = useForm();

	return (
		<div style={{ padding: '12px' }}>
			<div className={styles.heading}>Edit Name</div>

			<div className={styles.layout_container}>
				<InputController
					control={control}
					name="name"
					rules={{ required: 'Name is required.' }}
				/>
				{errors.name && (
					<div className={styles.error_text}>
						{errors.name.message}
					</div>
				)}
			</div>

			<div className={styles.button_container}>
				<div style={{ marginRight: '12px' }}>
					<Button
						disabled={loading}
						className="secondary sm"
						onClick={() => setShowModal(false)}
					>
						CANCEL
					</Button>
				</div>

				<Button
					className="primary sm"
					disabled={loading}
					onClick={handleSubmit(onCreate)}
				>
					UPDATE
				</Button>
			</div>
		</div>
	);
}
export default EditPersonalDetails;
