import { Button } from '@cogoport/components';
import {
	IcMArrowBack,
	IcMEdit,
	IcMArrowDown,
} from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useGetEmployeeDetails from '../../hooks/useGetEmployeeData';
import { getEmployeeData } from '../../utils/constants';
import TabsPanel from '../TabsPanel';

import styles from './styles.module.css';

function EmployeeProfile() {
	const { profile: { user } } = useSelector((state) => ({
		profile: state?.profile,
	}));
	const { loading, data } = useGetEmployeeDetails(user.id);

	if (loading) {
		return 'loading';
	}

	const { employee_detail } = data || {};
	const employeeData = getEmployeeData(employee_detail);

	return (
		<div className={styles.main_container}>
			<div className={styles.profile_container}>
				<div className={styles.profile_flex}>
					<div className={styles.left_image} />
					<div className={styles.cover}>
						<div className={styles.flex}>
							<div className={styles.left_text}>
								<IcMArrowBack width={16} height={16} />
								<div className={styles.name_designation}>
									<span className={styles.name}>{employee_detail?.name}</span>
									<span className={styles.designation}>{employee_detail?.role_name}</span>
								</div>
							</div>
							<div className={styles.actions_button}>
								<Button size="md" themeType="secondary">
									<div className={styles.actions_container}>
										<span className={styles.button_text}>Edit Cover Photo</span>
										<IcMEdit width={12} height={12} />
									</div>
								</Button>
							</div>
						</div>
					</div>
					<div className={styles.right_content}>
						<div className={styles.name_email}>
							<div className={styles.name_active}>
								<span className={styles.name_title}>{employee_detail?.name}</span>
								<span className={styles.cogoid_title}>{`(${employee_detail?.employee_code})`}</span>
								{(employee_detail?.status === 'active')
									? (
										<div className={styles.active_container}>
											<span className={styles.active}>Active</span>
										</div>
									)
									: (
										<div className={styles.inactive_container}>
											<span className={styles.inactive}>Inactive</span>
										</div>
									)}
								<div style={{ display: 'flex', flexGrow: 1 }} />
								<Button size="md" themeType="accent">
									<div className={styles.actions_container}>
										<span>Actions</span>
										<IcMArrowDown width={12} height={12} />
									</div>
								</Button>
							</div>
							<div className={styles.desig_location}>
								{employeeData.map(({ Icon, value }) => (
									<div className={styles.desig_location_element} key={value}>
										{Icon}
										<span className={styles.desig_location_value}>{value}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<TabsPanel data={data} />
			</div>
		</div>
	);
}

export default EmployeeProfile;
