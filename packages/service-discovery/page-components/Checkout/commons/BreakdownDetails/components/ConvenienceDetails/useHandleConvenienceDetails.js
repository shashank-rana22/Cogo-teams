import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';
import { useMemo } from 'react';

const DEFAULT_VALUE = 0;

const ROUND_OFF_VALUE = 3;

const useHandleConvenienceDetails = ({
	convenienceDetails = {},
	total = '',
	convenienceRateOptions = [],
	rate = {},
	setConvenienceDetails = () => {},
	detail = {},
}) => {
	const subTotal = total;

	const { convenience_rate = {} } = convenienceDetails || {};

	const { currency = '', price = '', quantity = 1 } = convenience_rate;

	const totalBeforeDiscount = rate?.tax_total_price || DEFAULT_VALUE;
	const totalPrice = rate?.tax_total_price_discounted || DEFAULT_VALUE;
	const discount = totalPrice - totalBeforeDiscount;

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_exchange_rate',
			method : 'GET',
		},
		{ manual: true },
	);

	const convenienceRateMapping = useMemo(() => {
		const MAPPING = {};

		convenienceRateOptions.forEach((option) => {
			MAPPING[startCase(option.unit)] = {
				unit     : option.unit,
				price    : option.price,
				currency : option.currency,
				quantity : option.quantity,
			};
		});

		return MAPPING;
	}, [convenienceRateOptions]);

	const convenience_line_item =		rate?.booking_charges?.convenience_rate?.line_items[
		GLOBAL_CONSTANTS.zeroth_index
	];

	if (!isEmpty(convenience_line_item)) {
		convenienceRateMapping[startCase(convenience_line_item.unit)] = {
			unit     : convenience_line_item?.unit,
			price    : convenience_line_item?.price,
			currency : convenience_line_item?.currency,
			quantity : convenience_line_item?.quantity,
		};
	}

	const onChange = ({ value, itemKey }) => {
		setConvenienceDetails((prev) => ({
			convenience_rate: {
				...prev.convenience_rate,
				[itemKey]: value,
			},
		}));
	};

	const taxesDisplay = formatAmount({
		amount   : rate?.tax_price_discounted,
		currency : rate?.tax_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});

	const convenienceFeeDisplay = formatAmount({
		amount  : price * quantity,
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});

	const subTotalDisplay = formatAmount({
		amount   : subTotal,
		currency : rate?.total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});

	const localedDiscount = formatAmount({
		amount   : discount,
		currency : rate?.total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
			minimumFractionDigits : 2,
		},
	});

	const exchange_rate_source = detail?.importer_exporter?.exchange_rate_preference?.exchange_rate_source;

	const onChangeCurrency = async (val) => {
		if (val) {
			try {
				const res = await trigger({
					params: {
						from_currency : convenience_line_item?.currency,
						to_currency   : val,
						source        : exchange_rate_source || 'cogofx',
					},
				});

				const { data: conversion } = res;

				onChange({
					value: (convenience_line_item.price * conversion).toFixed(
						ROUND_OFF_VALUE,
					),
					itemKey: 'price',
				});

				onChange({ value: val, itemKey: 'currency' });
			} catch (err) {
				Toast.error(
					getApiErrorString(err.response?.data) || 'something went wrong',
				);
			}
		}
	};

	return {
		onChangeCurrency,
		subTotalDisplay,
		convenienceFeeDisplay,
		taxesDisplay,
		loading,
		convenienceRateMapping,
		onChange,
		localedDiscount,
		discount,
	};
};

export default useHandleConvenienceDetails;
