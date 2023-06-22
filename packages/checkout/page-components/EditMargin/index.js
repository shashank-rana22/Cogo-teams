import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import BreakdownDetails from '../../commons/BreakdownDetails';

import AdditionalContent from './components/AdditionalContent';

const DEFAULT_VALUE = 0;

function EditMargin({
	data,
	userSettings,
}) {
	const [rateDetails, setRateDetails] = useState([]);

	console.log('rateDetails', rateDetails);

	useEffect(() => {
		if (isEmpty(rateDetails)) {
			setRateDetails(Object.entries(data?.rate?.services || {}).map(([key, serviceData = {}]) => {
				const { line_items = [] } = serviceData;

				const updateLineItems = line_items.map((lineItem) => {
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
					...data?.rate?.services[key],
					id         : key,
					line_items : updateLineItems,
				};
			}));
		}
	}, [data, rateDetails]);

	return (
		<div>
			<BreakdownDetails
				rateDetails={rateDetails}
				setRateDetails={setRateDetails}
			/>

			<AdditionalContent
				userSettings={userSettings}
			/>
		</div>
	);
}

export default EditMargin;
