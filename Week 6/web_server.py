from flask import Flask, render_template, request, redirect, url_for, session
from contextlib import contextmanager
import pymysql

app = Flask(__name__)
app.secret_key = "Yo0_secret_key"

db_config = {
    'host': 'ChendeMac-mini.local',
    'user': 'root',
    'password': '12345678',
    'database': 'website',
    'cursorclass': pymysql.cursors.DictCursor
}

connection = pymysql.connect(**db_config)

@app.route("/")
def home():
    if 'username' in session:
        return redirect(url_for("member"))
    return render_template("index.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        name = request.form.get("registerName")
        username = request.form.get("registerUsername")
        password = request.form.get("registerPassword")
        try:
            with connection.cursor() as cursor:
                sql_check = "SELECT * FROM member WHERE username = %s"
                cursor.execute(sql_check, (username,))
                existing_user = cursor.fetchone()
                if existing_user:
                    return redirect("/error?message=Account has been Registered! SorryQQ")
                sql_insert = "INSERT INTO member (name, username, password) VALUES (%s, %s, %s)"
                cursor.execute(sql_insert, (name, username, password))
                connection.commit()
            return redirect(url_for("home"))
        except Exception as ex:
            print("Error:", ex)
    return redirect("/error?message=Could not get request! SorryQQ")

@app.route("/signin", methods=["GET", "POST"])
def signin():
    username = request.form.get("signinUsername")
    password = request.form.get("signinPassword")
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM member WHERE username = %s AND password = %s"
            cursor.execute(sql, (username, password))
            result = cursor.fetchone()
        if result:
            session['member_id'] = result['id']
            session['username'] = result['username']
            session['name'] = result['name']
            return redirect(url_for("member"))
        return redirect("/error?message=Username or Password is not Correct.")
    except Exception as ex:
        print("Error:", ex)


@app.route("/member")
def member():
    if 'username' in session:
        name = session['name']
        try:
            with connection.cursor() as cursor:
                sql = """
                SELECT m.name, msg.content
                FROM member m
                INNER JOIN message msg ON m.id = msg.member_id
                """
                cursor.execute(sql)
                messages = cursor.fetchall()
            return render_template("member.html", name=name, messages=messages)
        except Exception as ex:
            print("Error:", ex)
            messages = []
    return redirect(url_for("home"))


@app.route("/createMessage", methods=["POST"])
def createMessage():
    if "name" in session:
        name = session["name"]
        messageContent = request.form.get("message_content")
        try:
            with connection.cursor() as cursor:
                # 將訊息資料插入到 message 資料表中
                sql_insert = "INSERT INTO message (member_id, content) VALUES ((SELECT id FROM member WHERE name = %s), %s)"
                cursor.execute(sql_insert, (name, messageContent))
                connection.commit()
                print("Message saved successfully.")
                return "Message saved successfully."
        except Exception as ex:
            print("Error:", ex)
            return "Failed to save message."
    return "Not received message"

@app.route("/error")
def error():
    error_message = request.args.get("message")
    return render_template("error.html", error_message=error_message)

@app.route("/signout")
def signout():
    session.pop('member_id', None)
    session.pop('username', None)
    session.pop('name', None)
    return redirect(url_for("home"))

@app.route("/deleteMessage", methods=["POST"])
def delete_message():
    if "username" in session:
        message_content = request.form.get("message_content")
        try:
            with connection.cursor() as cursor:
                sql_delete = "DELETE FROM message WHERE content = %s"
                cursor.execute(sql_delete, (message_content,))
                connection.commit()
                print("Deleted message")
                return "Message deleted successfully."
        except Exception as ex:
            print("Error:", ex)
            return "Failed to delete message."
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(port=3000, debug=True)