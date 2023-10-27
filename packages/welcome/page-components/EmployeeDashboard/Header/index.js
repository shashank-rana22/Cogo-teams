/* eslint-disable max-len */
import { Button, Modal, Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMRaiseTicket, IcMEmail, IcMDownload } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import { HEADER_NAV } from '../../../utils/constants';

import styles from './styles.module.css';

function greetings() {
	const myDate = new Date();
	const hours = myDate.getHours();
	let greet;

	if (hours < 12) greet = 'morning';
	else if (hours >= 12 && hours <= 17) greet = 'afternoon';
	else if (hours >= 17 && hours <= 24) greet = 'evening';

	return greet;
}

const columns = [
	{
		Header   : 'NAME',
		accessor : 'name',
	},
	{ Header: 'ACTIONS', accessor: (item) => <IcMDownload style={{ cursor: 'pointer' }} onClick={() => window.open(item.url, '_blank')} /> },
];

const data = [
	{
		name : 'Asset and it policy',
		url  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/21ff01f00f97a8146ea937c069f4d06e/documents_60eed33822a8cf49f5001a11_Asset_and_IT_Policy%20%282%29.pdf',
	},
	{
		name : 'Attendance policy 2023',
		url  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/daf26dfec51801bd5bb7b43ce29012c1/documents_60eed33822a8cf49f5001a11_Attendance_Policy_2023.pdf',
	},
	{
		name : 'Code of conduct 2023',
		url  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/b1c108bba565944465c7562983a3fc0f/documents_60eed33822a8cf49f5001a11_Code_of_Conduct_2023.pdf',
	},
	{
		name : 'Communication policy 2022',
		url  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/6da2878d3cf5bf48b38f4d58b1b5a241/documents_60eed33822a8cf49f5001a11_Communication_Policy_2022.pdf',
	},
	{
		name : 'Employee benefits',
		url  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/142920e4bce8ba0eb4d155bea01c110c/documents_60eed33822a8cf49f5001a11_Employee_Benefits.pdf',
	},
	{
		name : 'Employee performance enablement plan',
		url  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/1c6f299d65d7ed180718f94b677662e9/documents_60eed33822a8cf49f5001a11_Employee_Performance_Enablement_Plan.pdf',
	},
	{
		name : 'Employee referral program',
		url  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/02d59317d7405408df633ae823a5507d/documents_60eed33822a8cf49f5001a11_Employee_Referral_Program%20%281%29.pdf',
	},
	{
		name : 'Expense reimbursement policy',
		url  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/a181c313d2d321af30d9e789bb279f8e/documents_60eed33822a8cf49f5001a11_Expense_Reimbursement_Policy.pdf',
	},
	{
		name : 'Grievance redressal policy 2022	',
		url  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/fbd45e4e4ae686ad011c89c1d088d6fd/documents_60eed33822a8cf49f5001a11_Grievance_Redressal_Policy_2022.pdf',
	},
	{
		name : 'Grooming & dress code policy 2022',
		url  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/d71f2841f19e80099e6d77455d5a3a60/documents_60eed33822a8cf49f5001a11_Grooming_',
	},
];

function Header({ summaryData }) {
	const router = useRouter();

	const { user_role } = summaryData || {};
	const [openPolicies, setOpenPolicies] = useState(false);

	const profileData = useSelector(({ profile }) => profile);
	const userName = profileData?.user.name;

	const { rectangle } = GLOBAL_CONSTANTS.image_url;

	const handleShowInbox = () => {
		router.push('/attendance-leave-management?showInbox=true&back=welcome');
	};

	const handleRoute = (val) => {
		if (val.label === 'Policies') {
			setOpenPolicies(true);
		} else {
			router.push(val.route);
		}
	};

	console.log('setOpenPolicies', openPolicies);

	return (
		<div className={styles.container}>
			<div className={styles.data_container}>
				<div className={styles.header_flex}>
					<div className={styles.header_title}>
						HRMS Dashboard
					</div>
					<div className={styles.header_right_flex}>
						{/* <Button themeType="secondary">
						<span className={styles.header_right_flex}>
							New Request
							<IcMPlus width={12} height={12} style={{ marginLeft: 4 }} />
						</span>
					</Button> */}
						<Button themeType="secondary" onClick={() => router.push('/ticket-management/my-tickets')}>
							<span className={styles.header_right_flex}>
								My Tickets
								<IcMRaiseTicket width={14} height={14} style={{ marginLeft: 4 }} />
							</span>
						</Button>
						<Button style={{ marginLeft: 12 }} onClick={handleShowInbox}>
							<span className={styles.header_right_flex}>
								My Activity
								<IcMEmail width={14} height={14} style={{ marginLeft: 4 }} />
							</span>
						</Button>
					</div>
				</div>
				<div className={styles.header_data_flex}>
					<div className={styles.user_left_flex}>
						<div className={styles.name_avatar}>
							HK
						</div>
						<div className={styles.greetings}>
							<div className={styles.user_name_text}>
								Good
								{' '}
								{greetings()}
								{' '}
								{' '}
								{userName}
								!
							</div>
							<div className={styles.date_text}>
								{formatDate({
									date       : new Date(),
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}
							</div>
						</div>
					</div>
					<div className={styles.header_data_right_flex}>
						{HEADER_NAV.map((val) => {
							const ICON = val.icon;

							if (val.label === 'Payroll' && user_role !== 'hrbp') {
								return null;
							}

							return (
								<Button
									key={val.label}
									className={styles.mr_12}
									onClick={() => handleRoute(val)}
								>
									<ICON width={14} height={14} style={{ marginRight: 4 }} />
									{val.label}
								</Button>
							);
						})}
					</div>
				</div>
			</div>

			<div className={styles.rectangle1}>
				<img src={rectangle} alt="img" />
			</div>
			<div className={styles.rectangle2}>
				<img src={rectangle} alt="img" />
			</div>
			<div className={styles.rectangle3}>
				<img src={rectangle} alt="img" />
			</div>
			<div className={styles.rectangle4}>
				<img src={rectangle} alt="img" />
			</div>

			{ openPolicies && (
				<Modal
					size="lg"
					show={openPolicies}
					onClose={() => setOpenPolicies(false)}
					placement="top"
				>
					<Modal.Header title="Policies" />
					<Modal.Body>
						<Table columns={columns} data={data} />
					</Modal.Body>
				</Modal>
			) }
		</div>
	);
}

export default Header;
