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
	isfirst,
}: { item: Props, isfirst: boolean }) {
	const { childBill } = item || {};
	return (
		<div className={styles.flexdiv}>
			<div
				style={{
					borderRight : childBill?.length > 1 ? '1px solid #88cad1' : '',
					marginTop   : '16px',
				}}
			>
				<div style={{ display: 'flex' }}>
					{!isfirst && (
						<div
							style={{
								height          : '38px',
								width           : '40px',
								backgroundColor : '#ffffff',
								borderBottom    : '1px solid #88cad1',
							}}
						/>
					)}
					<ProformaTagCards
						item={item}
					/>
					{childBill && (
						<div
							style={{
								height          : '38px',
								width           : '40px',
								backgroundColor : '#ffffff',
								marginRight     : '-2px',
								borderBottom    : '1px solid #88cad1',
							}}
						/>
					)}
				</div>
			</div>
			{childBill && (
				<div className={styles.childs}>
					{childBill.map((child) => (
						<TagCard
							item={child}
							isfirst={false}
							key={child.id}
						/>
					))}
				</div>
			)}
		</div>
	);
}
