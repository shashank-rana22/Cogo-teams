import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const useGetColumns = (isAdmin) => {
	const router = useRouter();

	const handleVerification = (item) => {
		const { employee_detail_id, status } = item;
		if (status === 'approved') {
			return;
		}
		router.push(`/byod/employee/${employee_detail_id}`);
	};

	const getStatus = (item) => {
		const { status } = item;
		if (status === 'active') {
			return (
				<Button
					onClick={() => handleVerification(item)}
					className={styles.color_blue}
				>
					Verify
				</Button>
			);
		}

		if (status === 'rejected_by_hr') {
			return (
				<Button className={styles.cursor_auto}>
					Rejected by HR
				</Button>
			);
		}

		return (
			<Button className={styles.color_green}>
				Verified
			</Button>
		);
	};

	const getAdminStatus = (item) => {
		const { status } = item;
		if (isAdmin && status === 'verified') {
			return (
				<Button
					onClick={() => handleVerification(item)}
					className={styles.color_blue}
				>
					Approve
				</Button>
			);
		}

		if (status === 'approved') {
			return (
				<Button
					className={styles.color_green}
				>
					Approved
				</Button>
			);
		}

		if (status === 'rejected_by_admin') {
			return (
				<Button className={styles.cursor_auto}>
					Rejected by Admin
				</Button>

			);
		}

		if (status === 'rejected_by_hr') {
			return (
				<Button
					className={`${styles.color_blue} ${styles.cursor_auto}`}
				>
					-
				</Button>
			);
		}

		return (
			<Button
				className={`${styles.color_blue} ${styles.cursor_auto}`}
			>
				Approve
			</Button>
		);
	};

	return [
		{
			Header   : 'Name',
			accessor : (item) => (
				<div className={styles.employee_name}>
					{item?.employee_detail?.name}
					<span className={styles.email_span}>
						(
						{item?.employee_detail?.cogoport_email || item?.employee_detail?.personal_email}
						)
					</span>
				</div>
			),
		},
		{
			Header   : 'Verified',
			accessor : (item) => (
				<div className="hr_btn_status">
					{getStatus(item)}
				</div>
			),
		},
		{
			Header   : 'Approval Status',
			accessor : (item) => getAdminStatus(item),
		},
	];
};
export default useGetColumns;
