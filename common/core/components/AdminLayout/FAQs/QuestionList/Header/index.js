import { Toast, Input, Button } from '@cogoport/components';
import { IcMSearchlight, IcMCross, IcMArrowLeft } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function Header({
	search = '',
	setSearch = () => {},
	topic = '',
	setTopic = () => {},
	question,
	setQuestion,
	showHistory,
	setShowHistory = () => {},
	setShowNotificationContent = () => {},
	showNotificationContent,
	refetch,
}) {
	const [input, setInput] = useState('');

	const suffix = search ? (
		<IcMCross
			onClick={() => { setInput(''); setSearch(''); setQuestion(null); }}
			style={{ cursor: 'pointer', color: '#000000' }}
		/>
	) : null;

	const onClickBackButton = async () => {
		if (question && topic) {
			setQuestion(null);
		} else if (question && !topic) {
			setQuestion(null);
			try {
				const res = await refetch();
				if (isEmpty(res?.data?.notification_details || [])) {
					setShowNotificationContent(false);
				}
			} catch (e) {
				Toast.error(e);
			}
		} else {
			setTopic(null);
			setQuestion(null);
			setShowHistory(false);
			setShowNotificationContent(false);
		}
	};

	const showBackIcon = (!search && topic) || question || showHistory || showNotificationContent;

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.heading_container}>

					{showBackIcon ? (
						<div role="presentation" className={styles.arrow} onClick={onClickBackButton}>
							<IcMArrowLeft style={{ height: '25px', width: '25px' }} />
						</div>
					) : (
						<div className={styles.gap} />
					)}

					<div className={styles.title}>Cogo Assist</div>
				</div>

				<form
					onSubmit={(e) => { e.preventDefault(); setSearch(input); setQuestion(null); }}
					className={styles.input_container}
				>
					<Input
						className="primary lg"
						placeholder="Search for a question or a topic"
						value={input}
						onChange={(e) => {
							setInput(e);
							if (!e) setSearch('');
						}}
						suffix={suffix}
						style={{ padding: '0 10px', marginRight: 8 }}
					/>
					<Button
						type="submit"
						size="lg"
						themeType="primary"
					>
						<IcMSearchlight />
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Header;
