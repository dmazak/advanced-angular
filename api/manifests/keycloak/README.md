## Output from Install

```shell
Keycloak can be accessed through the following DNS name from within your cluster:

    keycloak.auth.svc.cluster.local (port 80)

To access Keycloak from outside the cluster execute the following commands:

1. Get the Keycloak URL and associate its hostname to your cluster external IP:

   export CLUSTER_IP=$(minikube ip) # On Minikube. Use: `kubectl cluster-info` on others K8s clusters
   echo "Keycloak URL: http://auth.todo-zoo.com/auth"
   echo "$CLUSTER_IP  auth.todo-zoo.com" | sudo tee -a /etc/hosts

2. Access Keycloak using the obtained URL.
3. Access the Administration Console using the following credentials:

  echo Username: admin
  echo Password: $(kubectl get secret --namespace auth keycloak -o jsonpath="{.data.admin-password}" | base64 --decode)
```
