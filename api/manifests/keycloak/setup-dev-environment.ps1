Write-Host "*** Getting you Setup ***"
Write-Host "    - adding bitnami helm repo"
helm repo add bitnami https://charts.bitnami.com/bitnami
Write-Host "*** Setting up the KeyCloak Auth Server ***"
Write-Host "    - creating the auth namespace"
kubectl create namespace auth
Write-Host "    - changing context to auth"
kubectl config set-context --current --namespace=auth
Write-Host "    - installing KeyCloak Helm Chart in Auth"
helm install keycloak bitnami/keycloak --values .\keycloak-values.yaml





Write-Host "*** ALL DONE! Remember: ****"
Write-Host "    - Add a Hosts Entry for auth.todo-zoo.com"
Write-Host "    - Import Your Realm"

