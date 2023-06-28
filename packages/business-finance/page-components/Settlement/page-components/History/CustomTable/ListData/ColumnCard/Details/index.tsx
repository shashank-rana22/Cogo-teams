import { Button, Pagination, Pill } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { INVOICE_STATUS, INVOICE_STATUS_MAPPING } from '../../../../../../Constants';
import usePostSettlementToSage from '../../../../../../hooks/usePostSettlementToSage';
import Loader from '../../../../../Loader';

import LineItemsHeader from './LineItemsHeader';
import styles from './styles.module.css';

interface ListItem {
	id: string;
	documentValue: string;
	documentAmount: number;
	settledAmount: number;
	balanceAmount: number;
	transactionDate: string;
	lastEditedDate: string;
	currency: string;
	documentNo: string;
	accountType: string;
	accMode: string;
	notPostedSettlementIds : Array<number>;
	ledCurrency: string;
}

interface List {
	id: string;
	documentValue: string;
	sid?: string;
	documentAmount?: number;
	currency?: string;
	settledAmount?: number;
	tds?: number;
	nostroAmount?: number;
	currentBalance?: number;
	transactionDate?: string;
	status?: string;
	settlementStatus?: string;
	accMode?: string;

}

interface SettlementData {
	list: List[];
	pageNo: number;
	totalRecords: number;
}

interface Props {
	item: ListItem;
	refetch: ()=>void;
	data: SettlementData;
	loading: boolean;
	onPageChange: (val:number) =>void;
}

const DEFAULT_VALUE = {
	id                     : '',
	documentValue          : '',
	documentAmount         : 0,
	settledAmount          : 0,
	balanceAmount          : 0,
	transactionDate        : '',
	lastEditedDate         : '',
	currency               : '',
	documentNo             : '',
	accountType            : '',
	accMode                : '',
	notPostedSettlementIds : [],
	ledCurrency            : '',

};

function Details({ data, refetch, item = DEFAULT_VALUE, loading, onPageChange }: Props) {
	const { notPostedSettlementIds = [], ledCurrency = '' } = item || {};

	const { loading: bulkPostToSageLoading, bulkPostToSageAction } = usePostSettlementToSage({ refetch });

	const { list = [], pageNo = 0, totalRecords = 0 } = data || {};

	const listTotal = list?.length;

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.details}>
			<div className={styles.line} />
			<div className={styles.actions_container}>
				{' '}

				<div>
					<Button size="sm" disabled>
						Edit
					</Button>
				</div>
				<div className={styles.margin_left}>
					<Button size="sm" disabled>
						Delete
					</Button>
				</div>
				<div className={styles.margin_left}>
					<Button
						size="sm"
						onClick={() => bulkPostToSageAction(notPostedSettlementIds)}
						disabled={bulkPostToSageLoading || !notPostedSettlementIds.length
							|| ledCurrency === GLOBAL_CONSTANTS.currency_code.VND}
					>
						Post Settlement to SAGE
					</Button>
				</div>
			</div>
			<div className={styles.table}>
				<LineItemsHeader />
				{list.map((singleitem, index) => (
					<div
						className={`${styles.col} ${listTotal - 1 === index ? styles.islast : ''}`}
						key={singleitem?.id}
					>
						<div className={styles.doc_number}>{singleitem?.documentValue}</div>
						<div className={styles.sid}>{singleitem?.sid || '-'}</div>
						<div className={styles.doc_amount}>
							{
                                getFormattedPrice(singleitem?.documentAmount, singleitem?.currency) || '-'
                            }
						</div>
						<div className={styles.settled_amount}>
							{ getFormattedPrice(
								singleitem?.settledAmount,
								singleitem?.currency,
							) || '-'}
						</div>
						<div className={styles.tds}>
							{ getFormattedPrice(
								singleitem?.tds,
								singleitem?.currency,
							) || '-'}
						</div>
						<div className={styles.nostro}>

							{ getFormattedPrice(
								singleitem?.nostroAmount,
								singleitem?.currency,
							) || '-'}
						</div>
						<div className={styles.current_balance}>

							{getFormattedPrice(
								singleitem?.currentBalance,
								singleitem?.currency,
							) || '-'}
						</div>
						<div className={styles.doc_date}>
							{singleitem?.transactionDate
								? formatDate({
									date       : singleitem?.transactionDate,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
									formatType : 'date',
								})
								: '--'}
						</div>
						<div className={styles.status}>
							<Pill size="sm" color={INVOICE_STATUS[singleitem?.status]}>
								{startCase(singleitem?.status)}
							</Pill>
						</div>
						<div className={styles.settlemet_status}>
							<Pill size="sm" color={INVOICE_STATUS_MAPPING[singleitem?.settlementStatus]}>
								{startCase(singleitem?.settlementStatus)}
							</Pill>
						</div>
						<div className={styles.ribbon_render}>
							<div
								className={singleitem?.accMode === 'AP' ? styles.ribbon_red : styles.ribbon_orange}
							>
								{singleitem?.accMode}
							</div>
						</div>
					</div>
				))}
			</div>
			<Pagination
				className={styles.pagination}
				type="number"
				currentPage={pageNo}
				totalItems={totalRecords}
				pageSize={5}
				onPageChange={onPageChange}
			/>

		</div>
	);
}

export default Details;
