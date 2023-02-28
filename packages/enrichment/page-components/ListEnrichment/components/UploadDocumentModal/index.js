import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import { getFieldController } from '../../../../common/Form/getFieldController';
import { uploadDocControls } from '../../../../configurations/get-upload-controls';
import useUpdateStatus from '../../hooks/useUpdateStatus';

import styles from './styles.module.css';

function UploadDocumentModal(props) {
	const {
		selectedItem,
		setSelectedItem,
		refetch,
	} = props;

	const formProps = useForm();

	const { control, handleSubmit } = formProps;

	const [uploadProof, setUploadProof] = useState();

	const { loading, handleManualUpload } = useUpdateStatus({
		uploadProof,
		setSelectedItem,
		selectedItem,
		refetch,
	});

	return (

		<>
			<Modal.Header title="Upload POC Details" />

			<form onSubmit={handleSubmit(handleManualUpload)}>

				<Modal.Body>
					<div>
						{uploadDocControls.map((controlItem) => {
							const el = { ...controlItem };

							const Element = getFieldController(el.type);

							if (!Element) return null;
							return (

								<div style={el.style} className={styles.control_container}>

									<span style={{ marginBottom: '12px' }}>{el.label}</span>

									<Element
										{...el}
										size="md"
										key={el.name}
										control={control}
										id={`${el.name}_input`}
									/>

								</div>
							);
						})}
					</div>

					<div>
						<FileUploader
							value={uploadProof}
							onChange={setUploadProof}
							showProgress
							draggable
							multipleUploadDesc="Upload Document"
							uploadIcon={<IcMUpload height={40} width={40} />}
							accept=".csv"
						/>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						style={{ marginRight: 10 }}
						themeType="secondary"
						type="button"
						onClick={() => {
							setSelectedItem(null);
							setUploadProof(null);
						}}
					>
						Cancel
					</Button>
					<Button
						size="md"
						type="submit"
						loading={loading}
					>
						Upload
					</Button>
				</Modal.Footer>

			</form>

		</>
	);
}

export default UploadDocumentModal;
