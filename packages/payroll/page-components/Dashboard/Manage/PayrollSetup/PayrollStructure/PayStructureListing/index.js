import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import useGetSalaryStructure from '../../../../../../hooks/useGetSalaryStructure';

import styles from './styles.module.css';

function PayStructureListing() {
	const { data:dataArr, searchQuery, setSearchQuery, debounceQuery } = useGetSalaryStructure();

	const handleSearch = (val) => {
		setSearchQuery(val);
		debounceQuery(val);
	};

	const list = Object.keys(dataArr || {}).map((key) => ({
		key,
		value: dataArr[key],
	}));

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.header}>Pay Structure Settings</div>
				<div className={styles.form_content}>
					<div className={styles.heading}>
						<div className={styles.upper_heading}>Cost to Company (CTC)</div>
						<div className={styles.lower_heading}>
							Please enter the amount
						</div>
					</div>
					<Input
						type="number"
						placeholder="Enter Amount"
						name="payroll_ctc"
						onChange={(e) => handleSearch(e)}
						value={searchQuery}
					/>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.salary_heading}>
					<span className={styles.heading_one}>salary component</span>
					<span className={styles.heading_two}>Annual salary</span>
					<span className={styles.heading_three}>monthly</span>
				</div>
				{(list || []).map((item) => (
					<div
						className={item.value.is_group === false
							? styles.salary_content : styles.grp_salary_content}
						key={item.key}
						style={{ backgroundColor: `${item.value.color}` }}
					>
						<span className={styles.content_one}>{item.value.heading}</span>
						<span className={styles.content_two}>
							{Math.max(
								GLOBAL_CONSTANTS.zeroth_index,
								item.value.yearlyValue,
							)}

						</span>
						<span className={styles.content_three}>
							{Math.max(
								GLOBAL_CONSTANTS.zeroth_index,
								item.value.monthlyValue,
							)}

						</span>
					</div>
				))}
			</div>
		</div>

	);
}

export default PayStructureListing;
