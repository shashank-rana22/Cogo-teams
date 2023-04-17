import Header from './Header';
import SettingsItem from './SettingsItem';
import styles from './styles.module.css';

function EditSetting(props) {
	const {
		ITEM_ARRAY = [], useGetControls, inputStyle = '',
		setEditing = () => {}, heading = '', tooltipData = '',
	} = props;

	return (
		<div className={styles.container}>

			<Header heading={heading} tooltipData={tooltipData} setEditing={setEditing} />

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
