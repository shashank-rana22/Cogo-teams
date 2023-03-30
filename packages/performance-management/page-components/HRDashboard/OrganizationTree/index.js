import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useRef } from 'react';

import styles from './styles.module.css';
import useGetOrganizationTree from './useGetOrganizatioonTree';
import UserCard from './UserCard';

const scrollToSection = (elementRef) => {
	// eslint-disable-next-line no-undef
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
		treeData = {}, loading = false, refetchTreeParams = () => {},
		params = {},
		setParams = () => {},
	} = useGetOrganizationTree();

	const resetTree = () => {
		setParams({ UserID: undefined, ManagerIDs: undefined, Ceos: true });
	};

	useEffect(() => {
		if (!isEmpty(treeData)) {
			const { manager_data = [], reportees = [], user_data = {} } = treeData;

			const userLevel = user_data;
			const reporteeLevel = !isEmpty(reportees) ? reportees : users.reporteeLevel;
			const selectedReportee = isEmpty(reportees) ? userLevel : {};
			const managerLevel = manager_data;
			const baseLevel = !params.UserID ? manager_data : [];

			setUsers({ baseLevel, userLevel, reporteeLevel, managerLevel, selectedReportee });
		}
	}, [params.UserID, treeData, users.reporteeLevel]);

	useEffect(() => {
		if (!loading && !isEmpty(users.userLevel)) {
			scrollToSection(isEmpty(users.selectedReportee) ? userLevelRef : reporteeLevelRef);
		}
	}, [loading, users]);

	return (
		<div>
			<div className={styles.header}>
				<div style={{ display: 'flex' }}>
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

				<Button onClick={() => resetTree()}>Reset</Button>
			</div>

			<div className={styles.organization_tree}>
				{isEmpty(users.userLevel) ? (
					<div className={styles.base_level}>
						{loading && ([1, 2].map((user) => (
							<UserCard
								loading
								key={user.id}
							/>
						)))}

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
											loading={loading}
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
									loading={loading}
									user={users.userLevel}
									enlarged
									refetchTreeParams={refetchTreeParams}
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
											refetchTreeParams={refetchTreeParams}
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
