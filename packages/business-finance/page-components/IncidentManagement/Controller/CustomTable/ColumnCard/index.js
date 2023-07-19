import { Button, Placeholder, cl } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import useUpdateLevel from '../../../common/hooks/useUpdateLevel';

import LevelForm from './LevelForm';
import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

const DEFAULT_VALUE = 1;

function ColumnCard({ config = {}, item = {}, incidentLoading = false, refetch = () => { } }) {
	const [show, setShow] = useState(null);
	const { fields = [] } = config;
	const {
		id = '',
		referenceId = '',
		createdBy = {},
	} = item || {};
	const { update, createApi } = useUpdateLevel({ refetch, setShow, createdBy, referenceId, id });

	const { loading } = createApi;

	const ref = useRef();

	const onShow = () => {
		setShow(true);
	};

	const getData = (data) => {
		const { approvalLevelConditions = [] } = data || {};
		const formatLineItems = approvalLevelConditions.map((val, index) => ({
			...val,
			level: index + DEFAULT_VALUE,
		}));
		update(formatLineItems);
	};

	const onUpdate = () => {
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
		referenceId     : item?.referenceId || '_',
		incidentType    : startCase(item?.incidentType || '-'),
		incidentSubType : startCase(item?.incidentSubType || '_'),
		entityCode      : item?.entityCode || '-',
		levels          : getLevel(),
		users           : getUsers(),
		edit            : (
			<div className={styles.flex}>
				{!show ? <IcMEdit className={styles.edit} height={25} width={25} onClick={onShow} /> : (
					<>
						<Button
							onClick={() => setShow(false)}
							className={styles.cancel}
							themeType="secondary"
							disabled={loading}
						>
							Cancel
						</Button>
						<Button onClick={onUpdate} disabled={loading}>Confirm</Button>
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
						{incidentLoading
							? <Placeholder />
							: formData[field.key]}
					</div>
				))}
			</div>
			{show ? <LevelForm ref={ref} item={item} /> : null}
		</div>
	);
}

export default ColumnCard;
