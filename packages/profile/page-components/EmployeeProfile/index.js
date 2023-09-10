import { Button } from '@cogoport/components';
import {
	IcMArrowBack,
	IcMArrowRight,
	IcMEdit,
	IcMBusiness,
	IcMLocation,
	IcMArrowDown,
	IcMEmail,
	IcMCall,
} from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useGetEmployeeDetails from '../../hooks/useGetEmployeeData';
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
	const designationLocation = [
		{ Icon: () => (<IcMBusiness width={14} height={14} />), value: employee_detail?.role_name },
		{ Icon: () => (<IcMLocation width={14} height={14} />), value: employee_detail?.office_location },
		{ Icon: () => (<IcMEmail width={14} height={14} />), value: employee_detail?.cogoport_email },
		{ Icon: () => (<IcMCall width={14} height={14} />), value: employee_detail?.mobile_number },
	];

	return (
		<div className={styles.main_container}>
			<div className={styles.top_text}>
				<span className={styles.top_employee_directory}>
					Employee Directory
				</span>
				<IcMArrowRight width={16} height={16} />
				<span className={styles.user_name}>User Name</span>
			</div>
			<div className={styles.head_line}>
				<IcMArrowBack width={19} height={19} />
				<span className={styles.employee_directory}>Employee Directory</span>
			</div>

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
							</div>
							<div className={styles.desig_location}>
								{designationLocation.map(({ Icon, value }) => (
									<div className={styles.desig_location_element} key={value}>
										<Icon />
										<span className={styles.desig_location_value}>{value}</span>
									</div>
								))}
							</div>
						</div>
						<div className="action_button_container">
							<Button size="md" themeType="accent">
								<div className={styles.actions_container}>
									<span>Actions</span>
									<IcMArrowDown width={12} height={12} />
								</div>
							</Button>
						</div>
					</div>
				</div>
				<TabsPanel loading={loading} data={data} />
			</div>
		</div>
	);
}

export default EmployeeProfile;
