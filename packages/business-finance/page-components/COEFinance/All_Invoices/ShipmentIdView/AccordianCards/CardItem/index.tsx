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

interface propsType {
	cardData: any;
	currentOpenSID: string;
	setCurrentOpenSID: Function;
	refetch: Function;
	amountTab: string;
	setAmountTab: Function;
	setDataCard: Function;
}

interface fullResponseProps {
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
}: propsType) {
	const {
		loading,
		list: { fullResponse },
		config,
	} = useListBills({
		serial_id: cardData?.serial_id,
		amountTab,
		currentOpenSID,
		setDataCard,
	});

	const handleClick = () => {
		setCurrentOpenSID('');
	};

	const { totalRecords, pageIndex, list }: fullResponseProps = fullResponse || {};

	const functions = {
		renderInvoiceNumber: (item: {}, field: {}) => (
			<InvoiceNumber item={item} field={field} />
		),
		renderDates: (item: any, field: {}) => (
			<FormatedDate item={item} field={field} />
		),
		renderName: (item: any, field: {}) => (
			<ModifiedName item={item} field={field} />
		),
		renderAmount: (item: any, field: {}) => (
			<AmountWithCurrency item={item} field={field} />
		),
		renderStatus: (item: {}, field: {}) => (
			<Status item={item} field={field} />
		),
		renderInvoices: (item: {}, field: {}) => (
			<ViewInvoice item={item} field={field} />
		),
		renderRemarks: (item: any) => <Remarks itemData={item} />,
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

			<div className={styles.cardList}>
				{list?.length === 0 ? (
					<div className={styles.noData}>No Data Available</div>
				) : (
					<List
						config={config}
						itemData={fullResponse}
						functions={functions}
						loading={loading}
						page={pageIndex}
						pageSize={totalRecords}
						showPagination={false}
					/>
				)}
			</div>

			<div className={styles.footer}>
				<div
					className={styles.footerText}
					onClick={() => handleClick()}
				>
					View Less
				</div>
			</div>
		</div>
	);
}

export default CardItem;
