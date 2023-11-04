import { Pill, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import getElementController from '../../../../../../../configs/getElementController';

import { fclControls } from './controls';
import getDetails from './getDetails';
import styles from './styles.module.css';

const getPriceError = (error = {}) => {
	if (isEmpty(error)) {
		return null;
	}

	if (error.price?.type === 'min') {
		return 'price should be greater than 0';
	}

	return `${startCase(Object.keys(error)[GLOBAL_CONSTANTS.zeroth_index])} is Required`;
};

function MainCard({ shippingLines = [], detail = {}, formProps = {} }) {
	const { service_type = '', service_details = {} } = detail;

	const shippingLineOptions = shippingLines.map((item) => ({
		value : item?.id,
		label : item?.short_name,
	}));

	const controls = fclControls({ shippingLineOptions });

	const { control, formState: { errors } } = formProps;

	const [shippingLineControl, ...restControls] = controls;

	const SelectController = getElementController('select');

	const primaryServices = Object.values(service_details).filter(
		(item) => item.service_type === service_type,
	);

	const primaryServicesControls = primaryServices.map((service) => ({
		serviceDetails : service,
		type           : 'price-select',
		name           : `bas_${service.container_size}_${service.container_type}_${service.commodity}`,
		control,
		label          : 'Basic Freight Rate/Ctr*',
		rules          : { required: 'Enter valid price', min: 1 },
	}));

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.element_div}>
					<div className={styles.label}>{shippingLineControl.label}</div>
					<SelectController {...shippingLineControl} control={control} />

					{errors?.shipping_line_id && (
						<div className={styles.error_message}>
							{' '}
							{errors?.shipping_line_id?.message}
						</div>
					)}
				</div>

				<div className={styles.time_div}>
					{restControls.map((currControls) => {
						const ActiveElement = getElementController(currControls.type);

						return (
							<div
								key={currControls.name}
								className={cl`${styles.element_div} ${styles[currControls.name]}`}
							>
								<div className={styles.label}>{currControls.label}</div>
								<ActiveElement {...currControls} control={control} />
								{errors?.[currControls.name] && (
									<div className={styles.error_message}>
										{' '}
										{errors?.[currControls.name]?.message}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			<div className={styles.right_container}>
				<div className={styles.container_details}>
					{primaryServicesControls.map(
						({ serviceDetails = {}, ...formControls }) => {
							const containerDetail = getDetails({
								primary_service : service_type,
								item            : serviceDetails,
							});

							const ActiveElement = getElementController(formControls?.type);

							const errorMessage = getPriceError(errors?.[formControls.name]);

							return (
								<div
									key={serviceDetails?.id}
									className={cl`${styles.element_div} ${styles.containers}`}
								>
									{(containerDetail || []).map((conDetail) => (
										<Pill
											key={conDetail}
											size="md"
											style={{
												border     : '1px solid #24C7D9',
												background : '#ffffff',
											}}
										>
											{conDetail}
										</Pill>
									))}
									<div
										style={{ marginTop: '16px' }}
										className={styles.label}
									>
										{formControls?.label}
									</div>
									<ActiveElement {...formControls} />

									{errorMessage && (
										<div className={styles.error_message}>
											{' '}
											{errorMessage}
										</div>
									)}
								</div>
							);
						},
					)}
				</div>
			</div>
		</div>
	);
}

export default MainCard;
