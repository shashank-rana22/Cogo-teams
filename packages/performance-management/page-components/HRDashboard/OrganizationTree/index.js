import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';
import useGetOrganizationTree from './useGetOrganizatioonTree';
import UserCard from './UserCard';

const firstData = {
	baseLevel: [{
		id           : 1,
		name         : 'Shekhar Purnendu',
		designation  : 'CEO',
		employee_id  : 'COGO123',
		manager_id   : 1,
		manager_name : 'Shekhar Purnendu',
		image_url:
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF-ZtM3jmtMDfTPnP53l1MEFFITQIAenVyY1u5PT3o&s',
	},

	{
		id           : 2,
		name         : 'Amitabh Shankar',
		designation  : 'CEO',
		employee_id  : 'COGO124',
		manager_id   : 2,
		manager_name : 'Amitabh Shankar',
	}],
};

const clickData = [{
	id           : '1',
	name         : 'Shekhar Purnendu',
	designation  : 'CEO',
	employee_id  : 'COGO123',
	manager_id   : '1',
	manager_name : 'Shekhar Purnendu',
	image        : '',
},
{
	id           : '2',
	name         : 'Amitabh Shankar',
	designation  : 'CEO',
	employee_id  : 'COGO124',
	manager_id   : '2',
	manager_name : 'Amitabh Shankar',
},
{
	id           : '3',
	name         : 'Hrishikesh Kulkarni',
	designation  : 'CEO',
	employee_id  : 'COGO125',
	manager_id   : '1',
	manager_name : 'Shekhar Purnendu',
},
{
	id           : '4',
	name         : 'Ankur Varma',
	designation  : 'CEO',
	employee_id  : 'COGO126',
	manager_id   : '1',
	manager_name : 'Shekhar Purnendu',
},
{
	id           : '5',
	name         : 'Parth Samnani',
	designation  : 'CEO',
	employee_id  : 'COGO127',
	manager_id   : '3',
	manager_name : 'Hrishikesh Kulkarni',
},
{
	id           : '6',
	name         : 'Harshit Soni',
	designation  : 'CEO',
	employee_id  : 'COGO128',
	manager_id   : '5',
	manager_name : 'Parth Samnani',
},
{
	id           : '7',
	name         : 'Shridhar Kulkarni',
	designation  : 'CEO',
	employee_id  : 'COGO129',
	manager_id   : '5',
	manager_name : 'Parth Samnani',
}];

function OrganizationTree({ setOpenOrganizationTree }) {
	const [users, setUsers] = useState({});
	const [userId, setUserId] = useState('');

	const { treeData = {}, loading = false } = useGetOrganizationTree({ userId });

	const getManagerLevel = (manager) => {
		if (manager) {
			let newManagerList = [];
			const sliceIndex = (users.managerLevel || []).findIndex((item) => item.id === manager.id);
			console.log('sliceIndex', sliceIndex);
			newManagerList = sliceIndex >= 0
				? users.managerLevel?.slice(0, sliceIndex + 1) : [...(users.managerLevel || []), manager];

			return newManagerList;
		}
		return undefined;
	};

	useEffect(() => {
		if (userId) {
			const userLevel = clickData.find((user) => user.id === userId);
			const reportees = clickData.filter((user) => user.manager_id === userId && user.manager_id !== user.id);
			const reporteeLevel = !isEmpty(reportees) ? reportees : users.reporteeLevel;
			const selectedReportee = isEmpty(reportees) ? userLevel : {};
			const manager = clickData.find((user) => userLevel.manager_id === user.id && userLevel.id !== user.id);
			const managerLevel = getManagerLevel(manager);

			setUsers({ userLevel, reporteeLevel, managerLevel, selectedReportee });
		}
	}, [userId]);

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
						{(firstData.baseLevel || []).map((user) => (
							<UserCard
								user={user}
								clickable
								userId={userId}
								setUserId={setUserId}
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
