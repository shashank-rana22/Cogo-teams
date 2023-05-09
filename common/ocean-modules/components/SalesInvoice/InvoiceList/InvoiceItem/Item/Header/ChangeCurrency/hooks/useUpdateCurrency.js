/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components';
import getGeoConstants from '@cogo/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.js';
import getCountryDetails from '@cogo/globalization/utils/getCountryDetails';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';

const geo = getGeoConstants();
const currency = GLOBAL_CONSTANTS.currency_code;
const country = GLOBAL_CONSTANTS.country_ids;

const country_code = (id) => {
	const details = getCountryDetails({
		country_id: id,
	});
	return details.country_code;
};

const invoiceCurrencyMappings = {
	freight_invoice_currency: {
		[country_code(country.IN)]: [currency.INR, currency.USD],
		[country_code(country.GB)]: [currency.GBP, currency.EUR, currency.USD],
		[country_code(country.VN)]: [currency.USD, currency.VND],
		others: [currency.USD, currency.EUR, currency.INR],
	},
};

const useUpdateCurrency = (invoice, onClose, refetch) => {
	const [errors, setErrors] = useState({});

	const currencyOptionsOld =
		invoiceCurrencyMappings?.freight_invoice_currency?.[
			invoice?.country_code || geo.country.currency.code
		] || invoiceCurrencyMappings?.freight_invoice_currency?.others;

	const currencyOptions = currencyOptionsOld.map((item) => ({
		label: item,
		value: item,
	}));

	const controls = [
		{
			name: 'currency',
			label: 'Currency',
			type: 'select',
			showOptional: false,
			className: 'size-sm',
			options: currencyOptions,
			placeholder: 'Select Currency',
			rules: { required: 'currency is required' },
		},
	];

	const { fields, handleSubmit, watch } = useFormCogo(controls);
	const { scope } = useSelector(({ general }) => ({
		scope: general.scope,
	}));
	const updateInvoiceCurrencyAPI = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_invoice_currency');

	const formValues = watch();

	const onError = (err) => {
		setErrors(err);
	};

	const onCreate = async () => {
		if (formValues?.currency === invoice?.invoice_currency) {
			toast.error(`Currency is already in ${invoice.invoice_currency}`);
			return;
		}
		try {
			const res = await updateInvoiceCurrencyAPI.trigger({
				data: {
					id: invoice?.id,
					invoice_currency: formValues?.currency,
					shipment_id: invoice.shipment_id,
				},
			});
			if (!res.hasError) {
				toast.success('Invoice Currency Updated');
				refetch();
				if (onClose) {
					onClose();
				}
			}
		} catch (err) {
			showErrorsInToast(err?.data);
		}
	};

	return {
		fields,
		errors,
		controls,
		onError,
		onCreate,
		handleSubmit,
		loading: updateInvoiceCurrencyAPI.loading,
	};
};

export default useUpdateCurrency;
