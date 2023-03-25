import { Input } from '@cogoport/components';
import { IcMSearchlight, IcMCross, IcMArrowLeft } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

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
	const suffix = !search ? (
		<IcMSearchlight />
	) : (
		<IcMCross
			onClick={() => setSearch('')}
			style={{ cursor: 'pointer', color: '#000000' }}
		/>
	);

	const onClickBackButton = async () => {
		if (question && topic) {
			setQuestion(null);
		} else if (question && !topic) {
			try {
				const res = await refetch();
				if (isEmpty(res?.data?.notification_details || [])) {
					setShowNotificationContent(false);
				}
			} catch (e) {
				console.log(e);
			}

			setQuestion(null);
		} else {
			setTopic(null);
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

				<div className={styles.input_container}>
					<Input
						className="primary lg"
						placeholder="Search for a question or a topic"
						value={search}
						onChange={(e) => setSearch(e)}
						suffix={suffix}
						style={{ padding: '0 10px' }}
					/>
				</div>
			</div>
		</div>
	);
}

export default Header;
