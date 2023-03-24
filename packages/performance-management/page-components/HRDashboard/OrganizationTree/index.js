import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';
import useGetOrganizationTree from './useGetOrganizatioonTree';
import UserCard from './UserCard';

function OrganizationTree({ setOpenOrganizationTree }) {
	const [users, setUsers] = useState({});
	const [userId, setUserId] = useState('');
	const [managerIds, setManagerIds] = useState([]);

	const { treeData = {}, loading = false } = useGetOrganizationTree({ userId, managerIds });

	useEffect(() => {
		if (treeData) {
			const { manager_data = [], reportees = [], user_data = {} } = treeData;

			const baseLevel = !userId ? manager_data : [];
			const userLevel = user_data;
			const reporteeLevel = !isEmpty(reportees) ? reportees : users.reporteeLevel;
			const selectedReportee = isEmpty(reportees) ? userLevel : {};
			const managerLevel = manager_data;

			setUsers({ baseLevel, userLevel, reporteeLevel, managerLevel, selectedReportee });
		}
	}, [treeData]);

	return (
		<div>
			<div className={styles.header}>
				<div
					role="button"
					tabIndex={0}
					onClick={() => setOpenOrganizationTree(false)}
					className={styles.redirect}
				>
					<IcMArrowBack width="20px" height="20px" />
				</div>

				<div className={styles.header_text}>
					Organization Tree
				</div>
			</div>
			<div className={styles.organization_tree}>

				{!userId ? (
					<div className={styles.base_level}>
						{(users.baseLevel || []).map((user) => (
							<UserCard
								user={user}
								clickable
								userId={userId}
								setUserId={setUserId}
								setManagerIds={setManagerIds}
								key={user.id}
							/>
						))}
					</div>
				)
					: 						(
						<>
							<div className={styles.manager_level}>
								{(users.managerLevel || []).map((user) => (
									<>
										<UserCard
											user={user}
											clickable
											userId={userId}
											setUserId={setUserId}
											setManagerIds={setManagerIds}
											key={user.id}
										/>
										<div className={styles.line} />
									</>
								))}
							</div>

							{isEmpty(users.selectedReportee)
						&& (
							<div className={styles.user_level}>
								<UserCard user={users.userLevel} enlarged />
							</div>
						)}

							<div className={styles.line} />

							<div className={styles.reportee_level}>
								{!isEmpty(users.selectedReportee) && (
									<div className={styles.user_level}>
										<UserCard user={users.selectedReportee} enlarged />
									</div>
								)}

								<div className={styles.all_reportees}>
									{(users.reporteeLevel || []).map((user) => (
										<UserCard
											user={user}
											clickable
											userId={userId}
											setManagerIds={setManagerIds}
											setUserId={setUserId}
											key={user.id}
										/>
									))}
								</div>

							</div>

						</>
					)}
			</div>

		</div>

	);
}

export default OrganizationTree;
