"""BodyTree Yoga — local landing page server."""

from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    print("BodyTree Yoga is growing at http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=True)
