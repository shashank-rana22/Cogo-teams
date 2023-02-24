import { Input, FileSelect } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function GetCard(props) {
	const { medalType, inputPlaceHolder, isLastItem } = props;
	return (
		<div className={`${styles.card_container} ${isLastItem ? styles.last_item : ''}`}>
			<div className={styles.display_flex}>
				<div className={styles.medal_type}>
					<div className={styles.lower_subheader}>Medal</div>
					<div className={styles.lower_subheader_value}>{medalType}</div>
				</div>
				<div className={styles.score_div}>
					<div className={styles.lower_subheader}>Score</div>
					<Input size="sm" placeholder={inputPlaceHolder} />
				</div>
			</div>
			<div className={styles.lower_subheader2}>
				{`${medalType} Medal`}
&ensp;
				<IcMInfo className={styles.IcMInfo} />
			</div>
			<div className={styles.file_upload_div}>
				<FileSelect />
			</div>
		</div>
	);
}
export default GetCard;
