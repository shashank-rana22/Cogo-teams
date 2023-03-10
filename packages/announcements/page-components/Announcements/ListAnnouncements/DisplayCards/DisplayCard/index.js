import { Accordion, Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DisplayCard({ data = {} }) {
	console.log(data, 'dasdsf');

	const options = [
		{ label: 'Title', value: data?.title },
		{ label: 'Created At', value: format(data?.created_at, 'dd MMM yyyy hh:mm a') },
		{ label: 'Announcement Type', value: data?.announcement_type },
		{ label: 'Updated At', value: format(data?.updated_at, 'dd MMM yyyy hh:mm a') },
		{ label: 'Action', value: 1 },
	];

	return (
		<div className={styles.container}>

			<div className={styles.upperrow}>
				<div className={styles.slabs} style={{ width: '100%' }}>
					{options.map((i) => (
						<div className={styles.slab}>
							<div className={styles.label}>{i.label}</div>
							{ i.label === 'Action'
								? (
									<div className={styles.buttoncontainer}>
										<Button
											themeType="primary"
											size="sm"
											style={{ marginRight: 8 }}
										>
											View
										</Button>
										<Button
											themeType="secondary"
											size="sm"
											style={{ marginRight: 8 }}
										>
											Edit
										</Button>
										<IcMDelete
											height={20}
											width={20}
											style={{ cursor: 'pointer' }}
										/>
									</div>
								)
								: <div className={styles.value}>{i.value}</div>}
						</div>
					))}
				</div>
			</div>
			<Accordion type="card" title="Display Details" className={styles.accordian}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			</Accordion>
		</div>
	);
}

export default DisplayCard;
