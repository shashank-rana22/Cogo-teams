import { Input, Textarea } from '@cogoport/components';

import styles from './styles.module.css';

function GroupInformation({
	selectedGroup = {},
	setSelectedGroup = () => {},
}) {
	return (
		<div className={styles.container}>
			<Input
				size="md"
				placeholder="Give your team a name.."
				value={selectedGroup?.group_name}
				onChange={(val) => setSelectedGroup({ ...selectedGroup, group_name: val })}
			/>
			<div className={styles.label}>
				Add some description
			</div>
			<Textarea
				name="a5"
				size="lg"
				placeholder="Please add description"
				value={selectedGroup?.group_description}
				onChange={(val) => setSelectedGroup({ ...selectedGroup, group_description: val })}
			/>
		</div>
	);
}

export default GroupInformation;
