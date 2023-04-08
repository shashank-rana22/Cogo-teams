import React from 'react';

import List from '../../../../../commons/List/index';
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

interface ItemTypes {
	jobNumber?: string;
	jobType?:string;
	discountAppliedKam?:number;
	discountAppliedRevenueDesk?:number;
	jobStatus?: string,
}
interface PropsType {
	cardData: ItemTypes;
	currentOpenSID: string;
	setCurrentOpenSID: Function;
	amountTab: string;
	setAmountTab: Function;
	setDataCard: Function;
}

interface FullResponseProps {
	totalRecords?: number;
	pageIndex?: number;
	list?: object[];
}

function CardItem({
	cardData,
	currentOpenSID,
	setCurrentOpenSID,
	amountTab,
	setDataCard,
	setAmountTab,
}: PropsType) {
	const { jobNumber, jobType } = cardData || {};
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

	const handleClick = () => {
		setCurrentOpenSID('');
	};

	const { pageIndex, list }: FullResponseProps = fullResponse || {};

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
		renderInvoices : (item: {}) => <ViewInvoice item={item} />,
		renderRemarks  : (item: {}) => <Remarks itemData={item} />,
	};

	return (
		<div>
			<div className={styles.hr} />
			<div className={styles.header}>
				<CardHeader
					itemData={cardData}
					amountTab={amountTab}
					setAmountTab={setAmountTab}
				/>
			</div>

			<div className={styles.card_list}>
				{list?.length === 0 ? (
					<div className={styles.no_data}>No Data Available</div>
				) : (
					<List
						config={config}
						itemData={fullResponse}
						functions={functions}
						loading={loading}
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

			<div className={styles.footer}>
				<div
					className={styles.footer_text}
					onClick={() => handleClick()}
					role="presentation"
				>
					View Less
				</div>
			</div>
		</div>
	);
}

export default CardItem;
