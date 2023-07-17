import { Button, Placeholder, cl } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import LevelForm from './LevelForm';
import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function ColumnCard({ config = {}, item = {}, incidentLoading = false }) {
	const [show, setShow] = useState(null);
	const { fields = [] } = config;

	const ref = useRef();

	const onShow = () => {
		setShow(true);
	};

	const getData = (data) => {
		console.log(data, 'data');
	};

	const update = () => {
		ref.current.handleSubmit(getData)();
	};

	const getLevel = () => {
		if (!isEmpty(item?.level3)) {
			return '3';
		} if (!isEmpty(item?.level2)) {
			return '2';
		}
		return '1';
	};

	const formData = {
		id              : item?.id || '_',
		incidentType    : startCase(item?.incidentType || '-'),
		incidentSubType : startCase(item?.incidentSubType || '_'),
		entityCode      : item?.entityCode || '-',
		levels          : getLevel(),
		users           : `${item?.level3?.stakeholder?.userName}, 
		${item?.level2?.stakeholder?.userName}, ${item?.level1?.stakeholder?.userName}` || '_',
		edit: (
			<div className={styles.flex}>
				{!show ? <IcMEdit className={styles.edit} height={25} width={25} onClick={onShow} /> : (
					<>
						<Button
							onClick={() => setShow(false)}
							className={styles.cancel}
							themeType="secondary"
						>
							Cancel
						</Button>
						<Button onClick={update}>Confirm</Button>
					</>
				)}
			</div>
		),
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
						{incidentLoading}
						?
						<Placeholder />
						{formData[field.key]}
					</div>
				))}
			</div>
			{show ? <LevelForm ref={ref} /> : null}
		</div>
	);
}

export default ColumnCard;
