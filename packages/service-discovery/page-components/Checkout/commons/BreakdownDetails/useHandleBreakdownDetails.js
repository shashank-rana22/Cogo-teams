import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const DEFAULT_VALUE = 0;

const useHandleBreakdownDetails = ({ rate, setRateDetails, setNoRatesPresent = () => {} }) => {
	const [addLineItemData, setAddLineItemData] = useState({});
	const [editLineItemData, setEditLineItemData] = useState({});

	useEffect(() => {
		setNoRatesPresent(false);

		setRateDetails((prev) => Object.entries(rate?.services || {}).map(([key, serviceData = {}]) => {
			const { line_items = [] } = serviceData;

			const { line_items: presentLineItems = [] } = prev.find((item) => key === item.id) || {};

			const updateLineItems = line_items.map((lineItem) => {
				const presentPrefillValues = presentLineItems.find((item) => item.code === lineItem.code);

				const { filteredMargins: presentFilteredMargins } = presentPrefillValues || {};

				if (!isEmpty(presentFilteredMargins)) {
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
	};
};

export default useHandleBreakdownDetails;
