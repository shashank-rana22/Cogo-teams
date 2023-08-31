import { Button, Select } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { optionEntity, optionsGSTIN, optionsMonth, optionsYear } from '../helper';

import styles from './styles.module.css';

function HeaderOutward({ filters, setFilters, exportTrigger, loading }) {
	const { entity, gstIn, month, year } = filters || {};
	const { t } = useTranslation(['compliance']);
	return (
		<div className={styles.header_container}>
			<div>
				<div className={styles.filter_heading}>{t('compliance:entity')}</div>
				<Select
					value={entity}
					onChange={(val) => { setFilters((prev) => ({ ...prev, entity: val })); }}
					placeholder={t('compliance:select_entity')}
					options={optionEntity}
					isClearable
					style={{ width: '250px' }}
					size="sm"
				/>
			</div>

			<div className={styles.margin_select}>
				<div className={styles.filter_heading}>{t('compliance:gstin')}</div>
				<Select
					value={gstIn}
					disabled={!entity}
					onChange={(val) => { setFilters((prev) => ({ ...prev, gstIn: val })); }}
					placeholder={t('compliance:select_cogo_gstin')}
					options={optionsGSTIN(entity)}
					isClearable
					style={{ width: '250px' }}
					size="sm"
				/>
			</div>

			<div className={styles.margin_select}>
				<div className={styles.filter_heading}>{t('compliance:return_period')}</div>
				<Select
					value={month}
					onChange={(val) => { setFilters((prev) => ({ ...prev, month: val })); }}
					placeholder={t('compliance:month')}
					options={optionsMonth}
					isClearable
					style={{ width: '120px' }}
					size="sm"
				/>
			</div>

			<div className={styles.margin_select}>
				<div className={styles.filter_heading}>{t('compliance:year')}</div>
				<Select
					value={year}
					onChange={(val) => { setFilters((prev) => ({ ...prev, year: val })); }}
					placeholder={t('compliance:year')}
					options={optionsYear}
					isClearable
					style={{ width: '120px' }}
					size="sm"
				/>
			</div>

			<div className={styles.margin_select}>
				<Button
					loading={loading}
					disabled={!(year && gstIn && month && entity)}
					onClick={exportTrigger}
				>
					{t('compliance:export')}
					{' '}

				</Button>
			</div>
		</div>
	);
}
export default HeaderOutward;
