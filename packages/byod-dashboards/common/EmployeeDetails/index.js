import { Button, Modal, Textarea, Toast, Tags } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { EMPLOYEE_DETAILS } from '../../configurations/employeeDataMapping';
import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import useUpdateDetail from '../../hooks/useUpdateDetail';
import DeviceDetails from '../DeviceDetails';
import Spinner from '../Spinner';

import styles from './styles.module.css';

const geo = getGeoConstants();

const DEFAULT_FIXED_VALUE = 2;
const DEFAULT_VALUE = 1;

function EmployeeDetails() {
	const router = useRouter();

	const profile = useSelector((state) => state.profile || {});

	const [rejectModal, setRejectModal] = useState(false);
	const [rejectionReason, setRejectionReason] = useState('');

	const { auth_role_data } = profile || {};

	const { id : adminId } = auth_role_data;

	const isAdmin = adminId === geo.uuid.hrbp_admin_role_id;
	const id = router.query;
	const { id : employee_id } = id || {};
	const { data, loading, refetch } = useGetEmployeeDetails(employee_id);
	const { updateDetail, loading : detailLoading } = useUpdateDetail(refetch);

	const { employee_detail, employee_device_detail = [] } = data || {};

	const employeeDeviceData = employee_device_detail[employee_device_detail.length - DEFAULT_VALUE] || [];

	const { invoice_url, status } = employeeDeviceData || {};

	const getData = (key, type, isNumber) => {
		const payloadType = type ? employeeDeviceData : employee_detail;
		const payloadValue = payloadType?.[key];

		if (typeof payloadValue === 'string') {
			return startCase(payloadValue || '-');
		}

		if (isNumber) {
			return formatAmount({
				amount   : payloadValue?.toFixed(DEFAULT_FIXED_VALUE) || GLOBAL_CONSTANTS.zeroth_index,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
			});
		}

		return payloadValue?.toString()?.replace(/\.?0+$/, '') || '-';
	};

	const handleTags = (text, color) => {
		const options = [
			{
				key      : '1',
				disabled : false,
				children : text,
				color    : color || 'green',
				tooltip  : true,
			},
		];

		return <Tags items={options} size="xl" />;
	};

	const getButtonType = () => {
		if (isAdmin && status === 'active') {
			return handleTags('Verification pending from HRBP', 'blue');
		}

		if (['rejected_by_hr', 'rejected_by_admin'].includes(status)) {
			return handleTags(startCase(status), 'red');
		}

		if (((isAdmin && status === 'approved') || (!isAdmin && ['approved', 'verified'].includes(status)))) {
			return handleTags(startCase(status));
		}

		return (
			<div className={styles.btn_container}>
				<Button
					disabled={detailLoading}
					onClick={() => setRejectModal(true)}
					size="lg"
					themeType="secondary"
				>
					Reject
				</Button>

				<Button
					themeType="primary"
					disabled={detailLoading}
					onClick={() => updateDetail({
						status : isAdmin ? 'approved' : 'verified',
						id     : employeeDeviceData.id,
					})}
					size="lg"
					style={{ marginLeft: 12 }}
				>
					{isAdmin ? 'Approve' : 'Verify'}
				</Button>
			</div>
		);
	};

	const handleReject = () => {
		if (rejectionReason.trim() === '') {
			Toast.error('Rejection reason is required');
			return;
		}

		setRejectModal(false);

		const objValues = {
			status           : isAdmin ? 'rejected_by_admin' : 'rejected_by_hr',
			rejection_reason : rejectionReason,
			id               : employeeDeviceData.id,
		};

		updateDetail(objValues);
	};

	if (loading) {
		return (
			<div className={styles.spinner_container}>
				<Spinner />
			</div>
		);
	}

	return (
		<>
			<div className={styles.flex}>
				<IcMArrowBack
					onClick={() => router.push('/byod/employee')}
					className={styles.back_icon}
					width={25}
					height={25}
				/>
				<div className={styles.title}>
					{isAdmin ? 'Admin' : 'HR Business Partner'}
					{' '}
					Dashboard
				</div>
			</div>

			<div className={styles.flex_container}>
				<div className={styles.flex_40}>
					{invoice_url && (
						<iframe
							src={`${invoice_url}#toolbar=0&navpanes=0&scrollbar=0`}
							title="invoice_url"
						/>
					)}
				</div>
				<div className={styles.flex_60}>
					<div className={`${styles.heading}`}>Employee Details :</div>
					<div className={`${styles.container} ${styles.border_bottom}`}>
						{EMPLOYEE_DETAILS.map((val) => (
							<div className={styles.detail} key={val.key}>
								<div className={styles.label}>
									{val.label}
									{' '}
									:
								</div>
								<div className={styles.employee_detail}>
									{val.prefix}
									{' '}

									{getData(val.key, val.type, val.objType)}
								</div>
							</div>
						))}
					</div>
					<DeviceDetails deviceData={employee_device_detail} />
					{getButtonType()}
				</div>
			</div>
			{rejectModal
				&& (
					<Modal size="md" show={rejectModal} onClose={() => setRejectModal(false)} placement="top">
						<Modal.Header title="Rejection Reason" />
						<Modal.Body>
							<Textarea
								value={rejectionReason}
								onChange={(e) => setRejectionReason(e)}
								size="lg"
								placeholder="Reason..."
								rows={4}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={handleReject} size="lg">Reject</Button>
						</Modal.Footer>
					</Modal>
				)}
		</>
	);
}

export default EmployeeDetails;
