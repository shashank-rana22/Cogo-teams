import { Button } from '@cogoport/components';
import { TextAreaController, useForm, useFieldArray } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import styles from './style.module.css';

function Annexure({ control }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'containers',
	});

	return (
		<main style={{ width: '812px', backgroundColor: '#fff', padding: '50px', margin: 'auto' }}>
			<section style={{
				width           : '696px',
				position        : 'relative',
				pageBreakAfter  : 'auto',
				backgroundColor : '#fff',
			}}
			>
				<div className={styles.header}>
					ANNEXURE SHEET
				</div>
				<div className={styles.secondary_header}>
					<div>
						BL#
					</div>
					<div className={styles.flex}>
						<span>Vessel</span>
						<TextAreaController
							name="vessel"
							control={control}
							rows={1}
						/>
					</div>
					<div className={styles.flex}>
						<span>Voyege</span>
						<TextAreaController
							name="voyege"
							control={control}
							rows={1}
						/>
					</div>
				</div>
				<div style={{
					border        : '2px solid black',
					display       : 'flex',
					flexDirection : 'column',
					alignItems    : 'center',
					borderTop     : 'none',
				}}
				>
					<table>
						<thead>
							<tr>
								<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>
									Container No.

								</th>
								<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>
									Marks and No.

								</th>
								<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>
									Number of Packages, kinds of packages, general description of goods

								</th>
								<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>Gross Weight</th>
								<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>Measurement</th>
							</tr>
						</thead>
						<tbody>
							{fields.map((field, index) => (
								<tr key={field.id} style={{ position: 'relative' }}>
									<td className={styles.table_data}>
										<TextAreaController
											name={`containers.${index}.container_number`}
											control={control}
											rows={8}
										/>
									</td>
									<td className={styles.table_data}>
										<TextAreaController
											name={`containers.${index}.marks_and_number`}
											control={control}
											rows={8}
										/>

									</td>
									<td className={styles.table_data}>
										<TextAreaController
											name={`containers.${index}.package_description`}
											control={control}
											rows={8}
										/>
									</td>
									<td className={styles.table_data}>
										<TextAreaController
											name={`containers.${index}.gross_weight`}
											control={control}
											rows={8}
										/>
									</td>
									<td className={styles.table_data}>
										<TextAreaController
											name={`containers.${index}.measurement`}
											control={control}
											rows={8}
										/>
									</td>

									{index !== 0
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
				</div>
			</section>
		</main>
	);
}

export default Annexure;
