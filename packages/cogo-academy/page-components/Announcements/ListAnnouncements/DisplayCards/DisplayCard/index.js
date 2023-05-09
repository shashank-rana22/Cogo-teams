import { Tooltip, Popover, Accordion, Button, Modal, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot, IcMAnnouncement, IcMEyeopen, IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import ANNOUNCEMENT_TYPE_MAPPING from '../../../constants/ANNOUNCEMENT_TYPE_MAPPING.json';
import Preview from '../../../CreateAnnouncement/AnnouncementForm/Preview';

import DisplayAttachments from './DisplayAttachments';
import getSingleCardOptions from './getSingleCardOptions';
import styles from './styles.module.css';

const STATUS_MAPPING = {
	draft: {
		label : 'Draft',
		color : 'orange',
	},
	active: {
		label : 'Live',
		color : 'green',
	},
	inactive: {
		label : 'Inactive',
		color : 'red',
	},
};

function DisplayCard({
	activeTab = 'active',
	accordianData = {},
	data = {},
	index,
	user_id = '',
	loadingUpdate = false,
	loadingEditAndGoLive = false,
	handleAnnouncementDetails = () => {},
	refetch = () => {},
	deleteAnnouncement = () => {},
	goLive = () => {},
	loadingSingleAnnouncement = false,

}) {
	const router = useRouter();

	const { content } = accordianData;
	const [popoverVisible, setPopoverVisible] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showGoLiveModal, setShowGoLiveModal] = useState(false);

	const options = getSingleCardOptions({ data });

	const isCogoAcademyAdmin = (user_id === GLOBAL_CONSTANTS.uuid.cogoacademy_admin_id);

	const isAllowedToEdit = isCogoAcademyAdmin || data.status === 'draft';

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

	const renderPopover = () => (
		<div className={styles.buttons_container}>
			{data.status === 'draft' && isCogoAcademyAdmin ? (
				<Button
					type="button"
					themeType="primary"
					size="md"
					style={{ width: '100%', marginBottom: '8px' }}
					onClick={() => setShowGoLiveModal(true)}
				>
					<IcMAnnouncement height={20} width={20} className={styles.button_icon} />
					Publish
				</Button>
			) : null}

			<Button
				type="button"
				themeType="secondary"
				size="md"
				style={{ width: '100%', marginBottom: '8px' }}
				onClick={() => handleView(index)}
			>
				<IcMEyeopen className={styles.button_icon} />
				View
			</Button>

			{activeTab === 'active' && isAllowedToEdit && (
				<Button
					type="button"
					themeType="secondary"
					size="md"
					style={{ width: '100%', marginBottom: '8px' }}
					onClick={() => editDetails()}
				>
					<IcMEdit className={styles.button_icon} />
					Edit
				</Button>
			)}

			{activeTab === 'active' && isAllowedToEdit && (
				<Button
					type="button"
					themeType="secondary"
					size="md"
					style={{ width: '100%' }}
					onClick={() => setShowDeleteModal(true)}
				>
					<IcMDelete className={styles.button_icon} />
					Delete
				</Button>
			)}

			{showGoLiveModal ? (
				<Modal
					show={showGoLiveModal}
					scroll={false}
					size="md"
					placement="center"
					onClose={() => setShowGoLiveModal(false)}
				>
					<Modal.Header title="Once it goes live, it cannot be Edited. Are you still want to continue ? " />

					<Modal.Footer>
						<div className={styles.delete_buttons}>
							<Button
								type="button"
								themeType="secondary"
								size="md"
								disabled={loadingEditAndGoLive}
								onClick={() => setShowGoLiveModal(false)}
								style={{ marginRight: '20px' }}
							>
								Cancel
							</Button>
							<Button
								type="button"
								themeType="primary"
								size="md"
								loading={loadingEditAndGoLive}
								onClick={() => goLive(data?.id)}
							>
								Go Live
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			) : null}

		</div>
	);

	const displayValues = (label, value) => {
		if (label === 'Type') {
			return <Pill color="yellow">{value}</Pill>;
		}
		if (label === 'Status') {
			return <Pill color={STATUS_MAPPING[value].color}>{STATUS_MAPPING[value].label}</Pill>;
		}

		return (
			<div className={styles.tooltip}>
				<Tooltip
					content={label === 'Validity' ? (
						<div className={styles.tooltip_hover_value}>
							<span style={{ marginBottom: '4px' }}>
								<strong>From - </strong>
								{value.split('-')[0] || '-'}
							</span>
							<span>
								<strong>To - </strong>
								{value.split('-')[1] || '-'}
							</span>
						</div>
					) : value}
					style={{ width: 'fit-content' }}
					placement="top"
				>
					<div className={styles.value}>{value}</div>
				</Tooltip>
			</div>

		);
	};

	const getPreviewModalHeader = () => (
		<div className={styles.modal_header_container}>
			<div className={styles.type_tag}>{ANNOUNCEMENT_TYPE_MAPPING[data?.announcement_type]}</div>
			<div className={styles.title}>{data?.title}</div>
		</div>
	);

	return (
		<div className={styles.container}>

			<div className={styles.upperrow}>
				<div className={styles.slabs} style={{ width: '100%' }}>
					{options.map((i) => (
						<div
							className={['Actions', 'Status'].includes(i.label) ? styles.popover : styles.slab}
							key={i.label}
						>
							<div className={styles.label}>{i.label}</div>
							{ i.label === 'Actions'
								? (
									<Popover
										placement="left"
										trigger="mouseenter"
										render={renderPopover()}
									>
										<IcMOverflowDot
											width={16}
											height={16}
											cursor="pointer"
											onClick={() => setPopoverVisible(!popoverVisible)}
										/>
									</Popover>

								)
								: displayValues(i.label, i.value)}
						</div>
					))}
				</div>
			</div>
			{activeTab === 'active' && (
				<div
					key={`announcement_accordian_${index}`}
					role="button"
					tabIndex={0}
					onClick={() => handleAnnouncementDetails(index)}
				>
					<Accordion
						key={`announcement_accordian_${index}`}
						type="card"
						title="Details"
						className={styles.accordian}
					>
						<div className={styles.titles}>Embedded Media :</div>
						<div className={styles.document_container}>
							<DisplayAttachments
								isAllowedToEdit={isAllowedToEdit}
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
					size="lg"
					placement="center"
					onClose={() => setShowModal(false)}

				>
					<Modal.Header title={getPreviewModalHeader()} style={{ paddingTop: 0, paddingLeft: 0 }} />
					<Modal.Body className={styles.modal_body}>
						<Preview
							formValues={accordianData}
							announcement_id={accordianData?.id}
							previewLoading={loadingSingleAnnouncement}
							editorValue={content}
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
								type="button"
								themeType="secondary"
								size="md"
								disabled={loadingUpdate}
								onClick={() => setShowDeleteModal(false)}
								style={{ marginRight: '20px' }}
							>
								Cancel
							</Button>
							<Button
								type="button"
								themeType="primary"
								size="md"
								loading={loadingUpdate}
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
