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
						{(files || []).map((file) => {
							const file_url = (file?.finalUrl ? file?.finalUrl : file);

							return (
								<div style={{ display: 'flex' }}>
									<div className={styles.document} key={file_url}>
										<object
											data={file_url}
											width="100%"
											height="100%"
											style={{ border: '1px solid #bdbdbd' }}
										>
											<a href={file_url}>Document</a>
										</object>
										<FullView url={file_url} />
									</div>
								</div>
							);
						})}
					</div>

				</div>
			)}
		</div>
	);
}

export default PreviewFiles;
