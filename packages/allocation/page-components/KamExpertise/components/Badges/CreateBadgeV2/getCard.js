import { Input, FileSelect } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function GetCard(props) {
	const { medalType, inputPlaceHolder, isLastItem } = props;
	return (
		<div className={`${styles.card_container} ${isLastItem ? styles.last_item : ''}`}>
			<div className={styles.display_flex}>
				<div>
					<p style={{ color: '#4f4f4f', marginBottom: 15 }}>Medal</p>
					<p>{medalType}</p>
				</div>
				<div className={styles.verticalLine} />
				<div>
					<p style={{ color: '#4f4f4f' }}>Score</p>
					<Input size="sm" placeholder={inputPlaceHolder} />
				</div>
			</div>
			<div className={styles.lower_subheader2}>
				{`${medalType} Medal`}
				<IcMInfo className={styles.icm_info} />
			</div>
			<div className={styles.file_upload_div}>
				<FileSelect />
			</div>
		</div>
	);
}
export default GetCard;
