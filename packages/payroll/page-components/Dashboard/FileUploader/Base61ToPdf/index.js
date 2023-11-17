import { saveAs } from 'file-saver';
import React, { useState } from 'react';

import PDFPreview from './PrePreview';
import styles from './styles.module.css';

function DownloadPDF({ base64String = '', fileName = '' }) {
	const [preview, setPreview] = useState(false);

	const previewHandler = () => {
		setPreview(!preview);
	};

	const downloadPDF = () => {
		const byteCharacters = atob(base64String);
		const byteNumbers = new Array(byteCharacters.length);

		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		const blob = new Blob([byteArray], { type: 'application/pdf' });

		saveAs(blob, fileName);
	};

	return (
		<>
			<button onClick={downloadPDF}>
				Download PDF
			</button>
			<button onClick={previewHandler}>
				Preview
			</button>
			<div className={styles.preview}>
				{
                preview && <PDFPreview base64String={base64String} />
            }
			</div>

		</>

	);
}

export default DownloadPDF;
