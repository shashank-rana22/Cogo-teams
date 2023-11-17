import { Button, Input } from '@cogoport/components';
import { IcMArrowRight, IcMDocument, IcMEyeopen } from '@cogoport/icons-react';
import React from 'react';

import StyledTable from '../../commons/StyledTable';
import CancellationRequest from '../CancellationRequest';
import Heading from '../HRMeeting/Heading';

import { getFnfColumns, outstandingColumns } from './columns';
import FinanceRecommendations from './FinanceRecommendations';
import styles from './styles.module.css';
import useUpdateFnfStatus from './useUpdateFnfStatus';

const NUM = 1;

function FinanceClearance({ data = {}, handleBack = () => {}, handleNext = () => {}, refetch = () => {} }) {
	const { updateApplication = () => {} } = useUpdateFnfStatus({ refetch });
	const fnfColumns = getFnfColumns({ onStatusChange: updateApplication });

	const { finance_clearance, application_status, application_process_details } = data || {};
	const { finance_clearance:financeClearance, process_user_details } = finance_clearance || {};
	const { sub_process_data, is_complete, is_ignored } = financeClearance || {};
	const {
		fnf_details,
		fnf_excel_sheet_url,
		outstanding_amount_details,
		outstanding_excel_sheet,
	} = sub_process_data || {};

	const data_fnf = (fnf_details || []).map((item) => ({
		companyLoan   : item?.category,
		advanceAmount : item?.recoverable_amount,
		status        : item?.status,
		id            : item?.id,
	}));

	const data_outstanding = (outstanding_amount_details || [])
		.filter((item) => !item.cleared)
		.map((item) => ({
			accountName    : item?.business_name,
			tenure         : '-',
			dues           : '-',
			outstandingAmt : item?.totalOutstanding,
			status         : 'Pending',
			description    : 'salary',
		}));
	const parts = fnf_excel_sheet_url?.split('/');
	const lastPart = parts?.[(parts || []).length - NUM];

	if (is_ignored) {
		return (
			<Heading
				title="FINANCE CLEARANCE"
				name={process_user_details?.name}
				isComplete={is_complete}
				refetch={refetch}
				isIgnored={is_ignored}
				application_process_details={application_process_details}
			/>
		);
	}

	return (
		<>
			<Heading
				title="FINANCE CLEARANCE"
				name={process_user_details?.name}
				isComplete={is_complete}
				refetch={refetch}
				isIgnored={is_ignored}
				application_process_details={application_process_details}
			/>
			{application_status === 'cancellation_requested' ? (
				<CancellationRequest
					data={data}
					refetch={refetch}
				/>
			) : null}
			{is_complete ? (
				<>
					{' '}
					<FinanceRecommendations data={sub_process_data} />
					<div className={styles.container}>
						<div className={styles.heading}>
							A. Review FNF Status
						</div>
						<StyledTable columns={fnfColumns} data={data_fnf} />
						<div className={styles.document_section}>
							<div className={styles.doc_heading}>FNF Excel Sheet</div>
							<Input
								size="md"
								placeholder={lastPart}
								prefix={<IcMDocument width={16} height={16} />}
								suffix={(
									<IcMEyeopen
										style={{ marginRight: '10px', cursor: 'pointer', color: 'black' }}
										onClick={() => window.open(fnf_excel_sheet_url, '_blank')}
									/>
								)}
								disabled
							/>
						</div>
					</div>

					<div className={styles.container}>
						<div className={styles.heading}>
							B. Outstanding Amount
						</div>
						<StyledTable columns={outstandingColumns} data={data_outstanding} />
						<div className={styles.document_section}>
							<div className={styles.doc_heading}> Outstanding Excel Sheet</div>
							<Input
								size="md"
								placeholder={lastPart}
								prefix={<IcMDocument width={16} height={16} />}
								suffix={(
									<IcMEyeopen
										style={{ marginRight: '10px', cursor: 'pointer', color: 'black' }}
										onClick={() => window.open(outstanding_excel_sheet, '_blank')}
									/>
								)}
								disabled
							/>
						</div>
					</div>

					<div className={styles.container}>
						<div className={styles.heading}>
							Notes shared with you
						</div>

						<div className={styles.upper_text}>
							{sub_process_data?.additional_remarks}
						</div>
					</div>
				</>
			) : null}
			<div className={styles.footer}>
				<Button
					themeType="secondary"
					style={{ marginRight: '4px', height: '32px' }}
					onClick={handleBack}
				>
					<span style={{ fontSize: '14px' }}>Back</span>
				</Button>
				<Button themeType="primary" onClick={handleNext}>
					<span style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>Proceed</span>
					<IcMArrowRight width={20} height={20} style={{ marginLeft: '4px' }} />

				</Button>
			</div>
		</>
	);
}

export default FinanceClearance;
