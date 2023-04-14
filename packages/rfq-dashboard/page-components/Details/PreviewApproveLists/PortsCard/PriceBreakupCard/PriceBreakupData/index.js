import { InputController, SelectController } from '@cogoport/forms';

import { getFormattedAmount, getFormattedSum } from '../../../../../../common/helpers/getFormattedSum';

import styles from './styles.module.css';

function PriceBreakupData({
	fieldArrayControls,
	// fields,
	control, register,
	cardTitles = [], data = [], parentIndex = 0,
	watchFields = [],
	emptyValues = [],
}) {
	return (
		<>
			{
			data.map((dataItem, childIndex) => (
				<div className={styles.container}>
					<div className={styles.card_title}>
						{cardTitles.map((item) => {
							const trueIndex = emptyValues[parentIndex][childIndex];

							if (item.name === 'margin_type') {
								return (
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
											{/* {Number(dataItem.base_price)
											+ Number(watch(`services.${trueIndex}.margin_value`))} */}
											{/* {makeTotal(
												Number(dataItem.base_price),
												Number(watch(`services.${trueIndex}.margin_value`)),
												trueIndex,
											)} */}
											{getFormattedSum(dataItem.base_price, watchFields[trueIndex])}
										</p>
									</div>
								);
							}
							if (item.name === 'base_price') {
								return (
									<div className={`${styles.column_labels} ${styles[`${item.name}_card_title`]}`}>
										<p className={styles.data_labels}>
											{getFormattedAmount(dataItem[item.name], 'INR')}
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
