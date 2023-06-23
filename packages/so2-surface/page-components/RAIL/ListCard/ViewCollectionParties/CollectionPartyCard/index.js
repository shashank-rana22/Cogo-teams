import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';
import UploadedInvoices from './UploadedInvoices';

function CollectionPartyCard({ data }) {
	const [showInvoices, setShowInvoices] = useState(false);
	const services = [...new Set((data?.services || []).map((service) => startCase(service?.service_type)))];

	console.log(data);
	return (
		<main className={styles.main}>
			<section
				role="button"
				tabIndex={0}
				onClick={() => setShowInvoices(!showInvoices)}
				className={styles.section}
			>
				<div className={styles.org_details}>
					<Tooltip
						content={(
							<div style={{ fontSize: '10px' }}>
								{data?.service_provider?.business_name}
							</div>
						)}
					>
						<div className={styles.org}>{data?.service_provider?.business_name}</div>
					</Tooltip>
					<Tooltip
						content={
							(services || []).map((service) => (
								<div
									style={{ fontSize: '10px' }}
									key={service}
								>
									{service}
								</div>
							))
						}
					>
						<div className={styles.services}>
							Services :
							{' '}
							{(services || []).join(',')}
						</div>
					</Tooltip>
				</div>
				<div className={styles.live_invoice}>
					Live Invoice Value -
					<span style={{ color: '#5936F0', marginLeft: '4px' }}>
						{formatAmount({
							amount   : data?.invoice_total || 0,
							currency : data?.invoice_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</span>
				</div>
				<div className={styles.live_invoice}>
					Total Invoices -
					{' '}
					{data?.collection_parties?.length || 0}
				</div>
				<div className={styles.live_invoice}>
					No. of Line Items -
					{' '}
					{data?.total_line_items}
					<div className={styles.vertical_line} />
					Locked -
					{' '}
					{data?.locked_line_items}
				</div>
				<div className={styles.live_invoice}>
					{showInvoices ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
				</div>
			</section>
			{showInvoices ? <UploadedInvoices invoices={data?.collection_parties} /> : null}
		</main>
	);
}
export default CollectionPartyCard;
