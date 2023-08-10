import { ButtonIcon, cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { fieldColumns } from './fieldColumns';
import styles from './styles.module.css';
import TruckDetailForm from './TruckDetailForm';

function Card(props) {
	const {
		singleServiceProvider = {},
		setFinalGetHookData = () => {},
	} = props;
	const [show, setShow] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [isEditTime, setIsEditTime] = useState(false);

	const fields = fieldColumns({
		isEdit,
		setIsEdit,
		isEditTime,
		setIsEditTime,
		setFinalGetHookData,
		singleServiceProvider,
	});

	const dynamicFractions = fields.reduce((acc, field) => `${acc} ${field.span}fr`, '');

	return (
		<div className={styles.card_container}>
			<div className={cl`${styles.row} ${styles.card_header}`} style={{ gridTemplateColumns: dynamicFractions }}>
				{fields.map((field) => (
					<div key={`${field.key}_header`}>
						{field.label}
					</div>
				))}
			</div>
			<div className={cl`${styles.row} ${styles.card_body}`} style={{ gridTemplateColumns: dynamicFractions }}>
				{fields.map((field) => (
					<div key={`${field.key}_value`}>
						{field.render(singleServiceProvider) || ''}
					</div>
				))}
			</div>
			{show ? <TruckDetailForm {...props} show={show} /> : null}
			<div className={styles.footer}>
				{/* <Button className={styles.card_bottom} onClick={() => setShow(!show)}>
					{!show ? <IcMArrowRotateDown color="#000" /> : <IcMArrowRotateUp color="#000" />}
				</Button> */}
				<ButtonIcon
					className={styles.card_bottom}
					icon={!show ? <IcMArrowRotateDown color="#000" /> : <IcMArrowRotateUp color="#000" />}
					onClick={() => setShow((prev) => !prev)}
				/>
			</div>

		</div>
	);
}

export default Card;
