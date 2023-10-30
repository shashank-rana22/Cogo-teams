import { Button, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React, { useState } from 'react';

import List from '../../../../../commons/List/index';
import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';
import useListBills from '../../../../hook/useListBills';
import CardHeader from '../CardHeader/index';

import AmountWithCurrency from './RenderData/AmountWithCurrency/index';
import FormatedDate from './RenderData/FormatedDate/index';
import InvoiceNumber from './RenderData/InvoiceNumber/index';
import ModifiedName from './RenderData/ModifiedName/index';
import Remarks from './RenderData/Remarks/index';
import Status from './RenderData/Status/index';
import ViewInvoice from './RenderData/ViewInvoice/index';
import styles from './styles.module.css';

const PRESENT_TAB = 'sidDataTab';
const TAB_TO_OPEN = 'collectionPartyTab';

function CardItem({
	cardData,
	currentOpenSID,
	setCurrentOpenSID,
	amountTab,
	setDataCard,
	setAmountTab,
	onAccept = (prop) => (prop),
	showTab = false,
	sidDataChecked = false,
	shipmentIdView = true,
}) {
	const [isCheckoutQuote, setIsCheckoutQuote] = useState(false);

	const { jobNumber, jobType } = cardData || {};
	const {
		loading,
		list: { fullResponse },
		config,
		filters,
		hookSetters,
		quoteData,
	} = useListBills({
		jobNumber,
		jobType,
		amountTab,
		currentOpenSID,
		setDataCard,
		isCheckoutQuote,
	});

	const handleClick = () => {
		setCurrentOpenSID('');
	};

	const getFormattedAmount = (amount = '', currency = '') => formatAmount({
		amount,
		currency,
		options: {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});

	const getLineItemData = (lineItemData = '-') => {
		if (typeof lineItemData === 'string') {
			const parts = lineItemData?.split('_');
			const capitalizedWords = (parts || []).map((word) => word.charAt(0).toUpperCase() + word.slice(1));
			const resultData = capitalizedWords.join(' ');
			return resultData;
		}
		return '-';
	};

	const { pageIndex = 1 } = fullResponse || {};

	const functions = {
		renderInvoiceNumber: (item, field) => (
			<InvoiceNumber item={item} field={field} />
		),
		renderDates: (item, field) => (
			<FormatedDate item={item} field={field} />
		),
		renderName: (item, field) => (
			<ModifiedName item={item} field={field} />
		),
		renderAmount: (item, field) => (
			<AmountWithCurrency item={item} field={field} />
		),
		renderStatus              : (item) => <Status item={item} />,
		renderInvoices            : (item, field) => <ViewInvoice item={item} field={field} />,
		renderRemarks             : (item) => <Remarks itemData={item} />,
		renderQuotationName       : ({ name = '' }) => showOverflowingNumber(name, 30),
		renderLineItemUnit        : ({ unit = '' }) => getLineItemData(unit),
		renderLineItemServiceType : ({ service_type = '' }) => getLineItemData(service_type),
		showFormattedPrice        : ({ price = '', currency = '' }) => getFormattedAmount(price, currency),
		showFormattedPreTax       : ({ total_price = '', currency = '' }) => getFormattedAmount(total_price, currency),
		showFormattedPostTax:
		({ tax_total_price = '', currency = '' }) => getFormattedAmount(tax_total_price, currency),
	};

	const getResponseData = () => {
		if (['expense', 'income'].includes(amountTab)) {
			return fullResponse;
		} if (['buyQuote', 'sellQuote'].includes(amountTab)) {
			return { list: quoteData || [] };
		}
		return { list: [] };
	};

	return (
		<>
			<div className={styles.hr} />
			<div className={styles.header}>
				<CardHeader
					itemData={cardData}
					amountTab={amountTab}
					setAmountTab={setAmountTab}
					showTab={showTab}
					shipmentIdView={shipmentIdView}
					isCheckoutQuote={isCheckoutQuote}
					setIsCheckoutQuote={setIsCheckoutQuote}
				/>
			</div>

			<div className={cl`${styles.card_list} ${!shipmentIdView ? styles.scrollable_list : null}`}>
				<List
					config={config}
					itemData={getResponseData()}
					functions={functions}
					loading={loading}
					page={pageIndex}
					pageSize={10}
					showPagination
					handlePageChange={(val) => hookSetters.setFilters({
						...filters,
						page: val,
					})}
				/>
			</div>

			{!showTab ? (
				<div className={styles.footer}>
					<div
						className={styles.footer_text}
						onClick={handleClick}
						role="presentation"
					>
						View Less
					</div>
				</div>
			) : (
				<div className={styles.approve_button}>
					<Button
						size="md"
						themeType="secondary"
						disabled={sidDataChecked}
						onClick={() => onAccept({
							tabName      : PRESENT_TAB,
							tabToOpen    : TAB_TO_OPEN,
							timelineItem : 'sidDataCheck',
						})}
					>
						Approve
					</Button>
				</div>
			)}
		</>
	);
}

export default CardItem;
