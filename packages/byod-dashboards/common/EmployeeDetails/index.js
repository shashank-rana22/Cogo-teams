import { Button, Modal, Textarea, Toast, Tags } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import useUpdateDetail from '../../hooks/useUpdateDetail';
import AddonsDetails from '../AddonsDetails';
import DeviceDetails from '../DeviceDetails';
import EmployeeData from '../EmployeeData';
import Spinner from '../Spinner';

import styles from './styles.module.css';

const DEFAULT_VALUE = 1;

function EmployeeDetails() {
	const router = useRouter();

	const { query } = useSelector(({ general }) => ({ query: general?.query || {} }));

	const { id:empId = '', view_type } = query;

	const [rejectModal, setRejectModal] = useState(false);
	const [rejectionReason, setRejectionReason] = useState('');
	const [refetchReimbursementList, setRefetchReimbursementList] = useState(true);

	const id = router.query;
	const { id : employee_id } = id || {};

	const { data, loading, refetch } = useGetEmployeeDetails(employee_id);
	const { updateDetail, loading : detailLoading } = useUpdateDetail(refetch);

	const { employee_device_details = {} } = data || {};
	const { addon_details, status: approvalStatus } = employee_device_details || {};

	const employeeDeviceData = employee_device_details[employee_device_details.length - DEFAULT_VALUE] || [];
	const { status } = employeeDeviceData || {};

	function HandleTags({ text = '', color = '' }) {
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
	}

	function GetButtonType() {
		if (view_type === 'admin_view' && approvalStatus === 'active') {
			return <HandleTags text="Verification pending from HRBP" color="blue" />;
		}

		if (['rejected'].includes(approvalStatus)) {
			return <HandleTags text={startCase(approvalStatus)} color="red" />;
		}
		if (view_type === 'hr_view' && approvalStatus === 'verified') {
			return <HandleTags text={startCase(approvalStatus)} color="green" />;
		}
		if (view_type === 'admin_view' && approvalStatus === 'approved') {
			return <HandleTags text={startCase(approvalStatus)} color="green" />;
		}

		if (((view_type === 'admin_view' && approvalStatus === 'approved')
		|| (!view_type === 'admin_view' && ['approved', 'verified'].includes(approvalStatus)))) {
			return <HandleTags text={startCase(status)} />;
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
						status : (view_type === 'hr_view') ? 'verified' : 'approved',
						id     : empId,
						view_type,
					})}
					size="lg"
					style={{ marginLeft: 12 }}
				>
					{(view_type === 'admin_view') ? 'Approve' : 'Verify'}
				</Button>
			</div>
		);
	}

	const handleReject = () => {
		if (rejectionReason.trim() === '') {
			Toast.error('Rejection reason is required');
			return;
		}

		setRejectModal(false);

		const objValues = {
			status           : 'rejected',
			rejection_reason : rejectionReason,
			id               : empId,
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
					{view_type === 'admin_view' ? 'Admin' : 'HR Business Partner'}
					{' '}
					Approval Dashboard
				</div>
			</div>

			<div className={styles.main_container}>
				<EmployeeData
					data={data}
					refetchReimbursementList={refetchReimbursementList}
					setRefetchReimbursementList={setRefetchReimbursementList}
				/>
				<DeviceDetails data={data} />

				{!isEmpty(addon_details) ? (
					<AddonsDetails data={data} />
				) : null}

				<GetButtonType />
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
