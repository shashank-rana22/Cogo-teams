import { Button, Checkbox, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetDeleteJv from '../../../../hooks/useGetDeleteJv';
import usePostToSage from '../../../../hooks/usePostToSage';
import ConfirmationModal from '../../../../page-components/ConfirmationModal';

import Details from './Details';
import styles from './styles.module.css';
import ToolTipWrapper from './ToolTipWrapper';

const STATUS = ['APPROVED', 'POSTING_FAILED'];

function ColumnCard({ item = {}, refetch = () => {}, selectedJV = [], setSelectedJV = () => {} }) {
	const [showDetails, setShowDetails] = useState(false);

	const [showConfirm, setShowConfirm] = useState(false);

	const { post, loading: postloading } = usePostToSage({ setShowConfirm, refetch });

	const { deleteJv, loading: deleteloading } = useGetDeleteJv({ setShowConfirm, refetch });

	const Icon = showDetails ? IcMArrowRotateUp : IcMArrowRotateDown;

	const deletePostRender = (
		<div className={styles.flexend}>
			{STATUS?.includes(item?.status) ? (
				<Button
					className={styles.post_to_sage}
					onClick={() => {
						setShowConfirm('post');
					}}
					style={{ marginBottom: '4px' }}
				>
					Post To Sage
				</Button>
			) : null}
			<Button
				className={styles.post_to_sage}
				onClick={() => {
					setShowConfirm('delete');
				}}
			>
				Delete
			</Button>
		</div>
	);

	const onSelect = () => {
		if (selectedJV.includes(item?.jvNum)) {
			const updatedIds = selectedJV.filter((jvNum) => jvNum !== item.jvNum);
			setSelectedJV(updatedIds);
		} else {
			setSelectedJV((pv) => [
				...pv,
				item?.jvNum,
			]);
		}
	};

	return (
		<div className={styles.column}>
			<div className={styles.flex}>
				<div className={styles.checkbox}>
					{(item?.status !== 'POSTED') ? (
						<Checkbox
							checked={selectedJV.includes(item?.jvNum)}
							onChange={onSelect}
						/>
					) : null}
				</div>
				<div className={styles.jvnumb}><ToolTipWrapper text={item?.jvNum} maxlength={16} /></div>
				<div className={styles.jvtype}>{item?.category || ''}</div>
				<div className={styles.accdate}>
					{item?.transactionDate
						? formatDate({
							date       : item?.transactionDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
							formatType : 'date',
						})
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
