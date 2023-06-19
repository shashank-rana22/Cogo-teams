import { Accordion } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import TableDisplay from '../TablesDisplay';

import styles from './styles.module.css';

const TABLE_USED_FOR = 'AccordianData';
const EMPTY_TEXT = 'No Data to Show';

function AccordianDisplay({ data = [], loading }) {
	const { kra_name, employee_list } = data;
	const ARRAY_OF_EMPLOYEE_IDS = employee_list?.map((obj) => obj.id);
	const [selectArrayAccordian, setSelectArrayAccordian] = useState([]);

	// console.log('selectArrayAccordian', data);
	if (isEmpty(data) && !loading) {
		return (
			<div style={{ paddingTop: 6, paddingLeft: 6 }}>
				<EmptyState emptyText={EMPTY_TEXT} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Accordion title={kra_name}>
				<TableDisplay
					data={data?.employee_list}
					loading={loading}
					ARRAY_OF_IDS={ARRAY_OF_EMPLOYEE_IDS}
					selectArray={selectArrayAccordian}
					setSelectArray={setSelectArrayAccordian}
					type={TABLE_USED_FOR}
				/>
			</Accordion>
		</div>
	);
}

export default AccordianDisplay;
