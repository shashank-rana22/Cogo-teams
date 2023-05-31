import FullView from './FullView';
import styles from './styles.module.css';

function PreviewDocumet({
	document_header,
	height = '200px', width = '200px',
	preview = false,
	document_url = '',
	id,
	policy_data,
	getEmployeeDetails,
}) {
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
					// height="200px"
					// width="200px"
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
							id={id}
							policy_data={policy_data}
							getEmployeeDetails={getEmployeeDetails}
						/>
					)
				}
			</div>

		</div>
	);
}

export default PreviewDocumet;
