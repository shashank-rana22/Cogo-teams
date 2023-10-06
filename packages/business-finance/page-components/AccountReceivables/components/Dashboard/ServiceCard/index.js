import { Tooltip, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import CardData from './CardData';
import { getCardData, getServiceData } from './getCardServiceData';
import styles from './styles.module.css';

const TRADE_TYPE_MAPPING = {
	Ocean   : 'ocean',
	Air     : 'air',
	Surface : 'surface',
};

function ServiceCard({ outstandingData = {}, outstandingLoading = false, entityCode = '' }) {
	const { t = () => '' } = useTranslation(['accountRecievables']);

	const { outstandingServiceWise = {} } = outstandingData || {};

	const {
		ocean = {},
		air = {},
		surface = {},
	} = outstandingServiceWise || {};
	const [isAccordionActive, setIsAccordionActive] = useState(false);

	const { currency } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	const {
		currency:oceanCurrency = '', openInvoiceAmount:oceanOpen = '',
		tradeType:oceanTradeType = [],
	} = ocean || {};
	const { currency:airCurrency = '', openInvoiceAmount:airOpen = '', tradeType:airTradeType = [] } = air || {};
	const {
		currency:surfaceCurrency = '',
		openInvoiceAmount:surfaceOpen = '', tradeType:surfaceTradeType = [],
	} = surface || {};

	const [tab, setTab] = useState({
		key  : 'Ocean',
		data : outstandingServiceWise?.ocean?.tradeType || [{}],
	});

	const handleClick = (el) => {
		if (el !== '') {
			const tradeTypeKey = TRADE_TYPE_MAPPING[el] || 'Ocean';
			setTab({ key: el, data: outstandingServiceWise?.[tradeTypeKey]?.tradeType || [{}] });
		}
		setIsAccordionActive((prev) => !prev);
	};

	useEffect(() => {
		setTab({
			key  : 'Ocean',
			data : outstandingServiceWise?.ocean?.tradeType,
		});
	}, [outstandingServiceWise?.ocean?.tradeType]);

	return (
		<div
			style={{
				maxHeight: isAccordionActive ? '430px' : '60px',
			}}
			className={styles.container}
		>
			<div
				className={styles.service_container}
				onClick={() => (isAccordionActive ? handleClick('') : handleClick('Ocean'))}
				role="presentation"
			>
				<div className={styles.sub_service_container}>
					{outstandingLoading ? <Placeholder className={styles.placeholder_container} />
						: (
							<div className={styles.styled_text}>
								{t('account_receivables_by_service')}
							</div>
						)}
				</div>
				{	!isAccordionActive
				&& (
					<div className={styles.ocean_container}>
						{outstandingLoading
							? [1, 2, 3].map((val) => (

								<div key={val} className={styles.card}>
									<div className={styles.row}>
										<Placeholder />
									</div>
								</div>
							))
							: (
								<>
									{getServiceData({
										t,
										oceanOpen,
										oceanCurrency,
										currency,
										airCurrency,
										airOpen,
										surfaceCurrency,
										surfaceOpen,
									}).map((item) => (
										<div
											className={styles.sub_ocean_container}
											key={item.label}
											onClick={(event) => {
												event.stopPropagation();
												handleClick(item?.label);
											}}
											role="presentation"
										>
											{item.icon}
											<div className={styles.ocean_text}>
												{item.label}
											</div>
											<div className={styles.amount_currency}>
												<div className={styles.account_receivables_open_line}>

													<div
														className={styles.account_receivables_amount}
													>
														<Tooltip content={(
															<div>
																{formatAmount({
																	amount   : item.amount,
																	currency : item.currency,
																	options  : {
																		style           : 'currency',
																		currencyDisplay : 'code',
																	},
																})}
															</div>
														)}
														>
															<div className={styles.wrapper}>
																{formatAmount({
																	amount   : item?.amount,
																	currency : item?.currency,
																	options  : {
																		notation              : 'compact',
																		compactDisplay        : 'short',
																		maximumFractionDigits : 2,
																		style                 : 'currency',
																		currencyDisplay       : 'code',
																		currencyWise          : true,
																	},
																})}
															</div>

														</Tooltip>

													</div>
												</div>
											</div>
										</div>
									))}
								</>
							)}
					</div>
				)}

				<div className={styles.header} onClick={() => handleClick('')} role="presentation">
					{isAccordionActive ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
				</div>

			</div>

			{isAccordionActive
			&& (
				<div>
					<div
						className={styles.accordian_card}
					/>
					<div className={styles.accordian_sub_card}>

						{getCardData({
							t,
							oceanOpen,
							oceanCurrency,
							currency,
							oceanTradeType,
							airCurrency,
							airOpen,
							airTradeType,
							surfaceCurrency,
							surfaceOpen,
							surfaceTradeType,
						}).map((item) => (
							<div
								key={item.label}
								className={item.label === tab.key ? styles.on_click_ocean_card : styles.ocean_card}
								onClick={() => {
									setTab((prev) => ({
										...prev,
										key  : item?.label,
										data : item?.tradeType,
									}));
								}}
								role="presentation"
							>
								<div className={styles.sub_ocean_card}>
									<div className={styles.label_flex}>

										<div className={item.label === tab.key && styles.icon}>{item?.icon}</div>
										<div>
											<div
												className={item.label === tab.key
													? styles.text_label : styles.styled_ocean_text}
											>
												{item?.label}
											</div>
										</div>
									</div>
								</div>
								<div>
									<div className={styles.styled_ocean_text}>
										{formatAmount({
											amount   : item?.openInvoices,
											currency : item?.currency,
											options  : {
												notation              : 'compact',
												compactDisplay        : 'short',
												maximumFractionDigits : 2,
												style                 : 'currency',
												currencyDisplay       : 'code',
												currencyWise          : true,
											},
										})}
									</div>
								</div>
							</div>
						))}
					</div>
					<div><CardData tab={tab} /></div>
					<div
						className={styles.view_less}
						onClick={() => handleClick('')}
						role="presentation"
					>
						<div
							className={styles.sub_view_less}
						>
							{t('view_less')}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ServiceCard;
