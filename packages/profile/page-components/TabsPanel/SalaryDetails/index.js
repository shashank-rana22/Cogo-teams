import { Button } from '@cogoport/components';
import { IcCFtick, IcMCrossInCircle, IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import StyledTable from '../../../common/StyledTable';
import useGetEmployeeDirectoryPaymentDetail from '../../../hooks/useGetEmployeeDirectoryPaymentDetails';
import { bankInfo, pfInfo } from '../../../utils/info';
import { otherSalaryInfo } from '../../../utils/otherInfo';

import EditModal from './EditModal';
import RightGlancePayment from './RightGlance';
import styles from './styles.module.css';
import TaxStructure from './TaxStructure';
import useGetColumns from './useGetColumns';
import useGetIrregularColumns from './useGetIrregularColumns';

function SalaryDetails() {
	const router = useRouter();
	const { push } = router;
	const [taxShow, setTaxShow] = useState(false);
	const columns = useGetColumns(setTaxShow);
	const columnsIrregular = useGetIrregularColumns();

	const employee_id = router.query?.employee_id;
	const [show, setShow] = useState(false);
	const [modalData, setModalData] = useState([]);

	const [modalUpdateData, setModalUpdateData] = useState();

	const { profile: { user } } = useSelector((state) => ({
		profile: state?.profile,
	}));
	const handleModal = () => {
		setShow(false);
	};

	const handleOpenModal = (modData, modupdatedata) => {
		setModalUpdateData(modupdatedata);
		setModalData(modData);
		setShow(true);
	};
	const user_id = employee_id || user.id;
	const { data, loading, getEmployeePaymentDetails } = useGetEmployeeDirectoryPaymentDetail(user_id);
	const salary_data = [{
		ctc_effective    : '23/12/2000',
		ctc_effective_to : '-',
		monthly_gross    : data?.monthly_gross,
		monthly_ctc      : data?.monthly_ctc,
	},
	];
	const otherInfo = otherSalaryInfo;

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>

				<div className={styles.heading}>
					<div className={styles.flex}>
						<span className={styles.personal}>PAYMENT DETAILS</span>
						<span className={styles.detail}>View and manage salary details</span>
					</div>
					<Button
						themeType="secondary"
						onClick={() => push('/welcome?is_payslip=payslip')}
					>
						View Payslip

					</Button>
				</div>
				{
					loading ? null
						: (
							<>
								<div className={styles.info_container}>
									<span className={styles.head_text}>Salary Structure</span>
									<StyledTable columns={columns} data={salary_data} />
								</div>
								<div className={styles.info_container}>
									<span className={styles.head_text}>Active Recurring Payments</span>
									<StyledTable columns={columnsIrregular} data={data?.irregular_payment_details} />
								</div>

								<div className={styles.info_container}>
									<div className={styles.heading_one}>
										<div className={styles.head_text}>Payment Information</div>
										<Button
											size="md"
											themeType="secondary"
											onClick={() => handleOpenModal(bankInfo, data?.employee_bank_details)}
										>
											{' '}
											<IcMEdit />
											{' '}
											Edit
										</Button>
									</div>
									<div className={styles.details}>
										{
										bankInfo.map((item) => (
											<div className={styles.bank_detail} key={item.label}>
												<span className={styles.side_label}>
													{item.label}
												</span>
												<span className={styles.side_value}>
													{data?.employee_bank_details?.[item.value]}
												</span>
											</div>
										))
									}
									</div>
								</div>

								<div className={styles.info_container}>
									<div className={styles.heading_one}>
										<div className={styles.head_text}>PF, Professional Tax & ESIC</div>
									</div>
									<div className={styles.details}>
										{
										pfInfo.map((item) => (
											<div className={styles.bank_detail} key={item.label}>
												<span className={styles.side_label}>
													{item.label}
												</span>
												<span className={styles.side_value}>
													{
													data?.employee_salary_details?.statutory_details?.[item.value]
													=== 'active'
														? <IcCFtick /> : <IcMCrossInCircle />
}
													{startCase(data?.employee_salary_details?.statutory_details
														?.[item.value])}
												</span>
											</div>
										))
									}
									</div>
								</div>
							</>
						)
				}
				{
	loading ? null
		:	(
			<TaxStructure
				taxShow={taxShow}
				setTaxShow={setTaxShow}
				employee_id={data?.employee_salary_details?.employee_id}
			/>
		)
}
				<EditModal
					getEmployeePaymentDetails={getEmployeePaymentDetails}
					show={show}
					handleModal={handleModal}
					modalData={modalData}
					modalUpdateData={modalUpdateData}
				/>
			</div>
			{
				loading ? null
					: 	<RightGlancePayment otherInfo={otherInfo} data={data} />
			}

		</div>
	);
}

export default SalaryDetails;
