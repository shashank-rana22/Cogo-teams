import { Button } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';

import styles from './styles.module.css';

function DocCard({
	item = {},
	control = {},
}) {
	return (
		<div className={styles.card_container}>
			<div className={styles.filename}>{item?.filename}</div>
			<div className={styles.button_container}>
				<Button size="sm" onClick={() => window.open(item?.fileurl, '_blank')}>View</Button>
				<UploadController
					key={item?.id}
					className="upload_controller_documents"
					name={`carting_order_approval_url_${item?.id}`}
					uploadDesc="Upload Approval"
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
