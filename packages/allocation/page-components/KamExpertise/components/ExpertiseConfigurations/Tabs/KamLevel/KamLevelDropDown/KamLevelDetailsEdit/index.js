import { useForm } from '@cogoport/forms';

import { getFieldController } from '../../../../../../../../common/Form/getFieldController';
import { controls, controlsBottom } from '../../controls';

import styles from './styles.module.css';

function KamLevelDetailsEdit({ data = {} }) {
	const formProps = useForm();
	const transacting_accounts = data && data.list && data.list['Transacting Accounts'];
	const { control } = formProps;
	return (
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
								{ data && data.list
									&& data.list[singleField.label]
									? data.list[singleField.label][0].threshold_score : '-'}
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
										? transacting_accounts.find((account) => account.threshold_score_type
									=== singleField.label)?.threshold_score || '-' : '-'}
								</div>
								{' '}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
export default KamLevelDetailsEdit;
