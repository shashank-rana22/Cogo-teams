import { Button } from '@cogoport/components';
// import { InputController } from '@cogoport/forms';

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
		handleSubmit = () => {},
		onCreate = () => {},
		loading = false,
	} = useEditPersonalDetails({
		refetch,
		detailsData,
		setShowModal,
		partner_user_id,
	});

	return (
		<div style={{ padding: '12px' }}>
			<div className={styles.heading}>Edit Name</div>

			<div className={styles.layout_container}>
				{/* <InputController {...fields.name} /> */}
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
