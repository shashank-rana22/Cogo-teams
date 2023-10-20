/* eslint-disable max-len */
import { IcCFtick, IcMCrossInCircle } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React from 'react';

import StyledTable from '../../../common/StyledTable';
import useGetEmployeeDirectoryPaymentDetail from '../../../hooks/useGetEmployeeDirectoryPaymentDetails';
// import { SalaryData } from '../../../utils/constants';
import { bankInfo, pfInfo } from '../../../utils/info';
import { otherSalaryInfo } from '../../../utils/otherInfo';

import RightGlancePayment from './RightGlance';
import styles from './styles.module.css';
// import useGetColumns from './useGetColumns';
import useGetIrregularColumns from './useGetIrregularColumns';

function SalaryDetails() {
	// const columns = useGetColumns();
	const columnsIrregular = useGetIrregularColumns();
	const router = useRouter();
	const employee_id = router.query?.employee_id;

	const { profile: { user } } = useSelector((state) => ({
		profile: state?.profile,
	}));

	const user_id = employee_id || user.id;
	const { data, loading } = useGetEmployeeDirectoryPaymentDetail(user_id);
	console.log(data);
	// const data = SalaryData;
	const otherInfo = otherSalaryInfo;

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>

				<div className={styles.heading}>
					<span className={styles.personal}>PAYMENT DETAILS</span>
					<span className={styles.detail}>View and manage salary details</span>
				</div>
				{
					loading ? null
						: (
							<>
								<div className={styles.info_container}>
									<span className={styles.head_text}>Active Recurring Payments</span>
									<StyledTable columns={columnsIrregular} data={data?.irregular_payment_details} />
								</div>

								<div className={styles.info_container}>
									<span className={styles.head_text}>Payment Information</span>
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
									<span className={styles.head_text}>PF, Professional Tax & ESIC</span>
									<div className={styles.details}>
										{
										pfInfo.map((item) => (
											<div className={styles.bank_detail} key={item.label}>
												<span className={styles.side_label}>
													{item.label}
												</span>
												<span className={styles.side_value}>
													{
													data?.employee_salary_details?.statuatory_details?.[item.value]
													=== 'active'
														? <IcCFtick /> : <IcMCrossInCircle />
}
													{startCase(data?.employee_salary_details?.statuatory_details?.[item.value])}
												</span>
											</div>
										))
									}
									</div>
								</div>
							</>
						)
				}

			</div>
			{
				loading ? null
					: 				<RightGlancePayment otherInfo={otherInfo} data={data} />
			}

		</div>
	);
}

export default SalaryDetails;
