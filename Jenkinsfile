pipeline {
    agent { docker { image 'node:6.3' } }
    stages {
        stage('Build') {
            steps {
                bat 'echo "Hello World"'
                bat '''
                    echo "Multiline shell steps"
                '''
            }
        }
    }
}