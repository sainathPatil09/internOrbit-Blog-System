# 🚀 DevOps Kubernetes Deployment on AWS EC2 and CICD with GitHub Actions

This guide walks you through deploying a frontend and backend application using Kubernetes (Kind), Docker, GitHub Actions with a self-hosted runner on an AWS EC2 instance.

---

## 🧰 Prerequisites

- AWS EC2 instance (Ubuntu, **t2.medium** recommended)
- Docker installed
- Kind (Kubernetes in Docker)
- kubectl installed
- Docker Hub account
- GitHub repository with workflows configured

---

## ✅ Step 1: Launch EC2 and Install Required Tools

1. Launch a t2.medium EC2 instance.
2. SSH into the instance:
   ```bash
   ssh -i <your-key>.pem ubuntu@<your-ec2-ip>
   ```
3. Install Docker:
   ```bash
   sudo apt update
   sudo apt install docker.io -y
   sudo usermod -aG docker $USER
   newgrp docker
   ```
4. Install Kind:
   ```bash
   curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
   chmod +x ./kind
   sudo mv ./kind /usr/local/bin/kind
   ```
5. Install kubectl:
   ```bash
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
   chmod +x kubectl
   sudo mv kubectl /usr/local/bin/
   ```

---

## 🏃 Step 2: Setup GitHub Self-Hosted Runner

1. Go to your GitHub **Repo > Settings > Actions > Runners**.
2. Click **“New self-hosted runner”** and follow the setup instructions.
3. Run the given commands on your EC2 instance to configure and start the runner:
   ```bash
   mkdir actions-runner && cd actions-runner
   curl -o actions-runner-linux-x64.tar.gz -L https://github.com/actions/runner/releases/download/v2.X.X/actions-runner-linux-x64-2.X.X.tar.gz
   tar xzf ./actions-runner-linux-x64.tar.gz
   ./config.sh --url https://github.com/<username>/<repo> --token <runner-token>
   ./run.sh
   ```
4. Clone your repository and switch to the `k8s-prod` branch:
   ```bash
   git clone https://github.com/<username>/<repo>.git
   cd <repo>
   git checkout k8s-prod
   ```

---

## ⚙️ Step 3: Update Kubernetes Configs

1. Go to `k8s/frontend-deployment.yaml` and update the service IP with your EC2 public IP.
```bash
         env:
            - name: VITE_REACT_APP_API_URL
              value: http://<ec2-ip>:4001
   ```
2. Do the same in `k8s/backend-deployment.yaml`.
```bash
         env:
            - name: FRONTEND_URL
            value: "http://<ec2-ip>:5173"
   ```
---

## 🐳 Step 4: Build and Push Docker Images

On your EC2 instance or local machine:
```bash
# Frontend
docker build -t <docker-username>/frontend-app:latest ./frontend
docker push <docker-username>/frontend-app:latest

# Backend
docker build -t <docker-username>/backend-app:latest ./backend
docker push <docker-username>/backend-app:latest
```
Change the image name in frontend-deployment and backend-deployment accordinglly

---

## 🔐 Step 5: Add GitHub Secrets

In your GitHub repository, go to:
**Settings > Secrets and variables > Actions > New repository secret**

Add the following:
- `DOCKER_USERNAME` = your Docker Hub username
- `DOCKER_PASSWORD` = your Docker Hub password or PAT

---

## 🚀 Step 6: Trigger GitHub Workflow

Push to the `k8s-prod` branch or trigger the workflow manually from the **Actions** tab.

On your EC2 instance, use port forwarding:
```bash
kubectl port-forward service/frontend 5173:5173
kubectl port-forward service/backend 4001:4001
```

---

## 🌐 Step 7: Access Application

1. Go to EC2 > Security Groups > Edit inbound rules
2. Add custom TCP rules for ports **5173** and **4001**
3. Access the app in your browser:
   ```
   http://<your-ec2-ip>:5173
   ```

---

✅ You're all set! Your app is deployed using a complete AIOps + DevOps workflow with self-hosted runners, Docker, and Kubernetes.
