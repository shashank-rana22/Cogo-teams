import { Button, Placeholder, Popover } from '@cogoport/components';
import {
	IcMArrowBack,
	IcMArrowDown,
} from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
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

	const { employee_detail } = data || {};
	const employeeData = getEmployeeData(employee_detail);
	const router = useRouter();
	return (
		<div className={styles.main_container}>
			{(data || loading) && (
				<div className={styles.profile_container}>
					<div className={styles.profile_flex}>
						<div className={styles.left_image} />
						<div className={styles.cover}>
							<div className={styles.flex}>
								<div className={styles.left_text}>
									<IcMArrowBack width={16} height={16} />
									<div className={styles.name_designation}>
										<span className={styles.name}>
											{loading
												? <Placeholder width="175px" height="21px" />
												: employee_detail?.name}
										</span>
										<span className={styles.designation}>
											{loading
												? <Placeholder width="100px" height="18px" />
												: employee_detail?.role_name}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.right_content}>
							<div className={styles.name_email}>
								<div className={styles.name_active}>
									<span className={styles.name_title}>
										{loading ? <Placeholder height="36px" width="200px " /> : employee_detail?.name}
									</span>
									<span className={styles.cogoid_title}>
										{
										loading
											? <Placeholder height="36px" width="200px " />
											: `(${employee_detail?.employee_code})`
									}
									</span>
									<div className={styles.buttons_flex}>
										{
										loading ? <Placeholder width="50px" height="33px" />
											: (
												<div>
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
											)
									}
										<Popover
											placement="left"
											render={(
												<Button onClick={() => router.push('/apply-resignation')}>
													Apply for Resignation
												</Button>
											)}
										>
											<Button size="md" themeType="accent">
												<div className={styles.actions_container}>
													<span>Actions</span>
													<IcMArrowDown width={12} height={12} />
												</div>
											</Button>
										</Popover>

									</div>
								</div>
								<div className={styles.desig_location}>
									{employeeData.map(({ Icon, value }) => (
										<div className={styles.desig_location_element} key={value}>
											{Icon}
											{loading ? <Placeholder width="100px" height="21px" />
												: <span className={styles.desig_location_value}>{value}</span>}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<TabsPanel data={data} loading={loading} />
				</div>
			)}
		</div>
	);
}

export default EmployeeProfile;
