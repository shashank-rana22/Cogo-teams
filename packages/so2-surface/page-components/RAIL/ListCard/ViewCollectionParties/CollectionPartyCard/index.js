import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';
import UploadedInvoices from './UploadedInvoices';

const DEFAULT_INVOICE_VALUE = 0;
const DEFAULT_INVOICE_COUUNT = 0;

function CollectionPartyCard({ data }) {
	const [showInvoices, setShowInvoices] = useState(false);
	const services = [...new Set((data?.services || []).map((service) => startCase(service?.service_type)))];

	const isCollectionPartyAvailable = !isEmpty(data?.collection_parties);

	const getArrow = () => {
		if (!isCollectionPartyAvailable) return null;

		return showInvoices ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />;
	};

	return (
		<main className={styles.main}>
			<section
				role="button"
				tabIndex={0}
				onClick={() => (isCollectionPartyAvailable ? setShowInvoices(!showInvoices) : null)}
				style={isCollectionPartyAvailable ? { cursor: 'pointer' } : null}
				className={styles.section}
			>
				<div className={styles.org_details}>
					<Tooltip
						content={(
							<div className={styles.tooltip}>
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
									className={styles.tooltip}
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
				<div className={styles.live_invoice} style={{ width: '30%' }}>
					Live Invoice Value -&nbsp;
					<span className={styles.live_invoice_value}>
						{formatAmount({
							amount   : data?.invoice_total || DEFAULT_INVOICE_VALUE,
							currency : data?.invoice_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</span>
				</div>
				<div className={styles.live_invoice} style={{ width: '15%' }}>
					Total Invoices -
					{' '}
					{data?.collection_parties?.length || DEFAULT_INVOICE_COUUNT}
				</div>
				<div className={styles.live_invoice} style={{ width: '20%' }}>
					No. of Line Items -
					{' '}
					{data?.total_line_items}
					<div className={styles.vertical_line} />
					Locked -
					{' '}
					{data?.locked_line_items}
				</div>
				<div className={styles.arrow}>
					{getArrow()}
				</div>
			</section>
			{showInvoices ? <UploadedInvoices invoices={data?.collection_parties} /> : null}
		</main>
	);
}
export default CollectionPartyCard;
