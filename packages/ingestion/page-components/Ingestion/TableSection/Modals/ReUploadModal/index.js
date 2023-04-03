import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import usePostReUpload from '../../../../../hooks/usePostReUpload';
import { getElementController } from '../../../../../utils/get-element-controls';
import reUploadControls from '../../../../../utils/re-upload-controls';

import styles from './styles.module.css';

function ReUploadModal({ tableModal, setTableModal = () => {}, row = {} }) {
	const onClose = () => {
		setTableModal('');
	};

	const { formProps, onSubmit = () => {} } = usePostReUpload(row);

	const { control, formState: { errors }, handleSubmit, reset } = formProps;

	return (
		<Modal size="md" show={tableModal === 'reUpload'} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMUpload style={{ margin: '0 4px 0 0' }} />
					{' '}
					Re - Upload CSV
				</div>
			)}
			/>
			<Modal.Body>
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
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" onClick={onClose}>Close</Button>
				<Button themeType="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default ReUploadModal;
