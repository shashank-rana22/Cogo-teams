import { IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function IconComponent({ item, caseToShow }) {
	if (caseToShow === item?.id) {
		return (
			<IcMArrowRotateUp
				width={12}
				height={12}
				fill="#393f70"
				className={styles.arrow_up}
			/>
		);
	}

	return (
		<IcMArrowRotateUp
			width={12}
			height={12}
			fill="#393f70"
			className={styles.arrow_down}
		/>
	);
}

export default IconComponent;
