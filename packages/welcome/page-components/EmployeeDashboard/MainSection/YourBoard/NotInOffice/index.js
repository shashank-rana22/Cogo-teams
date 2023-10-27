import { Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const ZERO = 0;
function NotInOffice({ data = {} }) {
	const { absentee_list, department } = data || {};
	console.log('🚀 ~ file: index.js:9 ~ NotInOffice ~ absentee_list:', absentee_list);
	const MAX_VISIBLE = 5; // Maximum number of absentees to display directly

	const visibleAbsentees = (absentee_list || []).slice(0, MAX_VISIBLE);
	const remainingAbsentees = (absentee_list || []).slice(MAX_VISIBLE);

	function AbsentList() {
		return (
			<div className={styles.absent_list}>
				{(absentee_list || []).map((name) => (
					<div
						key={name}
						className={styles.list}
					>
						{name[ZERO]}
					</div>
				))}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Not in office today</div>
			<div className={styles.user_data}>
				{visibleAbsentees.map((item) => (
					<div className={styles.user_detail} key={item}>
						<div className={styles.user_avatar}>RD</div>
						<span className={styles.ellipse}>{item}</span>
					</div>
				))}
				<Popover placement="bottom" trigger="mouseenter" render={<AbsentList />}>
					{!isEmpty(remainingAbsentees) && (
						<div className={styles.more}>
							<span>+</span>
							<span>{(remainingAbsentees)?.length}</span>
						</div>
					)}
				</Popover>
			</div>
			<div className={styles.absent_deps}>
				{absentee_list?.length}
				{' '}
				employees from
				{' '}
				{department}
				{' '}
				are not present today
			</div>
		</div>
	);
}

export default NotInOffice;
