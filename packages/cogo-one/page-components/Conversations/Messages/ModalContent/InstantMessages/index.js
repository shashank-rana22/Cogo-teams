import { Input, Modal, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import useListSuggestions from '../../../../../hooks/useListSuggestions';

import styles from './styles.module.css';

function InstantReplies() {
	const messages = [{
		title   : 'Thank you message',
		content : 'Hi XYZ thank you for getting in touch. How can I help ...',
	}];
	const {
		setQfilter,
		handleScroll,
		qfilter,
		infiniteList,
		loading,
	} = useListSuggestions();
	return (
		<>
			<div className={styles.container}>
				<Input
					value={qfilter}
					onChange={(e) => setQfilter(e)}
					placeholder="Search saved replies here..."
					prefix={<IcMSearchlight />}
				/>
				<div className={styles.message_container}>
					{(messages || []).map(({ title = '', content = '' }) => (

						<div className={styles.each_message}>
							<div className={styles.title}>
								{title}
							</div>
							<div className={styles.message}>
								{content}
							</div>
						</div>

					))}
				</div>
			</div>
			<Modal.Footer>
				<div className={styles.footer}>
					<Button themeType="accent" size="md">+ Create Reply</Button>
				</div>
			</Modal.Footer>
		</>
	);
}
export default InstantReplies;
