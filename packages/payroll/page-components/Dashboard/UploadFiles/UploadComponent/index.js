import { InputController } from '@cogoport/forms';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import styles from './styles.module.css';

const DROPZONESTYLES = {
	border       : '2px dashed #cccccc',
	borderRadius : '4px',
	padding      : '20px',
	textAlign    : 'center',
	cursor       : 'pointer',
};
function FileUploader({ control = {}, name = '', setFileArray = () => {}, filearray = {} }) {
	const onDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];

		const reader = new FileReader();

		reader.onload = (e) => {
			const binaryString = e.target.result;
			const workbook = XLSX.read(binaryString, { type: 'binary' });
			console.log('first', workbook);
			const firstSheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[firstSheetName];
			const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

			// Convert data to base64
			const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
			setFileArray((prev) => ({ ...prev, [name]: base64 }));
		};

		reader.readAsBinaryString(file);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div className={styles.upload_container}>
			<div {...getRootProps()} style={DROPZONESTYLES} className={styles.uploader}>
				<InputController control={control} name={name} {...getInputProps()} />
				{isDragActive ? (
					<p>Drop the files here ...</p>
				) : (
					<p>upload XLSX file here</p>
				)}
			</div>
			{filearray?.[name] && (
				<span>
					{name}
					{' '}
					-- done
					{' '}
				</span>
			)}
		</div>
	);
}

export default FileUploader;
