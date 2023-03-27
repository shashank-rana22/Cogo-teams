import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useRef } from 'react';

import styles from './styles.module.css';
import useGetOrganizationTree from './useGetOrganizatioonTree';
import UserCard from './UserCard';

const scrollToSection = (elementRef) => {
	window.scrollTo({
		top      : elementRef.current.offsetTop,
		behavior : 'smooth',
	});
};

function OrganizationTree({ setOpenOrganizationTree }) {
	const [users, setUsers] = useState({});
	const userLevelRef = useRef(null);
	const reporteeLevelRef = useRef(null);

	const {
		treeData = {}, loading = false, fetchTreeData = () => {},
		params = {},
		setParams = () => {},
	} = useGetOrganizationTree();

	useEffect(() => {
		if (!isEmpty(treeData)) {
			const { manager_data = [], reportees = [], user_data = {} } = treeData;

			const baseLevel = !params.UserID ? manager_data : [];
			const userLevel = user_data;
			const reporteeLevel = !isEmpty(reportees) ? reportees : users.reporteeLevel;
			const selectedReportee = isEmpty(reportees) ? userLevel : {};
			const managerLevel = manager_data;

			setUsers({ baseLevel, userLevel, reporteeLevel, managerLevel, selectedReportee });
			// if (isEmpty(baseLevel)) { scrollToSection(isEmpty(selectedReportee) ? userLevelRef : reporteeLevelRef); }
		}
	}, [params.UserID, treeData, users.reporteeLevel]);

	useEffect(() => {
		if (!loading && params.UserID) {
			scrollToSection(isEmpty(users.selectedReportee) ? userLevelRef : reporteeLevelRef);
		}
	}, [loading]);

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

				{!params.UserID ? (
					<div className={styles.base_level}>
						{(users.baseLevel || []).map((user) => (
							<UserCard
								user={user}
								clickable
								params={params}
								setParams={setParams}
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
											params={params}
											setParams={setParams}
											key={user.id}

										/>
										<div className={styles.line} />
									</>
								))}
							</div>

							{isEmpty(users.selectedReportee)
						&& (
							<div className={styles.user_level} ref={userLevelRef}>
								<UserCard
									user={users.userLevel}
									enlarged
									fetchTreeData={fetchTreeData}
								/>
							</div>
						)}

							<div className={styles.line} />

							<div className={styles.reportee_level}>
								{!isEmpty(users.selectedReportee) && (
									<div className={styles.user_level} ref={reporteeLevelRef}>
										<UserCard
											loading={loading}
											user={users.selectedReportee}
											enlarged
											fetchTreeData={fetchTreeData}
										/>
									</div>
								)}

								<div className={styles.all_reportees}>
									{(users.reporteeLevel || []).map((user) => (
										<UserCard
											loading={loading}
											user={user}
											clickable
											params={params}
											setParams={setParams}
											key={user.id}
											isLastLevel={user.is_last_level}
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
