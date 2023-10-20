pipeline {
    agent { 
    label 'ec2-fleet' 
    }

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        JENKINS_PRIVATE_KEY = credentials('jenkins-dev-private-key')
        SSH_PORT = credentials('dev-instance-ssh-port')
        TEAMS_WEBHOOK_URL = credentials('teams-webhook-url')
        NPM_TOKEN = credentials('cogo-npm-token')
        ECR_USERNAME = credentials('aws-dev-ecr-user')
        ECR_URL = credentials('aws-dev-ecr-url')
        SERVER_NAME = ''
        SERVER_IP = ''
        exitCode = 0
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
        stage("Acquire lock"){ //avoid concurrent deployments
                when {
                expression { sh (script: "git log -1 --pretty=%B ${COMMIT_ID}", returnStdout: true).contains('#deploy_on') }
                }
                steps{
                    script {
                    SERVER_NAME = sh(script: "git log -1 --pretty=%B ${COMMIT_ID} | awk '{print \$NF}'", returnStdout: true).trim()
                    SERVER_IP = sh(script: "aws ec2 describe-instances --filters \"Name=tag:Name,Values=${SERVER_NAME}\" --query \"Reservations[*].Instances[*].PrivateIpAddress\" --output text", returnStdout: true).trim()
                    lockFile = "/home/${SERVER_NAME}/.admin.lock"
                    // Use SSH to check if the lock file exists
                    def sshCommand = "ssh -o StrictHostKeyChecking=no -i ${JENKINS_PRIVATE_KEY} ${SERVER_NAME}@${SERVER_IP} -p ${SSH_PORT} test -e ${lockFile}"
                    exitCode = sh(script: sshCommand, returnStatus: true)
                    echo "${exitCode}"
                    if (exitCode == 1) {
                     sh "ssh -o StrictHostKeyChecking=no -i ${JENKINS_PRIVATE_KEY} ${SERVER_NAME}@${SERVER_IP} -p ${SSH_PORT} touch ${lockFile}"
                        echo "Acquired lock on remote server."
                    } else {
                        office365ConnectorSend webhookUrl: "${TEAMS_WEBHOOK_URL}", message: "## Deployment failed for user **${PUSHER_NAME}** because another deployment is going on for cogo-admin in the specified server.", color: '#3366ff'
                        currentBuild.result = 'ABORTED'
                        error("Failed to acquire lock on remote server. Lock is already acquired.")
                    }
                }
            }

        }
        stage('Build'){
            when {
                expression { sh (script: "git log -1 --pretty=%B ${COMMIT_ID}", returnStdout: true).contains('#deploy_on') }
            }
            steps {
                office365ConnectorSend webhookUrl: "${TEAMS_WEBHOOK_URL}", message: "## Starting to build admin for commit *${COMMIT_ID}* of branch **${BRANCH_NAME}** for user **${PUSHER_NAME}** on server ${SERVER_NAME}", color: '#3366ff'
                script{
                    sh "scp -o StrictHostKeyChecking=no -i ${JENKINS_PRIVATE_KEY} -P ${SSH_PORT} ${SERVER_NAME}@${SERVER_IP}:/home/${SERVER_NAME}/.env.admin .env"
					sh "sed -i '/NODE_ENV=production/d' .env"
					}

                // build docker image for admin site 
                script {
                    sh "DOCKER_HOST=ssh://ubuntu@${SERVER_IP}:${SSH_PORT}  docker image build --build-arg NPM_TOKEN=${NPM_TOKEN} -t ${ECR_URL}/admin:${COMMIT_ID} --target runner ."
                }
            }
        }
        stage('Deploy') {
            when {
                expression { sh (script: "git log -1 --pretty=%B ${COMMIT_ID}", returnStdout: true).contains('#deploy_on') }
            }
            steps {
                echo 'Deploying....'
                // ssh into server ip and run deploy commands, then remove lock
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
    post{//remove lock
        always{
            script{
                if(exitCode == 1)
                {
                    sh "ssh -o StrictHostKeyChecking=no -i ${JENKINS_PRIVATE_KEY} ${SERVER_NAME}@${SERVER_IP} -p ${SSH_PORT} rm /home/${SERVER_NAME}/.admin.lock"
                }
            }
        }
    }
}
