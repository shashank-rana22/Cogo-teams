import { Button } from '@cogoport/components';
import { DatepickerController, InputController, useFieldArray, SelectController } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import options from '../../../common/currencies';
import { EMPTY_EXCHANGE_RATES } from '../../../constants';

import styles from './styles.module.css';

function PurchaseInvoiceDates({
	control,
	invoiceCurrency,
	errors,
	purchaseInvoiceValues,
}) {
	const geo = getGeoConstants();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'exchange_rate',
	});

	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>Purchase Invoice</h3>
			<div className={styles.formcontainer}>
				<div className={styles.datecontainer}>
					<div className={styles.label}>Select Invoice Date</div>
					<DatepickerController
						control={control}
						name="invoice_date"
						placeholder="Select Invoice Date"
						rules={{ required: true }}
						value={purchaseInvoiceValues?.invoice_date
							? new Date(purchaseInvoiceValues?.invoice_date) : null}
					/>
					{errors?.invoice_date && (
						<div className={`${styles.errors}`}>
							Invoice Date is Required
						</div>
					)}
				</div>
				<div className={styles.datecontainer}>
					<div className={styles.label}>Select Invoice Due Date </div>
					<DatepickerController
						control={control}
						name="due_date"
						placeholder="Select Invoice Due Date"
						rules={{ required: true }}
						value={purchaseInvoiceValues?.due_date
							? new Date(purchaseInvoiceValues?.due_date) : null}
					/>
					{errors?.due_date && (
						<div className={`${styles.errors}`}>
							Invoice Due Date is Required
						</div>
					)}
				</div>
				<div className={`${styles.selectcontainer} ${styles.marginleft}`}>
					<div className={styles.label}>Enter Invoice Currency</div>
					<SelectController
						control={control}
						name="invoice_currency"
						placeholder={`Eg: ${geo.country.currency.code}`}
						options={options}
						rules={{ required: true }}
						value={purchaseInvoiceValues?.invoice_currency}
					/>
					{errors?.invoice_currency && (
						<div className={`${styles.errors}`}>
							Invoice Currency is Required
						</div>
					)}
				</div>
				<div className={styles.exchangeratecontainer}>
					<div className={styles.label}>Declared Exchange Rates</div>
					{fields.map((item, index) => (
						<div className={styles.flex} key={item.id}>
							<div className={styles.selectcontainer}>
								<div className={styles.label}>From</div>
								<SelectController
									control={control}
									name={`exchange_rate.${index}.from_currency`}
									placeholder={`Eg: ${geo.country.currency.code}`}
									options={options}
									rules={{ required: true }}
								/>
								{errors?.exchange_rate?.[index]?.from_currency && (
									<div className={`${styles.errors}`}>
										From currency Required
									</div>
								)}
							</div>
							<div className={`${styles.selectcontainer} ${styles.marginleft}`}>
								<div className={styles.label}>To</div>
								<SelectController
									control={control}
									name={`exchange_rate.${index}.to_currency`}
									placeholder={`Eg: ${geo.country.currency.code}`}
									asyncKey="currencies"
									options={options}
									value={invoiceCurrency}
									disabled
									rules={{ required: true }}
								/>
								{errors?.exchange_rate?.[index]?.to_currency && (
									<div className={`${styles.errors}`}>
										To currency Required
									</div>
								)}
							</div>
							<div className={`${styles.inputcontainer} ${styles.marginleft}`}>
								<div className={styles.label}>Rate</div>
								<InputController
									name={`exchange_rate.${index}.rate`}
									control={control}
									placeholder="Rate"
									rules={{ required: true }}
								/>
								{errors?.exchange_rate?.[index]?.rate && (
									<div className={`${styles.errors}`}>
										Rate Required
									</div>
								)}
							</div>
							<span className={styles.delete}>
								<IcMDelete
									className={styles.pointer}
									height={20}
									width={20}
									onClick={() => remove(index)}
								/>
							</span>
						</div>
					))}
					<Button className={styles.addbutton} onClick={() => { append(EMPTY_EXCHANGE_RATES); }}> Add</Button>
				</div>
			</div>
		</div>
	);
}

export default PurchaseInvoiceDates;
