import { cl, Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from '../styles.module.css';

const FIRST_PARAMETER = 1;

function LinersExchangeRateConfirm({
	invoice = {},
	setShowExchangeRateConfirmation = () => {},
	setShow = () => {},
	showExchangeRateConfirmation = '',
}) {
	return (
		<Modal show={showExchangeRateConfirmation} onClose={() => setShow(false)} width={800} closeOnOuterClick={false}>
			<Modal.Header title="MARK AS REVIEWED - WARNING" />
			<Modal.Body>
				<div className={styles.form}>
					<div className={styles.message}>
						<IcMError width={30} height={30} fill="#ffe6a7" />
						<div className={styles.confirm_label}>
							Liners Exchange Rates are not available yet. Do you want to
							proceed with system exchange rates?
						</div>
					</div>

					{!isEmpty(invoice?.exchange_rates) ? (
						<div className={cl`${styles.heading} ${styles.sub_heading}`}>
							Declared Exchange Rates
						</div>
					) : null}

					{Object.keys(invoice?.exchange_rates)?.map((item) => (
						<div key={item} className={cl`${styles.flex} ${styles.row}`}>
							<div className={styles.title}>{item?.split('_')?.[GLOBAL_CONSTANTS.zeroth_index]}</div>
							<div className={styles.line} />

							<div className={styles.title}>{item?.split('_')?.[FIRST_PARAMETER]}</div>
							<div className={cl`${styles.line} ${styles.arrow}`} />

							<div className={cl`${styles.title} ${styles.value}`}>
								{invoice?.exchange_rates?.[item]}
							</div>
						</div>
					))}
				</div>
			</Modal.Body>
			<Modal.Footer className={styles.btn_div}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setShow(false)}
				>
					Close
				</Button>
				<Button
					size="md"
					onClick={() => setShowExchangeRateConfirmation(false)}
				>
					Proceed
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LinersExchangeRateConfirm;
