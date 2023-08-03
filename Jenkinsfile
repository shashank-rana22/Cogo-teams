pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        JENKINS_PRIVATE_KEY = credentials('jenkins-dev-private-key')
        SSH_PORT = credentials('dev-instance-ssh-port')
        TEAMS_WEBHOOK_URL = credentials('teams-webhook-url')
        NPMRC = credentials('cogo_product_npmrc')
		ENV_FILE = credentials('dev_cogo_admin_env')
		ECR_USERNAME = credentials('aws-dev-ecr-user')
        ECR_URL = credentials('aws-dev-ecr-url')
    }
    
    options {
        skipDefaultCheckout()
    }

    stages {
        stage ('Cleanup') {
            steps {
                cleanWs()
            }
        }
        
        stage ('Checkout') {
            steps {
                echo "Branch name: ${BRANCH_NAME}"
                echo "Commit id: ${COMMIT_ID}"
                echo "Commit message: ${COMMIT_MESSAGE}"
                checkout scmGit(branches: [[name: "${BRANCH_NAME}"]], extensions: [], userRemoteConfigs: [[credentialsId: 'cogo-dev-github-app', url: 'https://github.com/Cogoport/cogo-admin.git']])
            }
        }
        stage('Build'){
            when {
                expression { sh (script: "git log -1 --pretty=%B ${COMMIT_ID}", returnStdout: true).contains('#deploy_on') }
            }
            steps {
				office365ConnectorSend webhookUrl: "${TEAMS_WEBHOOK_URL}", message: "## Starting to build admin for commit *${COMMIT_ID}* of branch **${BRANCH_NAME}** for user **${PUSHER_NAME}**", color: '#3366ff'

				script {
                    SERVER_NAME = sh (script: "git log -1 --pretty=%B ${COMMIT_ID} | awk \'{print \$NF}\'", returnStdout:true).trim()
                }

				cache(caches: [arbitraryFileCache(path: 'node_modules')], defaultBranch: 'feat/jenkinsfile', maxCacheSize: 3000) {
					nodejs(nodeJSInstallationName: 'node-18') {
                        SERVER_IP = sh (script: "aws ec2 describe-instances --filters \"Name=tag:Name,Values=${SERVER_NAME}\" --query \"Reservations[*].Instances[*].PrivateIpAddress\" --output text", returnStdout:true).trim()
						sh "scp -o StrictHostKeyChecking=no -i ${JENKINS_PRIVATE_KEY} -P ${SSH_PORT} ${SERVER_NAME}@${SERVER_IP}:.env.admin .env"
						sh (script: "echo ${NPMRC} >> .npmrc")
						sh 'pnpm i --frozen-lockfile'
					}
				}

				cache(caches: [arbitraryFileCache(path: 'cogo-control/.next')], defaultBranch: 'feat/jenkinsfile', maxCacheSize: 6000) {
					nodejs(nodeJSInstallationName: 'node-18') {
						sh 'pnpm run build'
					}
				}

				// build docker image for admin site and push to ecr
				script {
					sh "docker image build -t ${ECR_URL}/admin:${COMMIT_ID} --target admin ."
					sh "aws ecr get-login-password --region ap-south-1 | docker login --username ${ECR_USERNAME} --password-stdin ${ECR_URL}"
					sh "docker image push ${ECR_URL}/admin:${COMMIT_ID}"
					sh "docker image rm ${ECR_URL}/admin:${COMMIT_ID}"
				}
			}
        }
        stage('Deploy') {
            when {
                expression { sh (script: "git log -1 --pretty=%B ${COMMIT_ID}", returnStdout: true).contains('#deploy_on') }
            }

            steps {
                echo 'Deploying....'

                script {
                    SERVER_NAME = sh (script: "git log -1 --pretty=%B ${COMMIT_ID} | awk \'{print \$NF}\'", returnStdout:true).trim()
                }

                // get private IP of server
                script {
                    SERVER_IP = sh (script: "aws ec2 describe-instances --filters \"Name=tag:Name,Values=${SERVER_NAME}\" --query \"Reservations[*].Instances[*].PrivateIpAddress\" --output text", returnStdout:true).trim()
                }

                // ssh into server ip and run deploy commands
                sh """ssh -o StrictHostKeyChecking=no -i ${env.JENKINS_PRIVATE_KEY} ${SERVER_NAME}@${SERVER_IP} -p ${SSH_PORT} \" sed -i \'/^ADMIN_TAG/s/=.*\$/=${COMMIT_ID}/g\' /home/${SERVER_NAME}/.env.front && \
                aws ecr get-login-password --region ap-south-1 | docker login --username ${ECR_USERNAME} --password-stdin ${ECR_URL} && \
                docker compose --env-file /home/${SERVER_NAME}/.env.front -f /home/${SERVER_NAME}/docker-compose-frontend.yaml up admin -d
                \""""
            }
            post {
                failure {
			        office365ConnectorSend webhookUrl: "${TEAMS_WEBHOOK_URL}", message: "## Admin deployment failed for commit *${COMMIT_ID}* of branch **${BRANCH_NAME}** on server ${SERVER_NAME} for user **${PUSHER_NAME}**", color: '#ff0000'
                }

		        success {
			        office365ConnectorSend webhookUrl: "${TEAMS_WEBHOOK_URL}", message: "## Admin Successfully deployed for commit *${COMMIT_ID}* of branch **${BRANCH_NAME}** on server **${SERVER_NAME} for user **${PUSHER_NAME}****", color:  '#66ff66'
		        }
            }
		}
    }
}
