import { Button, Modal, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import getFormattedAmount from '../../../commons/Utils/getFormattedAmount';
import { EMPTY_LINE_ITEMS } from '../../../Constants';
import formatCreateJvPayload from '../../../helpers/formatCreateJvPayload';
import useCreateJv from '../../../hooks/useCreateJv';
import useGetExchangeRate from '../../../hooks/useGetExchangeRate';
import useGetGlCode from '../../../hooks/useGetGlcode';

import DetailsForm from './DetailsForm';
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

	useEffect(() => {
		if (formValues?.currency) {
			getExchangeRate();
		}
	}, [formValues?.currency, getExchangeRate]);

	const { getGlCode } = useGetGlCode();

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
			<Modal.Header title="Create JV" />
			<Modal.Body className={styles.modal_data}>
				<DetailsForm
					errors={errors}
					control={control}
					handleEntityChange={handleEntityChange}
					fromCurrency={fromCurrency}
					toCurrency={toCurrency}
				/>
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
