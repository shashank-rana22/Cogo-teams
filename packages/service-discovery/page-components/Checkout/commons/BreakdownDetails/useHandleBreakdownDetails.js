import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useContext, useMemo, useCallback } from 'react';

import { CheckoutContext } from '../../context';
import useUpdateCheckoutService from '../../hooks/useUpdateCheckoutService';

const DEFAULT_VALUE = 0;

const POSITIVE_VALUE = 1;
const NEGATIVE_VALUE = -1;

const useHandleBreakdownDetails = ({
	rate,
	setRateDetails,
	setNoRatesPresent = () => {},
	getCheckoutInvoices = () => {},
}) => {
	const {
		detail = {},
		getCheckout = () => {},
		checkout_id = '',
	} = useContext(CheckoutContext);

	const { booking_charges = {}, services = {} } = rate;

	const { primary_service = '' } = detail;

	const [addLineItemData, setAddLineItemData] = useState({});
	const [editLineItemData, setEditLineItemData] = useState({});

	const updatedServiceRates = useMemo(
		() => Object.entries(services || {})
			.map(([key, value]) => ({ ...value, key }))
			.sort(
				(
					{
						trade_type: firstElementTradeType = '',
						service_type: firstElementServiceType,
					},
					{
						trade_type: secondElementTradeType = '',
						service_type: secondElementServiceType,
					},
				) => {
					const tradeTypeOrder = ['export', 'main', 'import', 'other'];

					let firstElementFinalTradeType = firstElementServiceType === primary_service
						? 'main'
						: firstElementTradeType;

					let secondElementFinalTradeType = secondElementServiceType === primary_service
						? 'main'
						: secondElementTradeType;

					if (['subsidiary', 'cargo_insurance', 'warehouse'].includes(firstElementServiceType)) {
						firstElementFinalTradeType = 'other';
					}

					if (['subsidiary', 'cargo_insurance', 'warehouse'].includes(secondElementServiceType)) {
						secondElementFinalTradeType = 'other';
					}

					if (
						tradeTypeOrder.findIndex(
							(item) => firstElementFinalTradeType === item,
						)
							> tradeTypeOrder.findIndex(
								(item) => secondElementFinalTradeType === item,
							)
					) {
						return POSITIVE_VALUE;
					}

					if (
						tradeTypeOrder.findIndex(
							(item) => firstElementFinalTradeType === item,
						)
							< tradeTypeOrder.findIndex(
								(item) => secondElementFinalTradeType === item,
							)
					) {
						return NEGATIVE_VALUE;
					}

					return DEFAULT_VALUE;
				},
			),
		[primary_service, services],
	);

	const { handleDeleteRate, deleteRateLoading } = useUpdateCheckoutService({
		refetch: getCheckout,
		detail,
		checkout_id,
		getCheckoutInvoices,
	});

	const otherCharges = Object.entries(booking_charges)
		.filter(([key]) => !['convenience_rate', 'handling_fees'].includes(key))
		.map(([, item]) => ({
			...item.line_items[GLOBAL_CONSTANTS.zeroth_index],
		}));

	const getUpdatedLineItems = ({
		line_items,
		presentLineItems,
		reset = false,
	}) => line_items.map((lineItem) => {
		const presentPrefillValues = presentLineItems.find(
			(item) => item.code === lineItem.code,
		);

		const { filteredMargins: presentFilteredMargins } = presentPrefillValues || {};

		if (!isEmpty(presentFilteredMargins) && !reset) {
			return {
				filteredMargins: presentFilteredMargins,
				...lineItem,
			};
		}

		const filteredMargins = (lineItem?.margins || []).filter(
			(m) => m.margin_type === 'demand',
		);

		if (filteredMargins?.length) {
			const [margin] = filteredMargins;
			let type = margin?.type;
			let value = margin?.value || DEFAULT_VALUE;

			if (type === 'percentage') {
				type = 'absolute_total';
				value = margin?.total_margin_value;
			}
			const prefillValues = {
				type,
				value,
				currency : margin?.currency || lineItem?.currency,
				code     : margin?.code,
			};

			return {
				filteredMargins: prefillValues,
				...lineItem,
			};
		}

		const prefillValues = {
			type     : 'absolute_unit',
			value    : 0,
			currency : lineItem?.currency,
			code     : lineItem?.code,
		};

		return {
			filteredMargins: prefillValues,
			...lineItem,
		};
	});

	const resetMargins = useCallback(() => {
		setRateDetails((prev) => updatedServiceRates.map((serviceData) => {
			const { line_items = [], key = '' } = serviceData;

			const { line_items: presentLineItems = [] } = prev.find((item) => key === item.id) || {};

			const updateLineItems = getUpdatedLineItems({
				line_items,
				presentLineItems,
				reset: true,
			});

			return {
				...serviceData,
				id         : key,
				line_items : updateLineItems,
			};
		}));
	}, [setRateDetails, updatedServiceRates]);

	useEffect(() => {
		setNoRatesPresent(false);

		setRateDetails((prev) => updatedServiceRates.map((serviceData) => {
			const { line_items = [], key = '' } = serviceData;

			const { line_items: presentLineItems = [] } = prev.find((item) => key === item.id) || {};

			const updateLineItems = getUpdatedLineItems({
				line_items,
				presentLineItems,
				reset: false,
			});

			return {
				...serviceData,
				id         : key,
				line_items : updateLineItems,
			};
		}));
	}, [setNoRatesPresent, setRateDetails, updatedServiceRates]);

	return {
		addLineItemData,
		setAddLineItemData,
		editLineItemData,
		setEditLineItemData,
		resetMargins,
		otherCharges,
		handleDeleteRate,
		deleteRateLoading,
	};
};

export default useHandleBreakdownDetails;
