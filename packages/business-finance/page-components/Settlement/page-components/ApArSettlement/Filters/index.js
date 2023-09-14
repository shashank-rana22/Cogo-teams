import { SingleDateRange, cl, MultiSelect, Toggle } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';

import { ACCOUNT_MODE_OPTIONS } from '../../../configurations/ap-ar-settlement/acc-filter';

import styles from './styles.module.css';

function Filters({
	filters = {},
	onFiltersChange = () => {},
	loading = false,
}) {
	const handleFilterChange = (filterName, value) => {
		onFiltersChange(filterName, value);
	};

	const { query } = useRouter();

	const { control } = useForm();

	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/settlement/ap-ar-settlement`;
	};

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<span className={styles.criteria}>
					Selection Criteria
				</span>
				<div>
					<Toggle
						name="toggle"
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>
				</div>
			</div>

			<div className={styles.horizontal} />
			<br />
			<div className={styles.select}>
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
						options={ACCOUNT_MODE_OPTIONS}
						isClearable
						style={{ width: '250px' }}
					/>
				</div>

			</div>

		</div>
	);
}

export default Filters;
