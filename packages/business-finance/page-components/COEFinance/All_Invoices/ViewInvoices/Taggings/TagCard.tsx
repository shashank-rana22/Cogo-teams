import React from 'react';

import { ProformaTagCards } from './ProformaTag';
import styles from './styles.module.css';

interface ChildBill {
	id: string;
}

interface Props {
	isProforma?: boolean;
	billNumber?: string;
	amount?: number;
	billCurrency?: string;
	lineItemCount?: string;
	createdAt?: Date;
	childBill?: ChildBill[]
	id: string;
}

export function TagCard({
	item,
	isfirst, classname, isLastChild,
}: { item: Props, isfirst: boolean, classname?: string, isLastChild?: boolean }) {
	const { childBill } = item || {};
	const labelMap = {
		merge : 'Merge',
		split : 'Split',
	};
	const commonStyles = {
		width           : '40px',
		backgroundColor : '#ffffff',
		transform       : 'translateX(-2px)',
	};
	return (
		<div className={styles.flexdiv}>
			<div
				style={{
					borderRight : childBill?.length > 1 ? '1px solid #88cad1' : '',
					marginTop   : '16px',
					position    : 'relative',
				}}
			>
				{childBill?.length > 1 && (
					<div className={`${classname === 'merge' ? styles.merge : ''} ${styles.tag}`}>
						{labelMap[classname || 'split']}
					</div>
				)}
				<div style={{ display: 'flex' }}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						{!isfirst && (
							<div
								className={styles.line_block}
							/>
						)}
						{isLastChild && (
							<div
								style={{
									height: '40px',
									...commonStyles,
								}}
							/>
						)}
					</div>
					<ProformaTagCards
						item={item}
						classname={classname}
					/>
					{childBill && (
						<div
							className={styles.child_block}
						/>
					)}

				</div>
				{isLastChild && (
					<div
						style={{
							height: '50%',
							...commonStyles,
						}}
					/>
				)}
			</div>
			{childBill && (
				<div className={styles.childs}>
					{childBill.map((child, index) => (
						<TagCard
							item={child}
							isfirst={false}
							key={child.id}
							classname={classname}
							isLastChild={childBill.length - 1 === index}
						/>
					))}
				</div>
			)}
		</div>
	);
}
