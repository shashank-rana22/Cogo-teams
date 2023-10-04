import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const OFFSET = 1;
const SUB_ITEM_ONE_SIZE = 3;
const SUB_ITEM_TWO_SIZE = 6;
const BOTTOM_CONT_SIZE = 4;
const BOTTOM_CONT_ITEM_SIZE = 2;

function LoadingState() {
	return (
		<div className={styles.container}>
			<div className={styles.top_container}>
				<div className={styles.sub_item_one}>
					{[...Array(SUB_ITEM_ONE_SIZE).keys()].map((subItem) => (
						<Placeholder height={10} key={subItem} />
					))}
				</div>

				<div className={styles.sub_item_two}>
					{[...Array(SUB_ITEM_TWO_SIZE).keys()].map((subItem) => (
						<Placeholder height={10} key={subItem} />
					))}
				</div>
			</div>

			{[...Array(BOTTOM_CONT_SIZE).keys()].map((cont_item) => (
				<div className={styles.bottom_container} key={cont_item}>
					<div className={styles.sub_item_one}>
						<Placeholder height={10} />
					</div>

					{[...Array(BOTTOM_CONT_ITEM_SIZE).keys()].map((item) => (
						<div className={styles.sub_item_one} key={item}>
							{[...Array(SUB_ITEM_ONE_SIZE + OFFSET).keys()].map((subItem) => (
								<Placeholder height={10} key={subItem} />
							))}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default LoadingState;
