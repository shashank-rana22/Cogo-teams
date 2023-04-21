pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        JENKINS_PRIVATE_KEY = credentials('jenkins-dev-private-key')
        SSH_PORT = credentials('dev-instance-ssh-port')
        TEAMS_WEBHOOK_URL = credentials('teams-webhook-url')
    }
    
    options {
        skipDefaultCheckout()
    }

    stages {
        stage ('Checkout') {
            steps {
                echo "Branch name: ${BRANCH_NAME}"
                echo "Commit id: ${COMMIT_ID}"
                echo "Commit message: ${COMMIT_MESSAGE}"
                checkout scmGit(branches: [[name: "${BRANCH_NAME}"]], extensions: [], userRemoteConfigs: [[credentialsId: 'cogo-dev-github-app', url: 'https://github.com/Cogoport/cogo-admin.git']])
            }
        }

        stage('Deploy') {
            when {
                expression { sh (script: "git log -1 --pretty=%B ${COMMIT_ID}", returnStdout: true).contains('#deploy_on') }
            }

            steps {
                office365ConnectorSend webhookUrl: "${TEAMS_WEBHOOK_URL}", message: "## Starting build for commit *${COMMIT_ID}* of branch **${BRANCH_NAME}**", color: '#3366ff'

                echo 'Deploying cogo-admin....'

                script {
                    SERVER_NAME = sh (script: "git log -1 --pretty=%B ${COMMIT_ID} | awk \'{print \$NF}\'", returnStdout:true).trim()
                }

                // get private ip of server
                script {
                    SERVER_IP = sh (script: "aws ec2 describe-instances --filters \"Name=tag:Name,Values=${SERVER_NAME}\" --query \"Reservations[*].Instances[*].PrivateIpAddress\" --output text", returnStdout:true).trim()
                }

                // ssh into server ip and run deploy commands
                sh """ssh -o StrictHostKeyChecking=no -i ${env.JENKINS_PRIVATE_KEY} ${SERVER_NAME}@${SERVER_IP} -p ${SSH_PORT} \" cd cogo-admin && \
                git fetch && \
                git checkout ${COMMIT_ID} && \
                source /home/${SERVER_NAME}/.nvm/nvm.sh && \
                nvm use 18 && \
                pnpm i && \
                pnpm run deploy
                \""""
            }

        }
    }

    post {
        failure {
            office365ConnectorSend webhookUrl: "${TEAMS_WEBHOOK_URL}", message: "## Starting build for commit *${COMMIT_ID}* of branch **${BRANCH_NAME}**", color: '#3366ff'
        }

        success {
            office365ConnectorSend webhookUrl: "${TEAMS_WEBHOOK_URL}", message: "## Deployed commit *${COMMIT_ID}* of branch **${BRANCH_NAME}** on server **${SERVER_NAME}** successfully", color:  '#66ff66'
        }
    }
}
