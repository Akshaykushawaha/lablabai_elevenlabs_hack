from elevenlabs import generate, play, set_api_key, save

def save_audio(text):
    voice = generate(text,voice="Bella")
    save(voice,'test.mp3')