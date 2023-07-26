import { Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCopy } from '@cogoport/icons-react';
import React from 'react';

import copyToClipboard from '../../../../helpers/copyToClipboard';

import styles from './styles.module.css';

function SuccessModal({
	show = false,
	setShow = () => {},
	promocode = '',
	validityEnd = '',
	allotedAmountLeft = 0,
}) {
	const onClose = () => setShow(false);

	const onClickCopy = () => {
		copyToClipboard(promocode, 'Promo Code');
	};

	return (
		<Modal
			size="md"
			show={show}
			onClose={onClose}
			placement="top"
		>
			<div className={styles.container}>
				<div className={styles.title}>Congratulations!</div>

				<div className={styles.wrapper}>
					<span className={styles.text}>You have successfully generated a Promo Code</span>

					<span className={styles.text}>
						Valid till
						{' '}
						<strong>
							{formatDate({
								date       : validityEnd,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</strong>
					</span>
				</div>

				<div className={styles.balance_container}>
					<span className={styles.text} style={{ margin: '0 4px' }}>Balance Remaining - </span>

					<strong>
						{formatAmount({
							amount   : allotedAmountLeft,
							currency : GLOBAL_CONSTANTS.currency_code.USD,
							options  : {
								style                 : 'currency',
								notation              : 'compact',
								compactDisplay        : 'short',
								minimumFractionDigits : 2,
							},
						})}
					</strong>
				</div>

				<div className={styles.copy_container}>
					{promocode}
					<IcMCopy
						width={18}
						height={18}
						onClick={onClickCopy}
						className={styles.copy_icon}
					/>
				</div>
			</div>
		</Modal>
	);
}

export default SuccessModal;
