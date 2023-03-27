import { Button } from '@cogoport/components';
import React from 'react';

// import openDocument from '../../../../../../commons/OpenDocument';

import styles from './styles.module.css';

const truncateString = (str, num) => {
	if (str.length > num) {
		return `${str.substring(0, num)}/.../${str.substring(str.length - num)}`;
	}
	return str;
};

function PreviewFiles({ files = [] }) {
	return (
		<div>
			{(files || []).length > 0 && (
				<div className={styles.files_container}>
					<div className={styles.heading}>RELATED ATTACHMENTS</div>

					<div className={styles.files}>
						{files.map((file) => (
							<Button
								key={file}
								size="md"
								themeType="linkUi"
								// onClick={() => openDocument(file)}
							>
								{truncateString(file, 30)}

							</Button>

						))}
					</div>

				</div>
			)}
		</div>
	);
}

export default PreviewFiles;
