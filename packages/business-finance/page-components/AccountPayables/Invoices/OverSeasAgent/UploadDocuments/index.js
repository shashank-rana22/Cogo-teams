import { Button, Placeholder } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React, { useState, useEffect } from 'react';

import useUploadDocuments from '../../hooks/useUploadDocument';

import styles from './styles.module.css';

function UploadDocuments({ setActive = () => {} }) {
	const [fileUploader, setFileUploader] = useState({
		singleFileUpload : null,
		fileBank         : null,
		multiFileUpload  : null,
	});

	const { upload, listData, listLoading, deleteTaggedDocuments } = useUploadDocuments({ fileUploader });

	const { documents = '' } = listData || {};

	const {
		otherDocumentsUrl = '',
		bankFormUrl = '',
		taxDeclarationFormUrl = '',
	} = documents || {};

	const otherDocumentsUrlList = otherDocumentsUrl?.split(',');

	const handlefileUpload = async (value, key) => {
		if (key === 'singleFileUpload') {
			if (value == null && taxDeclarationFormUrl !== '') {
				deleteTaggedDocuments('taxDeclarationFormUrl');
			}
		}

		if (key === 'fileBank') {
			if (value == null && bankFormUrl !== '') {
				deleteTaggedDocuments('bankFormUrl');
			}
		}

		if (key === 'multiFileUpload') {
			if (
				value?.length < otherDocumentsUrlList?.length
            && otherDocumentsUrl !== ''
			) {
				const myArray = fileUploader.multiFileUpload.filter(
					(item) => !value.includes(item),
				);
				const DOC_KEY = 'otherDocumentsUrl';
				deleteTaggedDocuments(DOC_KEY, myArray);
			}
		}
		setFileUploader((prev) => ({ ...prev, [key]: value }));
	};

	useEffect(() => {
		setFileUploader({
			singleFileUpload : documents?.taxDeclarationFormUrl,
			fileBank         : documents?.bankFormUrl,
			multiFileUpload  : documents?.otherDocumentsUrl?.split(','),
		});
	}, [documents]);

	return (
		<div className={styles.container}>
			{listLoading ? (
				<div className={styles.forms}>
					<Placeholder width="49.5%" height="135px" margin="10px 0px" />
					<Placeholder width="49.5%" height="135px" margin="10px 0px" />
					<Placeholder width="49.5%" height="135px" margin="10px 0px" />
				</div>
			) : (
				<div className={styles.forms}>
					<div className={styles.box}>
						<div className={styles.header}>
							Upload 15CA Form*
							<div className={styles.dash} />
						</div>

						<FileUploader
							value={fileUploader.singleFileUpload}
							onChange={(value) => handlefileUpload(value, 'singleFileUpload')}
							showProgress
							draggable
						/>
					</div>

					<div className={styles.box}>
						<div className={styles.header}>
							Upload Bank Remittance Form*
							<div className={styles.dash} />
						</div>

						<FileUploader
							value={fileUploader.fileBank}
							onChange={(value) => handlefileUpload(value, 'fileBank')}
							showProgress
							draggable
						/>
					</div>

					<div className={styles.box}>
						<div className={styles.header}>
							Upload Other Documents
							<span className={styles.msg}>(if multiple documents, upload all at Once..)</span>
							<div className={styles.dash} />
						</div>

						<FileUploader
							multiple
							value={fileUploader.multiFileUpload}
							onChange={(value) => handlefileUpload(value, 'multiFileUpload')}
							showProgress
							draggable
						/>
					</div>
				</div>
			)}

			<div className={styles.btn_container}>
				<div className={styles.btn}>
					<Button
						size="md"
						onClick={() => {
							upload(setActive);
						}}
						disabled={!fileUploader.singleFileUpload || !fileUploader.fileBank}
					>
						Save & Proceed
					</Button>
				</div>
			</div>
		</div>
	);
}

export default UploadDocuments;
