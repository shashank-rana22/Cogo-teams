import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import { getElementController } from '../../../../../utils/get-element-controls';
import uploadControls from '../../../../../utils/upload-controls';

import styles from './styles.module.css';

function UploadModal({
	setShow = () => {}, show = '', uploadData, formProps = {},
	onSubmit = () => {}, loading,
}) {
	const { control, formState: { errors }, handleSubmit, reset } = formProps;

	const onClose = () => {
		setShow('');
		reset();
	};

	const FINAL_HEADING = {
		organization : 'Upload Importer/Exporter CSV',
		partner      : uploadData?.finalModalHeading,
		lead         : uploadData?.finalModalHeading,
	};

	return (

		<Modal
			size="md"
			show={show === 'uploadModal'}
			onClose={onClose}
			placement="center"
		>
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMUpload style={{ margin: '0 4px 0 0' }} />
					{' '}
					Upload CSV
				</div>
			)}
			/>
			<div>
				<div style={{ margin: '0 0 12px 16px' }}>
					{FINAL_HEADING[uploadData?.ingestion_type]}
				</div>

				<div className={styles.modal_container}>
					{uploadControls.map((controlItem) => {
						const el = { ...controlItem };
						const Element = getElementController(el.type);
						if (!Element) return null;
						return (
							<div style={el.style} className={styles.control_container}>
								<span className={styles.control_label}>{el.label}</span>

								<Element
									{...el}
									size="md"
									key={el.name}
									control={control}
									id={`${el.name}_input`}
								/>

								<div className={styles.error_message}>
									{errors?.[el.name]?.message}
								</div>
							</div>
						);
					})}
				</div>
				<div className={styles.close_button}>
					<Button
						themeType="secondary"
						style={{ marginRight: '8px' }}
						onClick={() => {
							setShow('orgDetails');
						}}
					>
						Back
					</Button>
					<Button loading={loading} onClick={handleSubmit(onSubmit)}>Submit</Button>
				</div>

			</div>

		</Modal>
	);
}

export default UploadModal;
