import { Button } from '@cogoport/components';

import { getFieldController } from '../../../../../../../../../common/Form/getFieldController';
// import getControls from '../../getControls';
import { controls, controlsBottom } from '../../../getControls';

import styles from './styles.module.css';

function KamLevelDetailsEdit({ data = {}, control, handleSubmit, onSave, setEditMode, updateLoading }) {
	const transacting_accounts = data?.list?.['Transacting Accounts'] || [];

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
				{controls.map((singleField) => {
					const Element = getFieldController(singleField.type) || null;
					if (!Element) return null;
					return (
						<>
							<div className={styles.row_level}>
								{' '}
								{singleField.label}
								{' '}
								Score
								<div className={styles.supporting_text}>Score</div>
								<div>
									<Element
										{...singleField}
										key={singleField.label}
										control={control}
										id={singleField.name}
									/>
								</div>
								<div className={styles.current_value}>
									Current value:
									{' '}
									{ data?.list?.[singleField.label]?.[0].threshold_score || '-'}
								</div>
							</div>
							<div className={styles.border_class} />
						</>
					);
				})}
				<div className={styles.row_level_end}>
					<h2 style={{ margin: '8px' }}>Transacting Accounts</h2>
					<div className={styles.row_level_end_options}>
						{controlsBottom.map((singleField) => {
							const Element = getFieldController(singleField.type) || null;

							if (!Element) return null;

							return (
								<div className={styles.row_level} style={{ width: '30%' }}>
									{' '}
									{singleField.label}
									<div>
										<Element
											{...singleField}
											key={singleField.label}
											control={control}
											id={singleField.name}
										/>
									</div>
									<div className={styles.current_value}>
										Current value:
										{' '}
										{transacting_accounts
											? transacting_accounts.find((account) => account?.threshold_score_type
									=== singleField.label)?.threshold_score || '-' : '-'}
									</div>
									{' '}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
export default KamLevelDetailsEdit;
