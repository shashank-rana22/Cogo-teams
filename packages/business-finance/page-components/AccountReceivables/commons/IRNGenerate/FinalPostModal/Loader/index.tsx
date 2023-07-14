import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const List = [
	{ id: 1 },
	{ id: 2 },
];

function Loader() {
	return (
		<>
			{
		List.map((item) => {
			const { id } = item;
			return (
				<div className={styles.style_placeholder} key={id}>
					<Placeholder height="40px" />
				</div>
			);
		})
	}
		</>
	);
}
export default Loader;
