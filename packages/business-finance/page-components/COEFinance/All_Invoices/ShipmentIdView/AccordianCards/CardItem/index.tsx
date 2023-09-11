import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import List from '../../../../../commons/List/index';
import useGetQuotation from '../../../../hook/useGetQuotationBill';
import useListBills from '../../../../hook/useListBills';
import CardHeader from '../CardHeader/index';

import { quoteData } from './quoteData';
import AmountWithCurrency from './RenderData/AmountWithCurrency/index';
import FormatedDate from './RenderData/FormatedDate/index';
import InvoiceNumber from './RenderData/InvoiceNumber/index';
import ModifiedName from './RenderData/ModifiedName/index';
import Remarks from './RenderData/Remarks/index';
import Status from './RenderData/Status/index';
import ViewInvoice from './RenderData/ViewInvoice/index';
import styles from './styles.module.css';

interface ItemTypes {
	jobNumber?: string;
	jobType?:string;
	discountAppliedKam?:number;
	discountAppliedRevenueDesk?:number;
	jobStatus?: string,
	quotationType?: string,
}
interface PropsType {
	cardData: ItemTypes;
	currentOpenSID: string;
	setCurrentOpenSID: Function;
	amountTab: string;
	setAmountTab: Function;
	setDataCard: Function;
	showInvoices?: boolean;
	setShowInvoices?: Function;
	setCheckItem?: Function;
}

interface FullResponseProps {
	totalRecords?: number;
	pageIndex?: number;
	list?: object[];
}

// interface DataProps {
// 	totalRecords?: number;
// 	quotePageIndex?: number;
// 	quoteList?: object[];
// }

function CardItem({
	cardData,
	currentOpenSID,
	setCurrentOpenSID,
	amountTab,
	setDataCard,
	setAmountTab,
	showInvoices = false,
	setShowInvoices = () => {},
	setCheckItem = () => {},
}: PropsType) {
	const { jobNumber, jobType, quotationType } = cardData || {};
	const {
		loading,
		list: { fullResponse },
		config,
		filters,
		hookSetters,
	} = useListBills({
		jobNumber,
		jobType,
		amountTab,
		currentOpenSID,
		setDataCard,
	});

	const {
		quotationLoading,
		// list: { quoteData },
		quoteConfig,
	} = useGetQuotation({
		jobNumber,
		quotationType,
	});

	const handleClick = () => {
		setCurrentOpenSID('');
	};

	const { pageIndex = 1, list }: FullResponseProps = fullResponse || {};

	const functions = {
		renderInvoiceNumber: (item: {}, field: {}) => (
			<InvoiceNumber item={item} field={field} />
		),
		renderDates: (item: {}, field: {}) => (
			<FormatedDate item={item} field={field} />
		),
		renderName: (item: {}, field: {}) => (
			<ModifiedName item={item} field={field} />
		),
		renderAmount: (item: {}, field: {}) => (
			<AmountWithCurrency item={item} field={field} />
		),
		renderStatus   : (item: {}) => <Status item={item} />,
		renderInvoices : (item: {}, field: object) => <ViewInvoice item={item} field={field} />,
		renderRemarks  : (item: {}) => <Remarks itemData={item} />,
	};

	let finalConfig = config;
	let itemData = fullResponse;
	let finalLoading = loading;
	let finalFunctions = functions;

	if (amountTab === 'sellQuote' || amountTab === 'buyQuote') {
		finalConfig = quoteConfig;
		itemData = quoteData;
		finalLoading = quotationLoading;
		finalFunctions = {};
	}

	return (
		<div>
			<div className={styles.hr} />
			<div className={styles.header}>
				<CardHeader
					itemData={cardData}
					amountTab={amountTab}
					setAmountTab={setAmountTab}
					showInvoices={showInvoices}
				/>
			</div>

			<div className={styles.card_list}>
				{isEmpty(list) ? (
					<div className={styles.no_data}>No Data Available</div>
				) : (
					<List
						config={finalConfig}
						itemData={itemData}
						functions={finalFunctions}
						loading={finalLoading}
						page={pageIndex}
						pageSize={10}
						showPagination
						handlePageChange={(val: number) => hookSetters.setFilters({
							...filters,
							page: val,
						})}
					/>
				)}
			</div>

			{!showInvoices ? (
				<div className={styles.footer}>
					<div
						className={styles.footer_text}
						onClick={() => handleClick()}
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
						onClick={() => {
							setShowInvoices(false);
							setCheckItem(
								(prev: any) => ({ ...prev, sidDataCheck: true }),
							);
						}}
					>
						Accept
					</Button>
				</div>
			)}
		</div>
	);
}

export default CardItem;
