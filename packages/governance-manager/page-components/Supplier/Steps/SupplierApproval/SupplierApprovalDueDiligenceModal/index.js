import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useUpdateOrganizationDueDiligence from '../hooks/ModalHooks/useUpdateDueDiligenceStatus';
import useGetOrganizationDueDiligence from '../hooks/useGetOrganizationDuediligence';

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

function SupplierApprovalDueDiligenceModal({
	open, setOpen,
	getOrganizationSupplierVerificationDetails, organization_id, organization_service_id,
}) {
	const {
		data,
	} = useGetOrganizationDueDiligence();

	const { UpdateOrganizationDueDiligenceStatus } = useUpdateOrganizationDueDiligence({
		organization_due_diligence_id: data?.id,
		organization_id,
		organization_service_id,
		setOpen,
		getOrganizationSupplierVerificationDetails,
	});

	const onClose = () => {
		setOpen(ZERO);
	};
	const handleVerify = () => {
		UpdateOrganizationDueDiligenceStatus({ manager_approval_status: 'accepted' });
		console.log('Hii');
	};
	const handleReject = () => {
		UpdateOrganizationDueDiligenceStatus({ manager_approval_status: 'rejected' });
	};

	const [state, setState] = useState(ONE);

	const nextClick = () => {
		setState(TWO);
	};

	const previousClick = () => {
		setState(ONE);
	};

	return (

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
	);
}

export default SupplierApprovalDueDiligenceModal;
