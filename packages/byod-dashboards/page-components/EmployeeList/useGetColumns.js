import { Button, Pill } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const useGetColumns = () => {
	const router = useRouter();

	const handleVerification = (item) => {
		const { id, status } = item;
		if (status === 'approved') {
			return;
		}
		router.push(`/byod/employee/${id}`);
	};

	function GetStatus(item) {
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

		if (status === 'rejected') {
			return (
				<Pill size="md" color="#F8AEA8">Rejected</Pill>
			);
		}
		if (status === 'verified') {
			return (
				<Button
					onClick={() => handleVerification(item)}
					className={styles.color_blue}
				>
					Approve
				</Button>
			);
		}

		return (
			<Pill size="md" color="#C4DC91">Approved</Pill>
		);
	}

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
			Header   : 'Status',
			accessor : (item) => (
				<div className="hr_btn_status">
					{GetStatus(item)}
				</div>
			),
		},
	];
};
export default useGetColumns;
