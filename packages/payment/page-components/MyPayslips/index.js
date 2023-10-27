import { Select, ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight, IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import StyledTable from '../../common/StyledTable/index';
import useGetListPayslip from '../../hooks/useGetListPayslip';
import useGetPayslipYears from '../../hooks/useGetPayslipYears';

import PaySlipModal from './PaySlipModal';
import styles from './styles.module.css';
import useGetColumns from './useGetColumns';

function MyPayslips() {
	const [showModal, setShowModal] = useState(false);
	const [modalUrl, setModalUrl] = useState({});
	const [documentType, setDocumentType] = useState('');
	const router = useRouter();

	const columns = useGetColumns(setShowModal, setModalUrl, setDocumentType);

	const { data: payslipYearData, year, setYear } = useGetPayslipYears();
	const yearOptions = payslipYearData?.map(
		(financialYear) => (
			{
				label : `${financialYear} - ${financialYear + GLOBAL_CONSTANTS.one}`,
				value : financialYear,
			}
		),
	);

	const { loading, data: payslipData } = useGetListPayslip(parseInt(year, 10));

	const rightForms = [
		{ heading: 'Form 16s', subheading: 'View and download form 16s' },
		// { heading: 'Salary Advance', subheading: 'Request an salary advance' },
		{ heading: 'Raise Dispute', subheading: 'Have issues with the salary credited?' },
	];

	return (
		<div className={styles.main_container}>
			<div className={styles.left_container}>
				<div className={styles.flex}>
					{/* <IcMArrowBack width={18} height={18} onClick={() => router.push('/payroll')} /> */}
					<div className={styles.heading_container}>
						<span className={styles.heading}>MY PAYSLIPS</span>
						<span className={styles.subheading}>View all you payslips</span>
					</div>
				</div>
				<div className={styles.table_container}>
					<div className={styles.left_flex}>
						<span className={styles.table_heading}>Monthly Payslips</span>
						<Select
							placeholder="Select financial year"
							value={year}
							onChange={setYear}
							options={yearOptions}
						/>
					</div>
					<StyledTable columns={columns} data={payslipData} loading={loading} />
				</div>
			</div>
			<div className={styles.right_container}>
				<div className={styles.right_flex}>
					<span className={styles.heading}>RELATED LINKS</span>
					<span className={styles.subheading}>Related links you might be looking for</span>
				</div>
				<div className={styles.white_container}>
					{
						rightForms.map(({ heading, subheading }) => (
							<div className={styles.white_subcontainer} key={heading}>
								<div className={styles.right}>
									<span className={styles.heading}>{heading}</span>
									<span className={styles.subheading}>{subheading}</span>
								</div>
								<div className={styles.right}>
									<ButtonIcon
										size="lg"
										icon={<IcMArrowRight width={18} height={18} />}
										themeType="primary"
									/>
								</div>
							</div>
						))
					}
				</div>
			</div>
			{
				loading ? null
					: (
						<PaySlipModal
							showModal={showModal}
							modalUrl={modalUrl}
							documentType={documentType}
							setShowModal={setShowModal}
						/>
					)

			}

		</div>
	);
}

export default MyPayslips;
