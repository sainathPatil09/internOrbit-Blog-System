# 🌐Blog System

A full-stack blogging platform deployed on a Kubernetes cluster using GitHub Actions, Docker. This project features a frontend (Vite + React) and backend (Node.js + Express + MongoDB) setup, with continuous integration and deployment.

---

## 🚀 Features

- 🌍 Frontend with React (Vite)
- 🔗 Backend with Express & MongoDB
- 🐳 Dockerized microservices
- ☸️ Kubernetes deployments
- 🎯 GitHub Actions CI/CD pipeline
- ✅ Self-hosted GitHub Actions runner on AWS EC2

---

## 🛠️ Technologies

- **Frontend**: React + Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Deployment**: Kubernetes
- **Cloud**: AWS EC2

---

## ⚙️ GitHub Actions Workflow

### 🔄 Workflow Trigger
On push to the `k8s-prod` branch.

### 💡 Jobs

- **test**: Run frontend & backend tests.
- **build**: Build and push Docker images to DockerHub.
- **deploy**: Deploy Kubernetes manifests using `kubectl`.

---

## ☸️ Kubernetes Setup

Namespace: `blog-app`

Manifests:
- `frontend-deployment.yml`
- `backend-deployment.yml`
- `mongo-deployment.yml`
- `frontend-services.yml`
- `backend-services.yml`
- `mongo-pv.yml`
- `mongo-pvc.yml` 

---

## 🐳 Docker Images
- **Frontend**: [wiings09/frontend-blogapp](https://hub.docker.com/repository/docker/wiings09/frontend-blogapp)
- **Backend**: [wiings09/backend-blogapp](https://hub.docker.com/repository/docker/wiings09/backend-blogapp)

---

## 👨‍💻 Developer

**Sainath Patil**

- 💼 CSE Student | Full Stack Dev
- 🔗 [GitHub](https://github.com/sainathPatil09)

---



