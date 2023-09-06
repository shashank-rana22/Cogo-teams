import { SingleDateRange, cl, MultiSelect } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';

import { ACC_OPTIONS } from '../../../configurations/ap-ar-settlement/acc-filter';

import styles from './styles.module.css';

function Filters({
	filters = {},
	onFiltersChange = () => {},
	loading = false,
}) {
	const handleFilterChange = (filterName, value) => {
		onFiltersChange(filterName, value);
	};

	const { control } = useForm();

	return (
		<div className={styles.container}>

			<div>
				<span className={styles.criteria}>
					Selection Criteria
					<IcMInfo style={{ marginLeft: '4px' }} />
				</span>
			</div>

			<div className={styles.horizontal} />
			<br />
			<div className={cl`${styles.select}  `}>
				<div className={cl`${styles.entity} ${styles.reqMargin}`}>
					Site/Entity
					<AsyncSelectController
						style={{ height: '32px' }}
						control={control}
						name="entityCode"
						asyncKey="list_cogo_entity"
						renderLabel={(item) => `${item?.entity_code} - ${item?.business_name}`}
						placeholder="Select Entity"
						labelKey="business_name"
						value={filters?.entityCode}
						initialCall
						rules={{ required: true }}
						isClearable
						onChange={(e) => handleFilterChange('entityCode', e)}
						loading={loading}
					/>
				</div>

				<div className={styles.reqMargin}>
					Date
					<SingleDateRange
						placeholder="Enter Date"
						dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
						name="date"
						isPreviousDaysAllowed
						onChange={(e) => handleFilterChange('date', e)}
						value={filters?.date}
						maxDate={new Date()}
					/>
				</div>

				<div className={styles.reqMargin}>
					Trade Party
					<AsyncSelectController
						control={control}
						name="orgId"
						asyncKey="list_trade_parties"
						renderLabel={(item) => `${item?.legal_business_name}`}
						placeholder="Business Partner"
						labelKey="legal_business_name"
						value={filters?.tradeParty}
						initialCall
						rules={{ required: true }}
						isClearable
						style={{ width: '250px' }}
						onChange={(e) => handleFilterChange('tradeParty', e)}
						loading={loading}
					/>
				</div>

				<div className={styles.reqMargin}>
					Acc Mode
					<MultiSelect
						value={filters?.accMode}
						className={styles.reqMargin}
						onChange={(e) => handleFilterChange('accMode', e)}
						placeholder="Acc Mode"
						options={ACC_OPTIONS}
						isClearable
						style={{ width: '250px' }}
					/>
				</div>

			</div>

		</div>
	);
}

export default Filters;
