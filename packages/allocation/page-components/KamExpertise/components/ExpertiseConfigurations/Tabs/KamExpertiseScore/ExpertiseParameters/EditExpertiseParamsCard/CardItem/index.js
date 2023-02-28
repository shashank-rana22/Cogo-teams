import { Tooltip } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import { getFieldController } from '../../../../../../../../../common/Form/getFieldController';
import EDIT_CONFIG_CONTROLS_MAPPING from '../../../../../../../constants/edit-config-controls-mapping';
import ExtrasItem from '../ExtrasItem';

import styles from './styles.module.css';

function CardItem(item) {
	const { name, controls, extras } = item;

	// const isSingleLevel = !isEmpty(controls)

	const formProps = useForm();

	const { control } = formProps;

	const xyz = controls?.map((controlField) => {
		const { name: controlName, current_value } = controlField;

		const controlsObject = EDIT_CONFIG_CONTROLS_MAPPING[controlName];

		return controlsObject;
	});

	const extrasList = extras?.map((res) => {
		// console.log(res, i);

		const { type, controls:extraControl } = res;

		// console.log('extra::', extraControl);
		const rowData = extraControl?.map((extrasItem) => {
			// console.log(item);
			const { extra_name: extraName, current_value } = extrasItem;

			// 	console.log('extraName::', extraName);
			const extraControlsObject = EDIT_CONFIG_CONTROLS_MAPPING[extraName];
			return extraControlsObject;
		});

		const finalData = {
			finalHeading : type,
			rowInfo      : rowData,
		};

		return finalData;
	});

	// const xyz = controls.map((controlField) => {
	// 	const { name: controlName, current_value } = controlField;

	// 	const controlsObject = EDIT_CONFIG_CONTROLS_MAPPING[controlName];

	// 	return controlsObject;
	// });

	// const abc = xyz.map((Item) => (Item));

	// const xyz = [];
	// controls.forEach((control) => {
	// 	const { name: controlName, current_value } = control;

	// 	const controlsArray = EDIT_CONFIG_CONTROLS_MAPPING[controlName];

	// 	const temp = [];

	// 	controlsArray?.forEach((single_control) => {
	// 		temp.push(single_control);
	// 	});

	// 	xyz.push(temp);
	// });

	// const abc = xyz.map((Item) => (Item));

	// const xyz = controls.map(({ name: controlName, ...rest }) => (
	// 	EDIT_CONFIG_CONTROLS_MAPPING[controlName]?.map((single_control) => single_control) ?? []));

	console.log('extrasList::', extrasList);
	return (
		<div className={styles.card_item}>
			<div className={styles.name_container}>
				<div className={styles.parameter_name}>{startCase(name)}</div>
				<div className={styles.icon_container}>
					<Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit" placement="top">
						<div><IcMInfo width={14} height={14} /></div>
					</Tooltip>

				</div>
			</div>

			{
				extrasList.map((singleRow) => <ExtrasItem rowData={singleRow} />)
			}

			{/* <div className={styles.controls_container}>

				{xyz.map((singleField) => {
					const Element = getFieldController(singleField.type) || null;

					return (
						<div className={styles.field_container}>
							<div className={styles.label}>
								{singleField.label}
							</div>

							<Element
								{...singleField}
								control={control}
								key={singleField.name}
								id={`${name}_${singleField.name}`}
							/>
						</div>
					);
				})}
			</div> */}

		</div>
	);
}

export default CardItem;
