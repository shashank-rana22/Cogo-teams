import {
	AsyncSelectController,
	DatepickerController,
	InputController,
	SelectController,
	TextAreaController,
} from '@cogoport/forms';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import React from 'react';

import styles from './styles.module.css';

function DetailsForm({ errors, control, handleEntityChange, fromCurrency, toCurrency }) {
	return (
		<>
			<div className={styles.flex}>
				<div className={`${styles.selectcontainer} ${styles.marginright}`}>
					<div className={styles.label}>Site/Entity</div>
					<AsyncSelectController
						control={control}
						name="entityCode"
						asyncKey="list_cogo_entity"
						onChange={handleEntityChange}
						renderLabel={(item) => (`${item?.entity_code} - ${item?.business_name}`)}
						placeholder="Select Entity"
						labelKey="entity_code"
						initialCall
						rules={{ required: true }}
					/>
					{errors?.entityCode ? (
						<div className={styles.errors}>
							* Required
						</div>
					) : null}
				</div>
				<div className={`${styles.selectcontainer} ${styles.marginright}`}>
					<div className={styles.label}>JV Category</div>
					<AsyncSelectController
						control={control}
						name="category"
						asyncKey="journal_category"
						renderLabel={(item) => (`${item?.category} - ${item?.description}`)}
						placeholder="JV Category"
						initialCall
						rules={{ required: true }}
					/>
					{errors?.category ? (
						<div className={styles.errors}>
							* Required
						</div>
					) : null}
				</div>
				<div className={`${styles.selectcontainer} ${styles.marginright}`}>
					<div className={styles.label}>Currency</div>
					<SelectController
						control={control}
						name="currency"
						options={getCurrencyOptions()}
						placeholder="Select Currency"
						rules={{ required: true }}
					/>
					{errors?.currency ? (
						<div className={styles.errors}>
							* Required
						</div>
					) : null}
				</div>
				<div className={`${styles.datecontainer} ${styles.marginright}`}>
					<div className={styles.label}>Accounting Date</div>
					<DatepickerController
						control={control}
						name="accountingDate"
						placeholder="Accounting Date"
						rules={{ required: true }}
					/>
					{errors?.accountingDate ? (
						<div className={styles.errors}>
							* Required
						</div>
					) : null}
				</div>
				<div className={`${styles.selectcontainer} ${styles.marginright}`}>
					<div className={styles.label}>Journal</div>
					<AsyncSelectController
						control={control}
						name="journal"
						asyncKey="journal_code"
						placeholder="Select Journal"
						initialCall
						renderLabel={(item) => (`${item?.number} - ${item?.description}`)}
						rules={{ required: true }}
					/>
					{errors?.journal ? (
						<div className={styles.errors}>
							* Required
						</div>
					) : null}
				</div>
				<div className={`${styles.inputcontainer} ${styles.marginright}`}>
					<div className={styles.label}>Enter Exchange Rate</div>
					<InputController
						control={control}
						disabled={fromCurrency === toCurrency}
						name="exchangeRate"
						placeholder="Exchange Rate"
						rules={{ required: true }}
						type="number"
					/>
					{errors?.exchangeRate ? (
						<div className={styles.errors}>
							* Required
						</div>
					) : null}
				</div>
				<div className={`${styles.selectcontainer} ${styles.marginright}`}>
					<div className={styles.label}>Ledger Currency</div>
					<SelectController
						control={control}
						name="ledCurrency"
						disabled
						placeholder="Ledger Currency"
						options={getCurrencyOptions()}
					/>
				</div>
			</div>
			<div className={`${styles.textareacontroller} ${styles.marginright}`}>
				<div className={styles.label}>Description</div>
				<TextAreaController
					control={control}
					name="description"
					placeholder="JV Description"
					rules={{ required: true }}
				/>
				{errors?.description ? (
					<div className={styles.errors}>
						* Required
					</div>
				) : null}
			</div>

		</>
	);
}

export default DetailsForm;
