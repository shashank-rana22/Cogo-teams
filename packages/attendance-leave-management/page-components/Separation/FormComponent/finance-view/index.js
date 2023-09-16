import { Button	 } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMArrowDown,
	IcMArrowRight,
	IcMDownload,
	IcMFtick,
	IcMPlus,
} from '@cogoport/icons-react';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

import StyledTable from '../commons/StyledTable';

import AddParticular from './add-particular';
import AdditionalRemarks from './additional-remarks';
import fnfColumns from './columns';
import FinanceConfirmModal from './confirm-modal';
import FinanceRecommendations from './finance-recommendations';
import FnfTable from './FnfTable';
import getColumns from './Outstandingamount/getcolumns';
import styles from './styles.module.css';
import TermsConditions from './terms-conditions';
import useDownloadOutstandingDetails from './useDownloadOutstandingDetails';
import useFinanceClearance from './useFinanceClearance';

function FinanceClearanceEmployeeSide({ data = {}, loading = false, refetch = () => {} }) {
	const {
		handleSubmit, onSubmit, control, errors,
		outstanding_amount_details, watch, updateData, setUpdateData, totalRecoverableAmount, setTotalRecoverableAmount,
		setFinanceRecommendation, financeRecommendation, off_boarding_application_id,
		sub_process_data, confirmModal, setConfirmModal, is_complete,
		setValue,
	} = useFinanceClearance({ data, refetch, loading });
	const { getDownloadOutstandingFileLink, downloadlink } = useDownloadOutstandingDetails();

	const [confirmedValues, setConfirmedValues] = useState(
		{
			tcFullName        : '',
			employee          : true,
			fnf               : true,
			additionalRemarks : '',
			getupdateData     : [],

		},
	);

	useEffect(() => {
		if (is_complete) {
			setValue('additionalRemarks', sub_process_data?.additional_remarks);
			setValue('fullName', sub_process_data?.name);
			setValue('checkboxagreement', true);
			setConfirmedValues({
				tcFullName    : sub_process_data?.name,
				employee      : sub_process_data?.hold_employee,
				fnf           : sub_process_data?.hold_fnf,
				getupdateData : sub_process_data?.update_fnf_status,

			}, is_complete);
		}
	}, [is_complete, setUpdateData, setValue, sub_process_data]);

	const [show, setShow] = useState(true);
	const [addParticular, setAddParticular] = useState(false);
	const [outStandingShow, setOutStandingShow] = useState(true);
	const columnsout = getColumns({ control, is_complete });
	const data1 = useMemo(() => (
		updateData
	), [updateData]);
	const showdata = useMemo(() => (
		confirmedValues.getupdateData
	), [confirmedValues.getupdateData]);

	const handleDownloadSheet = async () => {
		await getDownloadOutstandingFileLink(off_boarding_application_id);
		window.open(downloadlink, '_blank');
	};
	const totalRecoverableAmountFun = useCallback(
		() => {
			let recoverable_amount_sum = 0;
			const arr = is_complete ? showdata : data1;
			arr?.forEach((elem) => {
				recoverable_amount_sum += parseInt(elem.recoverable_amount || GLOBAL_CONSTANTS.zeroth_index, 10);
			});
			setTotalRecoverableAmount(recoverable_amount_sum);
		},
		[is_complete, showdata, data1, setTotalRecoverableAmount],
	);

	useEffect(() => { totalRecoverableAmountFun(); }, [totalRecoverableAmountFun, updateData]);

	const columns = fnfColumns({ control, errors, setTotalRecoverableAmount, watch, totalRecoverableAmountFun });
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left_header}>
					<span className={styles.upper_text}>FINANCE CLEARANCE</span>
					<span className={styles.lower_text}>FNF & other settlements </span>
				</div>
			</div>
			{is_complete ? (
				<div className={styles.completed_notification_container}>
					<IcMFtick height="22px" width="22px" color="#849E4C" />
					<div className={styles.completed_notification_text}>
						You have successfully completed your tasks. No further changes are allowed.
					</div>
				</div>
			) : null}
			<div className={styles.container}>
				<div className={styles.heading_container}>
					<div className={styles.heading}>
						A. Update FNF Status
					</div>
					<div className={styles.btn_and_arrow}>
						<div className={styles.heading_btn}>
							<Button
								size="md"
								themeType="secondary"
								className={styles.heading_btn}
								onClick={() => setAddParticular(true)}
								disabled={is_complete}

							>
								<IcMPlus />
								{' '}
								Add Particular
							</Button>
						</div>
						<IcMArrowDown
							width={22}
							height={22}
							aria-hidden
							onClick={() => setShow(!show)}
							className={show ? styles.caret_active : styles.caret_arrow}
						/>
					</div>
				</div>
				<div className={show ? styles.show_application : styles.hide_application}>
					<div className={styles.table_update_fnf}>
						<FnfTable
							columns={columns}
							addParticular={addParticular}
							data={is_complete ? showdata : data1}
						/>
					</div>
					<AddParticular
						addParticular={addParticular}
						setAddParticular={setAddParticular}
						setUpdateData={setUpdateData}
					/>
					{' '}
					<div className={styles.document_section}>
						<div className={styles.doc_heading}>
							Total Recoverable Amount
						</div>
						<span className={styles.recoverable_amount}>
							{totalRecoverableAmount}
						</span>
					</div>
				</div>
			</div>

			<div className={styles.container}>
				<div
					className={styles.heading_container}
				>
					<div className={styles.heading}>
						B. Outstanding Amount
					</div>
					<div className={styles.btn_and_arrow}>
						<div className={styles.heading_btn}>
							<Button
								size="md"
								themeType="secondary"
								onClick={() => handleDownloadSheet()}
							>
								<IcMDownload />
								{' '}
								Download Outstanding Sheet
							</Button>
						</div>
						<IcMArrowDown
							width={22}
							height={22}
							aria-hidden
							onClick={() => setOutStandingShow(!outStandingShow)}
							className={outStandingShow ? styles.caret_active : styles.caret_arrow}
						/>
					</div>
				</div>

				<div className={outStandingShow ? styles.show_application : styles.hide_application}>
					<div className={styles.table_update_out_amount}>
						<div className={styles.outstanding_heading}>Outstanding Amount Details</div>
						<StyledTable columns={columnsout} data={outstanding_amount_details} loading={false} />
					</div>
					{is_complete ?	null : (
						<div className={styles.fnf_excel_sheet_container}>
							<div className={styles.outstanding_fnf_heading}> FNF Excel Sheet</div>
							<UploadController
								name="fnffile"
								control={control}
								placeholder="Only Image, pdf/doc..."
								size="md"
								disabled={is_complete}
								className={is_complete ? styles.uploadbtn : null}
							/>
						</div>
					)}
				</div>
			</div>
			<FinanceRecommendations
				control={control}
				financeRecommendation={financeRecommendation}
				setFinanceRecommendation={setFinanceRecommendation}
				confirmedValues={confirmedValues}
				isComplete={is_complete}
			/>

			<AdditionalRemarks
				key={loading}
				control={control}
				isComplete={is_complete}
				confirmedValues={confirmedValues}
			/>
			<div className={styles.container}>
				<TermsConditions
					control={control}
					errors={errors}
					is_complete={is_complete}
					confirmedValues={confirmedValues}
				/>
			</div>

			{is_complete ? null
				: (
					<div className={styles.footer}>
						<Button
							themeType="primary"
							onClick={handleSubmit(() => setConfirmModal(true))}
						>
							Proceed
							<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />
						</Button>
					</div>
				)}

			{/* <FinanceUpdateModal
				showModal={showModal}
				setShowModal={setShowModal}
				setUpdateData={setUpdateData}
			/> */}
			<FinanceConfirmModal
				confirmModal={confirmModal}
				setConfirmModal={setConfirmModal}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
			/>
		</>

	);
}

export default FinanceClearanceEmployeeSide;
