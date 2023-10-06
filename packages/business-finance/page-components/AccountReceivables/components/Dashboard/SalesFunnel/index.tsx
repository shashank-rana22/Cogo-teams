import { Tooltip, Placeholder, Select } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { getSalesFunnelOptions } from '../../../constants';

import styles from './styles.module.css';

interface SalesFunnelData {
	draftInvoicesCount?: string,
	draftToFinanceAcceptedPercentage?: string,
	financeAcceptedInvoiceCount?: string,
	financeToIrnPercentage?: string,
	irnGeneratedInvoicesCount?: string,
	settledInvoicesCount?: string,
	settledPercentage?: string
}

interface SalesFunnelProps {
	salesFunnelData?: SalesFunnelData,
	salesFunnelMonth?: string,
	setSalesFunnelMonth?: (p: string) => void,
	salesFunnelLoading?: boolean
	entityCode?: string
}

function SalesFunnel({
	salesFunnelData, salesFunnelMonth, setSalesFunnelMonth,
	salesFunnelLoading, entityCode,
}: SalesFunnelProps) {
	const { t = () => '' } = useTranslation(['accountRecievables']);
	const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
		'August', 'September', 'October', 'November', 'December'];
	const d = new Date();
	const currentMonth = month[d.getMonth()];
	const {
		draftInvoicesCount = '',
		draftToFinanceAcceptedPercentage = '',
		financeAcceptedInvoiceCount = '',
		financeToIrnPercentage = '',
		irnGeneratedInvoicesCount = '',
		settledInvoicesCount = '',
		settledPercentage = '',
	} = salesFunnelData || {};

	const { irn_label: irnLabel } = ENTITY_FEATURE_MAPPING[entityCode].labels;

	const salesFunnel = [
		{
			id         : 1,
			name       : t('draft'),
			count      : draftInvoicesCount || 0,
			percentage : draftToFinanceAcceptedPercentage || 0,
		},
		{
			id         : 2,
			name       : t('finance_accepted'),
			count      : financeAcceptedInvoiceCount || 0,
			percentage : financeToIrnPercentage || 0,
		},
		{
			id         : 3,
			name       : `${irnLabel} ${t('generated')}`,
			count      : irnGeneratedInvoicesCount || 0,
			percentage : settledPercentage || 0,
		},
		{
			id    : 4,
			name  : t('settled'),
			count : settledInvoicesCount || 0,
		},
	];

	const onChange = (val: string) => {
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
						onChange={(val: string) => onChange(val)}
						placeholder={currentMonth}
						options={getSalesFunnelOptions(t)}
						isClearable
					/>
				</div>
			</div>

			{salesFunnelLoading ? ([1, 2, 3, 4].map((item) => (
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
