import { Textarea, Button, FileSelect } from '@cogoport/components';
import { useState } from 'react';

import GetLabelInputPair from '../CreateBadge/getLabelInputPair';
import Header from '../CreateBadge/header';

import styles from './styles.module.css';

function CreateMastery({ setWindow }) {
	const [value, setValue] = useState([]);
	const [file, setFile] = useState([]);
	const params = {
		name: {
			size                     : 'md',
			placeholder_singleSelect : 'Multi modal maestro',
		},
		badges: {
			value,
			onChange    : (val) => setValue(val),
			placeholder : 'Select Badges',
			options     : [
				{
					label : 'B',
					value : 'n',
				},
				{
					label : 'uy',
					value : 'dfs',
				},
			],
			isClearable : true,
			style       : { width: '200px' },
		},
		description: {
			size: 'md',
			placeholder_singleSelect:
            'Multimodal maestro is awarded to users who complete gold 3 in all of these badges',
		},

	};
	const labelInputPairsdata = [
		{
			labelName          : 'Mastery Name',
			multiInput         : false,
			singleSelectParams : params.name,
			multiSelectParams  : {},
			style              : { flexBasis: '20%' },
		},
		{
			labelName          : 'Badges',
			multiInput         : true,
			singleSelectParams : {},
			multiSelectParams  : params.badges,
			style              : { flexBasis: '20%' },
		},
	];
	const onClose = () => {
		setWindow(1);
	};
	return (
		// <div size="xl" show onClose={onClose} placement="center"></div>
		<div>
			<section className={styles.container}>
				<Header />
				<div className={styles.content_container}>
					{
					labelInputPairsdata.map((data) => (
						<GetLabelInputPair
							labelName={data.labelName}
							multiInput={data.multiInput}
							singleSelectParams={data.singleSelectParams}
							multiSelectParams={data.multiSelectParams}
							style={data.style}
						/>
					))
					}
					<div className={styles.lower_background}>
						<div style={{ flexBasis: '29%' }}>
							<p style={{ color: '#4f4f4f' }}>Badge PNG</p>
							<FileSelect
								uploadDesc="Upload files here"
								className={styles.file_select_style}
								value={file}
								onChange={(val) => setFile(val)}
							/>
						</div>
						<div className={styles.text_area_container}>
							<p style={{ color: '#4f4f4f' }}>Description</p>
							<Textarea
								className={styles.text_area}
								size="sm"
								placeholder="Multimodal maestro is awarded
                                to users who complete gold 3 in all of these badges"
							/>
						</div>
					</div>
				</div>
				<div className={styles.btncls}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: 10, borderWidth: 0 }}
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button size="md" themeType="primary">
						Next
					</Button>
				</div>
			</section>
		</div>
	);
}
export default CreateMastery;
