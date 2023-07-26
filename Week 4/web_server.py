from flask import Flask, render_template, request, redirect, url_for,session

app = Flask(__name__)
print(__name__)

credential = {"username": "test","password": "test"}

app.secret_key="this_secret_key"

@app.route("/")
def home():
    if "signed_in" in session and session["signed_in"] == True:
        return redirect(url_for('member'))
    else:
        return render_template('index.html')
                  
@app.route('/signin', methods=['POST'])
def signin():
    global signed_in
    username = request.form.get('username')
    password = request.form.get('password')
    
    if username == credential["username"] and credential["password"] == password:
        session["signed_in"] = True
        return redirect(url_for('member'))
    elif username =="" and password =="":
        return redirect('/error?message=Please Enter Username and Password.')
    else:
        return redirect('/error?message=Username or Password is not correct.')

@app.route('/member')
def member():
    if "signed_in" in session and session["signed_in"] == False:
        return redirect(url_for('home'))
    return render_template('member.html')

@app.route("/error")
def error():
    error_message = request.args.get('message')
    return render_template('error.html',error_message=error_message)

@app.route("/signout")
def signout():
    session["signed_in"] = False
    return redirect(url_for('home'))

@app.route('/square/<int:number>')
def square(number):
    squared_number = number * number
    return render_template('square.html', number=number, squared_number=squared_number)
        
if __name__ == "__main__":
    app.run(port=3000,debug=True)
