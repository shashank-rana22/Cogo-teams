import { Tabs, TabPanel, Select } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useGetListPayrollYear from '../../../../hooks/useGetListEmployeePayrollYear';
import useGetListPayrollDetail from '../../../../hooks/useGetListPayrollDetail';
import { tabData } from '../../../../utils/constants';
import InitiatePayrollMap from '../../InitiatePayroll/InitiatePayrollMap';

import CompletedTab from './Completed';
import Heading from './Heading';
import RelatedLinks from './RelatedLinks';
import styles from './styles.module.css';

const INCREMENT = 1;
function Payroll() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('paid');
	const [value, setValue] = useState('');
	const { loading, data, setFilters, refetch } = useGetListPayrollDetail({ activeTab });
	const { loading:yearsloading, data: datesdata } = useGetListPayrollYear();
	const [showPayroll, setshowPayroll] = useState('');
	const [id, setId] = useState('');
	const [from_payroll, setFromPayroll] = useState('');

	const OPTIONS = [];
	if (!yearsloading) {
		datesdata?.forEach((item) => OPTIONS.push({
			label: `${item} - ${item + INCREMENT}`, value: item,
		}));
	}

	useEffect(() => {
		if (router.query.run) {
			setshowPayroll(router.query.run);
		} else {
			setshowPayroll('');
			setFromPayroll('');
			refetch();
		}
	}, [refetch, router.query]);

	const handleSetup = (route_value) => {
		setshowPayroll(route_value);
		router.push(`/payroll/payroll?run=${route_value}`);
	};

	if (showPayroll === 'run_payroll') {
		return (
			<InitiatePayrollMap
				handleSetup={handleSetup}
				from_payroll={from_payroll}
				id={id}
				setFromPayroll={setFromPayroll}
				refetch={refetch}
			/>
		);
	}
	return (
		<div className={styles.main_container}>
			<Heading data={data} handleSetup={handleSetup} />
			<div className={styles.sub_container}>
				<div className={styles.left_container}>
					<div className={styles.top_text_container}>
						<span className={styles.top_bold_text}>ALL PAYROLLS</span>
						<span className={styles.top_grey_text}>View and manage all parolls</span>
					</div>
					<div className={styles.tab_bar}>
						<Tabs
							activeTab={activeTab}
							className={styles.tabs}
							themeType="tertiary"
							onChange={setActiveTab}
						>
							{tabData.map((item) => (
								<TabPanel key={item.name} name={item.name} title={item.title} />
							))}
						</Tabs>
						{
							yearsloading ? null
								: (
									<Select
										value={value}
										onChange={(val) => {
											setFilters((prev) => ({ ...prev, financial_year: val })); setValue(val);
										}}
										placeholder="Select year"
										options={OPTIONS}
										className={styles.select_input}
									/>
								)

						}

					</div>
					{
						loading ? null : (
							<CompletedTab
								data={data}
								activeTab={activeTab}
								handleSetup={handleSetup}
								setId={setId}
								setFromPayroll={setFromPayroll}
							/>
						)
					}
				</div>

				<div className={styles.right_container}>
					<div className={styles.top_text_container}>
						<span className={styles.top_bold_text}>RELATED LINKS</span>
						<span className={styles.top_grey_text}>Related links you might be looking for</span>
					</div>
					<RelatedLinks />
				</div>
			</div>
		</div>

	);
}

export default Payroll;
