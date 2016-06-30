cas-sso
=======

This serves as a Single-Sign On for CAS and can be used along with the nginx auth_request module

An example app can be found [here](https://github.com/felicity-buzz-2k16/cas-sso-example)

It also serves a javascript helper file at `/helper.js`, you can see it in action in the example

Example Nginx config:

```
server {
    listen 80;
    server_name localhost;
    auth_request /auth/nginx_auth;
    auth_request_set $SSO_email $upstream_http_email;
    auth_request_set $SSO_name $upstream_http_name;

    location ^~ /example/{
        proxy_set_header SSO-Email $SSO_email;
        proxy_set_header SSO-Name $SSO_name;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass    http://127.0.0.1:3001/;
    }

    location ^~ /auth/{
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass    http://127.0.0.1:3000/;
    }
}
```
