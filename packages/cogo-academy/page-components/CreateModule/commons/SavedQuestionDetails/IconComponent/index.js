import { IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function IconComponent({ item, caseToShow }) {
	return (
		<IcMArrowRotateUp
			width={12}
			height={12}
			fill="#393f70"
			className={caseToShow === item?.id ? styles.arrow_up : styles.arrow_down}
		/>
	);
}

export default IconComponent;
