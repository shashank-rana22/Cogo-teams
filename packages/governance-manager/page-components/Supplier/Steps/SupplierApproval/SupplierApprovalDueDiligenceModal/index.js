import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useGetOrganizationDueDiligence from '../hooks/useGetOrganizationDuediligence';
import useUpdateOrganizationDueDiligence from '../hooks/useUpdateDueDiligenceStatus';

import styles from './styles.module.css';
import {
	comapany_detail_objects,
	director_detail_objects,
	financial_detail_objects,
	generic_detail_objects,
	legal_detail_objects,
	shareholder_detail_objects,
} from './utils/supplier-approval-keys-values';

const ZERO = 0;
const ONE = 1;
const TWO = 1;

function SupplierApprovalDueDiligenceModal({ open, setOpen, setVerify, verify }) {
	const {
		data,
	} = useGetOrganizationDueDiligence();

	const { UpdateOrganizationDueDiligenceStatus } = useUpdateOrganizationDueDiligence({
		organization_due_diligence_id : '2cea5a8e-7bbe-455e-8c5d-76c0ff77c16a',
		organization_id               : '4c2dfeba-c715-4614-8a93-e051a270981d',
		organization_service_id       : '481cb7d0-6712-40cd-b7e3-3fc4b1489fdc',
		setOpen,
	});

	console.log(verify);
	const onClose = () => {
		setOpen(ZERO);
	};
	const handleVerify = () => {
		setVerify((prev) => {
			const newVerify = [...prev];
			newVerify[open - ONE] = true;
			return newVerify;
		});
		UpdateOrganizationDueDiligenceStatus({ manager_approval_status: 'accepted' });
		onClose();
	};
	const handleReject = () => {
		setVerify((prev) => {
			const newVerify = [...prev];

			newVerify[open - ONE] = false;
			return newVerify;
		});
		UpdateOrganizationDueDiligenceStatus({ manager_approval_status: 'rejected' });
		onClose();
	};

	const [state, setState] = useState(ONE);

	const nextClick = () => {
		setState(TWO);
	};

	const previousClick = () => {
		setState(ONE);
	};

	return (
		<div style={{ padding: '20px' }}>

			<Modal size="xl" show={open} onClose={() => { onClose(); }} placement="centre">
				<Modal.Header title="Supplier Approval - Step 1" className={styles.header} />
				<div className={styles.header} />
				<Modal.Body className={styles.body}>
					{
						state === ONE
						&& (
							<>
								<div className={styles.parent}>
									<div className={styles.heading}>
										Company Details
									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                comapany_detail_objects({ data }).map((object) => (
	<div key={object} className={styles.head_container}>
		<div>
			{object?.key}
		</div>
		<div className={styles.value_container}>
			{object?.value}
		</div>
	</div>
                                ))
}
										</div>
									</div>
								</div>

								<div className={styles.parent}>
									<div className={styles.heading}>
										Financial Details
									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                financial_detail_objects({ data }).map((object) => (
	<div key={object} className={styles.head_container}>
		<div>
			{object?.key}
		</div>
		<div className={styles.value_container}>
			{object?.value}
		</div>
	</div>
                                ))
}
										</div>
									</div>
								</div>

								<div className={styles.parent}>
									<div className={styles.heading}>
										Other Directorship(S) Companies
									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                director_detail_objects({ data }).map((object) => (
	<div key={object} className={styles.head_container}>
		<div>
			{object?.key}
		</div>
		<div className={styles.value_container}>
			{object?.value}
		</div>
	</div>
                                ))
}
										</div>
									</div>
								</div>
							</>
						)

}
					{
						state === TWO
						&& (
							<>
								<div className={styles.parent}>
									<div className={styles.heading}>
										Generic Details
									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                generic_detail_objects({ data }).map((object) => (
	<div key={object} className={styles.head_container}>
		<div>
			{object?.key}
		</div>
		<div className={styles.value_container}>
			{object?.value}
		</div>
	</div>
                                ))
}
										</div>
									</div>
								</div>

								<div className={styles.parent}>
									<div className={styles.heading}>
										Shareholder & Management Details
									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                shareholder_detail_objects({ data }).map((object) => (
	<div key={object} className={styles.head_container}>
		<div>
			{object?.key}
		</div>
		<div className={styles.value_container}>
			{object?.value}
		</div>
	</div>
                                ))
}
										</div>
									</div>
								</div>

								<div className={styles.parent}>
									<div className={styles.heading}>
										Course of Legal Cases
									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                legal_detail_objects({ data }).map((object) => (
	<div key={object} className={styles.head_container}>
		<div>
			{object?.key}
		</div>
		<div className={styles.value_container}>
			{object?.value}
		</div>
	</div>
                                ))
}
										</div>
									</div>
								</div>
							</>
						)

}
				</Modal.Body>
				<Modal.Footer style={{ gap: '15px' }}>
					{
						state === ONE
						&& (
							<Button onClick={nextClick}>Next</Button>
						)
					}
					{
						state === TWO
						&& (
							<>
								<Button onClick={previousClick}>Go Back</Button>
								<Button onClick={handleVerify} style={{ backgroundColor: '#ABCD62' }}>Verify</Button>
								<Button onClick={handleReject}>Reject</Button>
							</>
						)
					}
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default SupplierApprovalDueDiligenceModal;
