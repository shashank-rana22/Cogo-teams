import { Button } from '@cogoport/components';
import { TextAreaController, useFieldArray } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';

import Watermark from '../../commons/Watermark';

import styles from './style.module.css';

const KEYS = ['container_number',
	'marks_and_number',
	'package_description',
	'gross_weight',
	'measurement'];

const NOT_SHOW_REMOVE_INDEX = 0;
const MODE_READ = 'read';

function Annexure({
	control,
	mode = MODE_READ,
	initialValues = {},
	watermark = null,
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'containers',
	});

	return (
		<main className={styles.main}>
			{watermark
				? <Watermark text="draft" /> : null}
			<section className={styles.section}>
				<div className={styles.header}>
					ANNEXURE SHEET
				</div>
				<div className={styles.secondary_header}>
					<div>
						BL#
						<b>{initialValues?.bl_number}</b>
					</div>
					<div className={styles.vessel_voyage}>
						<span>Vessel</span>
						{mode === MODE_READ ? <span>{initialValues?.annexure_vessel || ''}</span>
							: (
								<TextAreaController
									name="annexure_vessel"
									control={control}
									rows={1}
									defaultValue={initialValues?.annexure_vessel}
								/>
							)}
					</div>
					<div className={styles.vessel_voyage}>
						<span>Voyege</span>
						{mode === MODE_READ ? <span>{initialValues?.annexure_vessel_number || ''}</span>
							: (
								<TextAreaController
									name="annexure_vessel_number"
									control={control}
									rows={1}
									defaultValue={initialValues?.annexure_vessel_number}
								/>
							)}
					</div>
				</div>
				<div className={styles.table_wrapper}>
					<table>
						<thead>
							<tr>
								<th>Container No.</th>
								<th>Marks and No.</th>
								<th>
									Number of Packages, kinds of packages, general description of goods
								</th>
								<th>Gross Weight</th>
								<th>Measurement</th>
							</tr>
						</thead>
						<tbody>
							{mode === MODE_READ
								? (initialValues?.containers || []).map((container) => (
									<tr key={container?.container_number}>
										<td className={styles.table_data_read}>{container?.container_number}</td>
										<td className={styles.table_data_read}>{container?.marks_and_number}</td>
										<td className={styles.table_data_read}>{container?.package_description}</td>
										<td className={styles.table_data_read}>{container?.gross_weight}</td>
										<td className={styles.table_data_read}>{container?.measurement}</td>
									</tr>
								))

								: fields.map((field, index) => (
									<tr key={field.id} style={{ position: 'relative' }}>
										{KEYS.map((key) => (
											<td key={key} className={styles.table_data}>
												<TextAreaController
													name={`containers.${index}.${key}`}
													control={control}
													rows={8}
												/>
											</td>
										))}

										{index !== NOT_SHOW_REMOVE_INDEX
											? (
												<IcMCross
													type="button"
													onClick={() => remove(index)}
													className={styles.close_icon}
												/>
											) : null }
									</tr>
								))}

						</tbody>
					</table>
					{mode !== MODE_READ
						? (
							<div className={styles.button_wrapper}>
								<Button
									size="sm"
									onClick={() => append({
										container_number    : '',
										marks_and_number    : '',
										package_description : '',
										gross_weight        : '',
										measurement         : '',
									})}
								>
									Add New Container
								</Button>
							</div>
						) : null}
				</div>
			</section>
		</main>
	);
}

export default Annexure;
