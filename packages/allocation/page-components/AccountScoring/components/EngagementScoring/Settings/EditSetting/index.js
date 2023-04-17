import SettingsItem from './SettingsItem';
import styles from './styles.module.css';

function EditSetting({ ITEM_ARRAY = [], useGetControls, inputStyle }) {
	return (
		<div className={styles.container}>
			{ ITEM_ARRAY.map((item, index) => (
				<div key={item} className={styles.item}>
					<SettingsItem
						item={item}
						useGetControls={useGetControls}
						index={index}
						inputStyle={inputStyle}
					/>
				</div>
			))}
		</div>
	);
}

export default EditSetting;
