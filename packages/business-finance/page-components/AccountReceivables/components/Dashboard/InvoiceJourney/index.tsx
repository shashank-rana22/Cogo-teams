import { Placeholder, Tooltip, Select } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { SALES_FUNNEL_OPTIONS } from '../../../constants';
import useGetInvoiceJourney from '../../../hooks/useGetInvoiceJourney';

import styles from './styles.module.css';

interface InvoiceJourneyProps {
	filterValue?: object
}

function InvoiceJourney({ filterValue }: InvoiceJourneyProps) {
	const [month, setMonth] = useState('');

	const { journeyData, journeyLoading } = useGetInvoiceJourney({ month, filterValue });

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
			TAT   : `${tatHoursFromDraftToFinanceAccepted || 0} Hours (${financeAcceptedInvoiceEventCount || 0})`,
		},
		{
			label : 'Finance Accepted - IRN Generated',
			TAT   : `${tatHoursFromFinanceAcceptedToIrnGenerated || 0} Hours (${irnGeneratedInvoiceEventCount || 0})`,
		},
		{
			label : 'IRN Generated - Settled ',
			TAT   : `${tatHoursFromIrnGeneratedToSettled || 0} Hours (${settledInvoiceEventCount || 0})`,
		},
	];

	const onChange = (val:string) => {
		setMonth(val);
	};

	return (
		<div className={styles.space_between}>
			<div className={styles.container}>
				<div className={styles.flex}>
					<div>
						<div className={styles.journey}>
							Invoice Statistics
							<Tooltip content="Current month Invoice Statistics." placement="top">
								<div className={styles.icon}><IcMInfo /></div>
							</Tooltip>

						</div>
						<div className={styles.border} />
					</div>

					<Select
						value={month}
						onChange={(val:string) => onChange(val)}
						placeholder="By Month"
						isClearable
						options={SALES_FUNNEL_OPTIONS}
					/>

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
				<div className={styles.flex}>
					<div>
						<div className={styles.journey}>
							Invoice TAT
							<Tooltip content="Current month Invoice TAT." placement="top">
								<div className={styles.icon}><IcMInfo /></div>
							</Tooltip>

						</div>
						<div className={styles.border} />
					</div>

					<div className={styles.date}>
						<Select
							value={month}
							onChange={(val:string) => onChange(val)}
							placeholder="By Month"
							isClearable
							options={SALES_FUNNEL_OPTIONS}
						/>
					</div>
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
									<div>{item?.label}</div>
									<div className={styles.tat_flex}>
										<div className={styles.border_tat} />
										<div className={styles.tat_value}>
											TAT :
											<span className={styles.color_tat}>{item?.TAT}</span>
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
