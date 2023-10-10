import { SingleDateRange, cl, MultiSelect } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';

import { accountModeOptions } from '../../../configurations/ap-ar-settlement/acc-filter';

import styles from './styles.module.css';

function Filters({
	filters = {},
	onFiltersChange = () => {},
	loading = false,
}) {
	const { t = () => {} } = useTranslation(['settlement']);

	const { control } = useForm();
	const handleFilterChange = (filterName, value) => {
		onFiltersChange(filterName, value);
	};

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<span className={styles.criteria}>
					{t('settlement:selection_criteria_label')}
				</span>
			</div>

			<div className={styles.horizontal} />
			<br />
			<div className={styles.select}>
				<div className={cl`${styles.entity} ${styles.reqMargin}`}>
					{t('settlement:site_entity_text')}
					<AsyncSelectController
						style={{ height: '32px' }}
						control={control}
						name="entityCode"
						asyncKey="list_cogo_entity"
						renderLabel={(item) => `${item?.entity_code} - ${item?.business_name}`}
						placeholder={t('settlement:select_entity_placeholder') || ''}
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
					{t('settlement:date_text')}
					<SingleDateRange
						placeholder={t('settlement:date_placeholder') || ''}
						dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
						name="date"
						isPreviousDaysAllowed
						onChange={(e) => handleFilterChange('date', e)}
						value={filters?.date}
						maxDate={new Date()}
					/>
				</div>

				<div className={styles.reqMargin}>
					{t('settlement:trade_party_text')}
					<AsyncSelectController
						control={control}
						name="orgId"
						asyncKey="list_trade_parties"
						renderLabel={(item) => `${item?.legal_business_name}`}
						placeholder={t('settlement:trade_party_placeholder') || ''}
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
					{t('settlement:acc_mode_placeholder')}
					<MultiSelect
						value={filters?.accMode}
						className={styles.reqMargin}
						onChange={(e) => handleFilterChange('accMode', e)}
						placeholder={t('settlement:acc_mode_placeholder') || ''}
						options={accountModeOptions({ t })}
						isClearable
						style={{ width: '250px' }}
					/>
				</div>

			</div>

		</div>
	);
}

export default Filters;
