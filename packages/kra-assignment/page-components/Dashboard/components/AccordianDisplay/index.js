import { Accordion } from '@cogoport/components';
import React, { useState } from 'react';

import TableDisplay from '../TablesDisplay';

import styles from './styles.module.css';

function AccordianDisplay({ data, loading }) {
	const ARRAY_OF_IDS = data?.list?.map((obj) => obj.id);
	const [selectArrayAccordian, setSelectArrayAccordian] = useState([]);

	// console.log('selectArrayAccordian', selectArrayAccordian);

	return (
		<div className={styles.container}>
			<Accordion title="KRA NAME">
				<TableDisplay
					data={data?.list}
					loading={loading}
					ARRAY_OF_IDS={ARRAY_OF_IDS}
					selectArray={selectArrayAccordian}
					setSelectArray={setSelectArrayAccordian}
				/>
			</Accordion>
		</div>
	);
}

export default AccordianDisplay;
