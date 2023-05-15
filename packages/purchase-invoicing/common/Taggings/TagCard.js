import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { ProformaTagCards } from './ProformaTag';
import styles from './styles.module.css';

const LABEL_MAP = {
	merge : 'Merge',
	split : 'Split',
};

export function TagCard({
	item = {},
	isfirst,
	classname,
	isLastChild,
	setSelectedProforma = () => {},
	selectedProforma = [],
	isNormalTab,
	activeTab = null,
	showCheck = false,
}) {
	const { childBill } = item || {};
	const isChecked = selectedProforma?.some(
		(data) => data?.billId === item?.billId,
	);
	const unCheckedData = selectedProforma?.filter(
		(data) => data?.billId !== item?.billId,
	);
	const showCheckBox = activeTab === 'merge' ? (showCheck && isfirst) : showCheck;

	return (
		<div className={styles.flexdiv}>
			<div className={`${styles.tagging} ${childBill?.length > 1 ? styles.tagright : ''}`}>
				{childBill?.length > 1 ? (
					<div className={`${classname === 'merge' ? styles.merge : ''} ${styles.tag}`}>
						{LABEL_MAP[classname || 'split']}
					</div>
				) : null}
				<div className={styles.columnflex}>
					{!isfirst ? (
						<div className={styles.line_block} />
					) : null}
					{isLastChild ? (
						<div className={styles.commonstyles} />
					) : null}
				</div>
				<ProformaTagCards
					showCheckBox={showCheckBox}
					item={item}
					classname={classname}
					setSelectedProforma={setSelectedProforma}
					selectedProforma={selectedProforma}
					unCheckedData={unCheckedData}
					isNormalTab={isNormalTab}
					activeTab={activeTab}
					isChecked={isChecked}
				/>
				{!isEmpty(childBill) ? (
					<div
						className={styles.child_block}
					/>
				) : null}
			</div>
			{!isEmpty(childBill) ? (
				<div className={styles.childs}>
					{childBill?.map((child, index) => (
						<TagCard
							item={child}
							isfirst={false}
							selectedProforma={selectedProforma}
							setSelectedProforma={setSelectedProforma}
							activeTab={activeTab}
							key={child.billId}
							classname={classname}
							showCheck={showCheck}
							isLastChild={childBill.length - 1 === index}
						/>
					))}
				</div>
			) : null}
		</div>
	);
}
