from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("Fetch_CORS.html")

@app.route('/myApi')
def myApi():
    response_data = {"data": "Hello from my API!"}
    response = jsonify(response_data)
    response.headers.add('Access-Control-Allow-Origin', '*')  # 允許所有網域的請求
    return response

if __name__ == '__main__':
    app.run(debug=True)