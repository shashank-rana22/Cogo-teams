import { Worker, Viewer } from '@react-pdf-viewer/core';
import React from 'react';
import { pdfjs } from 'react-pdf';

function PDFPreview({ base64String }) {
	return (
		<Worker
			workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
		>
			<Viewer fileUrl={`data:application/pdf;base64,${base64String}`} />
		</Worker>
	);
}

export default PDFPreview;
