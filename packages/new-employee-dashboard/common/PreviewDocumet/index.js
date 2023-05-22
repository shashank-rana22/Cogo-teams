import FullView from './FullView';
import styles from './styles.module.css';

function PreviewDocumet() {
	const
		data = 'https://cogoport-production.sgp1.digitaloceanspaces.com/799b3a3617e7553b143d5c9d85c11154/GST%20Registration%20certificate..pdf';

	return (
		<div className={styles.container}>
			<div
				className={styles.pdf}
				style={{
					minWidth  : '200px',
					minHeight : '200px',
				}}
			>
				<object
					data={data}
					type="application/pdf"
					height="200px"
					width="200px"
				>
					<a href={data}>
						Business Address Proof

					</a>
				</object>
				<FullView
					containerStyle={{
						position : 'absolute',
						bottom   : 0,
						left     : 16,
						right    : 16,
					}}
					url={data}
				/>
			</div>

		</div>
	);
}

export default PreviewDocumet;
