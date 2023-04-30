import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import AccordianView from '../../common/Accordianview';
import getFormattedAmount from '../../common/helpers/formatAmount';
import ServiceTables from '../../common/ServiceTable';
import ToolTipWrapper from '../../common/ToolTipWrapper';
import InvoicesInProcess from '../InvoicesInProcess';
import InvoicesUploaded from '../InvoicesUploaded';

import styles from './styles.module.css';

function CollectionPartyDetails({ collectionParty }) {
	const services = (collectionParty?.services || []).map(
		(service) => service?.service_type,
	);

	const serviceswrapper = (allservices) => (
		<>
			{(allservices || []).map((ser, i) => (
				<span>
					{startCase(ser)}
					{' '}
					{(services).length - 1 === i ? '' : ', '}
				</span>
			))}
		</>
	);
	const titleCard = (
		<div className={styles.container_title}>
			<div className={styles.customer}>
				<div className={styles.heading}>
					<ToolTipWrapper text={collectionParty?.service_provider?.business_name} maxlength={25} />
				</div>
				<div className={styles.servicename}>
					<span className={styles.spankey}>Services :</span>
					<ToolTipWrapper
						text={services}
						maxlength={2}
						content={(
							<>
								{serviceswrapper(services)}
							</>
						)}
					>
						{serviceswrapper(services?.slice(0, 2) || [])}
						{services.length > 2 ? '...' : ''}
					</ToolTipWrapper>
				</div>
			</div>
			<div className={styles.invoices}>
				<div>
					Total Invoice Value -
				</div>
				<div className={styles.value}>
					<ToolTipWrapper
						text={getFormattedAmount(
							collectionParty.invoice_total,
							collectionParty.invoice_currency,
						)}
						maxlength={25}
					/>
					<span style={{ paddingLeft: '4px' }}>
						{' '}
						- (
						{collectionParty?.collection_parties?.length || 0}
						)
					</span>
				</div>
			</div>
			<div className={styles.lineitems}>
				<div>
					No. Of Line Items -
					{' '}
					{collectionParty?.total_line_items}
					{' '}
					| Locked -
					{' '}
					{ collectionParty?.locked_line_items}
				</div>
			</div>
			<div className={styles.mode}>
				<span className={styles.tag}>Cash</span>
			</div>
		</div>
	);

	return (
		<div className={styles.container}>
			<AccordianView title={titleCard}>
				<InvoicesUploaded
					invoicesdata={collectionParty?.existing_collection_parties}
					collectionParty={collectionParty}
				/>
				<InvoicesInProcess invoicesdata={collectionParty?.existing_collection_parties} />
				<span className={styles.headings}>Live Invoice</span>
				<div className={styles.buttoncontailner}>
					<Button size="md" themeType="secondary" style={{ marginRight: '16px' }}>Upload Invoice</Button>
					<Button size="md" themeType="secondary">Add Incidental Charges</Button>
				</div>
				<ServiceTables service_charges={collectionParty?.service_charges} />
			</AccordianView>
		</div>
	);
}

export default CollectionPartyDetails;
