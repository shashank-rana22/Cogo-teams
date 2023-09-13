import { Button, Placeholder } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React, { useState, useEffect } from 'react';

import useDeleteTaggedDocuments from '../../hooks/useDeleteTaggedDocuments';
import useListTaggedInvoices from '../../hooks/useListTaggedInvoice';
import useUploadDocuments from '../../hooks/useUploadDocument';

import styles from './styles.module.css';

const THREE = 3;

function UploadDocuments({ setActive = () => {} }) {
	const [fileUploader, setFileUploader] = useState({
		singleFileUpload : null,
		fileBank         : null,
		multiFileUpload  : null,
	});

	const {
		onUpload = () => {},
		loading = false,
	} = useUploadDocuments({ fileUploader });

	const {
		generateInvoice = () => {}, data:listData = {},
		loadingList:listLoading = false,
	} = useListTaggedInvoices();

	const { deleteUploadTaggedDocuments = () => {} } = useDeleteTaggedDocuments({ generateInvoice });

	const { documents = {} } = listData || {};

	const {
		otherDocumentsUrl = '',
		bankFormUrl = '',
		taxDeclarationFormUrl = '',
	} = documents || {};

	const otherDocumentsUrlList = otherDocumentsUrl?.split(',');

	const handlefileUpload = async ({ value = '', key = '' }) => {
		if (key === 'singleFileUpload') {
			if (value == null && taxDeclarationFormUrl !== '') {
				deleteUploadTaggedDocuments({ key: 'taxDeclarationFormUrl' });
			}
		}

		if (key === 'fileBank') {
			if (value == null && bankFormUrl !== '') {
				deleteUploadTaggedDocuments({ key: 'bankFormUrl' });
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
				deleteUploadTaggedDocuments({ key: DOC_KEY, myArray });
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
					{[...Array(THREE)].keys((item) => (
						<Placeholder key={item} width="49.5%" height="135px" margin="10px 0px" />
					))}
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
							onChange={(value) => handlefileUpload({ value, key: 'singleFileUpload' })}
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
							onChange={(value) => handlefileUpload({ value, key: 'fileBank' })}
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
							onChange={(value) => handlefileUpload({ value, key: 'multiFileUpload' })}
							showProgress
							draggable
						/>
					</div>
				</div>
			)}

			<div className={styles.btn_container}>
				<Button
					size="md"
					onClick={() => {
						onUpload(setActive);
					}}
					className={styles.btn}
					disabled={!fileUploader.singleFileUpload || !fileUploader.fileBank}
					loading={loading}
				>
					Save & Proceed
				</Button>
			</div>
		</div>
	);
}

export default UploadDocuments;
