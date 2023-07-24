import { Select, cl } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMSearchlight, IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import {
	SELECT_ICON_MAPPING,
	SERVICE_TYPE_OPTIONS,
	TIME_RANGE_OPTIONS,
} from '../../../constants/dashboard_filter_controls';

import styles from './styles.module.css';

const LOCATIONS_PROPS = {
	asyncKey    : 'list_locations',
	initialCall : false,
	placeholder : 'Port / Country',
	prefix      : <IcMSearchlight className={styles.search_icon} />,
	size        : 'sm',
	isClearable : true,
};
const MAIN_PORT_PROPS = {
	asyncKey    : 'list_locations_mapping',
	initialCall : true,
	placeholder : 'Main port',
	size        : 'sm',
	isClearable : true,
};
const LOCATION_KEYS = ['origin', 'destination'];
const TYPE_MAPPING = { seaport: 'port', airport: 'airport' };

function Filters(props) {
	const { globalFilters = {}, setGlobalFilters = () => {} } = props;
	const { service_type, time_range } = globalFilters;

	const params = {
		filters: {
			type: [
				`${service_type === 'fcl' ? 'seaport' : 'airport'}`,
				'country',
			],
		},
	};

	const changePrimaryFilters = (key, value) => {
		setGlobalFilters((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.single_filter}>
				<p className={styles.title_label}>Service Type</p>
				<Select
					size="sm"
					isClearable={false}
					placeholder="Select here"
					value={service_type}
					options={SERVICE_TYPE_OPTIONS}
					prefix={SELECT_ICON_MAPPING[service_type] || null}
					onChange={(value) => changePrimaryFilters('service_type', value)}
					className={styles.dropdown}
				/>
			</div>
			<div className={styles.location_filter_container}>
				{
					LOCATION_KEYS.map((key) => (
						<div key={key} className={styles[`${key}_location`]}>
							<div className={cl`${styles.single_filter} ${styles[key]}`}>
								<p className={styles.title_label}>{startCase(key)}</p>
								<AsyncSelect
									onChange={(value, obj) => {
										changePrimaryFilters(key, value);
										setGlobalFilters((prev) => ({
											...prev,
											[`${key}_type`]   : TYPE_MAPPING[obj?.type] || obj?.type,
											[`is_${key}_icd`] : !!obj?.is_icd,
										}));
									}}
									value={globalFilters[key]}
									className={styles.location_select}
									params={params}
									{...LOCATIONS_PROPS}
								/>
							</div>
							{globalFilters?.[`is_${key}_icd`] && (
								<div className={cl`${styles.single_filter} ${styles[`${key}_main_port`]}`}>
									<p className={styles.title_label}>Via</p>
									<AsyncSelect
										onChange={(value) => {
											changePrimaryFilters(`${key}_main_port`, value);
										}}
										value={globalFilters[key]}
										className={styles.location_select}
										params={{ location_id: globalFilters[key], type: 'main_ports' }}
										{...MAIN_PORT_PROPS}
									/>
								</div>
							)}
						</div>
					))
				}
				<div
					className={cl`${styles.single_filter} ${styles.icon_container}`}
				>
					<IcMPortArrow className={styles.port_arrow_icon} />
				</div>
			</div>
			<div className={styles.single_filter}>
				<p className={styles.title_label}>Time Range</p>
				<Select
					size="sm"
					isClearable={false}
					placeholder="Select here"
					value={time_range}
					options={TIME_RANGE_OPTIONS}
					prefix={null}
					onChange={(value) => changePrimaryFilters('time_range', value)}
					className={styles.time_range_drop_down}
				/>
			</div>
		</div>
	);
}

export default Filters;
