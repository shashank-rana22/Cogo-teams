import { Button, Pill, Popover } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useOverSeasHeader from '../../hooks/useOverSeasHeader';

import styles from './styles.module.css';

function PayabledDetails({ organizationId = '', showPayableAmount = '', currency = 'INR' }) {
	const { data } = useOverSeasHeader({ organizationId });

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

	function Content() {
		return (
			<>
				<div>
					{panUrl ? (
						<Button
							size="md"
							themeType="linkUi"
							onClick={() => window.open(panUrl, '_blank')}
						>
							Pan Document
						</Button>
					) : (
						<text>Pan not present :-</text>
					) }
				</div>

				<div>
					{businessAddressProofUrl ? (
						<Button
							size="md"
							themeType="linkUi"
							onClick={() => window.open(businessAddressProofUrl, '_blank')}
						>
							Business Address Proof
						</Button>
					) : (
						<text>Business Address Proof not present :-</text>
					) }
				</div>
			</>
		);
	}

	function Contents() {
		return (
			<>
				<div>
					{supplierAgreementWithCogoport ? (
						<Button
							size="md"
							themeType="linkUi"
							onClick={() => window.open(supplierAgreementWithCogoport, '_blank')}
						>
							Supplier&apos;s Agreement With Cogoport
						</Button>
					) : (
						<text>Supplier&apos;s Agreement not present :-</text>
					) }
				</div>
				<div>
					{cogoportAgreementWithSupplier ? (
						<Button
							size="md"
							themeType="linkUi"
							onClick={() => window.open(cogoportAgreementWithSupplier, '_blank')}
						>
							Cogoport Agreement With Supplier
						</Button>
					) : (
						<text>Cogoport&apos;s Agreement not present :-</text>
					) }
				</div>
			</>
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
					<Popover show={isOpen} content={<Content />} theme="light" interactive>
						<Button onClick={() => setIsOpen(true)} className={styles.btn} themeType="secondary">
							Agreement
						</Button>
					</Popover>
				</div>
				<div>
					<Popover show={isOpen} content={<Contents />} theme="light" interactive>
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
