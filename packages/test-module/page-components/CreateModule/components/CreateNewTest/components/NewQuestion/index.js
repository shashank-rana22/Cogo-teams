import { Button, Input, ButtonIcon, Table, Tooltip, Breadcrumb } from '@cogoport/components';
import { IcMSearchlight, IcMArrowRotateDown, IcMOverflowDot } from '@cogoport/icons-react';

import styles from './styles.module.css';

function NewQuestion() {
	const list = [];
	const columns = [
		{
			Header   : 'TOPIC',
			id       : 'a',
			accessor : () => (
				<section>
					hello
				</section>
			),
		},
		{
			Header   : 'QUESTION TYPE',
			id       : 'b',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'QUESTION/CASE',
			id       : 'c',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'ANSWER TYPE',
			id       : 'd',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'ANSWER OPTIONS',
			id       : 'e',
			accessor : () => (
				<section>hello</section>
			),
		},
		{
			Header   : 'ANSWER KEY',
			id       : 'f',
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
											{/* <IcMEdit /> */}
											<div style={{ marginLeft: '8px' }}>
												Edit
											</div>
										</Button>
										<Button
											themeType="secondary"
											className={styles.btn}
											// onClick={() => router.push(`/service-bundling/view?bundle_id=${id}`)}
										>

											{/* <IcMEyeopen /> */}
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
											{/* <IcMDelete /> */}
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
		<div>
			<Breadcrumb>
				<Breadcrumb.Item label="Add Questions to test" />
				<Breadcrumb.Item label="New Questions" />
			</Breadcrumb>
			<div className={styles.filter}>
				<Input
					size="md"
					suffix={<ButtonIcon size="md" icon={<IcMSearchlight />} disabled={false} themeType="primary" />}
					placeholder="Search for Question/topic"
					className={styles.input}
				/>
				<div className={styles.filter}>
					<IcMArrowRotateDown style={{ cursor: 'pointer' }} />
					<span className={styles.span_text}>Sort By</span>
				</div>
			</div>
			<Table
				className={styles.table_container}
				data={list || [1, 2]}
				columns={columns}
			/>
		</div>
	);
}

export default NewQuestion;
