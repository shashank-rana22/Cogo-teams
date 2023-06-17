import { Button, Pill } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { INVOICE_STATUS, INVOICE_STATUS_MAPPING } from '../../../../../../Constants';
import useHistorySingleDataList from '../../../../../../hooks/useHistorySingleDataList';
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

interface Props {
	item: ListItem;
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

function Details({ item = DEFAULT_VALUE }: Props) {
	const { documentNo = '', accountType = '', notPostedSettlementIds = [], ledCurrency = '' } = item || {};
	const {
		data,
		loading,
	} = useHistorySingleDataList(documentNo, accountType);

	const { loading: bulkPostToSageLoading, bulkPostToSageAction } = usePostSettlementToSage();

	const { list = [] } = data || {};

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
								singleitem?.nostro,
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
								className={styles.ribbon}
								style={{ background: singleitem?.accMode === 'AP' ? '#ee3425' : '#f68b21' }}
							>
								{singleitem?.accMode}
							</div>
						</div>
					</div>
				))}
			</div>

		</div>
	);
}

export default Details;
