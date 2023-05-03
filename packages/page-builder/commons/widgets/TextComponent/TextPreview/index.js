import { IcMText } from '@cogoport/icons-react';

import styles from './styles.module.css';

function TextPreview() {
	return (
		<div
			role="presentation"
			className={styles.text_drop}
		>
			<div className={styles.backdrop}>
				<IcMText width="34px" height="26px" fill="#ffffff" />
			</div>
			<div>Text</div>
		</div>
	);
}

export default TextPreview;
