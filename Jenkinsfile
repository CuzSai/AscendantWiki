
pipeline {
    agent any
    stages {
        stage("Build Docker Image") {
            steps {
                script {
                    sh 'docker build -t ascendantwikifrontend .'
                }
                echo "Docker image built successfully"
            }
        }
        stage("Run Docker Container") {
            steps {
                script {
                    // Remove any previous container if it exists
                    sh 'docker rm -f nextjs-container || true'

                    // Run the Docker container in detached mode
                    sh 'docker run -d -p 3000:3000 --name nextjs-container ascendantwikifrontend'
                }
                echo "App is running in Docker on port 3000"
            }
        }
    }
    post {
        always {
            echo "Pipeline completed"
        }
    }
}
