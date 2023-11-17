import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import styles from './styles.module.css';
import FileUploader from './UploadComponent';

const FILESLABEL = [
	{ name: 'file A' },
	{ name: 'file B' },
	{ name: 'file C' },
	{ name: 'file D' },
	{ name: 'file E' },
	{ name: 'file F' },
	{ name: 'file G' },
	{ name: 'file H' },
];
function UploadFiles() {
	const { control, handleSubmit } = useForm();
	const [filearray, setFileArray] = useState({});

	const onSubmit = () => {
		console.log('filearray', filearray);
	};
	return (
		<div className={styles.main_container}>
			<div className={styles.grey_container}>

				{FILESLABEL.map((item) => (
					<div key={item.name} className={styles.upload_div}>
						<span className={styles.name}>
							{item.name}
							{' '}
							:
						</span>
						<FileUploader
							control={control}
							filearray={filearray}
							setFileArray={setFileArray}
							name={item.name}
						/>
					</div>
				))}
				<div className={styles.btns_div}>
					<Button
						size="md"
						themeType="primary"
						className={styles.btn}
						onClick={handleSubmit(onSubmit)}
					>
						Primary

					</Button>
				</div>

			</div>

		</div>
	);
}

export default UploadFiles;
