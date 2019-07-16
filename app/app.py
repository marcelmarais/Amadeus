from flask import Flask
import os
import socket

app = Flask(__name__)

@app.route("/")
def hello():

    html = "<h3>Test {name}!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>" 
    return html.format(name=os.getenv("NAME", "asd"), hostname=socket.gethostname())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)