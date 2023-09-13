import { Placeholder, Tooltip, Select } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { getSalesFunnelOptions } from '../../../constants';
import useGetInvoiceJourney from '../../../hooks/useGetInvoiceJourney';

import styles from './styles.module.css';

interface InvoiceJourneyProps {
	filterValue?: object
	entityCode?: string
}

function InvoiceJourney({ filterValue, entityCode }: InvoiceJourneyProps) {
	const { t = () => '' } = useTranslation(['accountRecievables']);

	const {
		journeyData, journeyLoading, dateFilter,
		setDateFilter, optionsVal,
	} = useGetInvoiceJourney({ filterValue, entityCode });

	const { irn_label:irnLabel } = ENTITY_FEATURE_MAPPING[entityCode].labels;

	const {
		draftInvoicesCount, financeAcceptedInvoiceCount,
		irnGeneratedInvoicesCount, settledInvoicesCount, tatHoursFromDraftToFinanceAccepted,
		tatHoursFromFinanceAcceptedToIrnGenerated, tatHoursFromIrnGeneratedToSettled, settledInvoiceEventCount,
		irnGeneratedInvoiceEventCount, financeAcceptedInvoiceEventCount,
	} = journeyData || {};

	const getCircleData = [
		{ id: 1, number: draftInvoicesCount || 0, label: t('draft') },
		{ id: 2, number: financeAcceptedInvoiceCount || 0, label: t('finance_accepted') },
		{ id: 3, number: irnGeneratedInvoicesCount || 0, label: `${irnLabel} ${t('generated')}` },
		{ id: 4, number: settledInvoicesCount || 0, label: t('settled') },
	];

	const getTatData = [
		{
			id    : 1,
			label : `${t('draft')} - ${t('finance_accepted')} `,
			TAT   : `${tatHoursFromDraftToFinanceAccepted || 0} ${t('hours')} `,
			Count : financeAcceptedInvoiceEventCount || 0,
		},
		{
			id    : 2,
			label : `${t('finance_accepted')} - ${irnLabel} ${t('generated')}`,
			TAT   : `${tatHoursFromFinanceAcceptedToIrnGenerated || 0} ${t('hours')} `,
			Count : irnGeneratedInvoiceEventCount || 0,
		},
		{
			id    : 3,
			label : `${irnLabel} ${t('generated')} - ${t('settled')} `,
			TAT   : `${tatHoursFromIrnGeneratedToSettled || 0} ${t('hours')} `,
			Count : settledInvoiceEventCount || 0,
		},
	];

	const onChange = (val:string, key:string) => {
		setDateFilter((p) => ({ ...p, [key]: val }));
	};
	return (
		<div className={styles.space_between}>
			<div className={styles.container}>
				<div className={styles.flex}>
					<div>
						<div className={styles.journey}>
							{t('invoice_statistics_and_TAT')}
							<Tooltip
								content={(
									<div className={styles.tooltip}>
										{t('invoice_tooltip')}
									</div>
								)}
								placement="top"
							>
								<div className={styles.icon}><IcMInfo height="18px" width="18px" /></div>
							</Tooltip>

						</div>
						<div className={styles.border} />
					</div>

				</div>

				{journeyLoading

					? (

						<div className={styles.invoice_journey_loader}>

							{	[1, 2, 3, 4].map((item) => (

								<Placeholder key={item} className={styles.invoice_loader} />

							))}

						</div>

					)

					: (
						<div className={styles.sub_container}>

							{ getCircleData.map((item) => (
								<div key={item.id} className={styles.column_flex}>
									<div className={styles.circle}>
										<div className={styles.number}>{item?.number}</div>
									</div>
									<div className={styles.text}>{item?.label}</div>
								</div>

							))}

						</div>
					)}
			</div>

			<div className={styles.tat_container}>
				<div className={styles.flex_date}>
					<div className={styles.margin_right}>
						<Select
							value={dateFilter.month}
							onChange={(val:string) => onChange(val, 'month')}
							placeholder={t('by_month_placeholder')}
							options={getSalesFunnelOptions(t)}
							isClearable
						/>
					</div>

					<Select
						value={dateFilter.year}
						onChange={(val:string) => onChange(val, 'year')}
						placeholder={t('by_year_placeholder')}
						options={optionsVal()}
						isClearable
					/>
				</div>

				{journeyLoading

					? (

						<div className={styles.invoice_tat_loader}>

							{	[1, 2, 3].map((item) => (

								<Placeholder key={item} className={styles.invoice_tat_placeholder} />

							))}

						</div>

					)

					: (
						<div className={styles.sub_tat_container}>
							{getTatData.map((item) => (
								<div key={item.id} className={styles.tat_data}>
									<div className={styles.text_padding}>{item?.label}</div>
									<div className={styles.tat_flex}>
										<div className={styles.border_tat} />
										<div className={styles.tat_value}>
											<span className={styles.span}>{t('TAT')}</span>
											:
											<span className={styles.color_tat}>{item?.TAT}</span>
											<span className={styles.color_count}>
												(
												{item?.Count}
												)
											</span>
										</div>
									</div>
								</div>

							))}
						</div>
					)}
			</div>
		</div>
	);
}
export default InvoiceJourney;
