import { Button } from '@cogoport/components';

import FormComponent from '../../../FormComponent';
import { controls, controlsBottom } from '../../../getControls';

import styles from './styles.module.css';

function KamLevelDetailsEdit({ data = {}, handleSubmit, onSave, setEditMode, updateLoading, formProps }) {
	return (
		<>
			<Button
				className={styles.delete_button}
				onClick={handleSubmit(onSave)}
				loading={updateLoading}
				type="submit"
			>
				{' '}
				Save
			</Button>
			<Button
				className={styles.delete_button}
				themeType="secondary"
				disabled={updateLoading}
				style={{ marginRight: '0' }}
				onClick={(e) => {
					e.stopPropagation();
					setEditMode(false);
				}}
			>
				Cancel
			</Button>

			<div className={styles.level_card_container}>
				<FormComponent
					formProps={formProps}
					controls={controls}
					isEdit="expertise_type"
					isTop
					data={data}
					updateLoading={updateLoading}

				/>
				<div className={styles.bottom_supporting_txt}>Transacting Accounts</div>
				<div className={styles.bottom_form}>
					<FormComponent
						formProps={formProps}
						controls={controlsBottom}
						isEdit="accounts"
						data={data}
						updateLoading={updateLoading}
					/>
				</div>
			</div>
		</>
	);
}
export default KamLevelDetailsEdit;
