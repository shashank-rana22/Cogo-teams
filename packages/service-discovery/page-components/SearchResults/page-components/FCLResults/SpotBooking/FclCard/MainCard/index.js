import { Pill, cl } from '@cogoport/components';
import { CheckboxController, SelectController } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import getElementController from '../../../../../../../configs/getElementController';
import useGetSailingSchedules from '../../hooks/useGetSailingSchedules';

import { fclControls } from './controls';
import getDetails from './getDetails';
import IcdShipmentDetails from './IcdShipmentDetails';
import StyledLabel from './StyledLabel';
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

function MainCard({ shippingLines = [], detail = {}, formProps = {}, watch = () => {} }) {
	const geo = getGeoConstants();

	const { service_type = '', service_details = {}, destination_port_id = '', origin_port_id = '' } = detail;

	const { shipping_line_id = '', sailing_schedule = false } = watch() || {};

	const shippingLineOptions = shippingLines.map((item) => ({
		value : item?.id,
		label : item?.short_name,
	}));

	const { sailingSchedules = [] } = useGetSailingSchedules({ shipping_line_id, destination_port_id, origin_port_id });

	const sailingSchedulesOptions = useMemo(() => sailingSchedules.reduce((acc, listObj) => {
		const present_date = formatDate({
			date       : new Date(),
			dateFormat : geo.formats.date.default,
			formatType : 'date',
		});

		const departure_date = formatDate({
			date       : listObj?.departure,
			dateFormat : geo.formats.date.default,
			formatType : 'date',
		});

		const present_split = present_date.split('/');
		const departure_split = departure_date.split('/');

		const present = new Date(
			present_split[2],
			Number(present_split[1]) - 1,
			present_split[GLOBAL_CONSTANTS.zeroth_index],
		);

		const departure = new Date(
			departure_split[2],
			Number(departure_split[1]) - 1,
			departure_split[GLOBAL_CONSTANTS.zeroth_index],
		);

		if (departure > present) {
			return [...acc, {
				label : <StyledLabel data={listObj} />,
				value : `${listObj.arrival}_${listObj.departure}_${listObj.transit_time}_${listObj?.number_of_stops}`,
			}];
		}

		return acc;
	}, []), [geo.formats.date.default, sailingSchedules]);

	const controls = fclControls({ shippingLineOptions });

	const { control, formState: { errors } } = formProps;

	const [shippingLineControl, ...restControls] = controls;

	const primaryServices = Object.values(service_details).filter(
		(item) => item.service_type === service_type,
	);

	const primaryServicesControls = primaryServices.map((service) => ({
		serviceDetails : service,
		type           : 'price-select',
		name           : `bas_${service.container_size}_${service.container_type}_${service.commodity}`,
		control,
		value          : { currency: 'USD' },
		label          : 'Basic Freight Rate/Ctr*',
		rules          : { required: 'Enter valid price', min: 1 },
	}));

	const scheduleControl = [
		{
			name        : 'suitable_schedule',
			label       : 'Select Suitable Schedule',
			type        : 'select',
			placeholder : 'Select Suitable Schedule',
			options     : sailingSchedulesOptions,
			caret       : true,
			rules       : {
				required: 'Shipping Line is required',
			},
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.top_container}>
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

					<CheckboxController
						name="sailing_schedule"
						control={control}
						label="Add custom departure & arrival"
						style={{ marginLeft: '24px' }}
						value={false}
					/>
				</div>

				<IcdShipmentDetails
					detail={detail}
					control={control}
					errors={errors}
				/>

				<div className={styles.time_div}>
					{(!sailing_schedule ? scheduleControl : restControls).map((currControls) => {
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
								item: serviceDetails,
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
