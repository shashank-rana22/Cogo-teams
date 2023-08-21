import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useContext } from 'react';

import { CheckoutContext } from '../../context';
import useUpdateCheckoutService from '../../hooks/useUpdateCheckoutService';

const DEFAULT_VALUE = 0;

const useHandleBreakdownDetails = ({
	rate,
	setRateDetails,
	setNoRatesPresent = () => {},
	getCheckoutInvoices = () => {},
}) => {
	const {
		detail,
		getCheckout,
		checkout_id,
	} = useContext(CheckoutContext);

	const [addLineItemData, setAddLineItemData] = useState({});
	const [editLineItemData, setEditLineItemData] = useState({});

	const { booking_charges = {} } = rate;

	const { handleDeleteRate, deleteRateLoading } = useUpdateCheckoutService({
		refetch: getCheckout,
		detail,
		checkout_id,
		getCheckoutInvoices,
	});

	const otherCharges = Object.entries(booking_charges)
		.filter(([key]) => key !== 'convenience_rate')
		.map(([, item]) => ({
			...item.line_items[GLOBAL_CONSTANTS.zeroth_index],
		}));

	const getUpdatedLineItems = ({ line_items, presentLineItems, reset = false }) => line_items.map((lineItem) => {
		const presentPrefillValues = presentLineItems.find((item) => item.code === lineItem.code);

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

	const resetMargins = () => {
		setRateDetails((prev) => Object.entries(rate?.services || {}).map(([key, serviceData = {}]) => {
			const { line_items = [] } = serviceData;

			const { line_items: presentLineItems = [] } = prev.find((item) => key === item.id) || {};

			const updateLineItems = getUpdatedLineItems({ line_items, presentLineItems, reset: true });

			return {
				...rate?.services[key],
				id         : key,
				line_items : updateLineItems,
			};
		}));
	};

	useEffect(() => {
		setNoRatesPresent(false);

		setRateDetails((prev) => Object.entries(rate?.services || {}).map(([key, serviceData = {}]) => {
			const { line_items = [] } = serviceData;

			const { line_items: presentLineItems = [] } = prev.find((item) => key === item.id) || {};

			const updateLineItems = getUpdatedLineItems({ line_items, presentLineItems, reset: false });

			return {
				...rate?.services[key],
				id         : key,
				line_items : updateLineItems,
			};
		}));
	}, [rate?.services, setNoRatesPresent, setRateDetails]);

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
