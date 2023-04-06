import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import usePostReUpload from '../../../../../hooks/usePostReUpload';
import { getElementController } from '../../../../../utils/get-element-controls';
import reUploadControls from '../../../../../utils/re-upload-controls';

import styles from './styles.module.css';

function ReUploadModal({ tableModal = '', setTableModal = () => {}, row = {}, loading = false }) {
	const { formProps, onSubmit = () => {} } = usePostReUpload({ row, setTableModal });
	const { control, formState: { errors }, handleSubmit, reset } = formProps;
	const onClose = () => {
		setTableModal('');
		reset();
	};

	return (
		<Modal key={tableModal} size="md" show={tableModal === 'reUpload'} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMUpload style={{ margin: '0 4px 0 0' }} />
					{' '}
					Re - Upload CSV
				</div>
			)}
			/>
			<div className={styles.container}>
				<div className={styles.modal_container}>
					{reUploadControls.map((controlItem) => {
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

			</div>
			<div className={styles.close_button}>
				<Button style={{ margin: '0 8px 0 0' }} themeType="secondary" onClick={onClose}>Close</Button>

				<Button loading={loading} themeType="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>

			</div>
		</Modal>
	);
}

export default ReUploadModal;
