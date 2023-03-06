import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';
import { controls } from '../ControlsForScore/controls';
import { controls_bottom } from '../ControlsForScore/controls_bottom';

import styles from './styles.module.css';

function ResponseCard({
	// createKam,
	setCreateKam,
	dataLength,
}) {
	const formProps = useForm();

	const { control } = formProps;

	return (
		<div className={styles.level_card_container}>
			<div className={styles.level_desc}>
				<b>
					KAM
					{' '}
					{dataLength + 1 }
					<IcMArrowNext className={styles.arrow} />
					{' '}
					{dataLength + 2}
				</b>

			</div>
			<div style={{
				width          : '12%',
				float          : 'right',
				justifyContent : 'center',
				alignItems     : 'center',
				display        : 'flex',
			}}
			>
				<Button
					style={{ margin: '10px' }}
					themeType="secondary"
					onClick={() => setCreateKam(false)}
				>
					Cancel

				</Button>
				<Button style={{ margin: '10px' }}>Save</Button>

			</div>
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

								{' '}

							</div>
						);
					})}

				</div>

			</div>

		</div>

	);
}

export default ResponseCard;
