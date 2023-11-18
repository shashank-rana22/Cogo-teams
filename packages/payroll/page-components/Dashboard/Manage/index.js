import { IcMCreditCard, IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import { PAYROLL_SETTINGS } from '../../../utils/constants';
import IrregularPayments from '../../IrregularPayments';
import Bonus from '../Bonus';

import PayrollSetup from './PayrollSetup';
import styles from './styles.module.css';

function Manage() {
	const router = useRouter();
	const [selectedSetup, setSelectedSetup] = useState('');

	useEffect(() => {
		if (router.query.type) {
			setSelectedSetup(router.query.type);
		} else {
			setSelectedSetup('');
		}
	}, [router.query]);

	const handleSetup = (value) => {
		setSelectedSetup(value);
		router.push(`/payroll/manage?type=${value}`);
	};

	const COMPONENT_KEY_MAPPING = {
		''                 : null,
		payroll_setup      : PayrollSetup,
		bonuses            : Bonus,
		irregular_payments : IrregularPayments,
	};

	const COMPONENT = COMPONENT_KEY_MAPPING[selectedSetup];
	if (COMPONENT) {
		return <COMPONENT handleSetup={handleSetup} />;
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.heading}>
						<div className={styles.upper_heading1}>MANAGE</div>
						<div className={styles.lower_heading}>
							Manage the payroll policies &
							related benefits
						</div>
					</div>
				</div>

				<div className={styles.card}>
					<div className={styles.card_header}>
						<div className={styles.icon}>
							<IcMCreditCard
								width={18}
								height={18}
								style={{ color: '#C26D1A' }}
							/>
						</div>
						<div className={styles.card_heading}>Payroll Settings</div>
					</div>

					<div className={styles.card_body}>
						{PAYROLL_SETTINGS.map((item) => (
							<div
								key={item.name}
								className={styles.card_content}
								aria-hidden
								onClick={() => { handleSetup(item.key); }}
							>
								<div className={styles.heading}>
									<div className={styles.upper_heading}>{item.name}</div>
									<div className={styles.lower_heading}>{item.subTopic}</div>
								</div>
								<div className={styles.arrow}><IcMArrowRight width={20} height={20} /></div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Manage;
