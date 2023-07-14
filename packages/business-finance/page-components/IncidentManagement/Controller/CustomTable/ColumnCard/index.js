import { cl } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { LevelForm } from './LevelForm';
import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function ColumnCard({ config = {} }) {
	const [show, setShow] = useState(null);
	const { fields = [] } = config;

	const onShow = () => {
		setShow(true);
	};

	const DATA = {
		incidentType : 'OpenJob Request OpenJob Request OpenJob Request',
		entity       : '301',
		levels       : '04',
		users        : 'Zubinkhanna,Zubinkhanna,Zubinkhanna,Zubinkhanna',
		edit         : <IcMEdit className={styles.edit} height={25} width={25} onClick={onShow} />,
	};
	return (
		<div className={styles.marginbottom}>
			<div className={cl`${styles.flex} ${show ? styles.background : ''}`}>
				{fields.map((field) => (
					<div
						key={field.key}
						style={{
							'--span' : field.span || DEFAULT_SPAN,
							width    : `${((field.span || DEFAULT_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN))}px`,
						}}
						className={styles.col}
					>
						{DATA[field.key]}
					</div>
				))}
			</div>
			{show ? <LevelForm /> : null}
		</div>
	);
}

export default ColumnCard;
