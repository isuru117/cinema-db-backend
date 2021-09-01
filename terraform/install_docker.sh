curl -fsSL https://test.docker.com -o test-docker.sh
sudo sh test-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
echo "docker and docker-compose installed!"