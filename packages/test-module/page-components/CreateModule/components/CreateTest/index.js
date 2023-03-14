import { Input, MultiSelect } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function CreateTest() {
	const [value, onChange] = useState([]);

	const options1 = [
		{ label: 'India', value: 'IN' },
		{ label: 'Vietnam', value: 'VI' },
	];

	const options2 = [
		{ label: 'KAM1', value: 'KAM1' },
		{ label: 'KAM2', value: 'KAM2' },
		{ label: 'KAM3', value: 'KAM3' },
		{ label: 'KAM4', value: 'KAM4' },
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
							<span>Select Entity & User Groups</span>
							<sup className={styles.superscript}>*</sup>
						</div>
						<div className={styles.input_wrapper}>
							<MultiSelect
								value={value}
								onChange={onChange}
								placeholder="Cogo Entity"
								options={options1}
								isClearable
								style={{ width: '200px' }}
								size="md"
								className={styles.input}
							/>
							<MultiSelect
								value={value}
								onChange={onChange}
								placeholder="User Group"
								options={options2}
								isClearable
								style={{ width: '200px' }}
								size="md"
								className={styles.input}
							/>
						</div>

					</div>
				</div>

				<div className={styles.right}>
					<div className={styles.wrapper}>
						<div className={styles.label_wrapper}>
							<span>No of Questions</span>
							<sup className={styles.superscript}>*</sup>
						</div>
						<Input size="md" placeholder="type" className={`${styles.input} ${styles.input_type}`} />
					</div>
					<div className={styles.wrapper}>
						<div className={styles.label_wrapper}>
							<span>Duration of Test</span>
							<sup className={styles.superscript}>*</sup>
						</div>
						<Input
							size="md"
							placeholder="00 h : 00 min"
							className={`${styles.input} ${styles.input_duration}`}
						/>
					</div>

				</div>
			</div>
		</div>
	);
}

export default CreateTest;
