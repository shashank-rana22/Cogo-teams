/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Input } from '@cogoport/components';
import { IcMSearchlight, IcMCross, IcMArrowLeft } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({
	search = '',
	setSearch = () => {},
	topic = '',
	setTopic = () => {},
	question,
	setQuestion,
}) {
	const suffix = !search ? (
		<IcMSearchlight />
	) : (
		<IcMCross
			onClick={() => setSearch('')}
			style={{ cursor: 'pointer', color: '#000000' }}
		/>
	);

	const onClickBackButton = () => {
		if (question) {
			setQuestion(null);
		} else {
			setTopic(null);
		}
	};

	return (
		<div
			style={{
				backgroundColor : '#f8f2e7',
				marginTop       : '-21px',
				paddingBottom   : '13px',
				borderRadius    : '10px 0 0 0',
			}}
		>
			<div
				style={{
					margin     : '21px',
					alignItems : 'center',
				}}
			>
				<div
					style={{
						display    : 'flex',
						alignItems : 'center',
						padding    : '19px 0 0 0',
					}}
				>
					{(!search && topic) || question ? (
						<div className={styles.arrow} onClick={onClickBackButton}>
							<IcMArrowLeft style={{ height: '25px', width: '25px' }} />
						</div>
					) : (
						<div style={{ height: 44, width: 50 }} />
					)}

					<div className={styles.title}>Cogo Assist</div>
				</div>

				<div style={{ marginTop: '10px', marginBottom: '-15px' }}>
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
