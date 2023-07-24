import { Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';

function ReUploadContent({
	setVisible = () => {},
	docItem = {},
	setInitFormattedData = {},
}) {
	const [file, setFile] = useState(null);

	const handleAdd = () => {
		const toKey = docItem.key;
		setInitFormattedData((prev) => ({
			...prev,
			[toKey]: [...(prev[toKey] || []), { id: uuid(), url: file }],
		}));
		setVisible(false);
	};

	return (
		<div>
			<FileUploader
				value={file}
				onChange={setFile}
				draggable
				uploadIcon={<IcMUpload height={40} width={40} />}
			/>
			<div className={styles.button_pop}>
				<Button
					themeType="secondary"
					size="sm"
					style={{ marginRight: '10px' }}
					onClick={() => setVisible(false)}
				>
					Cancel
				</Button>
				<Button
					themeType="accent"
					size="sm"
					onClick={handleAdd}
					disabled={isEmpty(file)}
				>
					Add
				</Button>
			</div>
		</div>
	);
}

export default ReUploadContent;
