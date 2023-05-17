import React, { useState } from 'react';

import useGetDeleteJv from '../../../../../hooks/useGetDeleteJv';
import useGetJvLineItems from '../../../../../hooks/useGetJvLineItems';
import usePostToSage from '../../../../../hooks/usePostToSage';
import ConfirmationModal from '../../../../../page-components/ConfirmationModal';
import Loader from '../../../../../page-components/Loader';
import getFormattedAmount from '../../../../Utils/getFormattedAmount';
import ToolTipWrapper from '../ToolTipWrapper';

import LineItemsHeader from './LineItemsHeader';
import styles from './styles.module.css';

interface ListItem {
	id: string;
	jvNum: string;
	category: string;
	transactionDate: string;
	currency: string;
	entityCode: string;
	jvCodeNum: string;
	exchangeRate: string;
	ledCurrency: string;
	status: string;
}

interface Props {
	item: ListItem;
	refetch: () => void;
}

const deafultVal = {
	status          : '',
	id              : '',
	jvNum           : '',
	category        : '',
	transactionDate : '',
	currency        : '',
	entityCode      : '',
	jvCodeNum       : '',
	exchangeRate    : '',
	ledCurrency     : '',
};

function Details({ item = deafultVal, refetch }: Props) {
	const { data: list = [], loading } = useGetJvLineItems({ parentJVId: item?.id });

	const [showConfirm, setShowConfirm] = useState<boolean | string>(false);

	const { post, loading:postloading } = usePostToSage({ setShowConfirm, refetch });

	const { deleteJv, loading:deleteloading } = useGetDeleteJv({ setShowConfirm, refetch });

	const listTotal = list?.length;

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.details}>
			<div className={styles.flex}>
				{item?.status === 'APPROVED' ? (
					<div
						className={styles.posttosage}
						onClick={() => { setShowConfirm('post'); }}
						role="presentation"
					>
						Post To Sage
					</div>
				) : null}
				<div
					className={styles.posttosage}
					onClick={() => { setShowConfirm('delete'); }}
					role="presentation"
				>
					Delete
				</div>
			</div>
			<div className={styles.table}>
				<LineItemsHeader />
				{list.map((singleitem, index) => (
					<div
						className={`${styles.col} ${listTotal - 1 === index ? styles.islast : ''}`}
						key={singleitem?.id}
					>
						<div className={styles.entity}>{singleitem?.entityCode}</div>
						<div className={styles.jvmode}>{singleitem?.accMode || 'N/A'}</div>
						<div className={styles.businesss}>
							<ToolTipWrapper text={singleitem?.tradePartyName || '--'} maxlength={30} />
						</div>
						<div className={`${styles.type} ${singleitem?.type === 'DEBIT'
							? styles.debit : styles.credit}`}
						>
							{singleitem?.type || '--'}
						</div>
						<div className={styles.glcode}>{singleitem?.glCode || '--'}</div>
						<div className={styles.legamount}>
							{getFormattedAmount({
								amount   : (singleitem?.ledAmount || 0),
								currency : singleitem?.ledCurrency,
							})}
						</div>
						<div className={styles.amount}>
							{getFormattedAmount({
								amount   : (singleitem?.amount || 0),
								currency : singleitem?.currency,
							})}
						</div>
					</div>
				))}
			</div>
			{showConfirm ? (
				<ConfirmationModal
					showConfirm={showConfirm}
					setShowConfirm={setShowConfirm}
					post={post}
					item={item}
					deleteJv={deleteJv}
					loading={postloading || deleteloading}
				/>
			) : null}
		</div>
	);
}

export default Details;
