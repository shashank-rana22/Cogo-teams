import FullView from './FullView';
import styles from './styles.module.css';

function PreviewDocumet({ document_header, document_url = '' }) {
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
					data={document_url}
					type="application/pdf"
					height="200px"
					width="200px"
				>
					<a href={document_url}>
						{document_header}

					</a>
				</object>
				<FullView
					containerStyle={{
						position : 'absolute',
						bottom   : 8,
						left     : 16,
						right    : 16,
					}}
					url={document_url}
				/>
			</div>

		</div>
	);
}

export default PreviewDocumet;
