from flask import Flask, request, render_template

app = Flask(__name__,template_folder='./templates', static_folder='./templates/static')

@app.route('/your_flask_url', methods=['POST'])
def handle_user_input():
    if request.method == 'POST':
        user_input = request.form.get('user_input')
        # Process the user_input as needed (e.g., save to a database, perform some calculations, etc.)
        print("User Input:", user_input)

@app.route('/', methods=['GET'])
def Home():    
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=False, port = 48)
