import { Button } from '@cogoport/components';
import { IcMHelp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetMails from '../../../hooks/useGetMails';
import FeedBack from '../FeedBack';
import formatters from '../helpers';
import HowItWorks from '../HowItWorks';

import Filters from './Filters';
import MailData from './MailData';
import styles from './styles.module.css';

function RPASearch({
	heading,
	onManualUpload = () => {},
	multiple = false,
	entity_type = undefined,
	onUpload = () => {},
	handleCancel = () => {},
	entity_name = undefined,
	show = false,
}) {
	const [selectedMails, setSelectedMail] = useState({
		mail_ids : null,
		mailData : null,
	});
	const [task, setTask] = useState('search_box');

	let selectedMail = selectedMails.mail_ids;
	if (!selectedMail) {
		selectedMail = [];
	}

	let taskFormatter = 'shipping_instruction';
	let taskApi = 'shipping_instruction';

	if (entity_type === 'upload_booking_note') {
		taskFormatter = 'booking_note';
		taskApi = 'booking_note';
	} else if (
		entity_type === 'upload_draft_bill_of_lading'
		|| entity_type === 'upload_bill_of_lading'
	) {
		taskFormatter = 'bill_of_lading';
		taskApi = 'bill_of_lading';
	} else if (entity_type === 'update_container_details') {
		taskFormatter = 'container_details';
		taskApi = 'bill_of_lading';
	} else if (entity_type === 'purchase_invoice') {
		taskFormatter = 'purchase_invoice';
		taskApi = 'purchase_invoice';
	}

	const values = Array.isArray(selectedMail) ? selectedMail : [selectedMail];

	const onMailSelect = (mail_ids, mailData) => {
		setSelectedMail({ mail_ids, mailData });
	};

	const handelFinalUpload = () => {
		const formatterFunction = formatters[taskFormatter];
		const formattedData = formatterFunction(selectedMails);
		onUpload({ formatted: formattedData, _meta: selectedMails });
	};

	const { setQuery, data, query, handleChange, loading } = useGetMails({
		multiple,
		onChange: onMailSelect,
		values,
		taskApi,
		entity_name,
		show,
	});

	let content = (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.row}>
					<div className={styles.heading}>{heading}</div>

					<div
						className={styles.custom_button}
						role="button"
						tabIndex={0}
						onClick={() => {
							setTask('how_it_works');
						}}
					>
						How it Works
					</div>

					<IcMHelp style={{ marginLeft: '4px' }} />
				</div>

				<div className={styles.styled_feedback}>
					<div
						className={styles.custom_button}
						role="button"
						tabIndex={0}
						onClick={() => setTask('feed_back')}
					>
						Give FeedBack
					</div>
				</div>
			</div>

			<div className={styles.important_note}>
				Do not miss out on automations
                &nbsp;
				<div
					className={styles.how_it_works}
					role="button"
					tabIndex={0}
					onClick={() => {
						setTask('how_it_works');
					}}
				>
					check how it works
				</div>
				&nbsp;
				and see important note
			</div>

			<div className={styles.search_box}>
				<Filters onChange={(e) => setQuery(e)} value={query} />

				<div className={styles.text}>OR</div>

				<div className={styles.styled_button}>
					<Button onClick={onManualUpload}>Upload Manually</Button>
				</div>
			</div>

			<div className={styles.search_results}>
				Search Results
				{' '}
				<span style={{ fontSize: 12, fontWeight: 'normal', marginLeft: 10 }}>
					(mails from operations@cogoport.com and zoho)
				</span>
			</div>

			<div className={styles.search_items}>
				{loading ? (
					<h2>Loading emails from operations@cogoport.com..</h2>
				) : null}
				{(data?.body || []).map((item) => (
					<MailData
						item={item}
						onClick={handleChange}
						values={selectedMail}
						multiple={multiple}
					/>
				))}
			</div>

			<div className={styles.styled_button}>
				{entity_type === 'purchase_invoice' ? (
					<div className={styles.cancel_button}>
						<Button className="secondary md" onClick={handleCancel}>
							Cancel
						</Button>
					</div>
				) : null}

				<Button disabled={isEmpty(selectedMail)} onClick={handelFinalUpload}>
					Upload
				</Button>
			</div>
		</div>
	);

	if (task === 'feed_back') {
		content = <FeedBack setTask={setTask} />;
	} else if (task === 'how_it_works') {
		content = <HowItWorks setTask={setTask} />;
	}

	return <div className={styles.content}>{content}</div>;
}

export default RPASearch;
