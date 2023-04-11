import {
	//  useForm,
	InputController,
	SelectController,
} from '@cogoport/forms';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

// import { getFieldController } from '../../../../../../common/Form/getFieldController';
// import { useFieldArray } from '@cogoport/forms';
// import { useEffect } from 'react';

import styles from './styles.module.css';

function PriceBreakupData({
	fieldArrayControls,
	watch = () => {},
	// fields,
	control, register,
	cardTitles = [], data = [], parentIndex = 0,
}) {
	// console.log('control:', control);
	// const getMarginControls = [
	// 	{
	// 		name             : 'nameKey',
	// 		type             : 'fieldArray',
	// 		// value            : [{ type: 'absolute_total', currency, value: marginValue }],
	// 		showButtons      : false,
	// 		showDeleteButton : false,
	// 		controls         : [
	// 			{
	// 				name    : 'type',
	// 				type    : 'select',
	// 				span    : 4,
	// 				caret   : true,
	// 				// showMargin : isMobile,
	// 				// label      : isMobile ? 'Margin Type' : null,
	// 				options : [
	// 					{
	// 						label : ' Total ',
	// 						value : 'absolute_total',
	// 					},
	// 					{
	// 						label : 'Unit',
	// 						value : 'absolute_unit',
	// 					},
	// 				],
	// 				watch       : true,
	// 				rules       : { required: 'Required' },
	// 				placeholder : 'Unit',
	// 				// disabled    : !shouldEditMargin,
	// 			},
	// 			{
	// 				name           : 'currency',
	// 				type           : 'select',
	// 				span           : 4,
	// 				// label          : isMobile ? 'Currency' : null,
	// 				placeholder    : 'currency',
	// 				watch          : true,
	// 				// showMargin     : isMobile,
	// 				rules          : { required: 'Required' },
	// 				optionsListKey : 'currencies',
	// 				// options        : [
	// 				// 	GLOBAL_CONSTANTS.currency_code.USD,
	// 				// 	GLOBAL_CONSTANTS.currency_code.EUR,
	// 				// 	GLOBAL_CONSTANTS.currency_code.INR,
	// 				// 	GLOBAL_CONSTANTS.currency_code.GBP,
	// 				// 	GLOBAL_CONSTANTS.currency_code.AED,
	// 				// ].map((currencyCode) => ({
	// 				// 	label : currencyCode,
	// 				// 	value : currencyCode,
	// 				// })),
	// 				options        : [
	// 					{
	// 						label : ' usd ',
	// 						value : 'USD',
	// 					},
	// 					{
	// 						label : 'Unit',
	// 						value : 'absolute_unit',
	// 					},
	// 				],
	// 				defaultValue : 'usd',
	// 				value        : 'usd',
	// 				disabled     : true,
	// 			},
	// 			{
	// 				name        : 'value',
	// 				type        : 'number',
	// 				// label       : isMobile ? 'Margin' : null,
	// 				placeholder : 'Value',
	// 				span        : 4,
	// 				// showMargin  : isMobile,
	// 				watch       : true,
	// 				// disabled    : !shouldEditMargin,
	// 				rules       : { required: 'Required' },
	// 			},
	// 		],
	// 	},
	// ];

	// const formProps = useForm({
	// 	getMarginControls,
	// 	defaultValue: {
	// 		currency: 'USD',
	// 	},
	// });
	// console.log(formProps, 'formProps');
	// console.log('getMarginControls:', controls);
	// const { fields, append, remove } = useFieldArray({ control, name: 'services' });

	// useEffect(() => {
	// 	if (fields.length === 0) {
	// 		append({
	// 			margin_type           : 'absolute_total',
	// 			margin_value_currency : 'usd',
	// 			margin_value          : 1,
	// 		});
	// 	}
	// }, [fields, append]);

	// console.log(fields, 'fields');
	return (
		<>
			{
			data.map((dataItem, childIndex) => (
				<div className={styles.container}>
					<div className={styles.card_title}>
						{cardTitles.map((item) => {
							const trueIndex = Number(Number(parentIndex) + Number(childIndex));
							console.log('trueIndex', trueIndex);
							console.log(`services.${trueIndex}.${fieldArrayControls[0]?.name}`);
							// const Element = getFieldController('select');

							if (item.name === 'margin_type') {
								return (
									// <Element
									// 	{...control[0]}
									// 	key={control[0].name}
									// 	control={formProps.control}
									// />
									<div className={`${styles.column_labels} ${styles[`${item.name}_card_title`]}`}>
										<SelectController
											// control={formProps.control}
											// options={getMarginControls[0].options}
											// name={`${getMarginControls[0].name}`}
											// size="xs"
											style={{ width: 120 }}
											name={fieldArrayControls[0]?.name}
											control={control}
											size="sm"
											{...register(`services.${trueIndex}.${fieldArrayControls[0]?.name}`)}
											options={fieldArrayControls[0]?.options}
											rules={fieldArrayControls[0]?.rules}
										/>
									</div>
								);
							}
							if (item.name === 'margin_value') {
								return (
									<div className={`${styles.column_labels} ${styles[`${item.name}_card_title`]}`}>
										<SelectController
											// control={formProps.control}
											// options={getMarginControls[1].options}
											// name={`${getMarginControls[1].name}`}
											// size="xs"
											// value="usd"
											// style={{ width: 80 }}
											disabled
											name={fieldArrayControls[1]?.name}
											control={control}
											size="sm"
											{...register(`services.${trueIndex}.${fieldArrayControls[1]?.name}`)}
											options={fieldArrayControls[1]?.options}
											rules={fieldArrayControls[1]?.rules}
											caret={false}
										/>
										{/* <Element
											{...control[2]}
											key={control[2].name}
											name={control[2].name}
											control={formProps.control}
										/> */}
										<InputController
											// control={formProps.control}
											// options={getMarginControls[2].options}
											// name={`${getMarginControls[2].name}`}
											// size="xs"
											style={{ width: 120 }}
											// value="usd"
											name={fieldArrayControls[2]?.name}
											control={control}
											size="sm"
											{...register(`services.${trueIndex}.${fieldArrayControls[2]?.name}`)}
											options={fieldArrayControls[2]?.options}
											rules={fieldArrayControls[2]?.rules}
										/>
									</div>
								);
							}
							if (item.name === 'sell_price') {
								return (
									<div className={`${styles.column_labels} ${styles[`${item.name}_card_title`]}`}>
										<p className={styles.data_labels}>
											{Number(dataItem.base_price)
											+ Number(watch(`services.${trueIndex}.margin_value`))}
										</p>
									</div>
								);
							}
							return (
								<div className={`${styles.column_labels} ${styles[`${item.name}_card_title`]}`}>
									<p className={styles.data_labels}>{dataItem[item.name]}</p>
								</div>
							);
						})}
					</div>
				</div>
			))
		}
		</>
	);
}
export default PriceBreakupData;
