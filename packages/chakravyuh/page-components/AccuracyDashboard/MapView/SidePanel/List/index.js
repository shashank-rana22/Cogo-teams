import { Loader, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { formatBigNumbers } from '../../../../../utils/formatBigNumbers';
import styles from '../styles.module.css';

import EmptyState from './EmptyState';

const HOVER_DELAY = 300;
const DECIMAL = 2;

function List({ loading = false, finalList = [], setActiveId = () => {}, originName = '', filterBy = '' }) {
	const [hoverTimer, setHoverTimer] = useState(null);

	const handleMouseOver = (destination_id) => {
		const timer = setTimeout(() => {
			setActiveId(destination_id);
		}, HOVER_DELAY);
		setHoverTimer(timer);
	};

	const handleMouseOut = () => {
		clearTimeout(hoverTimer);
		setActiveId(null);
	};

	useEffect(() => () => {
		clearTimeout(hoverTimer);
	}, [hoverTimer]);

	if (loading && isEmpty(finalList)) {
		return (
			<div className={styles.loader_container}>
				<Loader />
			</div>
		);
	}
	if (loading || finalList.length) {
		return (
			<>
				{finalList.map(({ count = 0, destination_id, destination_name }) => (
					// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
					<button
						onMouseOver={() => handleMouseOver(destination_id)}
						onMouseOut={handleMouseOut}
						key={destination_id}
						className={styles.card}
					>
						<div className={styles.left}>
							<div className={styles.locations_container}>
								<Tooltip content={originName}>
									{originName}
								</Tooltip>
								<IcMPortArrow className={styles.anchor_icon} />
								<Tooltip content={destination_name}>
									{destination_name}
								</Tooltip>
							</div>
						</div>
						<div className={styles.right}>
							<Tooltip
								content={<span>{count}</span>}
								placement="bottom"
							>
								<h4>
									{filterBy.includes('accuracy')
										? count.toFixed(DECIMAL)
										: formatBigNumbers(count)}
								</h4>
							</Tooltip>
						</div>
					</button>
				))}
			</>
		);
	}
	return <EmptyState emptyText="There are no rates to show for selected filters" />;
}

export default List;
