import { Chips, Select, Tooltip, cl } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMArrowRotateDown, IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import {
	LOCATIONS_PROPS, MAIN_PORT_PROPS, TYPE_MAPPING,
	getLocationParams,
} from '../../../configurations/global-filters';
import {
	SELECT_ICON_MAPPING,
	SERVICE_TYPE_OPTIONS,
	TIME_RANGE_OPTIONS,
} from '../../../constants/dashboard_filter_controls';
import { LOCATION_KEYS } from '../../../constants/map_constants';

import FilterButton from './FilterButton';
import styles from './styles.module.css';

function Filters(props) {
	const { globalFilters = {}, setGlobalFilters = () => {} } = props;
	const { service_type } = globalFilters;

	const defaultOptions = [...TIME_RANGE_OPTIONS.default,
		...TIME_RANGE_OPTIONS.more_options.filter(({ key }) => key === globalFilters.date_diff)];

	const changePrimaryFilters = (key, value) => {
		setGlobalFilters((prev) => ({ ...prev, [key]: value || undefined }));
	};

	const handleChange = (key, value, obj) => {
		changePrimaryFilters(key, value);
		setGlobalFilters((prev) => ({
			...prev,
			[`${key}_type`]         : TYPE_MAPPING[obj?.type] || obj?.type,
			[`is_${key}_icd`]       : !!obj?.is_icd,
			[`${key}_country_id`]   : obj?.country_id,
			[`${key}_region_id`]    : obj?.region_id,
			[`${key}_continent_id`] : obj?.continent_id,
		}));
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
							<div className={cl`${styles.single_filter} ${styles[key]}
							${globalFilters?.[`is_${key}_icd`] && styles.shrink_select}`}
							>
								<p className={styles.title_label}>{startCase(key)}</p>
								<AsyncSelect
									onChange={(value, obj) => handleChange(key, value, obj)}
									value={globalFilters[key]}
									className={styles.location_select}
									params={getLocationParams(service_type)}
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
										value={globalFilters[`${key}_main_port`]}
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
			<div className={cl`${styles.single_filter} ${styles.time_range}`}>
				<p className={styles.title_label}>Time Range</p>
				<div className={styles.time_range_container}>
					{defaultOptions.map(({ children, key }) => (
						<button
							key={children}
							className={cl`${styles.custom_pill}
							 ${key === globalFilters.date_diff ? styles.active : ''}`}
							onClick={() => changePrimaryFilters('date_diff', key)}
						>
							{children}
						</button>
					))}
					<Tooltip
						interactive
						trigger="click"
						content={(
							<Chips
								size="md"
								items={TIME_RANGE_OPTIONS.more_options}
								selectedItems={globalFilters.date_diff}
								onItemChange={(val) => { if (val) changePrimaryFilters('date_diff', val); }}
							/>
						)}
						placement="bottom-end"
					>
						<IcMArrowRotateDown className={styles.rotate_icon} />
					</Tooltip>
				</div>
			</div>
			<FilterButton
				showText
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}
			/>
		</div>
	);
}

export default Filters;
