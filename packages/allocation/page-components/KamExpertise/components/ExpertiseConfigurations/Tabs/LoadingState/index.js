import { Collapse, Placeholder } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function LoadingState({ columnsToLoad }) {
	const options = [1, 2, 3].map((item) => ({
		title:
		(
			<div key={item}>

				<Placeholder width="100px" height="20px" margin="0px 0px 8px 0px" />

				<div className={styles.sub_container}>

					{[...Array(columnsToLoad)].map((e) => (
						<div key={e} style={{ flexBasis: '24%' }}>

							<Placeholder width="200px" height="18px" margin="0px 0px 8px 0px" />

							<Placeholder width="50px" height="20px" />

						</div>
					))}
				</div>
			</div>
		),
	}));

	const [value, onChange] = useState('');

	return (
		<div className={styles.cards_collapse_container}>
			<Collapse
				panels={options}
				activeKey={value}
				setActive={onChange}
				type="text"
			/>
		</div>

	);
}

export default LoadingState;
