import { Button } from '@cogoport/components';
import { IcMArrowBack, IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import SectionEightyC from './Section80C';
import styles from './styles.module.css';

function TaxSubmissions() {
	const [show, setShow] = useState(false);
	const [toAdd, setToAdd] = useState(false);

	if (!toAdd) {
		return (
			<div className={styles.main_container}>
				<div className={styles.container}>
					<div className={styles.header}>
						<div style={{ display: 'flex' }}>
							<div
								className={styles.arrow_back}
								aria-hidden
							>
								<IcMArrowBack width={20} height={20} />

							</div>
							<div className={styles.heading}>
								<div className={styles.upper_heading}>tax submissions</div>
								<div className={styles.lower_heading}>
									Declare your investment & other amounts
								</div>
							</div>
						</div>
					</div>

					<div className={styles.card_container}>
						<div className={styles.card}>
							<div className={styles.header} aria-hidden onClick={() => setShow(!show)}>
								<div className={styles.upper_heading}>
									Section 80
									(investments, medical insurance etc.)
								</div>
								<div className={styles.button_add_service_container}>
									<Button
										onClick={(e) => { e.stopPropagation(); setToAdd(true); }}
										className={styles.add_service_button}
										size="md"
										themeType="secondary"
									>
										+ Add
									</Button>
									<IcMArrowDown
										width={16}
										height={16}
										className={show ? styles.caret_active : styles.caret_arrow}
									/>
								</div>
							</div>

							<div className={show ? styles.item_container : styles.item_container_closed}>
								<div className={styles.item}>
									<span>Amount</span>
									<span>-</span>
								</div>
								<div className={styles.item}>
									<span>Amount</span>
									<span>-</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<SectionEightyC setToAdd={setToAdd} />
	);
}

export default TaxSubmissions;
