import { Tooltip, Placeholder, Select } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { getSalesFunnelOptions } from '../../../constants/index';

import styles from './styles.module.css';

const FIRST_ARRAY_SIZE = 4;
const DEFAULT_VALUE = 0;

function SalesFunnel({
	salesFunnelData, salesFunnelMonth, setSalesFunnelMonth,
	salesFunnelLoading, entityCode,
}) {
	const { t = () => '' } = useTranslation(['accountRecievables']);
	const d = new Date();
	const currentMonth = GLOBAL_CONSTANTS.month_name[d.getMonth()];
	const {
		draftInvoicesCount = '',
		draftToFinanceAcceptedPercentage = '',
		financeAcceptedInvoiceCount = '',
		financeToIrnPercentage = '',
		irnGeneratedInvoicesCount = '',
		settledInvoicesCount = '',
		settledPercentage = '',
	} = salesFunnelData || {};

	const { irn_label: irnLabel } = ENTITY_FEATURE_MAPPING[entityCode]?.labels || {};

	const salesFunnel = [
		{
			id         : 1,
			name       : t('draft'),
			count      : draftInvoicesCount || DEFAULT_VALUE,
			percentage : draftToFinanceAcceptedPercentage || DEFAULT_VALUE,
		},
		{
			id         : 2,
			name       : t('finance_accepted'),
			count      : financeAcceptedInvoiceCount || DEFAULT_VALUE,
			percentage : financeToIrnPercentage || DEFAULT_VALUE,
		},
		{
			id         : 3,
			name       : `${irnLabel} ${t('generated')}`,
			count      : irnGeneratedInvoicesCount || DEFAULT_VALUE,
			percentage : settledPercentage || DEFAULT_VALUE,
		},
		{
			id    : 4,
			name  : t('settled'),
			count : settledInvoicesCount || DEFAULT_VALUE,
		},
	];

	const onChange = (val) => {
		setSalesFunnelMonth(val);
	};
	return (
		<div className={styles.container}>
			<div
				className={styles.sub_container}
			>
				<div
					className={styles.sales_sub_funnel}
				>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<div
							className={styles.styled_text}
						>
							{t('sales_funnel')}
						</div>

						<Tooltip
							content={(
								<div className={styles.tooltip}>
									{t('sales_funnel_tooltip')}
								</div>
							)}
							placement="top"
						>
							<div className={styles.icon}><IcMInfo height="18px" width="18px" /></div>
						</Tooltip>

					</div>
					<div className={styles.border} />
				</div>
				<div className={styles.date_filter}>
					<Select
						value={salesFunnelMonth}
						onChange={(val) => onChange(val)}
						placeholder={currentMonth}
						options={getSalesFunnelOptions(t)}
						isClearable
					/>
				</div>
			</div>

			{salesFunnelLoading ? ([...Array(FIRST_ARRAY_SIZE).keys()].map((item) => (
				<div key={item} className={styles.sales_funnel_loader}>

					<Placeholder className={styles.sales_sub_funnel_loader} />
					<Placeholder className={styles.sales_sub_funnel_lower_loader} />

				</div>
			)))

				: (salesFunnel.map((item) => (
					<div key={item.id} className={styles.sales_funnel}>
						<div className={styles.sub_sales_funnel}>
							<div
								className={styles.styled_decoration}
							>
								{item.name}
								{' '}
								:

								<div
									className={styles.count}
								>
									{item.count}
								</div>
							</div>
						</div>
						{item.name !== 'Settled' && (
							<>
								<div className={styles.vertical_line} />
								<div className={styles.count_container}>
									{item.percentage}
									%
								</div>
								<div className={styles.vertical_line} />
							</>
						)}

					</div>
				))

				)}

			<div />

		</div>
	);
}

export default SalesFunnel;
