import { Placeholder, Tooltip, Select } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import { SALES_FUNNEL_OPTIONS } from '../../../constants';
import useGetInvoiceJourney from '../../../hooks/useGetInvoiceJourney';

import styles from './styles.module.css';

interface InvoiceJourneyProps {
	filterValue?: object
	entityCode?: string
}

function InvoiceJourney({ filterValue, entityCode }: InvoiceJourneyProps) {
	const {
		journeyData, journeyLoading, dateFilter,
		setDateFilter, optionsVal,
	} = useGetInvoiceJourney({ filterValue, entityCode });

	const {
		draftInvoicesCount, financeAcceptedInvoiceCount,
		irnGeneratedInvoicesCount, settledInvoicesCount, tatHoursFromDraftToFinanceAccepted,
		tatHoursFromFinanceAcceptedToIrnGenerated, tatHoursFromIrnGeneratedToSettled, settledInvoiceEventCount,
		irnGeneratedInvoiceEventCount, financeAcceptedInvoiceEventCount,
	} = journeyData || {};

	const getCircleData = [
		{
			number : draftInvoicesCount || 0,
			label  : 'Draft',
		},
		{ number: financeAcceptedInvoiceCount || 0, label: 'Finance Accepted' },
		{ number: irnGeneratedInvoicesCount || 0, label: 'IRN Generated' },
		{ number: settledInvoicesCount || 0, label: 'Settled' },
	];

	const getTatData = [
		{
			label : 'Draft - Finance Accepted',
			TAT   : `${tatHoursFromDraftToFinanceAccepted || 0} Hours `,
			Count : financeAcceptedInvoiceEventCount || 0,
		},
		{
			label : 'Finance Accepted - IRN Generated',
			TAT   : `${tatHoursFromFinanceAcceptedToIrnGenerated || 0} Hours `,
			Count : irnGeneratedInvoiceEventCount || 0,
		},
		{
			label : 'IRN Generated - Settled ',
			TAT   : `${tatHoursFromIrnGeneratedToSettled || 0} Hours `,
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
							Invoice Statistics and TAT
							<Tooltip
								content={(
									<div>
										Current month Invoice
										{' '}
										<br />
										Statistics and TAT.
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

							{	[1, 2, 3, 4].map(() => (

								<Placeholder className={styles.invoice_loader} />

							))}

						</div>

					)

					: (
						<div className={styles.sub_container}>

							{ getCircleData.map((item) => (
								<div className={styles.column_flex}>
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
							placeholder="By Month"
							options={SALES_FUNNEL_OPTIONS}
							isClearable
						/>
					</div>

					<Select
						value={dateFilter.year}
						onChange={(val:string) => onChange(val, 'year')}
						placeholder="By Year"
						options={optionsVal()}
						isClearable
					/>
				</div>

				{journeyLoading

					? (

						<div className={styles.invoice_tat_loader}>

							{	[1, 2, 3].map(() => (

								<Placeholder className={styles.invoice_tat_placeholder} />

							))}

						</div>

					)

					: (
						<div className={styles.sub_tat_container}>
							{getTatData.map((item) => (
								<div className={styles.tat_data}>
									<div className={styles.text_padding}>{item?.label}</div>
									<div className={styles.tat_flex}>
										<div className={styles.border_tat} />
										<div className={styles.tat_value}>
											TAT :
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
