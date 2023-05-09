import { Textarea, Select, Button, FileSelect } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import ModalContent from './ModalContent';
import styles from './styles.module.css';

function CourseCompletion() {
	const [value, onChange] = useState([]);
	const [show, setShow] = useState(false);
	const [multiSelectedUser, setMultiSelectedUser] = useState([]);
	const [multiSelectedEdit, setMultiSelectedEdit] = useState([]);
	const [fileValue, setFileValue] = useState();
	// const [loading, setLoading] = useState(false);

	const onClose = () => setShow(false);

	const options = [
		{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
		{ label: 'Lev Tolstoy', value: 'War and Peace' },
		{ label: 'Fyodor Dostoyevsy', value: 'The Idiot' },
	];

	return (
		<div className={styles.conatiner}>
			<div className={styles.description_box}>
				<div className={styles.description_title}>
					Course Completion Description Text
					<sup className={styles.superscipt}>*</sup>
				</div>
				<Textarea
					name="textarea"
					size="xs"
					placeholder="Type Description you want the user to see on completion of the course"
					className={styles.textarea}
				/>
			</div>
			<div className={styles.form}>
				<div className={styles.form_left}>
					<div className={styles.select_row}>
						Reward on Course Completion
						<sup className={styles.superscipt}>*</sup>
						<Select value={value} onChange={onChange} placeholder="Select Criteria" options={options} />
					</div>
					<div className={styles.select_row}>
						Reward on Course Completion
						<sup className={styles.superscipt}>*</sup>
						<Select value={value} onChange={onChange} placeholder="Select Reward" options={options} />
					</div>
				</div>
				<div className={styles.form_right}>
					<div className={styles.select_row}>
						Select test from Assessment Module
						<sup className={styles.superscipt}>*</sup>
						<Select value={value} onChange={onChange} placeholder="Select" options={options} />
					</div>
					<div className={styles.select_row}>
						Select Reward Template
						<sup className={styles.superscipt}>*</sup>

						<Button
							onClick={() => setShow(true)}
							style={{ background: '#FEF199', color: '#000000' }}
							size="lg"
							className={styles.modal_btn}
						>
							Select Certificate Template
						</Button>
						{show ? (
							<ModalContent
								onClose={onClose}
								show={show}
								setShow={setShow}
								value={value}
								options={options}
								onChange={onChange}
								multiSelectedUser={multiSelectedUser}
								setMultiSelectedUser={setMultiSelectedUser}
								multiSelectedEdit={multiSelectedEdit}
								setMultiSelectedEdit={setMultiSelectedEdit}
							/>
						) : null}
					</div>
				</div>
			</div>
			<div className={styles.form_container}>
				<div className={styles.form_two}>
					<div className={styles.form_left}>
						<div className={styles.select_row_two}>
							Reward on Course Completion
							<sup className={styles.superscipt}>*</sup>
							<Select value={value} onChange={onChange} placeholder="Select Criteria" options={options} />
						</div>
					</div>
					<div className={styles.form_right}>
						<div className={styles.select_row_two}>
							Select test from Assessment Module
							<sup className={styles.superscipt}>*</sup>
							<Select value={value} onChange={onChange} placeholder="Select" options={options} />
						</div>
					</div>
				</div>
				<div style={{ display: 'block', alignItems: 'center', marginBottom: '16px' }}>
					<p>Upload Authority Signature</p>
					<FileSelect value={fileValue} onChange={setFileValue} />
					{/* <ProgressBar /> */}
				</div>
				<div className={styles.button_container}>
					<Button size="md" themeType="secondary">
						<IcMUpload color="#000000" style={{ marginRight: '4px' }} />
						{' '}
						Upload
					</Button>
					<Button size="md" themeType="tertiary">Cancel</Button>
				</div>
			</div>
			<div className={styles.select_row}>
				Time permitted to complete Course, in order to get Reward*
				<sup className={styles.superscipt}>*</sup>
				<div className={styles.multiple_select}>
					<Select
						value={value}
						onChange={onChange}
						placeholder="Select period of"
						options={options}
						style={{ width: '50%', marginRight: '24px' }}
					/>
					<Select
						value={value}
						onChange={onChange}
						placeholder="Select"
						options={options}
						style={{ width: '50%' }}
					/>
				</div>
			</div>
		</div>
	);
}

export default CourseCompletion;
