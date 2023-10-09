import { Placeholder, cl } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty, startCase, camelCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CreateLevelModal from '../../../common/CreateForm';

import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function ColumnCard({ config = {}, item = {}, incidentLoading = false, refetch = () => { } }) {
	const [show, setShow] = useState(false);
	const { fields = [] } = config;

	const onShow = () => {
		setShow(true);
	};

	const getLevel = () => {
		if (!isEmpty(item?.level3)) {
			return '3';
		} if (!isEmpty(item?.level2)) {
			return '2';
		}
		return '1';
	};

	const getUsers = () => {
		if (!isEmpty(item?.level3)) {
			return `${item?.level3?.stakeholder?.userName}, 
			${item?.level2?.stakeholder?.userName}, ${item?.level1?.stakeholder?.userName}`;
		} if (!isEmpty(item?.level2)) {
			return `${item?.level2?.stakeholder?.userName}, ${item?.level1?.stakeholder?.userName}`;
		}
		return `${item?.level1?.stakeholder?.userName}`;
	};

	const formData = {
		referenceId     : item?.id || '_',
		incidentType    : startCase(camelCase(item?.incidentType || '-')),
		incidentSubType : startCase(camelCase(item?.incidentSubType || '_')),
		entityCode      : item?.entityCode || '-',
		levels          : getLevel(),
		users           : getUsers(),
		edit            : (
			<div className={styles.flex}>
				{!show ? <IcMEdit className={styles.edit} height={25} width={25} onClick={onShow} /> : (
					<CreateLevelModal refetch={refetch} editData={item} onCancelEdit={() => setShow(false)} />
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
						{incidentLoading
							? <Placeholder />
							: formData[field.key]}
					</div>
				))}
			</div>
		</div>
	);
}

export default ColumnCard;
