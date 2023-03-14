import { Input, MultiSelect } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function CreateTest() {
	const [value, onChange] = useState([]);

	const options = [
		{ label: 'all', value: 'all' },
		{ label: 'none', value: 'none' },
	];
	return (
		<div className={styles.container}>
			<div className={styles.test}> Test Module </div>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.title}>New Test</div>
			</div>
			<div className={styles.details}>
				<div className={styles.left}>
					<div className={styles.wrapper}>
						<div className={styles.label_wrapper}>
							<span>Name of Test</span>
							<sup className={styles.superscript}>*</sup>
						</div>
						<Input size="md" placeholder="Type name..." className={styles.input} />
					</div>
					<div className={styles.wrapper}>
						<div className={styles.label_wrapper}>
							<span>Select Test User Groups</span>
							<sup className={styles.superscript}>*</sup>
						</div>
						<MultiSelect
							value={value}
							onChange={onChange}
							placeholder="all"
							options={options}
							isClearable
							style={{ width: '250px' }}
							size="md"
							className={styles.input}
						/>
					</div>
				</div>

				<div className={styles.right}>
					<div className={styles.wrapper}>
						<div className={styles.label_wrapper}>
							<span>No of Questions</span>
							<sup className={styles.superscript}>*</sup>
						</div>
						<Input size="md" placeholder="type" className={styles.input} />
					</div>
					<div className={styles.wrapper}>
						<div className={styles.label_wrapper}>
							<span>Duration of Test</span>
							<sup className={styles.superscript}>*</sup>
						</div>
						<Input size="md" placeholder="00 h : 00 min" className={styles.input} />
					</div>

				</div>
			</div>
		</div>
	);
}

export default CreateTest;
