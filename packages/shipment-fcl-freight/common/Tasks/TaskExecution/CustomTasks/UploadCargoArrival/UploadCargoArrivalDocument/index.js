import { Button } from '@cogoport/components';
import { InputController, UploadController, useForm } from '@cogoport/forms';

import useCargoArrivalDocument from '../../../../../../hooks/useCargoArrivalDocument';

import styles from './styles.module.css';

function UploadCargoArrivalDocument({
	pendingTask,
	refetch,
	setShowDocument,
	showDocument,
	clearTask,
}) {
	const { control, formState:{ errors = {} }, handleSubmit } = useForm();

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	const {
		submitDocument,
		loading,
	} = useCargoArrivalDocument({
		pendingTask,
		refetch,
		setShowDocument,
		showDocument,
		clearTask,
	});

	return (
		showDocument ? (
			<>
				<div className={styles.head}>Upload Cargo Arrival Notice Document</div>
				<div className={styles.layout}>

					<div className={styles.description}>
						<div className={styles.label}>Document description (Optional)</div>
						<InputController
							size="sm"
							control={control}
							name="document_description"
						/>
					</div>

					<div className={styles.upload_container}>
						<div className={styles.label}>Upload Document</div>
						<UploadController
							name="cargo_arrival_notice"
							control={control}
							rules={{
								required: 'Document is required',
							}}
						/>
						{Error('cargo_arrival_notice')}
					</div>
				</div>

				<div className={styles.footer}>
					<Button
						onClick={handleSubmit(submitDocument)}
						disabled={loading}
					>
						Submit
					</Button>
				</div>
			</>
		) : null
	);
}

export default UploadCargoArrivalDocument;
