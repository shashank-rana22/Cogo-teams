import { cl } from '@cogoport/components';
import { useMemo } from 'react';

import getControls from '../../../../../../../../common/RouteForm/getControls';
import getElementController from '../../../../../../../../configs/getElementController';

import styles from './styles.module.css';

function IcdShipmentDetails({
	control = () => {},
	errors = {},
	isDestinationIcd = false,
	isOriginIcd = false,
}) {
	const controls = useMemo(() => [
		{
			label       : 'Origin Main Port',
			show        : isOriginIcd,
			type        : 'async-select',
			rules       : { required: 'Origin Main port is required' },
			name        : 'origin_main_port_id',
			asyncKey    : 'list_locations',
			placeholder : 'Select',
			size        : 'md',
		},
		{
			label       : 'Destination Main Port',
			show        : isDestinationIcd,
			type        : 'async-select',
			rules       : { required: 'Destination Main port is required' },
			name        : 'destination_main_port_id',
			asyncKey    : 'list_locations',
			placeholder : 'Select',
			size        : 'md',
		},
	], [isDestinationIcd, isOriginIcd]);

	const updatedControls = useMemo(() => {
		const finalControls = getControls(controls, 'fcl_freight');

		return finalControls.reduce((acc, cur) => [...acc, {
			...cur,
			params: {
				...cur.params,
				fields  : cur.params.fields.filter((item) => item !== 'is_icd'),
				filters : { ...cur.params.filters, is_icd: false },
			},
		}], []);
	}, [controls]);

	if (!isOriginIcd && !isDestinationIcd) {
		return null;
	}

	return (
		<div className={styles.container}>
			{updatedControls.map((currControls) => {
				const ActiveElement = getElementController(currControls.type);

				if (!currControls.show) {
					return null;
				}

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
	);
}

export default IcdShipmentDetails;
