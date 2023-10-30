import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';

import getElementController from '../../../../configs/getElementController';
import useGetIsMobile from '../../../../helpers/useGetIsMobile';
import useSpotSearchService from '../../../../page-components/SearchResults/hooks/useCreateSpotSearchService';
import getOptions from '../../../../page-components/SearchResults/utils/getOptions';
import { getServiceWisePayload } from '../configs';
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
		checkout_id: detail?.checkout_id,
	});

	const isMobile = useGetIsMobile();

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
		const payload = getServiceWisePayload({ primary_service: detail.primary_service || detail.service_type })({
			rateCardData,
			detail,
			additionalFormInfo : values,
			service_name       : service.name,
		});
		const serviceAdded = await addService(payload);

		if (serviceAdded) {
			setHeaderProps({});
		}
	};

	const fields = service?.controls?.reduce((acc, curr) => ({ ...acc, [curr.name]: curr }), {});

	if (service?.name === 'warehouse') {
		const { expected_cargo_gated_in, expected_cargo_gated_out } = watch();

		if (expected_cargo_gated_in) {
			fields.expected_cargo_gated_out.minDate = expected_cargo_gated_in;
			fields.expected_cargo_gated_out.isPreviousDaysAllowed = true;
		}

		if (expected_cargo_gated_out) {
			fields.expected_cargo_gated_in.maxDate = expected_cargo_gated_out;
		}
	}

	const controls = Object.values(fields) || [];

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				We need the following details to give you an accurate estimation and discount
				<IcMCross
					onClick={() => setHeaderProps({})}
					style={{ cursor: 'pointer' }}
				/>
			</div>

			<div className={styles.control_container}>
				<div className={styles.form}>
					{controls.map((controlItem) => {
						let newControl = { ...controlItem };

						const {
							condition = {},
							name = '',
							style = {},
							type = '',
							optionsListKey = '',
							label = '',
							rules = {},
							showOptional = false,
						} = newControl;

						const Element = getElementController(type);

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

						const value = commonControls.includes(name) ? findKey(detail, name) : '';

						if (optionsListKey) {
							const finalOptions = getOptions(optionsListKey, {});

							newControl = { ...newControl, options: finalOptions };
						}

						return (
							<div key={name} className={styles.control_style}>
								<div className={styles.label}>
									{label}

									{rules?.required && label ? (
										<div className={styles.required_mark}>*</div>
									) : null}

									{showOptional && label ? (
										<div className={styles.optional_text}>(Optional)</div>
									) : null}
								</div>

								<Element
									{...newControl}
									control={control}
									value={value}
									style={{ ...style, width: isMobile ? '100%' : style.width }}
								/>

								{errors[name] && (
									<div className={styles.error_message}>
										{errors[name]?.message}
									</div>
								)}
							</div>
						);
					})}
				</div>

				<Button
					onClick={handleSubmit(onSubmit)}
					size="md"
					themeType="accent"
					className={styles.primary_buttton}
					disabled={loading}
					loading={loading}
				>
					Add Service
				</Button>
			</div>
		</div>

	);
}
export default AdditionalServicesForm;
