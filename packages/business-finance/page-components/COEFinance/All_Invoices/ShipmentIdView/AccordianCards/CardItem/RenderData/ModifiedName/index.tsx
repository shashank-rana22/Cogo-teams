import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface ItemTypes {
	organizationName?: string;
	createdByName?: string;
	buyerDetails?: BusinessNameTypes;
}

interface BusinessNameTypes {
	businessName: string;
}

interface PropsType {
	item: ItemTypes;
	field: any;
}

function ModifiedName({ item, field }: PropsType) {
	const { organizationName = '', createdByName, buyerDetails } = item || {};

	const { businessName = '' } = buyerDetails || {};

	return (
		<div className={styles.text}>
			{field?.key === 'organizationName' && (
				<div className={styles.size}>
					{organizationName.length > 10 ? (
						<Tooltip
							interactive
							placement="top"
							content={organizationName}
						>
							<text>
								{`${organizationName.substring(
									0,
									10,
								)}...`}
							</text>
						</Tooltip>
					) : (
						<text>{organizationName}</text>
					)}
				</div>
			)}

			{field?.key === 'businessName' && (
				<div className={styles.size}>
					{businessName.length > 10 ? (
						<Tooltip
							interactive
							placement="top"
							content={businessName}
						>
							<text>{`${businessName.substring(0, 10)}...`}</text>
						</Tooltip>
					) : (
						<text>{businessName}</text>
					)}
				</div>
			)}

			{field?.key === 'createdByName' && (
				<div className={styles.size}>
					{createdByName!?.length > 10 ? (
						<Tooltip
							interactive
							placement="top"
							content={createdByName}
						>
							<text>
								{`${createdByName?.substring(
									0,
									10,
								)}...`}
							</text>
						</Tooltip>
					) : (
						<text>{createdByName || ' --'}</text>
					)}
				</div>
			)}
		</div>
	);
}

export default ModifiedName;
