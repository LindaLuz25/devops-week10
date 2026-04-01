pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-app"
        VERSION = ""
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/lesantivanez/lab09releasemanagement.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'cd app && npm install'
            }
        }

        stage('Run tests') {
            steps {
                echo "Simulando tests..."
            }
        }

        stage('Generate Version') {
            steps {
                script {
                    VERSION = sh(
                        script: "date +%Y.%m.%d.%H%M",
                        returnStdout: true
                    ).trim()
                    env.VERSION = VERSION
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${VERSION} -f docker/Dockerfile ."
            }
        }

        stage('Tag Git Release') {
            steps {
                sh """
                git config user.email "jenkins@local"
                git config user.name "jenkins"
                git tag v${VERSION}
                git push origin v${VERSION}
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                export APP_VERSION=${VERSION}
                docker compose down
                docker compose up -d
                """
            }
        }
    }
}