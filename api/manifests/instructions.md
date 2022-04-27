# Instructions

## Angular App

```shell
ng new todos --skip-git --skip-tests
```

## Traefik

```
kubectl port-forward -n kube-system $(kubectl -n kube-system get pods --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000
```

localhost:9000/dashboard

## MongoDB

Create a Data namespace and use it.
```
helm install mongo bitnami/mongodb --values .\manifests\mongo\mongodb-values.yaml
```

## Keycloak

Create an auth namespace and use it.
```shell
helm install keycloak bitnami/keycloak --values .\manifests\keycloak\keycloak-values.yaml
```