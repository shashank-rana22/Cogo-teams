import { Button } from '@cogoport/components';
import { useForm, UploadController } from '@cogoport/forms';
import {
	IcMArrowDown,
	IcMArrowRight,
	IcMDownload,
	IcMPlus,
} from '@cogoport/icons-react';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

import StyledTable from '../../commons/StyledTable';

import AdditionalRemarks from './additional-remarks';
import fnfColumns, { outstandingColumns } from './columns';
import FinanceRecommendations from './finance-recommendations';
import styles from './styles.module.css';
import TermsConditions from './terms-conditions';

const ZERO = 0;
const data2 = [
	{
		accountName    : 'XYZ',
		tenure         : '-',
		outstandingAmt : '100000',
		status         : 'pending',
		description    : 'salary',

	},
	{
		accountName    : 'XYZ',
		tenure         : '-',
		outstandingAmt : '100000',
		status         : 'pending',
		description    : 'salary',

	},
];

function FinanceClearanceEmployeeSide() {
	const { control, formState:{ errors }, watch, handleSubmit } = useForm();
	const [show, setShow] = useState(true);
	const [outStandingShow, setOutStandingShow] = useState(true);
	const [totalRecoverableAmount, setTotalRecoverableAmount] = useState(ZERO);

	const data1 = useMemo(() => (
		[
			{
				particular        : 'Joining Bonus',
				category          : 'Bonus',
				recoverableAmount : 'approved',
			},
			{
				particular        : 'Advance Salary',
				category          : 'Loan',
				recoverableAmount : 'approved',
			},		{
				particular        : 'Gift',
				category          : 'Gift',
				recoverableAmount : 'approved',
			},
		]
	), []);

	const onSubmit = () => {

	};
	const totalRecoverableAmountFun = useCallback(
		() => {
			let recoverable_amount_sum = 0;
			data1.forEach((elem) => {
				const props = `${elem?.particular}RecoverableAmount`;
				recoverable_amount_sum += parseInt(watch(props) || ZERO, 10);
			});
			setTotalRecoverableAmount(recoverable_amount_sum);
		},
		[data1, watch],
	);

	useEffect(() => { totalRecoverableAmountFun(); }, [totalRecoverableAmountFun, watch]);

	const columns = fnfColumns({ control, errors, setTotalRecoverableAmount, watch, totalRecoverableAmountFun });

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left_header}>
					<span className={styles.upper_text}>FINANCE CLEARANCE</span>
					<span className={styles.lower_text}>FNF & other settlements </span>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.heading_container} aria-hidden onClick={() => setShow(!show)}>
					<div className={styles.heading}>
						A. Update FNF Status
					</div>
					<div className={styles.btn_and_arrow}>
						<div className={styles.heading_btn}>
							<Button size="md" themeType="secondary" className={styles.heading_btn}>
								<IcMPlus />
								{' '}
								Add Particular
							</Button>
						</div>
						<IcMArrowDown
							width={22}
							height={22}
							className={show ? styles.caret_active : styles.caret_arrow}
						/>
					</div>
				</div>
				<div className={show ? styles.show_application : styles.hide_application}>
					<div className={styles.table_update_fnf}>
						<StyledTable columns={columns} data={data1} />

					</div>
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
					aria-hidden
					onClick={() => setOutStandingShow(!outStandingShow)}
				>
					<div className={styles.heading}>
						B. Outstanding Amount
					</div>
					<div className={styles.btn_and_arrow}>
						<div className={styles.heading_btn}>
							<Button size="md" themeType="secondary">
								<IcMDownload />
								{' '}
								Download Outstanding Sheet
							</Button>
						</div>
						<IcMArrowDown
							width={22}
							height={22}
							className={outStandingShow ? styles.caret_active : styles.caret_arrow}
						/>
					</div>
				</div>

				<div className={outStandingShow ? styles.show_application : styles.hide_application}>
					<div className={styles.table_update_fnf}>
						<div className={styles.outstanding_heading}>Outstanding Amount Details</div>
						<StyledTable columns={outstandingColumns} data={data2} />
					</div>
					<div className={styles.fnf_excel_sheet_container}>
						<div className={styles.outstanding_fnf_heading}> FNF Excel Sheet</div>
						<UploadController
							name="fnffile"
							control={control}
							placeholder="Only Image, pdf/doc..."
							size="md"
						/>
						{/* <Input
							size="md"
							placeholder="Only Image, pdf/doc..."
							prefix={<IcMCloudUpload width={16} height={16} />}
							suffix={(
								<Button size="lg" themeType="secondary">
									Upload
								</Button>

							)}
							disabled
						/> */}
					</div>
				</div>
			</div>
			<FinanceRecommendations control={control} />
			<AdditionalRemarks control={control} />
			<div className={styles.container}>
				<TermsConditions control={control} />
			</div>

			<div className={styles.footer}>
				{/* <Button themeType="secondary" style={{ marginRight: '4px' }}>Back</Button> */}
				<Button
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
				>
					Proceed
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />

				</Button>
			</div>

		</>

	);
}

export default FinanceClearanceEmployeeSide;
