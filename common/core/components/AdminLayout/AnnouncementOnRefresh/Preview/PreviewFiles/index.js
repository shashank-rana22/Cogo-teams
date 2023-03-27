import React from 'react';

import FullView from '../FullView';

import styles from './styles.module.css';

function PreviewFiles({ files = [] }) {
	return (
		<div>
			{(files || []).length > 0 && (
				<div className={styles.files_container}>
					<div className={styles.heading}>RELATED ATTACHMENTS</div>

					<div className={styles.files}>
						{files.map((file) => (
							<div style={{ display: 'flex' }}>
								<div className={styles.document} key={file}>
									<object
										data={file}
										width="100%"
										height="100%"
										style={{ border: '1px solid #bdbdbd' }}
									>
										<a href={file}>Document</a>
									</object>
									<FullView url={file} />
								</div>
							</div>
						))}
					</div>

				</div>
			)}
		</div>
	);
}

export default PreviewFiles;
