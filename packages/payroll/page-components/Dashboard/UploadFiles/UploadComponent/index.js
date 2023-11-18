import { Button } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMDownload } from '@cogoport/icons-react';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

// import DownloadPDF from '../Base64topdf';
import useBulkUploadPayloadData from '../../../../hooks/useBulkUploadPayrollData';
// import useUploadPayrollData from '../../../../hooks/useUploadPayrollData';
import { STRING111 } from '../string';

import styles from './styles.module.css';

const DROPZONESTYLES = {
	border       : '2px dashed #cccccc',
	borderRadius : '4px',
	padding      : '20px',
	textAlign    : 'center',
	cursor       : 'pointer',
};
function FileUploader({ control = {}, name = '', setFileArray = () => {}, filearray = {} }) {
	// const { updatePayrollData } = useUploadPayrollData();
	const { uploadBulkPayrollData } = useBulkUploadPayloadData();
	const [isError, setIsError] = useState(null);
	const onDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];

		const reader = new FileReader();

		reader.onload = (e) => {
			const binaryString = e.target.result;
			const workbook = XLSX.read(binaryString, { type: 'binary' });
			const firstSheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[firstSheetName];
			const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

			// Convert data to base64
			const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
			const res = uploadBulkPayrollData({
				payload: base64,
			});
			setIsError(res);
			setFileArray((prev) => ({ ...prev, [name]: base64 }));
		};

		reader.readAsBinaryString(file);
	};

	const downloadPDF = (base64String, fileName) => {
		const file = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64String}`;

		saveAs(file, fileName);
	};
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
		},
	});

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
			{filearray?.[name] && isError && (
				<span>
					{name}
					{' '}
					upload done
					{' '}
				</span>
			)}
			{
				isError && (
					<Button size="md" themeType="secondary" onClick={() => downloadPDF(STRING111, 'BASE64FILE')}>
						<div className={styles.button_container}>
							<IcMDownload width={14} height={14} />
							<span className={styles.error_button_text}>Get Error Report</span>
						</div>
					</Button>
				)
			}

		</div>
	);
}

export default FileUploader;
