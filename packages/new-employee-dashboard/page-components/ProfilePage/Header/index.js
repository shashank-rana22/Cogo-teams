import { Avatar, Button, Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import useUpdateEmployeeDeatils from '../../hooks/useUpdateEmployeeDetails';

import styles from './styles.module.css';

function Header({
	detail,
	loading,
	setShowCtcBreakupModal,
	getEmployeeDetails,
	offerLetter,
	offerLetterApiLoading,
}) {
	const router = useRouter();
	const { id, name, employee_code, designation, passport_size_photo_url, status } = detail || {};

	const { updateEmployeeStatus, btnloading } = useUpdateEmployeeDeatils({ id, status, getEmployeeDetails });

	const onClickGoBack = () => {
		router.push('/new-employee-dashboard', '/new-employee-dashboard');
	};

	const isLoading = loading || isEmpty(detail || {}) || false;

	return (
		<div className={styles.container}>
			<div>
				<Button type="button" themeType="tertiary" onClick={onClickGoBack}>
					<IcMArrowBack style={{ marginRight: 8 }} />
					{' '}
					GO BACK
				</Button>

				<div className={styles.profile}>
					<Avatar
						src={passport_size_photo_url}
						alt="img"
						disabled={false}
						size="160px"
						personName={name}
					/>

					<div>
						<div className={styles.name}>
							{!isLoading ? (
								name
							) : (
								<Placeholder
									height="32px"
									width="240px"
									margin="0px 0px 12px 0px"
								/>
							)}
						</div>
						<div className={styles.role}>
							{!isLoading ? (
								startCase(designation)
							) : (
								<Placeholder height="20px" width="240px" />
							)}
						</div>
						<div className={styles.emp_code}>
							<div style={{ marginRight: 2 }}>Employee Code: </div>
							{!isLoading ? (
								employee_code
							) : (
								<Placeholder height="20px" width="80px" />
							)}
						</div>
					</div>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					onClick={() => setShowCtcBreakupModal(true)}
					type="button"
					themeType="secondary"
					style={{ marginLeft: 12 }}
					loading={isLoading || btnloading || offerLetterApiLoading}
				>
					{isEmpty(offerLetter) ? 'Add CTC breakup' : 'View CTC breakup'}
				</Button>

				<Button
					type="button"
					style={{ marginLeft: 12 }}
					onClick={() => updateEmployeeStatus()}
					loading={isLoading || btnloading || offerLetterApiLoading}
				>
					{status === 'active' ? 'Reject Candidate' : 'Reactivate Candidate Profile'}
				</Button>

			</div>
		</div>
	);
}

export default Header;
