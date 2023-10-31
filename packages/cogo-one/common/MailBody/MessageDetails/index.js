import { Modal, cl, Accordion, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import copyToClipboard from '../../../utils/copyToClipboard';

import styles from './styles.module.css';

const HIDE_DETAILS = ['body', 'body_preview'];

function ParseObject({ data = {} }) {
	return Object.entries(
		data || {},
	).map(
		([key, value]) => {
			if (HIDE_DETAILS.includes(key)) {
				return null;
			}

			if (typeof value === 'object') {
				if (isEmpty(value)) {
					return (
						<div key={key} className={styles.main_body}>
							<div className={styles.label}>{`${key}:`}</div>
							<div className={styles.value}>NA</div>
						</div>
					);
				}

				if (!Array.isArray(value)) {
					return (
						<div
							key={key}
							className={cl`${styles.main_body} 
							${styles.main_body_child}`}
						>
							<div className={styles.label}>{`${key}: `}</div>
							<div className={styles.child_value}>
								<ParseObject data={value} />
							</div>
						</div>
					);
				}

				return (
					<div
						key={key}
						className={cl`${styles.main_body} 
						${styles.main_body_child}`}
					>
						<div className={styles.label}>{`${key}: `}</div>
						<div className={styles.child_value}>
							<ParseObject data={{ ...value }} />
						</div>
					</div>
				);
			}

			return (
				<div key={key} className={styles.main_body}>
					<div className={styles.label}>{`${key}:`}</div>
					<div className={styles.value}>{ value || 'NA'}</div>
				</div>
			);
		},
	);
}

function AccordionHeader({
	label = '',
	content = {},
}) {
	return (
		<>
			<div className={styles.header}>
				{label}
			</div>

			<Button
				size="sm"
				themeType="secondary"
				onClick={(e) => {
					e.stopPropagation();
					copyToClipboard({
						content: JSON.stringify(content),
						label,
					});
				}}
			>
				copy
			</Button>
		</>
	);
}

function MessageDetails({
	modalData = {},
	setModalData = () => {},
}) {
	return (
		<Modal
			show
			size="lg"
			onClose={() => setModalData(null)}
			onClickOutside={() => setModalData(null)}
		>
			<Modal.Header title="Details" />
			<Modal.Body className={styles.body_container}>
				<Accordion
					isOpen
					className={styles.accordion_styles}
					title={(
						<AccordionHeader
							label="Message Details"
							content={modalData?.message}
						/>
					)}
				>
					<ParseObject data={modalData?.message} />
				</Accordion>

				<Accordion
					className={styles.accordion_styles}
					title={(
						<AccordionHeader
							label="Room Details"
							content={modalData?.room}
						/>
					)}
				>
					<ParseObject data={modalData?.room} />
				</Accordion>
			</Modal.Body>
		</Modal>
	);
}

export default MessageDetails;
