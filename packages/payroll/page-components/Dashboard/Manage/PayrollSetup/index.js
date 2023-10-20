import { IcMArrowBack, IcMProfile, IcMLocation, IcMArrowRight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetSalaryConfigurations from '../../../../hooks/useGetSalaryConfigurations';

import PayrollStructure from './PayrollStructure';
import styles from './styles.module.css';

function PayrollSetup({ handleSetup = () => {} }) {
	const [show, setShow] = useState(false);
	const { data } = useGetSalaryConfigurations();
	const { list } = data || {};

	if (!show) {
		return (
			<div className={styles.main_container}>
				<div className={styles.container}>
					<div className={styles.header}>
						<div style={{ display: 'flex' }}>
							<div
								className={styles.arrow_back}
								aria-hidden
								onClick={() => handleSetup('')}
							>
								<IcMArrowBack width={20} height={20} />

							</div>
							<div className={styles.heading}>
								<div className={styles.upper_heading}>Payroll Setup</div>
								<div className={styles.lower_heading}>
									View and manage all payroll structures
								</div>
							</div>
						</div>
					</div>
					<div className={styles.card_heading}>
						ALL STRUCTURES
					</div>

					<div className={styles.card_container}>
						{(list || []).map((item) => (
							<div className={styles.card} aria-hidden key={item.key} onClick={() => setShow(true)}>
								<div className={styles.card_content}>
									<div className={styles.content_type}>
										{item.description}
									</div>
									<div className={styles.arrow_section}>
										<div>
											<div className={styles.below_text}>
												<IcMProfile />
												<span>{item.employee_count}</span>
												<IcMLocation />
												<span>{item.country_name}</span>
											</div>
										</div>
										<IcMArrowRight width={20} height={20} />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

			</div>
		);
	}
	return (
		<PayrollStructure setShow={setShow} data={data} />
	);
}

export default PayrollSetup;
