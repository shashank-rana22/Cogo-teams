import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import DownloadPDF from './Base61ToPdf';

const DROPZONESTYLES = {
	border       : '2px dashed #cccccc',
	borderRadius : '4px',
	padding      : '20px',
	textAlign    : 'center',
	cursor       : 'pointer',
};
function FileUploader() {
	const [base64Data, setBase64Data] = useState(null);

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
			setBase64Data(base64);
		};

		reader.readAsBinaryString(file);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div>
			<div {...getRootProps()} style={DROPZONESTYLES}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p>Drop the files here ...</p>
				) : (
					<p>Drag n drop an XLSX file here, or click to select one</p>
				)}
			</div>
			{base64Data && (
				<div>
					<h4>Data in Base64:</h4>
					<textarea value={base64Data} readOnly rows={10} cols={50} />
				</div>
			)}
			<DownloadPDF />
		</div>
	);
}

export default FileUploader;
