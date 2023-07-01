import { Tooltip, Placeholder, Select } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import { SALES_FUNNEL_OPTIONS } from '../../../constants';

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
	setSalesFunnelMonth?: (p:string)=>void,
	salesFunnelLoading?: boolean
}

function SalesFunnel({ salesFunnelData, salesFunnelMonth, setSalesFunnelMonth, salesFunnelLoading }: SalesFunnelProps) {
	const {
		draftInvoicesCount = '',
		draftToFinanceAcceptedPercentage = '',
		financeAcceptedInvoiceCount = '',
		financeToIrnPercentage = '',
		irnGeneratedInvoicesCount = '',
		settledInvoicesCount = '',
		settledPercentage = '',
	} = salesFunnelData || {};

	const salesFunnel = [
		{
			name       : 'Draft',
			count      : draftInvoicesCount || 0,
			percentage : draftToFinanceAcceptedPercentage || 0,
		},
		{
			name       : 'Finance Accepted',
			count      : financeAcceptedInvoiceCount || 0,
			percentage : financeToIrnPercentage || 0,
		},
		{
			name       : 'IRN Generated',
			count      : irnGeneratedInvoicesCount || 0,
			percentage : settledPercentage || 0,
		},
		{
			name  : 'Settled',
			count : settledInvoicesCount || 0,
		},
	];

	const onChange = (val:string) => {
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
							Sales Funnel
						</div>

						<Tooltip
							content={(
								<div>
									Current month Invoice
									<br />
									journey.
								</div>
							)}
							placement="top"
						>
							<div className={styles.icon}><IcMInfo height="18px" width="18px" /></div>
						</Tooltip>

					</div>
					<div className={styles.border} />
				</div>
				<div>
					<Select
						value={salesFunnelMonth}
						onChange={(val:string) => onChange(val)}
						placeholder="By Month"
						options={SALES_FUNNEL_OPTIONS}
						isClearable
					/>
				</div>
			</div>

			{salesFunnelLoading ? ([1, 2, 3, 4].map(() => (
				<div className={styles.sales_funnel_loader}>

					<Placeholder className={styles.sales_sub_funnel_loader} />
					<Placeholder className={styles.sales_sub_funnel_lower_loader} />

				</div>

			)))

				: (salesFunnel.map((item) => (
					<div className={styles.sales_funnel}>
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
						{ item.name !== 'Settled' && (
							<>
								<div className={styles.vertical_line} />
								<div className={styles.count_container}>
									{ item.percentage}
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
