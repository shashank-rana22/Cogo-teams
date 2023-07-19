import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../../../../../configs/getElementController';
import useSpotSearchService from '../../../hooks/useCreateSpotSearchService';
import { getFclPayload } from '../configs';
import findKey from '../utils/findKeyInObject';

import styles from './styles.module.css';

const commonControls = ['origin_cargo_handling_type', 'destination_cargo_handling_type'];

function AdditionalServicesForm({
	rateCardData,
	detail,
	setHeaderProps = () => {},
	service = '',
	refetchSearch = () => {},
}) {
	const { addService = () => {}, loading = false } = useSpotSearchService({
		refetchSearch,
		rateCardData,
		checkout_id: detail?.checkout_id,
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
		const payload = getFclPayload({
			rateCardData,
			detail,
			additionalFormInfo : formValues,
			service_name       : service.name,
		});
		await addService(payload);
		setHeaderProps({});
	};

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				We need the following details to give you an accurate estimation and discount
				<IcMCross
					onClick={() => {
						setHeaderProps({});
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
					disabled={loading}
					loading={loading}
				>
					Update Details
				</Button>

			</div>

		</div>

	);
}
export default AdditionalServicesForm;
