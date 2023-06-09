import FullView from './FullView';
import styles from './styles.module.css';

function PreviewDocument({ document_header, height = '200px', width = '200px', preview = false, document_url = '' }) {
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
					style={{ height, width }}
				>
					<a href={document_url}>
						{document_header}

					</a>
				</object>
				{
					preview && (
						<FullView
							containerStyle={{
								position : 'absolute',
								bottom   : 8,
								left     : 16,
								right    : 16,
							}}
							url={document_url}
						/>
					)
				}
			</div>
		</div>
	);
}

export default PreviewDocument;
