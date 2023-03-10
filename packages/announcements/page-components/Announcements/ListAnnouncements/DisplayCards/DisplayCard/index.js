/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Accordion, Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DisplayCard({
	accordianData = {},
	data = {},
	index,
	handleAnnouncementDetails = () => {},
	refetch = () => {},
	loading = false,
	deleteAnnouncement = () => {},

}) {
	const options = [
		{ label: 'Title', value: data?.title },
		{ label: 'Created At', value: format(data?.created_at, 'dd MMM yyyy hh:mm a') },
		{ label: 'Announcement Type', value: data?.announcement_type },
		{ label: 'Updated At', value: format(data?.updated_at, 'dd MMM yyyy hh:mm a') },
		{ label: 'Action', value: 1 },
	];

	const router = useRouter();

	const editDetails = () => {
		router.push(
			`/announcements/create?announcement_id=${data?.id}`,
			`/announcements/create?announcement_id=${data?.id}`,
		);
	};

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
											onClick={() => editDetails()}
										>
											Edit
										</Button>
										<IcMDelete
											height={20}
											width={20}
											style={{ cursor: 'pointer' }}
											onClick={() => deleteAnnouncement(data?.id)}
										/>
									</div>
								)
								: <div className={styles.value}>{i.value}</div>}
						</div>
					))}
				</div>
			</div>
			<div onClick={() => handleAnnouncementDetails(index)}>
				<Accordion
					type="card"
					title="Display Details"
					className={styles.accordian}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
				</Accordion>
			</div>

		</div>
	);
}

export default DisplayCard;
