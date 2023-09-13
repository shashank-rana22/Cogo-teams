import { Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import useUpdateOrganizationDueDiligence from '../hooks/ModalHooks/useUpdateDueDiligenceStatus';
import useGetOrganizationDueDiligence from '../hooks/useGetOrganizationDuediligence';

import styles from './styles.module.css';
import {
	comapanyDetailObjects,
	directorDetailObjects,
	financialDetailObjects,
	genericDetailObjects,
	legalDetailObjects,
	shareholderDetailObjects,
} from './utils/supplier-approval-keys-values';

const ZERO = GLOBAL_CONSTANTS.zeroth_index;
const ONE = GLOBAL_CONSTANTS.one;
const TWO = GLOBAL_CONSTANTS.two;

function SupplierApprovalDueDiligenceModal({
	open, setOpen,
	getOrganizationSupplierVerificationDetails,
	organization_id,
	t,
}) {
	const {
		data,
	} = useGetOrganizationDueDiligence({ organization_id, t });

	const { updateOrganizationDueDiligenceStatus } = useUpdateOrganizationDueDiligence({
		id              : data?.organization_due_diligence?.id,
		organization_id : data?.organization_due_diligence?.organization_id,
		setOpen,
		getOrganizationSupplierVerificationDetails,
	});

	const onClose = () => {
		setOpen(ZERO);
	};
	const handleVerify = () => {
		updateOrganizationDueDiligenceStatus({ verification_status: 'verified' });
	};
	const handleReject = () => {
		updateOrganizationDueDiligenceStatus({ verification_status: 'rejected' });
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
			<Modal.Header title={t('supplier_page_supplier_approval_title')} className={styles.header} />
			<div className={styles.header} />
			<Modal.Body className={styles.body}>
				{
						state === ONE && data?.organization_data
						&& (
							<>
								<div className={styles.parent}>
									<div className={styles.heading}>
										{t('supplier_page_supplier_approval_due_diligence_modal_company_details_label')}
									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                comapanyDetailObjects({ data, t })?.map((object) => (
	<div key={object?.key} className={styles.head_container}>
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
										{t(
											'supplier_page_supplier_approval_due_diligence_modal_finencial_details',
										)}
									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                financialDetailObjects({ data, t })?.map((object) => (
	<div key={object?.key} className={styles.head_container}>
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
										{t(
											'supplier_page_supplier_approval_due_diligence_modal_other_directorship',
										)}
									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                directorDetailObjects({ data, t })?.map((object) => (
	<div key={object?.key} className={styles.head_container}>
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
						state === TWO && data?.organization_data
						&& (
							<>
								<div className={styles.parent}>
									<div className={styles.heading}>

										{t(
											'supplier_page_supplier_approval_due_diligence_modal_other_directorship',
										)}

									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                genericDetailObjects({ data, t })?.map((object) => (
	<div key={object?.key} className={styles.head_container}>
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
										{t(
											'supplier_page_supplier_approval_due_diligence_modal_share_mgmt_label',
										)}

									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                shareholderDetailObjects({ data, t })?.map((object) => (
	<div key={object?.key} className={styles.head_container}>
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
										{
											t('supplier_page_supplier_approval_due_diligence_modal_course_label')
										}

									</div>
									<div className="styles_main_parent__ed_a_">
										<div className={styles.container}>
											{
                                legalDetailObjects({ data, t })?.map((object) => (
	<div key={object?.key} className={styles.head_container}>
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
						state === ONE && data?.organization_data
						&& (
							<Button onClick={nextClick}>
								{
											t('supplier_page_supplier_approval_due_diligence_modal_next_btn_label')
										}

							</Button>
						)
				}
				{
						state === TWO && data?.organization_data
						&& (
							<>
								<Button onClick={previousClick}>
									{
											t('supplier_page_supplier_approval_due_diligence_modal_go_back_btn_label')
									}
								</Button>
								<Button onClick={handleVerify} style={{ backgroundColor: '#ABCD62' }}>
									{
											t('supplier_page_supplier_approval_due_diligence_modal_verify_btn_label')
									}
								</Button>
							</>
						)
					}
				{
						(!data?.organization_data || state === TWO)
						&& (
							<Button onClick={handleReject}>
								{' '}
								{
									t('supplier_page_supplier_approval_due_diligence_modal_reject_btn_label')
							}
							</Button>
						)
					}
			</Modal.Footer>
		</Modal>
	);
}

export default SupplierApprovalDueDiligenceModal;
