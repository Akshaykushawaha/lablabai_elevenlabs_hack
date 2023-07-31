from google_apis import create_service

client_secret_file = 'client_secret_408818330687-csvt9elqivh2js7bc2baep6lnh25hra5.apps.googleusercontent.com.json'
api_name = "calendar"
api_version = "v3"
scopes = ["https://www.googleapis.com/auth/calendar"]

services = create_service(client_secret_file, api_name, api_version, scopes)

print(dir(services))