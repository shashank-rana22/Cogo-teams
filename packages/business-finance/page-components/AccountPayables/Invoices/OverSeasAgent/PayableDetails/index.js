import { Button, Pill, Popover, Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useOverSeasHeader from '../../hooks/useOverSeasHeader';

import Content from './Content';
import Contents from './Contents';
import styles from './styles.module.css';

function PayabledDetails({ organizationId = '', showPayableAmount = '', currency = 'INR' }) {
	const { data = {}, loading = false } = useOverSeasHeader({ organizationId });

	const {
		kycStatus = '',
		organizationName,
		totalReceivables,
		panUrl = '',
		businessAddressProofUrl = '',
		supplierAgreementWithCogoport = '',
		cogoportAgreementWithSupplier = '',
	} = data || {};
	const [isOpen, setIsOpen] = useState(false);

	if (loading) {
		return (
			<Placeholder height="100px" />
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<div className={styles.display_name}>
					Name -
					{' '}
					{organizationName}
				</div>
				<div className={styles.display_status}>
					<Pill>OVERSEAS AGENT</Pill>

					{kycStatus && (
						<div className={styles.verified}>
							<IcCFtick />

							<div>{kycStatus}</div>
						</div>
					)}
				</div>
			</div>

			<div className={styles.line} />

			<div className={styles.amount_container}>
				<div className={styles.amount}>
					Amount Payables :
					{' '}
					{formatAmount({
						amount  : showPayableAmount,
						currency,
						options : {
							currencyDisplay       : 'symbol',
							style                 : 'currency',
							minimumFractionDigits : 0,
						},
					})}
				</div>

				<div className={styles.amount}>
					Amount Receivables :
					{' '}
					{formatAmount({
						amount  : totalReceivables,
						currency,
						options : {
							currencyDisplay       : 'symbol',
							style                 : 'currency',
							minimumFractionDigits : 0,
						},
					})}
				</div>
			</div>

			<div className={styles.line} />

			<div className={styles.btn_container}>
				<div>
					<Popover
						show={isOpen}
						content={<Content panUrl={panUrl} businessAddressProofUrl={businessAddressProofUrl} />}
						theme="light"
						interactive
					>
						<Button onClick={() => setIsOpen(true)} className={styles.btn} themeType="secondary">
							Agreement
						</Button>
					</Popover>
				</div>
				<div>
					<Popover
						show={isOpen}
						content={(
							<Contents
								supplierAgreementWithCogoport={supplierAgreementWithCogoport}
								cogoportAgreementWithSupplier={cogoportAgreementWithSupplier}
							/>
						)}
						theme="light"
						interactive
					>
						<Button onClick={() => setIsOpen(true)} className={styles.btn} themeType="accent">
							Other Documents
						</Button>
					</Popover>
				</div>
			</div>
		</div>
	);
}

export default PayabledDetails;
