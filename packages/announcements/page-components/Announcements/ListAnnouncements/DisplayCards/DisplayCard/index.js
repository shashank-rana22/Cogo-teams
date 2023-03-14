/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Accordion, Button, Modal, Pill } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase, format } from '@cogoport/utils';
import React, { useState } from 'react';

import Preview from '../../../CreateAnnouncement/AnnouncementForm/Preview';

import DisplayAttachments from './DisplayAttachments';
import styles from './styles.module.css';

function DisplayCard({
	activeTab = 'active',
	accordianData = {},
	data = {},
	index,
	handleAnnouncementDetails = () => {},
	refetch = () => {},
	deleteAnnouncement = () => {},
	loadingSingleAnnouncement = false,

}) {
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	// console.log(data);
	const options = [
		{ label: 'Title', value: startCase(data?.title) },
		{ label: 'Validity Start', value: format(data?.validity_start, 'dd MMM yyyy hh:mm a') },
		{ label: 'Validity End', value: format(data?.validity_end, 'dd MMM yyyy hh:mm a') },
		{ label: 'Announcement Type', value: startCase(data?.announcement_type) },
		{ label: 'Action', value: 1 },
	];

	const router = useRouter();
	const handleView = (i) => {
		handleAnnouncementDetails(i);
		setShowModal(true);
	};

	const editDetails = () => {
		router.push(
			`/announcements/create?announcement_id=${data?.id}`,
			`/announcements/create?announcement_id=${data?.id}`,
		);
	};

	const displayValues = (label, values) => (
		label === 'Announcement Type' ? <Pill color="green">{values}</Pill>
			: <div className={styles.value}>{values}</div>
	);

	// console.log('asass', accordianData);
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
											onClick={() => handleView(index)}
										>
											View
										</Button>
										{activeTab === 'active' && (
											<Button
												themeType="secondary"
												size="sm"
												style={{ marginRight: 8 }}
												onClick={() => editDetails()}
											>
												Edit
											</Button>
										)}
										{activeTab === 'active' && (
											<IcMDelete
												height={20}
												width={20}
												style={{ cursor: 'pointer' }}
												onClick={() => setShowDeleteModal(true)}
											/>
										)}

									</div>
								)
								: displayValues(i.label, i.value)}
						</div>
					))}
				</div>
			</div>
			{activeTab === 'active' && (
				<div onClick={() => handleAnnouncementDetails(index)}>
					<Accordion
						type="card"
						title="Display Details"
						className={styles.accordian}
					>
						<div className={styles.titles}>Embedded Media :</div>
						<div className={styles.document_container}>
							<DisplayAttachments
								data={accordianData}
								index={index}
								refetch={refetch}
								announcement_id={data?.id}
							/>
						</div>
					</Accordion>
				</div>
			)}

			{showModal && (
				<Modal
					show={showModal}
					scroll={false}
					size="lg"
					placement="center"
					onClose={() => setShowModal(false)}
				>
					<Modal.Header title="Preview" />
					<Modal.Body className={styles.modal}>
						<Preview
							formValues={accordianData}
							announcement_id={accordianData?.id}
							previewLoading={loadingSingleAnnouncement}
						/>
					</Modal.Body>
				</Modal>
			)}
			{showDeleteModal && (
				<Modal
					show={showDeleteModal}
					scroll={false}
					size="md"
					placement="center"
					onClose={() => setShowDeleteModal(false)}
				>
					<Modal.Header title="Are you sure to delete this announcement" />
					<Modal.Footer>
						<div className={styles.delete_buttons}>
							<Button
								themeType="secondary"
								size="md"
								onClick={() => setShowDeleteModal(false)}
							>
								Cancel
							</Button>
							<Button
								themeType="primary"
								size="md"
								onClick={() => deleteAnnouncement(data?.id)}
							>
								Delete
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)}

		</div>
	);
}

export default DisplayCard;
