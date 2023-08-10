import { InputController, UploadController } from '@cogoport/forms';

import styles from './styles.module.css';

function ModalContent({ control }) {
	return (
		<div className={styles.container}>
			<div>
				Issue Description :
				{' '}
				<span style={{ color: 'red' }}>*</span>
			</div>

			<InputController
				control={control}
				name="description"
				type="text"
				placeholder="Enter Your Issue"
				className={styles.input}
			/>

			<div>Upload Screenshot :</div>
			<UploadController
				name="error_screenshot_url"
				control={control}
				accept=".png"
			/>
		</div>
	);
}

export default ModalContent;
