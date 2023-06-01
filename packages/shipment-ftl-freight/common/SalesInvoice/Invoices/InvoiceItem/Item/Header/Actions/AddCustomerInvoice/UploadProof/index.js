import { Button, Upload } from '@cogoport/components';
import { useForm, UploadController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function UploadProof({
	uploadProof = '',
	setUploadProof = () => {},
	handleClose = () => {},
	// handleSubmit = () => {},
	loading = false,
}) {
	const { control, handleSubmit } = useForm();
	const onSubmit = (val) => {
		console.log(val);
	};
	return (
		<div className={styles.container}>
			<UploadController
				name="upload_proof"
				control={control}
				accept="image/*,.pdf,.csv,.xlsx,.doc,.docx,application/
				msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			/>
			<div>
				<Button
					onClick={handleClose}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					// disabled={loading || isEmpty(uploadProof)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default UploadProof;
