import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import usePostIngestionData from '../../../../../hooks/usePostIngestionData';
import { getElementController } from '../../../../../utils/get-element-controls';
import uploadControls from '../../../../../utils/upload-controls';

import styles from './styles.module.css';

function UploadModal({
	setShow = () => {}, show = '', setUploadData = () => {}, uploadData, formProps,
	onSubmit = () => {}, loading,
}) {
	// const [fileValue, setFileValue] = useState();
	// const [multiFileValue, setMultiFileValue] = useState([]);
	// const [loading, setLoading] = useState(false);

	
	const { control, formState: { errors }, handleSubmit, reset } = formProps;

	console.log('form::::::', formProps.getValues());

	const onChoose = (event) => {
		// setUploadData({
		// 	...uploadData,
		// 	description : event?.description,
		// 	file_name   : event?.name,
		// 	file_url    : event?.upload,
		// });

		onSubmit(event, uploadData);
		console.log('ingestion data finalModal:', uploadData);
		// setShow('');
	};

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
		<Modal size="md" show={show === 'uploadModal'} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMUpload style={{ margin: '0 4px 0 0' }} />
					{' '}
					Upload CSV
				</div>
			)}
			/>
			<Modal.Body>
				<div style={{ margin: '0 0 12px 0' }}>
					{FINAL_HEADING[uploadData?.ingestion_type]}
				</div>

				{/* <div style={{ display: 'block', alignItems: 'center', marginBottom: '16px' }}>
					<FileSelect
						multiple
						value={multiFileValue}
						loading={loading}
						onChange={setMultiFileValue}
						accept=".png,.svg,.jpg"
					/>
				</div> */}
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

			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="secondary"
					style={{ marginRight: '8px' }}
					onClick={() => {
						setShow('orgDetails');
						// reset();
					}}

				>
					Back

				</Button>
				<Button loading={loading} onClick={handleSubmit(onChoose)}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UploadModal;
