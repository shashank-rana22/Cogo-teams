import { Table, Button, Tooltip } from '@cogoport/components';
import { IcMOverflowDot, IcMDelete, IcMEdit, IcMEyeopen } from '@cogoport/icons-react';
// import { useRouter } from '@cogoport/next';
// import { format, startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';
// import useUpdateServiceBundle from './useUpdateServiceBundle';

function ListComponent() {
	const { list } = {};

	const columns = [
		{
			Header   : 'NAME',
			id       : 'a',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'TOPICS',
			id       : 'c',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'TOTAL QUESTIONS/CASES',
			id       : 'd',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'ALLOWED ATTEMPTS',
			id       : 'ss',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'PASS %',
			id       : 'e',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'ATTEMPTED BY',
			id       : 'ik',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'STATUS',
			id       : 'tags',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'LAST UPDATED',
			id       : 'val_props',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : '',
			id       : 'options',
			accessor : () => (

				<section>
					<div
						role="presentation"
					>
						<div style={{
							width  : 'fit-content',
							cursor : 'default',
						}}
						>
							<Tooltip
								className={styles.tooltip_pad}
								content={(
									<div className={styles.options}>
										<Button
											themeType="secondary"
											className={styles.btn}
											// onClick={() => router.push(`/service-bundling/edit?bundle_id=${id}`)}
										>
											<IcMEdit />
											<div style={{ marginLeft: '8px' }}>
												Edit
											</div>
										</Button>
										<Button
											themeType="secondary"
											className={styles.btn}
											// onClick={() => router.push(`/service-bundling/view?bundle_id=${id}`)}
										>

											<IcMEyeopen />
											<div style={{ marginLeft: '8px' }}>
												View
											</div>
										</Button>
										<Button
											themeType="secondary"
											className={styles.btn}
											// onClick={() => {
											// 	onDelete(id);
											// }}
										>
											<IcMDelete />
											<div style={{ marginLeft: '8px' }}>
												Delete
											</div>
										</Button>

									</div>
								)}
								trigger="click"
								placement="left"
								interactive="true"
							>
								<IcMOverflowDot style={{ cursor: 'pointer' }} />
							</Tooltip>
						</div>

					</div>
				</section>
			),

		},
	];

	return (
		<div className={styles.table_container}>
			<Table
				className={styles.table_container}
				data={list || [1]}
				columns={columns}
			/>

		</div>
	);
}

export default ListComponent;
