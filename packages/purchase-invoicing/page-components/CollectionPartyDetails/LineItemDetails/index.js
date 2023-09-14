import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import React from 'react';

import AccordianView from '../../../common/Accordianview';
import getFormattedAmount from '../../../common/helpers/formatAmount';
import { lineItemConfig } from '../../../configurations/lineitemsconfig';
import { EMPTY_LINE_ITEMS } from '../../../constants';
import { renderLineItemFunctions } from '../../RenderFunctions/renderLineItemFunction';

import styles from './styles.module.css';

const ONE = 1;
const HUNDRED = 100;
const TWELVE = 12;
const ZERO = 0;

function LineItemDetails({
	control = {},
	watch = () => {},
	serviceProvider = {},
	collectionParty = {},
	collectionPartyAddresses = [],
	billingParty = {},
	setCodes = () => {},
	calculatedValues = {},
	invoiceCurrency = '',
	errors = {},
	errMszs = {},
	open = false,
	shipmentId = '',
	shipment_data = {},
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'line_items',
	});

	const SERVICE_NAMES = [];
	(serviceProvider?.services || []).map((service) => {
		if (service?.service_type !== 'subsidiary_service') {
			SERVICE_NAMES.push(service?.service_type);
		}
		return SERVICE_NAMES;
	});

	const collectionPartyTaxNumber = watch('collection_party_address');

	const organizationBillingId = collectionPartyAddresses?.find(
		(item) => item?.value === collectionPartyTaxNumber,
	)?.id;

	const railscontainers = [
		{
			label : 'Container Number',
			span  : 3.6,
			key   : 'container_number',
		},
	];
	const TRUCK_NUMBER = [{
		label : 'Truck Number',
		span  : 1.8,
		key   : 'truck_number',
	}];
	const finalLineItemConfig = serviceProvider?.shipment_type === 'rail_domestic_freight'
		? [...TRUCK_NUMBER, ...lineItemConfig, ...railscontainers] : [...TRUCK_NUMBER, ...lineItemConfig];

	return (
		<AccordianView title="Line Item Details" fullwidth showerror={errMszs.line_items} open={open}>
			<div className={styles.border}>
				<div className={styles.tableheader}>
					{(finalLineItemConfig).map((field) => (
						<div
							style={{
								flex  : (field.span || ONE),
								width : `${((field.span || ONE) * (HUNDRED / TWELVE))}px`,
							}}
							className={styles.fieldstyle}
							key={field.key || field.label}
						>
							{field.label}
						</div>
					))}
				</div>
				<div>
					{fields.map((lineitem, index) => (
						<div className={styles.tablecolumn} key={lineitem.id}>
							{finalLineItemConfig.map((field) => (
								<div
									style={{
										flex  : (field.span || ONE),
										width : `${((field.span || ONE) * (HUNDRED / TWELVE))}px`,
									}}
									className={styles.value}
									key={field.key || field.label}
								>
									{renderLineItemFunctions[field?.key]
										? renderLineItemFunctions[field?.key]({
											control,
											index,
											remove,
											showDelete       : fields?.length > ONE,
											calculatedValues : calculatedValues?.newItems,
											extradata        : {
												organization_id         : serviceProvider?.service_provider_id,
												organization_billing_id : organizationBillingId,
												entity_id               : billingParty?.id,
												organization_trade_party_detail_id:
													collectionParty?.organization_trade_party_detail_id,
												serviceNames  : SERVICE_NAMES,
												shipment_type : shipment_data?.shipment_type,
											},
											errors,
											setCodes,
											shipmentId,
											serviceProvider,
										}) : '-'}
								</div>
							))}
						</div>
					))}
					<div className={styles.addbuttonborder}>
						<Button
							className={styles.addbutton}
							onClick={() => { append(EMPTY_LINE_ITEMS); }}
						>
							+ Add
						</Button>
					</div>
					<div className={`${styles.flex} ${styles.spacebetween}`}>
						<div className={styles.padding}>
							<div>T: Taxable P: Pure Agent E: Exempted N: Nil Rated</div>
							<div>NG: Non GST R: Reverse Charge</div>
						</div>
						<div className={`${styles.flex} ${styles.label}`}>
							<div className={styles.amount}>
								<div className={styles.label}>
									Total Tax
								</div>
								<div className={styles.label}>
									{getFormattedAmount(calculatedValues?.total_tax_amount || ZERO, invoiceCurrency)}
								</div>
							</div>
							<div className={styles.amount}>
								<div className={styles.label}>
									Total Cost
								</div>
								<div className={styles.label}>
									{getFormattedAmount(calculatedValues?.sub_total_amount || ZERO, invoiceCurrency)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.total} ${styles.tax}`}>
					<div>Total Amount After Tax :</div>
					<span className={styles.keyvalue}>
						{getFormattedAmount(calculatedValues?.invoice_amount || ZERO, invoiceCurrency)}
					</span>
				</div>
			</div>
		</AccordianView>
	);
}

export default LineItemDetails;
