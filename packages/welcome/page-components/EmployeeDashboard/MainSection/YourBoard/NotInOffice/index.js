import { Popover, cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import makeShortName from '../../../../../common/MakeShortName';

import styles from './styles.module.css';

function NotInOffice({ data = {} }) {
	const { absentee_list } = data || {};

	const [maxVisible, setMaxVisible] = useState(5);

	useEffect(() => {
		// Function to update the isMobile state based on viewport width
		function handleResize() {
			const isLess = window.innerWidth < 767;
			setMaxVisible(isLess ? 4 : 5);
		}

		handleResize();

		// Add a resize event listener
		window.addEventListener('resize', handleResize);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const visibleAbsentees = (absentee_list || []).slice(0, maxVisible);
	const remainingAbsentees = (absentee_list || []).slice(maxVisible);

	function AbsentList() {
		return (
			<div className={styles.absent_list}>
				{(remainingAbsentees || []).map((name) => (
					<div
						key={name}
						className={styles.list}
					>
						{name[GLOBAL_CONSTANTS.zeroth_index]}
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
						{
							item[1]
								? <img className={styles.user_avatar_photo} src={item[1]} alt="profile" />
								:							(
									<div className={cl`${styles.user_avatar_photo} ${styles.user_avatar}`}>
										{makeShortName(item[0])}
									</div>
								)
						}
						<Tooltip content={item[0]} placement="top">
							<div className={styles.ellipse}>{item[0]}</div>
						</Tooltip>
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
				your team
				{' '}
				are not present today
			</div>
		</div>
	);
}

export default NotInOffice;
