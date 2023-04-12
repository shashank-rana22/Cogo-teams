// import { cl } from '@cogoport/components';
import {
	useForm,
	// useFieldArray,
	// InputController,
	//  SelectController,
} from '@cogoport/forms';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
// import { useEffect } from 'react';

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
function PriceBreakupCard({ prefilledValues = [{}], priceBreakupChildData = [], showPrice = false }) {
	const cardTitles = [
		{ label: 'Service', name: 'service' },
		{ label: 'Base Price', name: 'base_price' },
		{ label: 'Margin Type', name: 'margin_type' },
		{ label: 'Margin Value', name: 'margin_value' },
		{ label: 'Sell Price', name: 'sell_price' },
	];

	// const formProps = useForm();
	const formProps = useForm({
		defaultValues: {
			services: prefilledValues,
		},
	});

	function handlePayload(data) {
		console.log('payload', data);
	}
	const { control, watch, handleSubmit } = formProps || {};
	// append({
	// 	margin_type           : 'absolute_total',
	// 	margin_value_currency : 'usd',
	// 	margin_value          : 1,
	// });
	// const { fields, append, remove } = useFieldArray({ control, name: 'services' });
	// useEffect(() => {
	// 	priceBreakupChildData?.forEach((item) => {
	// 		item?.data.forEach((dataItem) => {
	// 			append({
	// 				margin_type           : 'absolute_total',
	// 				margin_value_currency : 'usd',
	// 				margin_value          : 1,
	// 			});
	// 		});
	// 	});
	// }, [append]);
	// console.log('$$$$', fields, 'fields');

	return (
		<div className={`${styles.container} ${showPrice ? styles.expand_div : styles.collapse_div}`}>
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
						<Title cardTitles={cardTitles} titleData={dataItem.title} />
						<PriceBreakupData
							{...formProps}
							// fields={fields}
							watch={watch}
							fieldArrayControls={formControls[0].controls}
							control={control}
							cardTitles={cardTitles}
							data={dataItem.data}
							parentIndex={parentIndex}
						/>
					</div>
				))
			}
			<FooterPriceBreakUpCard saveChanges={handleSubmit(handlePayload)} />
		</div>
	);
}
export default PriceBreakupCard;
