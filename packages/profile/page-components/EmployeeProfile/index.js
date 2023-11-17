import { Button, Placeholder, Popover, Breadcrumb } from '@cogoport/components';
import {
	IcMArrowBack,
	IcMArrowDown,
	IcMArrowRight,
	IcMImage,
} from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import useGetEmployeeDetails from '../../hooks/useGetEmployeeData';
import { getEmployeeData } from '../../utils/constants';
import TabsPanel from '../TabsPanel';

import EditProfile from './EditProfile';
import styles from './styles.module.css';

function EmployeeProfile() {
	const router = useRouter();

	const employee_id = router.query?.employee_id;

	const { profile: { user } } = useSelector((state) => ({
		profile: state?.profile,
	}));

	const [openEditProfile, setOpenEditProfile] = useState(false);

	const user_id = employee_id || user.id;

	const { loading, data, getEmployeeDetails } = useGetEmployeeDetails(user_id);

	const { employee_detail } = data || {};
	const employeeData = getEmployeeData(employee_detail);

	return (
		<div className={styles.main_container}>
			<Breadcrumb>
				<Breadcrumb.Item label={(
					<div
						aria-hidden
						onClick={() => router.push('/hrms')}
						style={{ cursor: 'pointer' }}
					>
						HRMS
					</div>
				)}
				/>
				<Breadcrumb.Item label="Employee Profile" />
			</Breadcrumb>
			{!loading && employee_id ? (
				<div className={styles.back_container}>
					<div className={styles.top_text}>
						<span className={styles.back}>Employee Directory</span>
						<IcMArrowRight width={16} height={16} />
						<span className={styles.arrow}>{employee_detail?.name}</span>
					</div>
					<div className={styles.dark_heading}>
						<div aria-hidden onClick={() => router.back()} className={styles.icon_container}>
							<IcMArrowBack
								width={20}
								height={20}
							/>
						</div>
						<span className={styles.employee_profile}>Employee Directory</span>
					</div>
				</div>
			) : null}
			{(data || loading) ? (
				<div className={styles.profile_container}>
					<div className={styles.profile_flex}>
						<div className={styles.left_image}>
							<img
								className={styles.profile_img}
								src={employee_detail?.passport_size_photo_url}
								alt="profile"
							/>
							<div
								className={styles.profile_img_icon}
								onClick={() => setOpenEditProfile(true)}
								aria-hidden
							>
								<IcMImage fill="#FFFFFF" width={50} height={50} />
							</div>
						</div>
						<div className={styles.cover}>
							<div className={styles.flex}>
								<div className={styles.left_text}>
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
										{loading ? <Placeholder width="50px" height="33px" />
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
											)}
										<Popover
											placement="left"
											render={(
												<>
													<Button
														onClick={() => {
															if (employee_id) {
																router.push(
																	`/apply-resignation?employee_id=
																${employee_id}`,
																);
															} else {
																router.push('/apply-resignation');
															}
														}}
													>
														{employee_id ? 'Initiate Separation' : 'Apply for Resignation'}
													</Button>
													<Button
														style={{
															marginTop : '6px',
															width     : '160px',
														}}
														onClick={() => router.push('/ticket-management/my-tickets')}
													>
														Raise a ticket

													</Button>
												</>
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
					{ openEditProfile && (
						<EditProfile
							show={openEditProfile}
							onHide={() => setOpenEditProfile(false)}
							getEmployeeDetails={getEmployeeDetails}
						/>
					) }
					<TabsPanel data={data} loading={loading} getEmployeeDetails={getEmployeeDetails} />
				</div>
			) : (<EmptyState height={250} width={450} />)}
		</div>
	);
}

export default EmployeeProfile;
