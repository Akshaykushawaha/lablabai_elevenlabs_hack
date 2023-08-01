from flask import Flask, request, render_template, jsonify
from google_cal import create_event
from ai import process_user_input
from elevn import save_audio
from aud_test import recognize_audio_file
from googletrans import Translator

app = Flask(__name__,template_folder='./templates', static_folder='./templates/static')

@app.route('/train', methods=['POST'])
def handle_user_input():
    if request.method == 'POST':
        user_input = request.form.get('user_input')
        # Process the user_input as needed (e.g., save to a database, perform some calculations, etc.)
        print("User Input:", user_input)

@app.route('/process', methods=['POST'])
def process_input():
    time=""
    try:
        user_input = request.json.get('user_input', '')
        lang = request.json.get('Launguage', '')
        l={'Hindi':"hi","German":"de","French":"fr","Italian":"it","Polish":"pl"}
        if (lang in l.keys()) and lang!="English":
            translator = Translator()
            user_input = translator.translate(user_input, dest=l[lang])  # 'en' is the language code for English
            user_input=user_input.text
    except (user_input)=="":
        user_input= recognize_audio_file()
        # Process the user input and generate the AI response (Replace this with your AI logic)
        ai_response = process_user_input(user_input)
        save_audio(str(ai_response))
        if "Note" in str(ai_response):
            time=ai_response[6:16].replace("+","-")+"T"+ai_response[20:28].replace("+",":")+"-07:00"
            timeend=ai_response[6:16].replace("+","-")+"T"+str(int(ai_response[20:22])+1)+ai_response[25:28].replace("+",":")+"-07:00"
        event = {
          'summary': 'Meeting',
          'description': 'Meeting scheduled, please check and approve',
          'start': {
            'dateTime': time,
            'timeZone': 'Asia/Kolkata',
          },
          'end': {
            'dateTime': timeend,
            'timeZone': 'Asia/Kolkata',
          }
        }
        create_event(event)
        return jsonify({'user_output': ai_response})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/', methods=['GET'])
def Home():    
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=False)
