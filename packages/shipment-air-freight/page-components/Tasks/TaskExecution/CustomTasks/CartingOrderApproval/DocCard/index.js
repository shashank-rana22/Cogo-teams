import { Button } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';

import styles from './styles.module.css';

function DocCard({
	item = {},
	control,
}) {
	return (
		<div className={styles.card_container}>
			<div>{item?.filename}</div>
			<div>
				<Button onClick={() => window.open(item?.fileurl, '_blank')}>View</Button>
				<Button>Upload Approval</Button>
				<UploadController
					className="upload_controller"
					name="carting_order_approval_url"
					// disabled={formValues.not_reg_under_gst}
					control={control}
					rules={{
						required: {
							message: 'Document Approval is required',
						},
					}}
				/>
			</div>
		</div>
	);
}

export default DocCard;
