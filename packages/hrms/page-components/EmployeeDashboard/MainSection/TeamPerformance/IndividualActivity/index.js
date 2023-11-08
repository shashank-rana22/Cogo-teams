import { Avatar, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import useGetIndividualUserActivity from '../../../../../hooks/useGetIndividualUserActivity';

import styles from './styles.module.css';

function IndividualActivity({ data = {} }) {
	const { employees_list } = data || {};
	const [selectedUser, setSelectedUser] = useState('');
	const { data:userData } = useGetIndividualUserActivity(selectedUser);

	useEffect(() => {
		setSelectedUser(employees_list?.[GLOBAL_CONSTANTS.zeroth_index]?.user_id);
	}, [employees_list]);

	function EmployeeList() {
		return (

			<div className={styles.absent_list}>
				{(employees_list || []).map((item) => (
					<div
						key={item.name}
						className={styles.list}
						aria-hidden
						onClick={() => setSelectedUser(item.user_id)}
					>
						{item.name}
					</div>
				))}
			</div>
		);
	}

	const activeUser = employees_list?.find(({ user_id }) => user_id === selectedUser);
	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				Individual Activity
			</div>
			<div className={styles.progress_flex}>
				<div className={styles.achieved_target}>
					<div className={styles.avatar}>
						{activeUser?.passport_size_photo_url ? (
							<div className={styles.profile_photo}>
								<img src={activeUser?.passport_size_photo_url} alt="Profile" />
							</div>
						) : <Avatar personName={activeUser?.name} />}
						{' '}
						{startCase(activeUser?.name)}

					</div>
				</div>
				{' '}
				<span className={styles.points}>
					<Popover placement="bottom" trigger="mouseenter" render={<EmployeeList />}>
						<span>
							<IcMArrowDown />
						</span>
					</Popover>
				</span>
			</div>
			{userData ? (
				<>
					<div className={styles.progress_flex_2}>
						{/* <div className={styles.badge}>
							<div className={styles.upper_text}>Badge</div>
							<div className={styles.lower_text}>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Star_1.svg"
									alt="star"
								/>
								<span style={{ marginLeft: '6px' }}>Believer</span>
							</div>
						</div> */}
						<div className={styles.badge}>
							<div className={styles.upper_text}>Claps Received</div>
							<div className={styles.lower_text}>
								👏
								<span style={{ marginLeft: '6px' }}>
									{userData.claps_received || 0}
									{' '}
									Claps
								</span>
							</div>
						</div>
					</div>
					<div className={styles.progress_flex_2}>
						<div className={styles.dot_2}>
							<div className={styles.upper_text}>
								<div className={styles.dot} />
								Total hours worked
							</div>
							<div className={styles.lower_text}>
								<span>{userData.total_hrs}</span>
							</div>
						</div>
						<div className={styles.dot_2}>
							<div className={styles.upper_text}>
								<div className={styles.dot_b} />
								Deviation
							</div>
							<div className={styles.lower_text}>
								<span>{userData.total_deviation}</span>
							</div>
						</div>
						<div className={styles.dot_2}>
							<div className={styles.upper_text}>
								<div className={styles.dot_g} />
								Absence
							</div>
							<div className={styles.lower_text}>
								<span>{userData.absence}</span>
							</div>
						</div>
					</div>
				</>
			)
				: null}
		</div>
	);
}

export default IndividualActivity;
