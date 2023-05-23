import { Button, Modal, Toast } from '@cogoport/components';
import {
	AsyncSelectController,
	DatepickerController,
	InputController,
	SelectController,
	TextAreaController,
	useForm,
} from '@cogoport/forms';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import React, { useEffect } from 'react';

import getFormattedAmount from '../../../commons/Utils/getFormattedAmount';
import { EMPTY_LINE_ITEMS } from '../../../Constants';
import formatCreateJvPayload from '../../../helpers/formatCreateJvPayload';
import useCreateJv from '../../../hooks/useCreateJv';
import useGetExchangeRate from '../../../hooks/useGetExchangeRate';
import useGetGlCode from '../../../hooks/useGetGlcode';

import LineItemDetails from './LineItemDetails';
import styles from './styles.module.css';

interface Props {
	show: boolean;
	onClose: () => void;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	refetch: () => void;
}

function CreateJvModal({ show, onClose = () => {}, setShow, refetch }:Props) {
	const { control, watch, handleSubmit, setValue, formState: { errors = {} } } = useForm({
		defaultValues:
		{
			entityCode     : '',
			ledCurrency    : '',
			category       : '',
			currency       : '',
			accountingDate : new Date(),
			journal        : '',
			exchangeRate   : '',
			description    : '',
			line_items     : [EMPTY_LINE_ITEMS],
		},
	});

	const formValues = watch();

	const fromCurrency = formValues?.currency;
	const toCurrency = formValues?.ledCurrency;
	const lineItems = formValues?.line_items;
	const entity = formValues?.entityCode;

	const { getExchangeRate } = useGetExchangeRate({
		from_cur : fromCurrency,
		to_cur   : toCurrency,
		setValue,
	});

	const { getGlCode } = useGetGlCode();

	useEffect(() => {
		if (formValues?.currency) {
			getExchangeRate();
		}
	}, [formValues?.currency, getExchangeRate]);

	useEffect(() => {
		if (entity) {
			lineItems?.forEach((item, index) => {
				getGlCode({ index, entityCode: entity, accMode: item?.accMode, setValue });
			});
		}
	}, [entity, lineItems, setValue, getGlCode]);

	const { create, loading } = useCreateJv({ setShow, refetch });

	const debitAmount = formValues?.line_items
		?.filter((lineItem) => lineItem?.type === 'DEBIT')
		?.reduce((sum, num) => Number(sum || 0) + Number(num?.amount || 0), 0);

	const creditAmount = formValues?.line_items
		?.filter((lineItem) => lineItem?.type === 'CREDIT')
		?.reduce((sum, num) => Number(sum || 0) + Number(num?.amount || 0), 0);

	const balanceAmount = Number(debitAmount || 0) - Number(creditAmount || 0);

	const onSubmit = (formdata) => {
		if (balanceAmount === 0) {
			const formattedData = formatCreateJvPayload(formdata);
			create(formattedData);
		} else {
			Toast.error('Balance Amount Must Be Zero');
		}
	};

	const handleEntityChange = (val, obj) => {
		setValue('ledCurrency', obj?.ledger_currency);
		setValue('currency', obj?.ledger_currency);
	};

	return (
		<Modal size="xl" show={show} onClose={onClose} placement="center">
			<Modal.Header title="Create JV Modal" />
			<Modal.Body className={styles.modal_data}>
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
				<div className={styles.statflex}>
					<div className={styles.stat}>
						<div className={styles.statlabel}>
							Debit
						</div>
						<div className={styles.value}>
							{getFormattedAmount({ amount: debitAmount, currency: fromCurrency })}
						</div>
					</div>
					<div className={styles.stat}>
						<div className={styles.statlabel}>Credit</div>
						<div className={styles.value}>
							{getFormattedAmount({ amount: creditAmount, currency: fromCurrency }) }
						</div>
					</div>
					<div className={styles.stat}>
						<div className={styles.statlabel}>Balance</div>
						<div className={styles.value}>
							{getFormattedAmount({ amount: balanceAmount, currency: fromCurrency })}
						</div>
					</div>
				</div>
				<LineItemDetails
					control={control}
					watch={watch}
					entity={entity}
					errors={errors}
					getGlCode={getGlCode}
					setValue={setValue}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onClose} themeType="secondary">Cancel</Button>
				<Button
					className={styles.createjv}
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
				>
					Create Jv
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateJvModal;
