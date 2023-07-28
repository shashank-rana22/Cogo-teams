import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../../../../configs/getElementController';
import useSpotSearchService from '../../../../page-components/SearchResults/hooks/useCreateSpotSearchService';
import getOptions from '../../../../page-components/SearchResults/utils/getOptions';
import { getFclPayload } from '../configs';
import findKey from '../utils/findKeyInObject';

import styles from './styles.module.css';

const commonControls = ['origin_cargo_handling_type', 'destination_cargo_handling_type'];

function AdditionalServicesForm({
	rateCardData = {},
	detail = {},
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

	const WATCH_MAP = {};

	service.controls.forEach((singleControl) => {
		const condition = { ...(singleControl.condition || {}) };
		delete condition.services;
		Object.keys(condition).forEach((conditionRule) => {
			if (!WATCH_MAP[conditionRule]) {
				WATCH_MAP[conditionRule] = watch(conditionRule) || findKey(detail, conditionRule);
			}
		});
	});

	const onSubmit = async (values) => {
		const payload = getFclPayload({
			rateCardData,
			detail,
			additionalFormInfo : values,
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
					let newControl = { ...controlItem };

					const { condition = {}, name = '' } = newControl;

					const Element = getElementController(newControl.type);

					let flag = true;

					Object.keys(condition).forEach((condItem) => {
						if (WATCH_MAP?.[condItem] !== undefined) {
							if (
								!condition?.[condItem].includes(
									WATCH_MAP?.[condItem],
								)
							) {
								flag = false;
							}
						}
					});

					if (!flag) {
						return null;
					}

					const value = commonControls.includes(newControl.name) ? findKey(detail, newControl.name) : '';

					if (newControl.optionsListKey) {
						const finalOptions = getOptions(newControl.optionsListKey, {});

						newControl = { ...newControl, options: finalOptions };
					}

					return (
						<div key={newControl.name} className={styles.control_style}>
							<div className={styles.label}>
								{ newControl.label}
							</div>

							<Element {...newControl} control={control} value={value} />

							{errors[name] && (
								<div className={styles.error_message}>
									{errors[name]?.message}
								</div>
							)}
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
