import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Heading({ backView = false, setView = () => {}, heading = '' }) {
	return (
		<div className={styles.heading_container}>
			{backView && (
				<IcMArrowBack
					onClick={() => setView(backView)}
				/>
			)}
			<h1 className={styles.heading}>{heading}</h1>
		</div>
	);
}

export default Heading;
