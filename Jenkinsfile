pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        JENKINS_PRIVATE_KEY = credentials('jenkins-dev-private-key')
    }

    stages {
        stage('Deploy') {
            when {
                expression { sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).contains('#deploy_on') }
            }

            steps {
                echo 'Deploying demeter....'

                script {
                    SERVER_NAME = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT} | awk \'{print $NF}\'', returnStdout:true).trim()
                }

                // get private ip of server
                script {
                    SERVER_IP = sh (script: "aws ec2 describe-instances --filters \"Name=tag:Name,Values=${SERVER_NAME}\" --query \"Reservations[*].Instances[*].PrivateIpAddress\" --output text", returnStdout:true).trim()
                }

                // ssh into server ip and run deploy commands
                sh """ssh -o StrictHostKeyChecking=no -i ${env.JENKINS_PRIVATE_KEY} ${SERVER_NAME}@${SERVER_IP} -p 2710 \" cd cogo-admin && \
                git fetch && \
                git checkout ${GIT_COMMIT} && \
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
            sh 'echo job failed'
        }
    }
}
