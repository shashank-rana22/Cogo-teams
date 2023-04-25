import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import usePostReUpload from '../../../../../hooks/usePostReUpload';
import { getElementController } from '../../../../../utils/get-element-controls';
import reUploadControls from '../../../../../utils/re-upload-controls';

import styles from './styles.module.css';

function ReUploadModal({ tableModal = '', setTableModal = () => {}, row = {}, refetch = () => {} }) {
	const {
		formProps = {},
		onSubmit = () => {},
		loading = false,
		onClose = () => {},
	} =	 usePostReUpload({ row, setTableModal, refetch });

	const { control, formState: { errors }, handleSubmit } = formProps;

	return (
		<Modal
			className={styles.re_upload}
			key={tableModal}
			size="md"
			show={tableModal === 're_upload'}
			onClose={onClose}
			placement="center"
			scroll={false}
		>
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMUpload style={{ margin: '0 4px 0 0' }} />
					Re - Upload CSV
				</div>
			)}
			/>
			<Modal.Body>
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
									className={styles.field_controller}
								/>

								<div className={styles.error_message}>
									{errors?.[el.name]?.message}
								</div>
							</div>
						);
					})}
				</div>

			</Modal.Body>
			<Modal.Footer>
				<Button style={{ margin: '0 8px 0 0' }} themeType="secondary" onClick={onClose}>Close</Button>

				<Button loading={loading} themeType="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default ReUploadModal;
