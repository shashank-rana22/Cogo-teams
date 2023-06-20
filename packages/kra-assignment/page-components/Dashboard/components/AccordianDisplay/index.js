import { Accordion } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyState';
import TableDisplay from '../TablesDisplay';

import styles from './styles.module.css';

const TABLE_USED_FOR = 'AccordianData';
const EMPTY_TEXT = 'No Data to Show';

function AccordianDisplay({
	data = [],
	loading,
	selectAccordian,
	setSelectAccordian,
	setSelectArrayAccordian,
	selectArrayAccordian,
}) {
	const { kra_name, employee_list } = data;
	const ARRAY_OF_EMPLOYEE_IDS = employee_list?.map((obj) => obj.id);

	if (isEmpty(data) && !loading) {
		return (
			<div style={{ paddingTop: 6, paddingLeft: 6 }}>
				<EmptyState emptyText={EMPTY_TEXT} />
			</div>
		);
	}

	const Clicked = () => {
		if (selectAccordian) { setSelectAccordian(); } else { setSelectAccordian(data.kra_details); }
		setSelectArrayAccordian();
	};

	return (
		<div
			className={styles.container}
			onClick={() => Clicked()}
			role="button"
			tabIndex={0}
		>
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
