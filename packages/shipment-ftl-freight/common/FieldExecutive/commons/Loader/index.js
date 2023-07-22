import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const MAX_WIDTH_PERCENT = 95;
const DEFAULT_ROW_SIZE = 3;
const DEFAULT_COLUMN_SIZE = 5;

const ROW_ARRAY = Array.from(Array(DEFAULT_ROW_SIZE).keys());
const SKELETON_ARRAY = Array.from(Array(DEFAULT_COLUMN_SIZE).keys());

function Loader({ rowArray = ROW_ARRAY, columnArray = SKELETON_ARRAY }) {
	return (
		<div className={styles.container}>
			{rowArray.map((item) => (
				<div key={`${item}`} className={styles.row_item} style={{ display: 'flex', margin: '10px' }}>
					{columnArray.map((singleItem) => (
						<Placeholder
							key={`${singleItem}`}
							style={{
								width       : `${MAX_WIDTH_PERCENT / columnArray.length}%`,
								height      : '50px',
								marginRight : '20px',
							}}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export default Loader;
