import { Button, Toast, cl } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';

import getElementController from '../../../../../../../../../../../configs/getElementController';
import getSubsidiarySource from '../../../../../../../../RequestRate/FeedBackModal/getSubsidiarySource';
import getServiceWiseConfig from '../../configs';

import styles from './styles.module.css';

const SUBSIDIARY_SERVICES = ['EDE', 'EDT', 'DET', 'DEA'];

const SERVICE_MAPPING = {
	rail_domestic_freight : 'rail_domestic_freight_rate_free_day',
	fcl_freight           : 'fcl_freight_rate_free_day',
};

const getErrorMessage = (error, name) => {
	if (!['preferred_freight_rate'].includes(name)) {
		return error.message || 'This is Required';
	}

	if (isEmpty(error)) {
		return null;
	}

	if (error.price?.type === 'min') {
		return 'price should be greater than 0';
	}

	return `${startCase(Object.keys(error)[GLOBAL_CONSTANTS.zeroth_index])} is Required`;
};

function RequestRateComponent({
	formProps = {},
	service_type = '',
	details = {},
	selectedSevice = {},
	rate = {},
	setSelectedSevice = () => {},
}) {
	const router = useRouter();

	const [showForm, setShowForm] = useState(false);

	const [{ loading = false }, trigger] = useRequest({
		method : 'POST',
		url    : '/create_spot_search_rate_request',
	}, { manual: true });

	const { query = {} } = router;
	const { spot_search_id = '' } = query;

	if (!showForm) {
		return (
			<div className={styles.main_container}>
				<div className={styles.text}>
					We do not have Rates available for this Service.

					<b className={styles.bold}>Request Rate Now</b>
				</div>

				<Button type="button" themeType="secondary" onClick={() => setShowForm(true)}>
					Request Rate
					{' '}
					<IcMArrowRight style={{ marginLeft: '2px' }} width={16} height={16} />
				</Button>
			</div>
		);
	}

	const controls = getServiceWiseConfig({ service_type });

	const { control, formState:{ errors = {} }, handleSubmit = () => {} } = formProps;

	const { service_data = {}, selected_card, service_id = '' } = selectedSevice;

	const onSubmit = async (values) => {
		try {
			const { remarks = '', preferred_freight_rate = {}	} = values;

			const { price = 0, currency = '' } = preferred_freight_rate;

			if (!price || !currency) {
				Toast.error('please fill Indicative Rate');
				return;
			}

			const subsidiary_source = getSubsidiarySource({
				service_data,
				data: rate,
			});

			const reefer_commodity_description = values?.temperature
				? `temperature: ${values.temperature}C | humidity: 
				${values.humidity}% | ventilation: ${values.ventilation}%` : '';

			const commodityDescription = reefer_commodity_description || undefined;

			const body = {
				id                              : spot_search_id || details?.source_id,
				remarks                         : remarks ? [remarks] : undefined,
				performed_by_org_id             : details.importer_exporter.id,
				preferred_freight_rate          : price || undefined,
				preferred_freight_rate_currency : currency || undefined,
				commodity_description           : commodityDescription || undefined,
				specificity_type:
							service_data?.service_type === 'subsidiary'
							&& SUBSIDIARY_SERVICES.includes(service_data?.code)
								? subsidiary_source?.specificity_type
								: undefined,
				preferred_total_days:
							Number(service_data?.total_rate_quantity) || undefined,
				preferred_free_days:
							Number(subsidiary_source?.preferred_free_days) || undefined,
				service_id:
					service_data?.service_type === 'subsidiary'
					&& SUBSIDIARY_SERVICES.includes(service_data?.code)
						? subsidiary_source?.service_id || undefined
						: service_id || undefined,
				service_type:
					service_data?.service_type === 'subsidiary'
					&& SUBSIDIARY_SERVICES.includes(service_data?.code)
						? SERVICE_MAPPING[rate?.service_type]
						: service_type || undefined,
				selected_card           : selected_card || undefined,
				subsidiary_service_code : service_data?.code || undefined,
				free_days_type          : subsidiary_source?.free_days_type || undefined,
			};

			await trigger({ data: body });

			Toast.success('Rate requested successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.title}>REQUEST RATE</div>

			<div className={styles.form_container}>
				{controls.map((item) => {
					const { label, elementStyles = {}, divWidth = '', ...restProps } = item;

					const { name, type = '', rules } = restProps;

					const ActiveElement = getElementController(type);

					return (
						<div
							key={name}
							className={styles.ind_container}
							style={{ width: divWidth }}
						>
							<div className={styles.label}>
								{label}
								{rules ? <sup className={styles.superscipt}>*</sup> : null}
							</div>

							<div className={cl`${styles.element} ${styles[type]}`} style={elementStyles}>
								<ActiveElement
									control={control}
									{...restProps}
									type={type === 'upload' ? 'input' : type}
								/>

								{errors?.[name] && (
									<div className={styles.error_message}>
										{getErrorMessage(errors[name] || {}, name)}
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.buttons}>
				<div className={styles.button_container}>
					<Button
						type="button"
						themeType="secondary"
						disabled={loading}
						onClick={() => setSelectedSevice({})}
					>
						Discard
					</Button>

					<Button
						type="submit"
						themeType="accent"
						loading={loading}
					>
						Request Rate
					</Button>
				</div>
			</div>
		</form>
	);
}

export default RequestRateComponent;
