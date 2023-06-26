import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import TableDisplay from '../TablesDisplay';

import styles from './styles.module.css';

const TABLE_USED_FOR = 'AccordianData';
const INDEX_VALUE = 1;

function AccordianDisplay({
	data = [],
	index,
	loading,
	selectAccordian,
	setSelectAccordian,
	setSelectAccordianObject,
	selectAccordianObject = {},
	resetObjects,
	dataFrom,
	setDataFrom,
}) {
	const { employee_details, kra_details } = data;

	const OBJECT_OF_EMPLOYEE_IDS = employee_details?.reduce((acc, obj) => {
		acc[obj.id] = true;
		return acc;
	}, {});

	const active = JSON.stringify(selectAccordian);
	const current = JSON.stringify(kra_details);

	const [isActive, setIsActive] = useState(false);

	const Clicked = () => {
		setSelectAccordianObject();
		setSelectAccordian(kra_details);
		setIsActive(!isActive);
		resetObjects();
	};

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
						OBJECT_OF_IDS={OBJECT_OF_EMPLOYEE_IDS}
						selectObject={selectAccordianObject}
						setSelectObject={setSelectAccordianObject}
						type={TABLE_USED_FOR}
						resetObjects={resetObjects}
						setDataFrom={setDataFrom}
						dataFrom={dataFrom}
					/>
				</div>
			)}
		</div>
	);
}

export default AccordianDisplay;
