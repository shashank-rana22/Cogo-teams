import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader({ forModal }) {
	return (
		<div className={styles.container}>
			<div className={styles.comments_wrap}>

				<Placeholder
					width={forModal ? '109px' : '291px'}
					height={forModal ? '73px' : '90px'}
				/>

				<Placeholder
					width={forModal ? '109px' : '291px'}
					height={forModal ? '73px' : '90px'}
				/>

				{forModal ? (

					<Placeholder width="109px" height="73px" />

				) : null}
			</div>
		</div>
	);
}

export default Loader;
