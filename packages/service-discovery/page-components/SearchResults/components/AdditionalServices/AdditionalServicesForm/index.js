/* eslint-disable custom-rules/custom-rules-matching */
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../../../../../configs/getElementController';
import useSpotSearchService from '../../../hooks/useCreateSpotSearchService';
import findKey from '../utils/findKeyInObject';
import getPayload from '../utils/getPayload';

import styles from './styles.module.css';

const commonControls = ['origin_cargo_handling_type', 'destination_cargo_handling_type'];

function AdditionalServicesForm({
	rateCardData,
	detail,
	setHeaderProps = () => {},
	service = '',
	refetchSearch = () => {},
}) {
	const { addService = () => {} } = useSpotSearchService({
		refetchSearch, rateCardData,
	});

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const valueAlreadyExist = {};

	commonControls.forEach((item) => {
		valueAlreadyExist[item] = false;
	});

	const formValues = watch();

	const controlFields = {};

	service.controls.forEach((item) => {
		controlFields[item.name] = item;
	});

	const watchMap = {};

	service.controls.forEach((singleControl) => {
		const condition = { ...(singleControl.condition || {}) };
		delete condition.services;
		Object.keys(condition).forEach((conditionRule) => {
			if (!watchMap[conditionRule]) {
				watchMap[conditionRule] = watch(conditionRule);
			}
		});
	});

	const onSubmit = async () => {
		const payload = getPayload({
			rateCardData,
			detail,
			additionalFormInfo : formValues,
			service_name       : service.name,
		});
		await addService(payload);
		setHeaderProps({
			key: 'default',
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				We need the following details to give you an accurate estimation and discount
				<IcMCross
					onClick={() => {
						setHeaderProps({
							key: 'default',
						});
					}}
					style={{ cursor: 'pointer' }}
				/>
			</div>
			<div className={styles.control_container}>
				{service.controls.map((controlItem) => {
					const { condition = {} } = controlItem;

					const Element = getElementController(controlItem.type);

					let flag = true;

					Object.keys(condition).forEach((condItem) => {
						if (watchMap?.[condItem] !== undefined) {
							if (
								!condition?.[condItem].includes(
									watchMap?.[condItem],
								)
							) {
								flag = false;
							}
						}
					});

					if (!flag) {
						return null;
					}

					const value = commonControls.includes(controlItem.name) ? findKey(detail, controlItem.name) : '';

					return (
						<div key={controlItem.name} className={styles.control_style}>

							<div className={styles.label}>
								{ controlItem.label}
							</div>

							<Element {...controlItem} control={control} value={value} />

						</div>
					);
				})}

				<Button
					onClick={handleSubmit(onSubmit)}
					size="md"
					themeType="accent"
					className={styles.primaryButtton}
				>
					Update Details
				</Button>

			</div>

		</div>

	);
}
export default AdditionalServicesForm;
