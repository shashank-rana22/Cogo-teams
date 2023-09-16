import { Placeholder, Tooltip } from '@cogoport/components';
import { IcMFileUploader } from '@cogoport/icons-react';

import statusTagMapping from './statusTagMapping';
import styles from './styles.module.css';

function FileDetails({ data = {}, loading = false }) {
	const fileDataStatus = data.status?.toLowerCase();

	return (
		<div className={styles.container}>
			<div className={styles.icon_container}>
				<IcMFileUploader height="50px" width="50px" />
			</div>

			<div className={styles.info_container}>
				<div className={styles.title_container}>
					<div className={styles.subtitle}>Cogo File Name</div>
					{loading ? (
						<Placeholder width="230px" height="16px" />
					) : (
						<Tooltip placement="bottom" content={data?.formatted_file_name}>
							<div className={styles.title}>{data?.formatted_file_name}</div>
						</Tooltip>
					)}
				</div>

				<div className={styles.title_container}>
					<div className={styles.subtitle}>Status</div>
					{loading ? (
						<Placeholder width="230px" height="16px" />
					) : (
						<div className={styles.details}>
							{fileDataStatus ? statusTagMapping[fileDataStatus] : null}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default FileDetails;
