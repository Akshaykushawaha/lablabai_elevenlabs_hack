from google_apis import create_service

client_secret_file = 'client_secret_172127998396.json'
api_name = "calendar"
api_version = "v3"
scopes = ["https://www.googleapis.com/auth/calendar"]

services = create_service(client_secret_file, api_name, api_version, scopes)

print(dir(services))