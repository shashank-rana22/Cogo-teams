import { Popover } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetDeleteJv from '../../../../hooks/useGetDeleteJv';
import usePostToSage from '../../../../hooks/usePostToSage';
import ConfirmationModal from '../../../../page-components/ConfirmationModal';
import getFormattedDate from '../../../Utils/getFormattedDate';

import Details from './Details';
import styles from './styles.module.css';
import ToolTipWrapper from './ToolTipWrapper';

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

const STATUS = ['APPROVED', 'POSTING_FAILED'];

function ColumnCard({ item, refetch }: Props) {
	const [showDetails, setShowDetails] = useState(false);

	const [showConfirm, setShowConfirm] = useState<boolean | string>(false);

	const { post, loading: postloading } = usePostToSage({ setShowConfirm, refetch });

	const { deleteJv, loading: deleteloading } = useGetDeleteJv({ setShowConfirm, refetch });

	const Icon = showDetails ? IcMArrowRotateUp : IcMArrowRotateDown;

	const deletePostRender = (
		<div className={styles.flexend}>
			{STATUS?.includes(item?.status) ? (
				<div
					className={styles.posttosage}
					onClick={() => {
						setShowConfirm('post');
					}}
					role="presentation"
				>
					Post To Sage
				</div>
			) : null}
			<div
				className={styles.posttosage}
				onClick={() => {
					setShowConfirm('delete');
				}}
				role="presentation"
			>
				Delete
			</div>
		</div>
	);

	return (
		<div className={styles.column}>
			<div className={styles.flex}>
				<div className={styles.jvnumb}><ToolTipWrapper text={item?.jvNum} maxlength={16} /></div>
				<div className={styles.jvtype}>{item?.category || ''}</div>
				<div className={styles.accdate}>
					{item?.transactionDate
						? getFormattedDate({ date: item?.transactionDate })
						: '--'}
				</div>
				<div className={styles.curr}>{item?.currency || ''}</div>
				<div className={styles.entity}>{item?.entityCode || ''}</div>
				<div className={styles.journal}>{item?.jvCodeNum || ''}</div>
				<div className={styles.exrate}>{item?.exchangeRate || ''}</div>
				<div className={styles.legcurr}>{item?.ledCurrency || ''}</div>
				<div className={styles.status}>{startCase(item?.status) || ''}</div>
				<div className={styles.dots}>
					<Popover placement="left" render={deletePostRender}>
						<IcMOverflowDot className={styles.icon} height={20} width={20} />
					</Popover>
				</div>
				<div className={styles.accord}>
					<Icon
						className={styles.icon}
						onClick={() => { setShowDetails(!showDetails); }}
					/>
				</div>
			</div>
			{showDetails ? <Details item={item} /> : null}
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

export default ColumnCard;
