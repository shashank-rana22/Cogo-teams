import { Placeholder } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import TableDisplay from '../TablesDisplay';

import styles from './styles.module.css';

const TABLE_USED_FOR = 'AccordianData';
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

	const active = JSON.stringify(selectAccordian);
	const current = JSON.stringify(kra_details);

	const [isActive, setIsActive] = useState(false);

	const Clicked = () => {
		setSelectArrayAccordian();
		setSelectAccordian(kra_details);
		setIsActive(!isActive);
	};

	if (loading) {
		return (
			<>
				<Placeholder height="30px" width="100%" margin="5px" />
				<Placeholder height="30px" width="100%" margin="5px" />
			</>

		);
	}

	if (isEmpty(data) && !loading) {
		return (
			<div style={{ paddingTop: 6, paddingLeft: 6 }}>
				<EmptyState emptyText={EMPTY_TEXT} />
			</div>
		);
	}

	return (
		<div
			className={styles.container}
		>
			<div
				className={styles.accordian_heading}
				onClick={() => Clicked()}
				role="button"
				tabIndex={0}
			>
				<div>{`Group ${index + INDEX_VALUE}`}</div>
				<div>{isActive && (active === current) ? <IcMArrowUp /> : <IcMArrowDown /> }</div>
			</div>
			{isActive && (active === current) && (
				<div className={styles.accordian_container}>
					<TableDisplay
						data={employee_details}
						loading={loading}
						ARRAY_OF_IDS={ARRAY_OF_EMPLOYEE_IDS}
						selectArray={selectArrayAccordian}
						setSelectArray={setSelectArrayAccordian}
						type={TABLE_USED_FOR}
					/>
				</div>
			)}
		</div>
	);
}

export default AccordianDisplay;
