import { Accordion } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyState';
import TableDisplay from '../TablesDisplay';

import styles from './styles.module.css';

// const TABLE_USED_FOR = 'AccordianData';
const EMPTY_TEXT = 'No Data to Show';
const INDEX_VALUE = 1;

function AccordianDisplay({
	data = [],
	index,
	loading,
	selectAccordian,
	setSelectAccordian,
	setSelectArrayAccordian,
	selectArrayAccordian,
}) {
	const { employee_details, kra_details } = data;
	const ARRAY_OF_EMPLOYEE_IDS = employee_details?.map((obj) => obj.id);

	if (isEmpty(data) && !loading) {
		return (
			<div style={{ paddingTop: 6, paddingLeft: 6 }}>
				<EmptyState emptyText={EMPTY_TEXT} />
			</div>
		);
	}

	const Clicked = () => {
		setSelectArrayAccordian();
		setSelectAccordian(kra_details);
	};

	return (
		<div
			className={styles.container}
			onClick={() => Clicked()}
			role="button"
			tabIndex={0}
		>
			<Accordion title={`Group ${index + INDEX_VALUE}`} key={index}>
				<TableDisplay
					data={employee_details}
					loading={loading}
					ARRAY_OF_IDS={ARRAY_OF_EMPLOYEE_IDS}
					selectArray={selectArrayAccordian}
					setSelectArray={setSelectArrayAccordian}
				/>
			</Accordion>
		</div>
	);
}

export default AccordianDisplay;
