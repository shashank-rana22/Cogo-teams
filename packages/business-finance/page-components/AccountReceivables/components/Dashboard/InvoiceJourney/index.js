import { Placeholder, Tooltip, Select } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { getSalesFunnelOptions } from '../../../constants/index';
import useGetInvoiceJourney from '../../../hooks/useGetInvoiceJourney';

import styles from './styles.module.css';

const FIRST_ARRAY_SIZE = 3;
const SECOND_ARRAY_SIZE = 4;
const DEFAULT_VALUE = 0;

function InvoiceJourney({ filterValue, entityCode = '' }) {
	const { t = () => '' } = useTranslation(['accountRecievables']);
	const d = new Date();
	const currentMonth = GLOBAL_CONSTANTS.month_name[d.getMonth()];
	const currentYear = d.getFullYear();

	const {
		journeyData, journeyLoading, dateFilter,
		setDateFilter, optionsVal,
	} = useGetInvoiceJourney({ filterValue, entityCode });

	const { irn_label: irnLabel } = ENTITY_FEATURE_MAPPING[entityCode]?.labels || {};

	const {
		draftInvoicesCount, financeAcceptedInvoiceCount,
		irnGeneratedInvoicesCount, settledInvoicesCount, tatHoursFromDraftToFinanceAccepted,
		tatHoursFromFinanceAcceptedToIrnGenerated, tatHoursFromIrnGeneratedToSettled, settledInvoiceEventCount,
		irnGeneratedInvoiceEventCount, financeAcceptedInvoiceEventCount,
	} = journeyData || {};

	const getCircleData = [
		{ id: 1, number: draftInvoicesCount || DEFAULT_VALUE, label: t('draft') },
		{ id: 2, number: financeAcceptedInvoiceCount || DEFAULT_VALUE, label: t('finance_accepted') },
		{ id: 3, number: irnGeneratedInvoicesCount || DEFAULT_VALUE, label: `${irnLabel} ${t('generated')}` },
		{ id: 4, number: settledInvoicesCount || DEFAULT_VALUE, label: t('settled') },
	];

	const getTatData = [
		{
			id    : 1,
			label : `${t('draft')} - ${t('finance_accepted')} `,
			TAT   : `${tatHoursFromDraftToFinanceAccepted || DEFAULT_VALUE} ${t('hours')} `,
			Count : financeAcceptedInvoiceEventCount || DEFAULT_VALUE,
		},
		{
			id    : 2,
			label : `${t('finance_accepted')} - ${irnLabel} ${t('generated')}`,
			TAT   : `${tatHoursFromFinanceAcceptedToIrnGenerated || DEFAULT_VALUE} ${t('hours')} `,
			Count : irnGeneratedInvoiceEventCount || DEFAULT_VALUE,
		},
		{
			id    : 3,
			label : `${irnLabel} ${t('generated')} - ${t('settled')} `,
			TAT   : `${tatHoursFromIrnGeneratedToSettled || DEFAULT_VALUE} ${t('hours')} `,
			Count : settledInvoiceEventCount || DEFAULT_VALUE,
		},
	];

	const onChange = (val, key) => {
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

							{[...Array(SECOND_ARRAY_SIZE).keys()].map((item) => (

								<Placeholder key={item} className={styles.invoice_loader} />

							))}

						</div>

					)

					: (
						<div className={styles.sub_container}>

							{getCircleData.map((item) => (
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
							onChange={(val) => onChange(val, 'month')}
							placeholder={currentMonth}
							options={getSalesFunnelOptions(t)}
							isClearable
						/>
					</div>

					<Select
						value={dateFilter.year}
						onChange={(val) => onChange(val, 'year')}
						placeholder={currentYear}
						options={optionsVal()}
						isClearable
					/>
				</div>

				{journeyLoading

					? (

						<div className={styles.invoice_tat_loader}>

							{[...Array(FIRST_ARRAY_SIZE).keys()].map((item) => (

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
