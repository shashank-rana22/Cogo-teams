import { useForm } from '@cogoport/forms';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';
import { controls } from '../ControlsForScore/controls';
import { controls_bottom } from '../ControlsForScore/controls_bottom';

import styles from './styles.module.css';

function KamLevelDetailsEdit() {
	const formProps = useForm();

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
							<div className={styles.supporting_text}>Score</div>
							<div>
								<Element
									{...singleField}
									key={singleField.label}
									control={control}
									id={singleField.name}
								/>

							</div>

							{' '}

						</div>
						<div className={styles.border_class} />
					</>
				);
			})}

			<div className={styles.row_level_end}>
				<h2>Transacting Accounts</h2>
				<div className={styles.row_level_end_options}>
					{controls_bottom.map((singleField) => {
						const Element = getFieldController(singleField.type) || null;

						if (!Element) return null;

						return (
							<div className={styles.row_level} style={{ width: '35%' }}>
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
