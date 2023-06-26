import { Input } from '@cogoport/components';
import { useState, useEffect } from 'react';

import BreakdownDetails from '../../commons/BreakdownDetails';

import AdditionalContent from './components/AdditionalContent';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

const FIRST_INDEX = 0;

function EditMargin({
	data,
	userSettings,
	rate,
}) {
	const [rateDetails, setRateDetails] = useState([]);
	const [additionalRemark, setAdditionalRemark] = useState('');
	const [convenienceDetails, setConvenienceDetails] = useState({});
	const [shouldResetMargins, setShouldResetMargins] = useState(true);

	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[FIRST_INDEX];

	useEffect(() => {
		if (shouldResetMargins) {
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
	}, [data?.rate?.services, shouldResetMargins]);

	return (
		<div>
			<BreakdownDetails
				rateDetails={rateDetails}
				setRateDetails={setRateDetails}
				convenienceDetails={convenienceDetails}
				setConvenienceDetails={setConvenienceDetails}
				convenience_line_item={convenience_line_item}
				setShouldResetMargins={setShouldResetMargins}
			/>

			<div className={styles.additional_remark}>
				<div className={styles.sub_heading}>Additional Remark</div>

				<Input
					value={additionalRemark}
					onChange={setAdditionalRemark}
					placeholder="Additional Remark that KAM can write if he wants to based on customers input....."
				/>
			</div>

			<AdditionalContent
				userSettings={userSettings}
				additionalRemark={additionalRemark}
				rateDetails={rateDetails}
				convenienceDetails={convenienceDetails}
				convenience_line_item={convenience_line_item}
				setShouldResetMargins={setShouldResetMargins}
			/>
		</div>
	);
}

export default EditMargin;
