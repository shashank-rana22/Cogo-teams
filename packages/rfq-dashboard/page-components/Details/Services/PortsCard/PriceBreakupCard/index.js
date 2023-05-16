import { Loader } from '@cogoport/components';
import {
	useForm,
	// useFieldArray,
	// InputController,
	//  SelectController,
} from '@cogoport/forms';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { useState } from 'react';

// import { getFieldController } from '../../../../../../common/Form/getFieldController';
// import { priceBreakupChildData } from '../../../../../configurations/price-breakup-card-child-data';

import FooterPriceBreakUpCard from './Footer';
import PriceBreakupData from './PriceBreakupData';
import styles from './styles.module.css';
import Title from './Title';

const formControls = [
	{
		name     : 'services',
		type     : 'fieldArray',
		// value            : [{ type: 'absolute_total', currency, value: marginValue }],
		// showButtons      : true,
		// showDeleteButton : true,
		label    : 'Services',
		controls : [
			{
				name        : 'margin_type',
				type        : 'select',
				span        : 4,
				placeholder : 'Unit',
				caret       : true,
				// showMargin : isMobile,
				// label      : isMobile ? 'Margin Type' : null,
				options     : [
					{
						label : ' Total ',
						value : 'absolute_total',
					},
					{
						label : 'Unit',
						value : 'absolute_unit',
					},
				],
				watch : true,
				rules : { required: 'Required' },
				// disabled    : !shouldEditMargin,
			},
			{
				name           : 'margin_value_currency',
				type           : 'select',
				span           : 4,
				// label          : isMobile ? 'Currency' : null,
				placeholder    : 'currency',
				watch          : true,
				// showMargin     : isMobile,
				rules          : { required: 'Required' },
				optionsListKey : 'currencies',
				// options        : [
				// 	GLOBAL_CONSTANTS.currency_code.USD,
				// 	GLOBAL_CONSTANTS.currency_code.EUR,
				// 	GLOBAL_CONSTANTS.currency_code.INR,
				// 	GLOBAL_CONSTANTS.currency_code.GBP,
				// 	GLOBAL_CONSTANTS.currency_code.AED,
				// ].map((currencyCode) => ({
				// 	label : currencyCode,
				// 	value : currencyCode,
				// })),
				options        : [
					{
						label : 'USD',
						value : 'usd',
					},
					{
						label : 'INR',
						value : 'inr',
					},
				],
				defaultValue : 'usd',
				value        : 'usd',
				disabled     : true,
			},
			{
				name        : 'margin_value',
				type        : 'number',
				// label       : isMobile ? 'Margin' : null,
				placeholder : 'Value',
				span        : 4,
				// showMargin  : isMobile,
				watch       : true,
				// disabled    : !shouldEditMargin,
				rules       : { required: 'Required' },
			},
		],
	},
];
function PriceBreakupCard({ prefilledValues = [{}], priceBreakupChildData = [], showPrice = false, loading }) {
	const cardTitles = [
		{ label: 'Service', name: 'service' },
		{ label: 'Base Price', name: 'base_price' },
		{ label: 'Margin Type', name: 'margin_type' },
		{ label: 'Margin Value', name: 'margin_value' },
		{ label: 'Sell Price', name: 'sell_price' },
	];

	const [individualTotal, setIndividualTotal] = useState(Array(priceBreakupChildData.length).fill(0));

	const formProps = useForm({
		defaultValues: {
			services: prefilledValues,
		},
	});

	function handlePayload(data) {
		console.log('payload', data);
	}
	const { control, watch, handleSubmit } = formProps || {};

	let count = -1;
	const emptyValues = priceBreakupChildData.map((item) => {
		const newArr = item.data.map(() => {
			count += 1;
			return count;
		});
		return newArr;
	});

	const totalLength = priceBreakupChildData.reduce((total, val) => total + val.data.length, 0);
	const watchFields = Array(totalLength).fill(0).map((item, index) => watch(`services.${index}.margin_value`));

	return (
		<div className={`${styles.container} ${showPrice ? styles.expand_div : styles.collapse_div}`}>

			{loading
				? (
					<div className={styles.loader_box}>
						<Loader themeType="primary" />
					</div>
				)
				: (
					<>
						<div className={`${styles.card_title} ${styles.card_item_singular}`}>
							{
					cardTitles.map((itm) => (
						<div className={`${styles.column_labels} ${styles[`${itm.name}_card_title`]}`}>{itm.label}</div>
					))
				}
						</div>
						{
				priceBreakupChildData.map((dataItem, parentIndex) => (
					<div className={styles.card_item_singular}>
						<Title
							cardTitles={cardTitles}
							titleData={dataItem.title}
							rowData={dataItem.data}
							parentIndex={parentIndex}
							watchFields={watchFields}
							emptyValues={emptyValues}
							setIndividualTotal={setIndividualTotal}
							individualTotal={individualTotal}
						/>
						<PriceBreakupData
							{...formProps}
							// fields={fields}
							watch={watch}
							fieldArrayControls={formControls[0].controls}
							control={control}
							cardTitles={cardTitles}
							data={dataItem.data}
							parentIndex={parentIndex}
							watchFields={watchFields}
							emptyValues={emptyValues}
						/>
					</div>
				))
			}
						<FooterPriceBreakUpCard
							individualTotal={individualTotal}
							saveChanges={handleSubmit(handlePayload)}
						/>
					</>
				)}

		</div>
	);
}
export default PriceBreakupCard;
